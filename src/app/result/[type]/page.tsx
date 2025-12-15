'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header, Button } from '@/components/common';
import {
  ResultHeader,
  JobCard,
  AptitudeSection,
  TypeBreakdown,
  ShareButton,
} from '@/components/result';
import { SaveResultButton } from '@/components/auth/SaveResultButton';
import { useQuiz } from '@/contexts/QuizContext';
import { AIJob, MBTITypeInfo, IdentityInfo, AxisResult, MBTICode, Identity } from '@/types';
import jobsData from '@/data/jobs.json';
import typesData from '@/data/types.json';

interface ResultPageProps {
  params: Promise<{ type: string }>;
}

export default function ResultPage({ params }: ResultPageProps) {
  const { type } = use(params);
  const router = useRouter();
  const { state, calculateResult, resetQuiz } = useQuiz();
  const [axisResults, setAxisResults] = useState<AxisResult[] | null>(null);

  const decodedType = decodeURIComponent(type);
  const job = (jobsData.jobs as Record<string, AIJob>)[decodedType];

  const mbtiCode = decodedType.split('-')[0] as MBTICode;
  const identity = decodedType.split('-')[1] as Identity;

  const typeInfo = (typesData.types as Record<MBTICode, MBTITypeInfo>)[mbtiCode];
  const identityInfo = (typesData.identities as Record<Identity, IdentityInfo>)[identity];

  useEffect(() => {
    if (state.answers.length > 0) {
      const result = calculateResult();
      setAxisResults(result.axisResults);
    }
  }, [state.answers, calculateResult]);

  const handleRetry = () => {
    resetQuiz();
    router.push('/quiz');
  };

  if (!job || !typeInfo || !identityInfo) {
    return (
      <div className="min-h-screen flex flex-col bg-background-secondary">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              結果が見つかりません
            </h1>
            <p className="text-foreground-secondary mb-6">
              無効なタイプです。診断をやり直してください。
            </p>
            <Link href="/">
              <Button>トップに戻る</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-secondary">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Result Header */}
          <ResultHeader
            type={decodedType}
            nickname={typeInfo.nickname}
            color={typeInfo.color}
          />

          {/* Job Card */}
          <JobCard job={job} />

          {/* Aptitude Section */}
          <AptitudeSection aptitudes={job.aptitudes} />

          {/* Type Breakdown */}
          {axisResults && <TypeBreakdown axisResults={axisResults} />}

          {/* Type Description */}
          <div className="bg-white rounded-2xl p-6 shadow-md animate-fade-in">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {typeInfo.nickname}タイプとは
            </h3>
            <p className="text-foreground-secondary leading-relaxed mb-4">
              {typeInfo.description}
            </p>
            <div className="inline-block px-4 py-2 bg-pastel-lavender/30 rounded-full">
              <span className="text-sm text-foreground">
                <strong>{identityInfo.name}</strong>: {identityInfo.description}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            {/* Save Button */}
            {axisResults && (
              <SaveResultButton
                mbtiType={decodedType}
                jobName={job.name}
                axisResults={axisResults}
              />
            )}

            {/* Share and Retry Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShareButton
                type={decodedType}
                jobName={job.name}
                nickname={typeInfo.nickname}
              />
              <Button variant="outline" onClick={handleRetry}>
                もう一度診断する
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-foreground-secondary">
        <p>AI職業診断 &copy; 2024</p>
      </footer>
    </div>
  );
}
