'use client';

import { Module } from '@/types/module';

interface ModuleWelcomeScreenProps {
  module: Module;
  onBack: () => void;
  onNext: () => void;
}

export default function ModuleWelcomeScreen({ module, onBack, onNext }: ModuleWelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col">
      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Title and description */}
        <div className="w-full">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 break-words">
            Welcome to the {module.title} Module!
          </h1>
          
          <p className="text-base md:text-lg black mb-6 md:mb-8">
            {module.description}
          </p>

          {/* Optional learning objectives */}
          {module.objectives && module.objectives.length > 0 && (
            <div className="mb-10 md:mb-16">
              <h2 className="text-lg md:text-xl font-semibold mb-2">Learning Objectives</h2>
              <ul className="list-disc list-inside black">
                {module.objectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-6 pb-8">
          <h2 className="text-lg md:text-2xl font-semibold text-left max-w-2xl mb-4 md:mb-0 md:-mt-45">
            Let&apos;s get started protecting yourself online: one step at a time!
          </h2>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-8 py-3 bg-[#f1bb79] text-black rounded-lg shadow-[3px_3px_0_#d09a58] font-bold text-lg hover:bg-[#f1bb79]/85 transition-colors cursor-pointer whitespace-nowrap"
          >
            Next
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
