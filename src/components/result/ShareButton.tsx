'use client';

import { Button } from '@/components/common';

interface ShareButtonProps {
  type: string;
  jobName: string;
  nickname: string;
}

export function ShareButton({ type, jobName, nickname }: ShareButtonProps) {
  const handleShare = () => {
    const text = `AI職業診断の結果、私は【${jobName}】でした！\nタイプ: ${type}（${nickname}）\n\n#AI職業診断 #MBTI`;
    const url = typeof window !== 'undefined' ? window.location.href : '';

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;

    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button onClick={handleShare} variant="primary" size="lg" className="gap-2">
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Xでシェアする
    </Button>
  );
}
