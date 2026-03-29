'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Module } from '@/types/module';
import ModuleWelcomeScreen from '@/components/ModuleWelcomeScreen';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getCurrentUser } from '@/services/auth.service';

interface ModuleEntryResponse {
  module: Module;
  redirectTo: string;
}

function ModuleWelcomePageContent() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        setLoading(true);
        const user = getCurrentUser();
        if (!user) {
          router.push('/login');
          return;
        }

        const token = await user.getIdToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/modules/${moduleId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Backend error:', response.status, errorData);
          throw new Error(`Failed to fetch module: ${response.status}`);
        }

        const data = await response.json();
        const moduleData: ModuleEntryResponse = data.data;

        setModule(moduleData.module);

        // Follow redirectTo logic
        const redirectPath = moduleData.redirectTo;
        if (redirectPath === 'welcome') {
          // Stay on welcome screen
        } else if (redirectPath === 'completed') {
          router.push(`/modules/${moduleId}/completed`);
        } else if (redirectPath.startsWith('slide/')) {
          const slideId = redirectPath.split('/')[1];
          router.push(`/modules/${moduleId}/slide/${slideId}`);
        } else if (redirectPath.startsWith('quiz/')) {
          // Extract quizId and questionId from "quiz/quizId/question/questionId"
          const parts = redirectPath.split('/');
          const quizId = parts[1];
          const questionId = parts[3];
          router.push(`/modules/${moduleId}/quiz/${quizId}/question/${questionId}`);
        }
      } catch (err) {
        console.error('Error fetching module:', err);
        // Fallback to showing the welcome screen if API call fails
      } finally {
        setLoading(false);
      }
    };

    fetchAndRedirect();
  }, [moduleId, router]);

  if (loading) return <div className="p-12 text-center">Loading module...</div>;
  
  if (!module) return <div className="p-12 text-center">Module not found</div>;

  return (
    <ModuleWelcomeScreen
      module={module}
      onBack={() => router.push('/modules')}
      onNext={() => alert("Redirecting to next step...")}
    />
  );
}

export default function ModuleWelcomePage() {
  return (
    <ProtectedRoute>
      <ModuleWelcomePageContent />
    </ProtectedRoute>
  );
}
