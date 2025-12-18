'use client';

import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { AuthButton } from '@/components/auth/AuthButton';

interface HeaderProps {
  initialUser?: User | null;
}

export function Header({ initialUser }: HeaderProps) {
  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-mint to-pastel-green flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="font-bold text-lg text-foreground group-hover:text-pastel-mint transition-colors">
            AI職業診断
          </span>
        </Link>
        <AuthButton initialUser={initialUser} />
      </div>
    </header>
  );
}
