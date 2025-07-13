# Docker Tutorial - Next.js Todo App

このプロジェクトは、Dockerでコンテナ化されたNext.jsのTodoアプリケーションです。リファクタリングにより、コンポーネントの分離、エラーハンドリング、アクセシビリティの改善が行われています。

## 🚀 新機能・改善点

### コンポーネント分離

- `TodoForm`: Todo追加フォーム
- `TodoItem`: 個別のTodoアイテム
- `TodoList`: Todoリスト表示
- `ErrorMessage`: エラーメッセージ表示

### エラーハンドリング

- バリデーション機能（文字数制限、最大数制限）
- エラーメッセージの自動表示・非表示
- カスタムエラークラス

### アクセシビリティ

- ARIA属性の追加
- キーボードナビゲーション対応
- スクリーンリーダー対応

### パフォーマンス最適化

- React.memoによるメモ化
- カスタムフックによるロジック分離

## 必須環境 (Prerequisites)

このアプリケーションを実行するには、お使いのマシンに以下のソフトウェアがインストールされている必要があります。

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (Docker Desktopには通常含まれています)

## 起動方法 (Usage)

このプロジェクトは、Docker Composeを使用して簡単に起動できます。

### 1. リポジトリのクローン

```bash
git clone https://github.com/siakas/docker-tutorial-fe.git
cd docker-tutorial-fe
```

### 2. コンテナのビルドと起動

以下のコマンドを実行して、Dockerイメージをビルドし、コンテナを起動します。

```bash
docker compose up --build
```

このコマンドは、`Dockerfile`を基にNext.jsアプリケーションのプロダクションビルドを作成し、最適化されたサーバーを起動します。

起動後、ブラウザで **[http://localhost:3000](http://localhost:3000)** にアクセスすると、アプリケーションが表示されます。

コンテナをバックグラウンドで起動したい場合は、`-d`フラグを追加してください。

```bash
docker compose up --build -d
```

## コンテナの停止方法

コンテナを停止するには、以下のコマンドを実行します。

```bash
# フォアグラウンドで起動した場合
# ターミナルで Ctrl + C を押す

# バックグラウンドで起動した場合
docker compose down
```

## 開発・テスト

### ローカル開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# リンティング
pnpm lint

# テスト実行
pnpm test
```

### テスト

```bash
# テスト実行
pnpm test

# ウォッチモードでテスト実行
pnpm test:watch
```

## プロジェクト構成

```
docker-tutorial-fe/
├── app/                    # Next.js App Router
├── components/             # 再利用可能なコンポーネント
│   ├── ui/                # UI基本コンポーネント
│   ├── TodoForm.tsx       # Todo追加フォーム
│   ├── TodoItem.tsx       # Todoアイテム
│   ├── TodoList.tsx       # Todoリスト
│   └── ErrorMessage.tsx   # エラーメッセージ
├── hooks/                 # カスタムフック
│   └── useTodoActions.ts  # Todo操作フック
├── lib/                   # ユーティリティ
│   ├── config.ts          # アプリケーション設定
│   ├── errors.ts          # エラークラス
│   └── utils.ts           # 共通ユーティリティ
├── stores/                # 状態管理
│   └── TodoStore.ts       # Zustandストア
├── types/                 # TypeScript型定義
│   └── todo.ts            # Todo関連の型
├── __tests__/             # テストファイル
├── Dockerfile             # Docker設定
├── docker-compose.yml     # Docker Compose設定
└── package.json           # プロジェクト設定
```

## 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **状態管理**: Zustand
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: Radix UI
- **テスト**: Jest + Testing Library
- **コンテナ化**: Docker + Docker Compose

## (参考) ローカルでの開発

Dockerを使わずに、ローカルのNode.js環境で開発を行うことも可能です。

1.  **依存関係のインストール**
    ```bash
    # pnpmを使用する場合
    pnpm install
    ```
2.  **開発サーバーの起動**
    ```bash
    pnpm dev
    ```
    これにより、ホットリロードが有効な開発サーバーが起動します。
