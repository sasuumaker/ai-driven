#!/bin/bash
# ==============================================================================
# AI職業診断アプリ - 初期化スクリプト
# ==============================================================================
# 各セッション開始時にこのスクリプトを実行して環境を復元します
# 使用方法: ./init.sh または source init.sh
# ==============================================================================

set -e

PROJECT_NAME="AI職業診断アプリ"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================"
echo "  $PROJECT_NAME - Environment Setup"
echo "========================================"

# 1. ディレクトリ確認
echo "[1/5] Checking project directory..."
if [ ! -f "$PROJECT_DIR/package.json" ]; then
    echo "ERROR: package.json not found. Are you in the right directory?"
    exit 1
fi
echo "  OK: Project directory confirmed"

# 2. 依存関係チェック
echo "[2/5] Checking dependencies..."
if [ ! -d "$PROJECT_DIR/node_modules" ]; then
    echo "  Installing dependencies..."
    npm install
else
    echo "  OK: Dependencies already installed"
fi

# 3. 環境変数チェック
echo "[3/5] Checking environment variables..."
if [ -f "$PROJECT_DIR/.env.local" ]; then
    echo "  OK: .env.local found"
elif [ -f "$PROJECT_DIR/.env" ]; then
    echo "  OK: .env found"
else
    echo "  WARNING: No .env file found. Create .env.local if needed."
fi

# 4. Git状態確認
echo "[4/5] Checking Git status..."
if [ -d "$PROJECT_DIR/.git" ]; then
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
    echo "  Branch: $BRANCH"
    echo "  Uncommitted changes: $UNCOMMITTED files"
else
    echo "  WARNING: Not a Git repository"
fi

# 5. 進捗ファイル確認
echo "[5/5] Checking progress files..."
if [ -f "$PROJECT_DIR/claude-progress.txt" ]; then
    echo "  OK: claude-progress.txt found"
    echo "  --- Last 5 lines ---"
    tail -5 "$PROJECT_DIR/claude-progress.txt" | sed 's/^/  /'
else
    echo "  WARNING: claude-progress.txt not found"
fi

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Review claude-progress.txt for previous session notes"
echo "  2. Check features.json for next task"
echo "  3. Run 'npm run dev' to start development server"
echo ""

# 開発サーバー起動オプション
read -p "Start development server? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting development server..."
    npm run dev
fi
