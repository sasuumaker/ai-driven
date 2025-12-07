'use client';

import { AnswerOptions } from './AnswerOptions';

interface QuestionRowProps {
  questionNumber: number;
  questionText: string;
  selectedValue: number | null;
  onAnswer: (value: number) => void;
}

export function QuestionRow({
  questionNumber,
  questionText,
  selectedValue,
  onAnswer,
}: QuestionRowProps) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pastel-mint/30 flex items-center justify-center text-sm font-semibold text-foreground">
              {questionNumber}
            </span>
            <p className="text-foreground leading-relaxed pt-1">{questionText}</p>
          </div>
        </div>
        <div className="flex-shrink-0 md:w-64">
          <AnswerOptions selectedValue={selectedValue} onSelect={onAnswer} compact />
        </div>
      </div>
    </div>
  );
}
