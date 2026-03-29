import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { db } from './firebase/firebase';
import { isAuthenticated, AuthenticatedRequest } from './middleware/auth';
import { ModuleEntryResponse, ModuleRedirectTo } from './types';

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

/*
 * Returns list of all modules with progress info for authenticated user
 */
app.get('/modules', isAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
                data: {},
                meta: {},
            });
            return;
        }

        
        const modulesSnapshot = await db.collection('modules').get();
        
        const progressSnapshot = await db
            .collection('moduleProgress')
            .where('userId', '==', userId)
            .get();

        // Create a map of moduleId -> progress for fast lookup
        const progressMap = new Map();
        progressSnapshot.docs.forEach(doc => {
            const data = doc.data();
            progressMap.set(data.moduleId, {
                status: data.status,
                completedSlides: data.completedSlides || 0,
                totalSlides: data.totalSlides || 0,
                completedAt: data.completedAt,
            });
        });

        // Transform modules to ModuleListItem format
        const modules = modulesSnapshot.docs.map(doc => {
            const moduleData = doc.data();
            const progress = progressMap.get(doc.id);
            
            return {
                id: doc.id,
                title: moduleData.title || '',
                description: moduleData.description || '',
                imageUrl: moduleData.imageUrl,
                objectives: moduleData.objectives || [],
                progress: progress ? (progress.completedSlides / Math.max(progress.totalSlides, 1)) * 100 : 0,
                isCompleted: progress?.status === 'completed' || false,
            };
        });

        res.json({
            success: true,
            message: 'Modules retrieved',
            data: modules,
            meta: {},
        });
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: {},
            meta: {},
        });
    }
});

/*
 * Returns module data with redirectTo logic based on user's progress
 */

app.get('/modules/:moduleId', isAuthenticated, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { moduleId } = req.params;
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized',
                data: {},
                meta: {},
            });
            return;
        }

        // Fetch module document
        const moduleDoc = await db.collection('modules').doc(moduleId).get();
        if (!moduleDoc.exists) {
            res.status(404).json({
                success: false,
                message: 'Module not found',
                data: {},
                meta: {},
            });
            return;
        }

        const moduleData = moduleDoc.data();
        const module = {
            id: moduleDoc.id,
            title: moduleData?.title || '',
            description: moduleData?.description || '',
            imageUrl: moduleData?.imageUrl,
            objectives: moduleData?.objectives || [],
        };

        // Fetch user's progress for this module
        const progressSnapshot = await db
            .collection('moduleProgress')
            .where('userId', '==', userId)
            .where('moduleId', '==', moduleId)
            .limit(1)
            .get();

        let redirectTo: ModuleRedirectTo;

        if (progressSnapshot.empty) {
            // No progress = not_started
            redirectTo = 'welcome';
        } else {
            const progressDoc = progressSnapshot.docs[0];
            const progress = progressDoc.data();
            const status = progress.status;

            if (status === 'not_started') {
                redirectTo = 'welcome';
            } else if (status === 'in_progress') {
                // Use currentSlideId from progress
                const slideId = progress.currentSlideId;
                redirectTo = `slide/${slideId}`;
            } else if (status === 'quiz') {
                // Find Quiz by moduleId
                const quizSnapshot = await db
                    .collection('quizzes')
                    .where('moduleId', '==', moduleId)
                    .limit(1)
                    .get();

                if (!quizSnapshot.empty) {
                    const quiz = quizSnapshot.docs[0];
                    const quizId = quiz.id;

                    // Find active QuizAttempt for this user + quiz
                    const attemptSnapshot = await db
                        .collection('quizAttempts')
                        .where('userId', '==', userId)
                        .where('quizId', '==', quizId)
                        .where('status', 'in', ['not_started', 'in_progress'])
                        .limit(1)
                        .get();

                    if (!attemptSnapshot.empty) {
                        const attempt = attemptSnapshot.docs[0].data();
                        const currentQuestionIndex = attempt.currentQuestionIndex;

                        // Get the question at currentQuestionIndex
                        const questionsSnapshot = await db
                            .collection('questions')
                            .where('quizId', '==', quizId)
                            .orderBy('order')
                            .get();

                        if (questionsSnapshot.size > currentQuestionIndex) {
                            const questionId = questionsSnapshot.docs[currentQuestionIndex].id;
                            redirectTo = `quiz/${quizId}/question/${questionId}`;
                        } else {
                            // Fallback if index is out of bounds
                            redirectTo = 'welcome';
                        }
                    } else {
                        // No active attempt, start quiz
                        const questionsSnapshot = await db
                            .collection('questions')
                            .where('quizId', '==', quizId)
                            .orderBy('order')
                            .limit(1)
                            .get();
                        
                        if (!questionsSnapshot.empty) {
                            const questionId = questionsSnapshot.docs[0].id;
                            redirectTo = `quiz/${quizId}/question/${questionId}`;
                        } else {
                            redirectTo = 'welcome';
                        }
                    }
                } else {
                    redirectTo = 'welcome';
                }
            } else if (status === 'completed') {
                redirectTo = 'completed';
            } else {
                redirectTo = 'welcome';
            }
        }

        const response: ModuleEntryResponse = {
            module,
            redirectTo,
        };

        res.json({
            success: true,
            message: 'Module entry data retrieved',
            data: response,
            meta: {},
        });
    } catch (error) {
        console.error('Error fetching module entry:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: {},
            meta: {},
        });
    }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
