# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際の Claude Code (claude.ai/code) 向けガイダンスです。

## プロジェクト概要

- **プロジェクト名**: task-board
- **内容**: タスク管理アプリ。タスクの追加・完了切替・削除を行い、作業状況を管理できる Web アプリケーション。
- **技術スタック**: React 18 + Vite（後述の「技術スタック」を参照）

## デプロイ先

- 公開 URL: https://Dan-W1210.github.io/task-board/
- GitHub Pages で配信する。リポジトリのパス配下で公開されるため、Vite の `base` は `/task-board/` を指定する必要がある（ビルド時の資産参照パスが `/task-board/` 基準になる）。

## 技術スタック

- **フレームワーク**: React 18（関数コンポーネント + Hooks）
- **ビルドツール / 開発サーバー**: Vite 5（`@vitejs/plugin-react`）
- **言語**: JavaScript（JSX、`.jsx`）
- **パッケージマネージャ**: npm
- **状態の永続化**: ブラウザの `localStorage`（キー: `task-board.tasks`）
- **スタイル**: 素の CSS（`src/index.css`）。CSS 変数でカラーを管理。

## Git 運用ルール

- **コードを変更するたびに、必ず GitHub へプッシュする。**
  - 変更が一区切りついたら `git add` → `git commit` → `git push` を実施する。
  - コミットメッセージは変更内容が分かるように日本語で簡潔に記述する。
  - 作業を未コミット・未プッシュのまま放置しない。
- リモートリポジトリを基本（single source of truth）とし、ローカルの変更は速やかに反映する。

```bash
# 変更を反映する基本フロー
git add .
git commit -m "変更内容を簡潔に記述"
git push
```

## 開発環境

- React + Vite 構成。npm で依存を管理する。

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動（http://localhost:5173/ 既定）
npm run dev

# 本番ビルド / ビルド結果のプレビュー
npm run build
npm run preview
```

## ファイル構成

```
task-board/
├── index.html              # Vite のエントリ HTML（#root と main.jsx を読み込む）
├── package.json            # 依存・スクリプト定義
├── vite.config.js          # Vite 設定（@vitejs/plugin-react）
└── src/
    ├── main.jsx            # React のエントリポイント（createRoot）
    ├── App.jsx             # 状態管理（タスク配列）と localStorage 保存
    ├── index.css           # 全体スタイル
    └── components/
        ├── TaskInput.jsx   # タスク追加フォーム
        ├── TaskList.jsx    # タスク一覧の表示
        └── TaskItem.jsx    # タスク1件（完了切替・削除）
```

## 設計方針・コーディング規約

- **言語**: ユーザーへの返答・コメント・UI 文言は日本語を基本とする。
- **React**:
  - 関数コンポーネント + Hooks（`useState` / `useEffect`）で実装する。クラスコンポーネントは使わない。
  - 状態は親（`App.jsx`）で一元管理し、子へは props（データと更新用コールバック）で渡す（単方向データフロー）。
  - タスクのデータ（`id` / `title` / `done`）はオブジェクトの配列として保持し、表示ロジックと分離する。
- **CSS**: スタイルは CSS ファイルに集約し、インラインスタイルは避ける。カラーは CSS 変数（`:root`）で管理する。
- 新たな外部ライブラリの導入は事前に方針を確認する。

## コンポーネント命名規約

- **コンポーネント**: パスカルケース。ファイル名とコンポーネント名を一致させる（例: `TaskItem.jsx` → `TaskItem`）。1ファイル1コンポーネントを基本とし、`default export` する。
- **配置**: 画面エントリは `src/App.jsx`、再利用部品は `src/components/` 配下に置く。
- **props のコールバック**: `on` + 動詞 で命名する（例: `onAdd` / `onToggle` / `onDelete`）。
- **イベントハンドラ**: コンポーネント内の関数は `handle` + 対象（例: `handleSubmit`）。
- **CSS クラス**: BEM 風に `block__element--modifier` で命名し、コンポーネント単位で接頭辞を揃える（例: `task-item`, `task-item__title`, `task-item--done`）。
- **localStorage キー**: `task-board.` を接頭辞に付ける（例: `task-board.tasks`）。

## 主要機能

- タスクの追加（テキスト入力）
- 完了・未完了の切り替え（チェックボックス。完了タスクはグレー表示）
- タスクの削除
- タスクの永続化（localStorage。リロードしても保持される）
