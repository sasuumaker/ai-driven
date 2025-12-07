'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Header, ProgressBar, Button, Card } from '@/components/common';
import { QuestionRow } from '@/components/quiz';
import { useQuiz } from '@/contexts/QuizContext';
import { Question, Axis } from '@/types';

const QUESTIONS_PER_PAGE = 10;

export default function QuizPage() {
  const router = useRouter();
  const {
    state,
    questions,
    getAnswerForQuestion,
    calculateResult,
  } = useQuiz();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageAnswers, setPageAnswers] = useState<Record<number, number>>({});
  const [allAnswers, setAllAnswers] = useState<Record<number, { axis: Axis; value: number; direction: string }>>({});
  const [showExitWarning, setShowExitWarning] = useState(false);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const currentQuestions = useMemo(() => {
    const start = currentPage * QUESTIONS_PER_PAGE;
    const end = start + QUESTIONS_PER_PAGE;
    return questions.slice(start, end);
  }, [questions, currentPage]);

  const progress = useMemo(() => {
    const answeredCount = Object.keys(allAnswers).length;
    return Math.round((answeredCount / questions.length) * 100);
  }, [allAnswers, questions.length]);

  const isPageComplete = useMemo(() => {
    return currentQuestions.every((q) => pageAnswers[q.id] !== undefined);
  }, [currentQuestions, pageAnswers]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(allAnswers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [allAnswers]);

  useEffect(() => {
    const initialAnswers: Record<number, number> = {};
    currentQuestions.forEach((q) => {
      if (allAnswers[q.id] !== undefined) {
        const stored = allAnswers[q.id];
        initialAnswers[q.id] = q.direction === 'positive' ? stored.value : -stored.value;
      }
    });
    setPageAnswers(initialAnswers);
  }, [currentPage, currentQuestions, allAnswers]);

  const handleAnswer = (questionId: number, value: number) => {
    setPageAnswers((prev) => ({ ...prev, [questionId]: value }));

    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const adjustedValue = question.direction === 'positive' ? value : -value;
      setAllAnswers((prev) => ({
        ...prev,
        [questionId]: {
          axis: question.axis,
          value: adjustedValue,
          direction: question.direction,
        },
      }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const answers = Object.entries(allAnswers).map(([id, data]) => ({
        questionId: parseInt(id),
        axis: data.axis,
        value: data.value,
      }));

      const result = calculateResultFromAnswers(answers);
      router.push(`/result/${result.type}`);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowExitWarning(true);
    }
  };

  const handleExitConfirm = () => {
    router.push('/');
  };

  const calculateResultFromAnswers = (answers: { questionId: number; axis: Axis; value: number }[]) => {
    const axisScores: Record<Axis, number[]> = {
      EI: [],
      SN: [],
      TF: [],
      JP: [],
      AT: [],
    };

    answers.forEach((a) => {
      axisScores[a.axis].push(a.value);
    });

    const calculateAxis = (axis: Axis): { primary: string; percentage: number } => {
      const scores = axisScores[axis];
      const total = scores.reduce((sum, v) => sum + v, 0);
      const max = scores.length * 2;
      const normalized = (total + max) / (max * 2);
      const percentage = Math.round(normalized * 100);

      const pairs: Record<Axis, [string, string]> = {
        EI: ['E', 'I'],
        SN: ['S', 'N'],
        TF: ['T', 'F'],
        JP: ['J', 'P'],
        AT: ['A', 'T'],
      };

      const [first, second] = pairs[axis];
      return {
        primary: percentage >= 50 ? first : second,
        percentage: percentage >= 50 ? percentage : 100 - percentage,
      };
    };

    const ei = calculateAxis('EI');
    const sn = calculateAxis('SN');
    const tf = calculateAxis('TF');
    const jp = calculateAxis('JP');
    const at = calculateAxis('AT');

    const type = `${ei.primary}${sn.primary}${tf.primary}${jp.primary}-${at.primary}`;

    return { type };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-secondary">
      <Header />

      <main className="flex-1 flex flex-col px-4 py-8">
        <div className="max-w-3xl mx-auto w-full">
          {/* Progress Section */}
          <div className="mb-6">
            <ProgressBar progress={progress} />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-foreground-secondary">
                {Object.keys(allAnswers).length} / {questions.length} 問完了
              </p>
              <p className="text-sm font-medium text-foreground">
                ページ {currentPage + 1} / {totalPages}
              </p>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-4 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-mint/30 rounded-full">
              <span className="text-sm font-medium text-foreground">
                Q{currentPage * QUESTIONS_PER_PAGE + 1} - Q{Math.min((currentPage + 1) * QUESTIONS_PER_PAGE, questions.length)}
              </span>
            </div>
          </div>

          {/* Scale Legend */}
          <Card variant="default" className="mb-4 py-3">
            <div className="flex items-center justify-center gap-4 text-xs text-foreground-secondary">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pastel-mint" />
                <span>同意</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span>中立</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-pastel-lavender" />
                <span>反対</span>
              </div>
            </div>
          </Card>

          {/* Questions */}
          <Card variant="elevated" className="mb-6">
            {currentQuestions.map((question, index) => (
              <QuestionRow
                key={question.id}
                questionNumber={currentPage * QUESTIONS_PER_PAGE + index + 1}
                questionText={question.text}
                selectedValue={pageAnswers[question.id] ?? null}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            ))}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            <Button variant="ghost" onClick={handlePrev} className="gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {currentPage === 0 ? 'トップに戻る' : '前へ'}
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isPageComplete}
              className="gap-2"
            >
              {currentPage === totalPages - 1 ? '結果を見る' : '次へ'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Page Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentPage
                    ? 'bg-pastel-mint'
                    : i < currentPage
                    ? 'bg-pastel-green/50'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Exit Warning Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-scale-in">
            <h3 className="text-lg font-bold text-foreground mb-2">
              診断を中断しますか？
            </h3>
            <p className="text-foreground-secondary mb-6">
              現在の回答は保存されません。
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowExitWarning(false)}
              >
                続ける
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleExitConfirm}
              >
                中断する
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
