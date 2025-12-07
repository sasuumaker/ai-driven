'use client';

interface EncouragementMessageProps {
  currentQuestion: number;
  totalQuestions: number;
}

const messages: Record<number, string> = {
  10: 'いい調子です！この調子で進めましょう',
  20: '3分の1完了！あなたの傾向が見えてきました',
  30: '半分達成！ここまで来たら最後まで頑張りましょう',
  40: 'あと少し！ゴールが見えてきました',
  50: 'ラストスパート！最後の10問です',
};

export function EncouragementMessage({
  currentQuestion,
  totalQuestions,
}: EncouragementMessageProps) {
  const milestone = Math.floor(currentQuestion / 10) * 10;
  const message = messages[milestone];

  if (!message || currentQuestion % 10 !== 0 || currentQuestion === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-pastel-mint px-6 py-3 rounded-full shadow-lg">
        <p className="text-foreground font-medium text-sm md:text-base whitespace-nowrap">
          {message}
        </p>
      </div>
    </div>
  );
}
