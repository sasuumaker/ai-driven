'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
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

interface ResultContentProps {
  type: string;
  initialUser: User | null;
}

export function ResultContent({ type, initialUser }: ResultContentProps) {
  const router = useRouter();
  const { state, calculateResult, resetQuiz } = useQuiz();
  const [axisResults, setAxisResults] = useState<AxisResult[] | null>(null);

  // サーバーから渡されたユーザー情報を使用
  const isLoggedIn = !!initialUser;

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
        <Header initialUser={initialUser} />
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
      <Header initialUser={initialUser} />

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

          {/* ログイン状態によるコンテンツ表示制御 */}
          <div className="relative">
            {/* ブラー効果付きコンテンツ（未ログイン時） */}
            <div className={`space-y-8 ${!isLoggedIn ? 'blur-sm pointer-events-none select-none' : ''}`}>
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
            </div>

            {/* ログインを促すオーバーレイ（未ログイン時のみ表示） */}
            {!isLoggedIn && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center max-w-sm mx-4">
                  <div className="mb-4">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-pastel-mint/30 flex items-center justify-center">
                      <span className="text-2xl">🔓</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      詳細な診断結果を見る
                    </h3>
                    <p className="text-sm text-foreground-secondary">
                      無料登録で全ての情報が閲覧できます
                    </p>
                  </div>

                  <div className="flex flex-col gap-[30px]">
                    <Link href={`/login?next=/result/${encodeURIComponent(decodedType)}`} className="block">
                      <Button className="w-full">
                        ログイン
                      </Button>
                    </Link>
                    <Link href={`/signup?next=/result/${encodeURIComponent(decodedType)}`} className="block">
                      <Button variant="outline" className="w-full">
                        新規登録（無料）
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 pt-4">
            {/* Save Button (ログイン時のみ) */}
            {isLoggedIn && axisResults && (
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
