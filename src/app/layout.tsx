import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { QuizProvider } from '@/contexts/QuizContext';
import { AuthProvider } from '@/contexts/AuthContext';

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'AI職業診断 - あなたにぴったりのAI職業を見つけよう',
  description:
    'MBTI形式の診断であなたの性格タイプを分析し、AI時代にぴったりの職業を提案します。60問の質問に答えて、32種類のAI職業からあなたに最適なキャリアを発見しましょう。',
  keywords: ['AI', '職業診断', 'MBTI', 'キャリア', 'AI職業', '適職診断'],
  openGraph: {
    title: 'AI職業診断 - あなたにぴったりのAI職業を見つけよう',
    description:
      'MBTI形式の診断であなたの性格タイプを分析し、AI時代にぴったりの職業を提案します。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI職業診断',
    description: 'あなたにぴったりのAI職業を見つけよう',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased bg-black text-white`}>
        <AuthProvider>
          <QuizProvider>{children}</QuizProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
