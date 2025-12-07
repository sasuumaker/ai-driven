'use client';

import Image from 'next/image';
import { Card } from '@/components/common';
import { AIJob } from '@/types';
import { getJobImage } from '@/lib/jobImages';

interface JobCardProps {
  job: AIJob;
}

const prospectColors = {
  high: 'bg-pastel-mint text-foreground',
  medium: 'bg-pastel-yellow text-foreground',
  low: 'bg-pastel-coral text-foreground',
};

const prospectLabels = {
  high: '高い',
  medium: '中程度',
  low: '低い',
};

export function JobCard({ job }: JobCardProps) {
  const imageSrc = getJobImage(job.type);

  return (
    <Card variant="elevated" className="animate-fade-in overflow-hidden">
      {/* Job Image */}
      {imageSrc && (
        <div className="relative w-full aspect-square -mx-6 -mt-6 mb-6 bg-gray-50">
          <Image
            src={imageSrc}
            alt={job.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      <div className="text-center mb-6">
        <span className="text-sm text-foreground-secondary">あなたにぴったりのAI職業</span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 bg-gradient-to-r from-pastel-mint to-pastel-green bg-clip-text text-transparent">
          {job.name}
        </h2>
      </div>

      <p className="text-foreground-secondary leading-relaxed mb-6">{job.description}</p>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pastel-lavender flex items-center justify-center text-sm">
              1
            </span>
            必要スキル
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-pastel-blue/30 rounded-full text-sm text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pastel-lavender flex items-center justify-center text-sm">
              2
            </span>
            将来性
          </h3>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                prospectColors[job.futureProspect]
              }`}
            >
              {prospectLabels[job.futureProspect]}
            </span>
            <span className="text-sm text-foreground-secondary">
              {job.futureProspectDescription}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
