'use client';

interface ResultHeaderProps {
  type: string;
  nickname: string;
  color: string;
}

export function ResultHeader({ type, nickname, color }: ResultHeaderProps) {
  return (
    <div className="text-center mb-8 animate-scale-in">
      <div
        className="inline-block px-6 py-2 rounded-full text-lg font-bold mb-4"
        style={{ backgroundColor: color }}
      >
        {type}
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        あなたは「{nickname}」タイプ
      </h1>
    </div>
  );
}
