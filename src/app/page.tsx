'use client';

import Link from 'next/link';
import { Button, Header } from '@/components/common';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-mint/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-pastel-mint animate-pulse" />
              <span className="text-sm text-foreground-secondary">60問 / 約10分</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              あなたにぴったりの
              <br />
              <span className="bg-gradient-to-r from-pastel-mint to-pastel-green bg-clip-text text-transparent">
                AI職業
              </span>
              を見つけよう
            </h1>

            <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
              MBTI形式の性格診断で、AI時代に活躍できる
              <br className="hidden md:block" />
              あなたにぴったりの職業を提案します
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-4 rounded-2xl bg-pastel-mint/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-foreground mb-1">32種類の職業</h3>
              <p className="text-sm text-foreground-secondary">MBTIタイプに基づいた最適なAI職業を提案</p>
            </div>

            <div className="p-4 rounded-2xl bg-pastel-lavender/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-foreground mb-1">詳細な分析</h3>
              <p className="text-sm text-foreground-secondary">5つの軸であなたの性格を深く分析</p>
            </div>

            <div className="p-4 rounded-2xl bg-pastel-peach/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-foreground mb-1">将来性も表示</h3>
              <p className="text-sm text-foreground-secondary">各職業の将来性と必要スキルも紹介</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/quiz">
              <Button size="lg" className="text-lg px-12">
                診断を始める
              </Button>
            </Link>
          </div>

          {/* Note */}
          <p className="mt-8 text-sm text-foreground-secondary animate-fade-in" style={{ animationDelay: '0.5s' }}>
            ※ 診断結果は参考情報です。実際のキャリア選択は様々な要素を考慮してください。
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-foreground-secondary">
        <p>AI職業診断 &copy; 2024</p>
      </footer>
    </div>
  );
}
