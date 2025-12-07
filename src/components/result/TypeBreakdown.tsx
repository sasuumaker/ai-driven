'use client';

import { Card } from '@/components/common';
import { AxisResult } from '@/types';

interface TypeBreakdownProps {
  axisResults: AxisResult[];
}

const axisLabels: Record<string, { name: string; left: string; right: string }> = {
  EI: { name: 'エネルギーの方向', left: '外向型 (E)', right: '内向型 (I)' },
  SN: { name: '情報の取り方', left: '感覚型 (S)', right: '直観型 (N)' },
  TF: { name: '決断の仕方', left: '思考型 (T)', right: '感情型 (F)' },
  JP: { name: '生活のスタイル', left: '判断型 (J)', right: '知覚型 (P)' },
  AT: { name: 'アイデンティティ', left: '自己主張型 (A)', right: '慎重型 (T)' },
};

export function TypeBreakdown({ axisResults }: TypeBreakdownProps) {
  return (
    <Card variant="default" className="animate-fade-in">
      <h3 className="text-xl font-bold text-foreground mb-6 text-center">タイプ詳細</h3>

      <div className="space-y-6">
        {axisResults.map((result) => {
          const labels = axisLabels[result.axis];
          const isLeftPrimary = result.primary === result.axis[0];
          const leftPercentage = isLeftPrimary ? result.percentage : 100 - result.percentage;
          const rightPercentage = isLeftPrimary ? 100 - result.percentage : result.percentage;

          return (
            <div key={result.axis}>
              <div className="text-sm text-foreground-secondary mb-2">{labels.name}</div>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`w-24 text-right ${
                    isLeftPrimary ? 'font-bold text-foreground' : 'text-foreground-secondary'
                  }`}
                >
                  {labels.left}
                </span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-pastel-mint transition-all duration-500"
                    style={{ width: `${leftPercentage}%` }}
                  />
                  <div
                    className="h-full bg-pastel-lavender transition-all duration-500"
                    style={{ width: `${rightPercentage}%` }}
                  />
                </div>
                <span
                  className={`w-24 ${
                    !isLeftPrimary ? 'font-bold text-foreground' : 'text-foreground-secondary'
                  }`}
                >
                  {labels.right}
                </span>
              </div>
              <div className="flex justify-between text-xs text-foreground-secondary mt-1 px-26">
                <span>{leftPercentage}%</span>
                <span>{rightPercentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
