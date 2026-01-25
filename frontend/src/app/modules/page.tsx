'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ModuleCard from '@/components/ModuleCard';
import { Module } from '@/types/module';

export default function ModulesPage() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        // Sample data for now. We gotta replace with backend API
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        const mockModules: Module[] = [
          {
            id: '1',
            title: 'Phishing Emails',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
          },
          {
            id: '2',
            title: 'Bank Impersonations',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
          },
          {
            id: '3',
            title: 'Charity Scams',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
          },
          {
            id: '4',
            title: 'Computer Tech',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
          },
          {
            id: '5',
            title: 'Fake Survey Scams',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
          },
          {
            id: '6',
            title: 'Government Imposter Scam',
            description: 'caption about phishing emails',
            progress: 0,
            isCompleted: false,
          },
        ];
        
        setModules(mockModules);
        setError(null);
      } catch (err) {
        setError('Failed to load modules. Please try again later.');
        console.error('Error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleStartModule = (moduleId: string) => {
    router.push(`/modules/${moduleId}`);
  };

  const handleBack = () => {
    router.back();
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
          
          <h1 className="text-4xl font-bold mb-8 text-center">Pick a module!</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-2 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-md text-center">
              <svg 
                className="w-16 h-16 text-red-400 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Modules</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (modules.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 max-w-md text-center">
              <svg 
                className="w-16 h-16 text-yellow-400 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                />
              </svg>
              <h2 className="text-xl font-bold text-yellow-800 mb-2">No Modules Available</h2>
              <p className="text-yellow-700">
                There are no training modules available at this time. Please check back later!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Display Modules
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Pick a module!
        </h1>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onStartModule={handleStartModule}
            />
          ))}
        </div>

        {/* Module Count */}
        <div className="mt-8 text-center text-gray-600">
          <p>Showing {modules.length} training module{modules.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
}
