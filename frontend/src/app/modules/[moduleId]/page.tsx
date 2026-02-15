'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Module } from '@/types/module';
import ModuleWelcomeScreen from '@/components/ModuleWelcomeScreen';
import ProtectedRoute from '@/components/ProtectedRoute';

function ModuleWelcomePageContent() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Sample data. Replace with backend API.
      const mockModules: Module[] = [
          {
            id: '1',
            title: 'Phishing Emails',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
            objectives: [
              'first learning objective placeholder',
              'second learning objective placeholder',
              'third learning objective placeholder',
            ],
          },
          {
            id: '2',
            title: 'Bank Impersonations',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
            objectives: [
              'first learning objective placeholder',
              'second learning objective placeholder',
              'third learning objective placeholder',
            ],
          },
          {
            id: '3',
            title: 'Charity Scams',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
            objectives: [
              'first learning objective placeholder',
              'second learning objective placeholder',
              'third learning objective placeholder',
            ],
          },
          {
            id: '4',
            title: 'Computer Tech',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
            objectives: [
              'first learning objective placeholder',
              'second learning objective placeholder',
              'third learning objective placeholder',
            ],
          },
          {
            id: '5',
            title: 'Fake Survey Scams',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
            objectives: [
              'first learning objective placeholder',
              'second learning objective placeholder',
              'third learning objective placeholder',
            ],
          },
          {
            id: '6',
            title: 'Government Imposter Scam',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
            objectives: [
              'first learning objective placeholder',
              'second learning objective placeholder',
              'third learning objective placeholder',
            ],
          },
        ];

      const found = mockModules.find(m => m.id === moduleId);
      setModule(found || null);
      setLoading(false);
    };

    fetchModule();
  }, [moduleId]);

  if (loading) return <div className="p-12 text-center">Loading module...</div>;
  
  if (!module) return <div className="p-12 text-center">Module not found</div>;

  return (
    <ModuleWelcomeScreen
      module={module}
      onBack={() => router.push('/modules')}
      onNext={() => alert("This goes to the first quiz question!")}
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
