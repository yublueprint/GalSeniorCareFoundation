'use client';

import { Question } from '../../../../backend/src/types';
import QuizProgressBar from '@/components/quiz/QuizProgressBar';
import { useState, useEffect } from "react";

interface QuizQuestionProps {
  questions: Question[];
  currentQuestionIndex: number;
  onBack: () => void;
  onNext: () => void;
}

export default function QuizQuestion({
  questions,
  currentQuestionIndex,
  onBack,
  onNext
}: QuizQuestionProps) {

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (answered) return;

    const correct = index === question.correctAnswerIndex;

    setSelectedOption(index);
    setIsCorrect(correct);
    setAnswered(true);
    setShowFeedback(true);
  };

  useEffect(() => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(null);
    setShowFeedback(false);
  }, [currentQuestionIndex]);

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-[1344px]">

        {/* Progress Bar */}
        <div className="mb-8">
          <QuizProgressBar
            questionsAnswered={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        </div> 

        {/* Scenario Text */}
        <h1 className="font-sans font-bold text-[30px] leading-[44px] tracking-[-0.011em] mb-6 ">
          {question.scenarioText}
        </h1>

        {/* Options + Image */}
        <div className="flex gap-12 mt-8 flex-wrap">

          {/* LEFT — OPTIONS */}
          <div className="flex flex-col gap-6 flex-1 min-w-[432px]">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`w-full min-h-[72px] rounded-[12px] px-[12px] py-[24px] flex items-center gap-[18px] border
                    ${answered && isSelected
                      ? isCorrect
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-[#E0E0E0] hover:bg-gray-50"
                    }`}
                >
                  {/* Circle bullet */}
                  <div
                    className={`w-[22px] h-[22px] rounded-full flex-shrink-0 transition-all
                      ${isSelected ? 'border-[3px] border-[#FBC176]' : 'border border-[#E0E0E0]'}`
                    }
                  />
                  <span className="text-[20px] font-bold leading-[24px] text-[#121212] text-left">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT — IMAGE + Pop-Up Modal */}
          {question.scenarioImageUrl && (
            <div className="flex-1 min-w-[850px] relative">
              <img
                src={question.scenarioImageUrl}
                alt="Scenario"
                className="w-full h-auto object-cover rounded-[9px]"
              />

              {/* Pop-Up Modal */}
              {showFeedback && selectedOption !== null && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div className="w-[731px] h-[376px] bg-white rounded-[16px] shadow-xl p-8 flex flex-col justify-between">
                    <div className="flex flex-col items-center justify-center text-center gap-4">
                      {selectedOption === question.correctAnswerIndex ? (
                        
                        <div className="flex flex-col items-center gap-2">
                        <img
                          src="/correct.svg"   
                          alt="Correct"
                          className="h-16 w-16"
                        />
                        <span className="text-xl font-bold">Correct!</span>
                        </div>

                      ) : (
                        <div className="flex flex-col items-center gap-2">
                        <img
                          src="/incorrect.svg"   
                          alt="Incorrect"
                          className="h-16 w-16"
                        />
                        <span className="text-xl font-bold">Incorrect!</span>
                        </div>
                      )}
                      <p className="text-[18px] leading-[28px] text-[#121212]">
                        {question.options[selectedOption].explanation}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      {selectedOption === question.correctAnswerIndex ? (
                        <button
                          onClick={() => {
                            setShowFeedback(false);
                            onNext();
                          }}
                          className="text-white px-6 py-3 bg-[#2E7D32] rounded-lg font-semibold"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setShowFeedback(false);
                            setSelectedOption(null);
                            setAnswered(false);
                            setIsCorrect(null);
                          }}
                          className="text-white px-6 py-3 bg-[#C5221F] rounded-lg font-semibold"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Navigation Buttons */}

      </div>
    </div>
  );
}