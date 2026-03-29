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

  // arrow icon for buttons
  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="currentColor"
      style={{ flexShrink: 0, overflow: 'visible' }}
    >
      <path d="M1 6.36395C0.447715 6.36395 0 6.81167 0 7.36395C0 7.91624 0.447715 8.36395 1 8.36395V7.36395V6.36395ZM14.7071 8.07106C15.0976 7.68054 15.0976 7.04737 14.7071 6.65685L8.34315 0.292885C7.95262 -0.0976395 7.31946 -0.0976395 6.92893 0.292885C6.53841 0.683409 6.53841 1.31657 6.92893 1.7071L12.5858 7.36395L6.92893 13.0208C6.53841 13.4113 6.53841 14.0445 6.92893 14.435C7.31946 14.8255 7.95262 14.8255 8.34315 14.435L14.7071 8.07106ZM1 7.36395V8.36395H14V7.36395V6.36395H1V7.36395Z" />
    </svg>
  );

  
  return (
    <>
      {/* ── Dark full-screen overlay ── */}
      {showFeedback && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: 'var(--greyscale-700, #454545)',
            backgroundBlendMode: 'multiply',
            opacity: 0.7,
          }}
        />
      )}

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
          <h1 className="font-sans font-bold text-[30px] leading-[44px] tracking-[-0.011em] mb-6">
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
                    className={`
                      w-full min-h-[72px] rounded-[12px] px-[12px] py-[24px] flex items-center gap-[18px] border
                      ${answered && isSelected
                        ? isCorrect
                          ? "border-[#FBC176] bg-[#FFF8E7] border-2"
                          : "border-[#FBC176] bg-[#FFF8E7] border-2"
                        : "border-[#E0E0E0] hover:bg-gray-50"
                      }
                      ${showFeedback && isSelected ? "relative z-[50]" : ""}
                    `}
                  >
                    <div
                      className={`w-[22px] h-[22px] rounded-full flex-shrink-0 transition-all
                        ${isSelected ? 'border-[3px] border-[#FBC176]' : 'border border-[#E0E0E0]'}`}
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

                {/* Pop-Up Modal  */}
                {showFeedback && selectedOption !== null && (
                  <div className="absolute inset-0 flex items-center justify-center z-[50]">
                    <div className="relative">

                      {/* Modal (incorrect/correct feedback) */}
                      <div className="w-[731px] h-[376px] bg-white rounded-[16px] shadow-xl p-8 flex items-center justify-center">        
                        <div className="flex flex-col items-center justify-center text-center gap-4">

                          {selectedOption === question.correctAnswerIndex ? (
                            <div className="flex flex-col items-center gap-2">
                              <img src="/correct.svg" alt="Correct" className="h-16 w-16" />
                              <span className="text-xl font-bold">Correct!</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <img src="/incorrect.svg" alt="Incorrect" className="h-16 w-16" />
                              <span className="text-xl font-bold">Incorrect!</span>
                            </div>
                          )}
                          <p className="text-[18px] leading-[28px] text-[#121212]">
                            {question.options[selectedOption].explanation}
                          </p>
                        </div>
                        </div>
                      </div>

                      {/* Retry / Next button below modal */}
                      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[1344px] px-6 z-[60] flex justify-end">                        {isCorrect ? (
                          <button
                          onClick={onNext}
                          className="
                            w-[285px]
                            h-[76px]
                            flex items-center justify-center
                            gap-[13px]
                            px-[94px]
                            py-[23px]
                            bg-[#2E7D32]
                            border border-[#1B431E]
                            text-white
                            rounded-[9.7px]

                            ring-1 ring-white  
                            shadow-none

                            hover:ring-0
                            hover:shadow-[6px_7px_0_#ffffff]

                            font-bold
                            text-[28px]
                            leading-[38px]

                            transition-all duration-200
                            cursor-pointer
                            whitespace-nowrap
                          "
                          >
                          Next
                          <ArrowIcon />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setShowFeedback(false);
                              setSelectedOption(null);
                              setAnswered(false);
                              setIsCorrect(null);
                            }}
                            className="
                              w-[285px]
                              h-[76px]
                              flex items-center justify-center
                              gap-[13px]
                              px-[94px]
                              py-[23px]
                              bg-[#D32F2F]
                              border border-[#D32F2F]
                              text-white
                              rounded-[9.7px]

                              ring-1 ring-white
                              shadow-none

                              hover:ring-0
                              hover:shadow-[6px_7px_0_#ffffff]

                              font-bold
                              text-[28px]
                              leading-[38px]

                              transition-all duration-200
                              cursor-pointer
                              whitespace-nowrap
                            "                       >
                            Retry
                            <ArrowIcon />
                          </button>
                        )}
                      </div>

                    </div> 
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}