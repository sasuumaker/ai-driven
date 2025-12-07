'use client';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ progress, showLabel = true, className = '' }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-foreground-secondary">進捗</span>
          <span className="text-sm font-medium text-foreground">{clampedProgress}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pastel-mint to-pastel-green transition-all duration-500 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
