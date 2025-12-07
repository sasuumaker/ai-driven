'use client';

interface AnswerOptionsProps {
  selectedValue: number | null;
  onSelect: (value: number) => void;
  compact?: boolean;
}

const options = [
  { value: 2, size: 'w-12 h-12 md:w-14 md:h-14' },
  { value: 1, size: 'w-10 h-10 md:w-12 md:h-12' },
  { value: 0, size: 'w-8 h-8 md:w-10 md:h-10' },
  { value: -1, size: 'w-10 h-10 md:w-12 md:h-12' },
  { value: -2, size: 'w-12 h-12 md:w-14 md:h-14' },
];

export function AnswerOptions({ selectedValue, onSelect, compact = false }: AnswerOptionsProps) {
  const getButtonColor = (value: number, isSelected: boolean) => {
    if (!isSelected) return 'bg-gray-200 hover:bg-gray-300';

    if (value > 0) return 'bg-pastel-mint';
    if (value < 0) return 'bg-pastel-lavender';
    return 'bg-gray-400';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-2 md:gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`
              ${compact ? 'w-8 h-8 md:w-10 md:h-10' : option.size}
              rounded-full
              transition-all duration-200
              ${getButtonColor(option.value, selectedValue === option.value)}
              ${selectedValue === option.value ? 'ring-2 ring-foreground ring-offset-2 scale-110' : 'hover:scale-105'}
            `}
            aria-label={`${option.value > 0 ? '同意' : option.value < 0 ? '反対' : '中立'}`}
          />
        ))}
      </div>
      {!compact && (
        <div className="flex justify-between w-full max-w-xs text-xs text-foreground-secondary mt-1">
          <span>同意</span>
          <span>反対</span>
        </div>
      )}
    </div>
  );
}
