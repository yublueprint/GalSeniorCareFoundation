'use client';

import { useState } from 'react';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import { Question, Quiz } from '../../../../backend/src/types';

const quiz : Quiz[] = [
  {
    id: 'quiz1',
    moduleId: 'module1',
    title: 'Banking & Financial Security Quiz'
  }
];

const sampleQuestions: Question[] = [
  {
    id: '1',
    quizId: 'quiz1',
    order: 1,
    scenarioText: 'Scenario 1: “You receive an email from your “bank” with spelling errors, asking you to confirm your Social Insurance Number. What should you do?”',
    scenarioImageUrl: 'temp-email.svg',
    options: [
      {
        text: 'A) Reply to the email',
        explanation: 'Engaging with scammers is dangerous, as they may steal information even if you just respond to them with “Who are you?”.'
      },
      {
        text: 'B) Call your bank using the phone number on your bank card.',
        explanation: 'Correct! Your credit/debit cards have the official bank contact information.'
      },
      {
        text: 'C) Click the link in the email.',
        explanation: 'Clicking the link in the email may allow the perpetrators access to all the information on your device.'
      }
    ],
    correctAnswerIndex: 1
  },
  {
    id: '2',
    quizId: 'quiz1',
    order: 2,
    scenarioText: 'Scenario 2: What is the safest way to access your bank account online?',
    options: [
      {
        text: 'A) Click the link in an email.',
        explanation: 'Clicking the link in the email may allow the perpetrators access to all the information on your device.'
      },
      {
        text: 'B) Type your bank’s web address manually and log in.',
        explanation: 'Correct! Even if you make a mistake, you will get a suggestion to follow the link to the official bank’s website.'
      },
      {
        text: 'C) Use any link you find online.',
        explanation: 'Many of the links available online are scams. Always follow the official links.'
      }
    ],
    correctAnswerIndex: 1
  }
];

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <QuizQuestion
      questions={sampleQuestions}
      currentQuestionIndex={currentQuestionIndex}
      onBack={handleBack}
      onNext={handleNext}
    />
  );
}