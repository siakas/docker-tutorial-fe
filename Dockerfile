# ----------------- ステージ 1: ビルド環境 -----------------
# ベースイメージとしてNode.js v22 の軽量版(alpine)を使用
FROM node:22-alpine AS builder

# pnpmを有効にする
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 作業ディレクトリを /app に設定
WORKDIR /app

# package.json と pnpm-lock.yaml をコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# プロジェクトの全ファイルをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN pnpm build

# ----------------- ステージ 2: 本番環境 -----------------
# ベースイメージとして再度Node.js v22の軽量版を使用
FROM node:22-alpine

# pnpmを有効にする
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 作業ディレクトリを/appに設定
WORKDIR /app

# ビルドステージからビルド済みの Next.js アプリ(.next ディレクトリ)をコピー
# --chown=nextjs:nodejs オプションで、コピー先のファイルの所有者を nextjs ユーザーに変更
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# ビルドステージから node_modules をコピー
COPY --from=builder /app/node_modules ./node_modules

# ビルドステージから public ディレクトリをコピー
COPY --from=builder /app/public ./public

# ビルドステージから package.json をコピー
COPY --from=builder /app/package.json ./package.json

# Next.js が推奨する非 root ユーザーを作成・使用
# -s /bin/sh: シェルを指定
# -D: パスワードなしのシステムユーザーを作成
RUN addgroup -g 1001 -S nodejs
RUN adduser -s /bin/sh -D -G nodejs -u 1001 nextjs
USER nextjs

# ポート3000を公開
EXPOSE 3000

# 環境変数でポートを指定
ENV PORT 3000

# コンテナ起動時に実行するコマンド
CMD ["pnpm", "start"]
