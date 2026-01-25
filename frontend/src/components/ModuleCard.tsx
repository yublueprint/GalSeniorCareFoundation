'use client';

import { Module } from '@/types/module';

interface ModuleCardProps {
  module: Module;
  onStartModule: (moduleId: string) => void;
}

export default function ModuleCard({ module, onStartModule }: ModuleCardProps) {
  const buttonText = module.progress > 0 && module.progress < 100 
    ? 'Continue' 
    : module.isCompleted 
    ? 'Review' 
    : 'Start Module';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transition-transform hover:scale-[1.02] hover:shadow-lg">
      {/* Module Icon/Image */}
      <div className="w-full h-32 mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
        {module.imageUrl ? (
          <img 
            src={module.imageUrl} 
            alt={module.title}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <svg 
            className="w-16 h-16 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        )}
      </div>

      {/* Progress Badge */}
      <div className="mb-2">
        <span className="text-xs font-semibold text-gray-600 bg-[#f1bb79]/30 px-2 py-1 rounded">
          {module.progress}% complete
        </span>
      </div>

      {/* Module Title */}
      <h3 className="text-xl font-bold mb-2 text-gray-800">
        {module.title}
      </h3>

      {/* Module Description */}
      <p className="text-sm text-gray-600 mb-4 flex-grow">
        {module.description}
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-[#f1bb79] h-2 rounded-full transition-all duration-300"
          style={{ width: `${module.progress}%` }}
        />
      </div>

      {/* Start/Continue Button */}
      <button
        onClick={() => onStartModule(module.id)}
        className="w-full py-2 rounded-md bg-[#f1bb79] shadow-[3px_3px_0_#d09a58] font-bold text-lg hover:bg-[#f1bb79]/85 transition-colors flex items-center justify-center gap-2"
      >
        {buttonText}
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </button>
    </div>
  );
}
