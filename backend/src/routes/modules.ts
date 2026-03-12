import { Router, Response, NextFunction } from "express";
import { db } from "../firebase/firebase";
import { isAuthenticated, AuthenticatedRequest } from "../middleware/auth";
import { ModuleListItem, ModuleProgress } from "../types";

const router = Router();

const calculateProgress = (moduleProgress: ModuleProgress): number => {
  switch (moduleProgress.status) {
    case "not_started":
      return 0;
    case "in_progress":
      return (
        (moduleProgress.completedSlides / (moduleProgress.totalSlides + 1)) *
        100
      );
    case "quiz":
      return (
        (moduleProgress.totalSlides / (moduleProgress.totalSlides + 1)) * 100
      );
    case "completed":
      return 100;
    default:
      return 0;
  }
};

router.get(
  "/",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.uid;

      if (!userId) {
        res.status(401).json({ error: "User ID not found in token" });
        return;
      }

      const modulesSnapshot = await db.collection("modules").get();

      const modules: ModuleListItem[] = await Promise.all(
        modulesSnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const moduleId = doc.id;

          const progressSnapshot = await db
            .collection("moduleProgress")
            .where("userId", "==", userId)
            .where("moduleId", "==", moduleId)
            .limit(1)
            .get();

          let progress = 0;
          let isCompleted = false;

          if (!progressSnapshot.empty) {
            const moduleProgress =
              progressSnapshot.docs[0].data() as ModuleProgress;
            progress = calculateProgress(moduleProgress);
            isCompleted = moduleProgress.status === "completed";
          }

          return {
            id: moduleId,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            objectives: data.objectives,
            progress,
            isCompleted,
          };
        }),
      );

      console.log(`Fetched ${modules.length} modules for user ${userId}`);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  },
);

export default router;
