'use client';

import { Card } from '@/components/common';
import { AnswerOptions } from './AnswerOptions';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  selectedValue: number | null;
  onAnswer: (value: number) => void;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  selectedValue,
  onAnswer,
}: QuestionCardProps) {
  return (
    <Card variant="elevated" className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 bg-pastel-lavender/30 rounded-full text-sm font-medium text-foreground-secondary mb-4">
          質問 {questionNumber} / {totalQuestions}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
          {questionText}
        </h2>
      </div>

      <AnswerOptions selectedValue={selectedValue} onSelect={onAnswer} />
    </Card>
  );
}
