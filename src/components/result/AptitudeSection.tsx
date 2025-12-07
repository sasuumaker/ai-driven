'use client';

import { Card } from '@/components/common';
import { Aptitudes } from '@/types';

interface AptitudeSectionProps {
  aptitudes: Aptitudes;
}

export function AptitudeSection({ aptitudes }: AptitudeSectionProps) {
  return (
    <Card variant="default" className="animate-fade-in">
      <h3 className="text-xl font-bold text-foreground mb-6 text-center">あなたの適性</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="text-xl">💪</span>
            あなたの強み
          </h4>
          <ul className="space-y-2">
            {aptitudes.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-pastel-mint mt-2 flex-shrink-0" />
                <span className="text-foreground-secondary">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            向いている仕事スタイル
          </h4>
          <ul className="space-y-2">
            {aptitudes.workStyles.map((style, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-pastel-lavender mt-2 flex-shrink-0" />
                <span className="text-foreground-secondary">{style}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
