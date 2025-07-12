# Docker Tutorial - Next.js Todo App

このプロジェクトは、Dockerでコンテナ化されたNext.jsのTodoアプリケーションです。

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

## プロジェクト構成

- **`Dockerfile`**: Next.jsアプリケーションをビルドし、実行するための本番環境イメージを作成するマルチステージビルドファイルです。
- **`docker-compose.yml`**: `frontend`サービスを定義し、コンテナのビルド方法やポートマッピングを管理します。
- **`package.json`**: プロジェクトの依存関係とスクリプトが定義されています。

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
