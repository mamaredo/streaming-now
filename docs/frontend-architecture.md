# Frontend Architecture

- NextJS
- TypeScript
- Chakra UI

[その他 - package.json](https://github.com/mamaredo/streaming-now/blob/develop/frontend/package.json)

## Directory

> **📘 参考にしている記事, Repository**
>
> [bulletproof-react - repository](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)  
> [Reactベストプラクティスの宝庫！「bulletproof-react」が勉強になりすぎる件 - zenn](https://zenn.dev/meijin/articles/bulletproof-react-is-best-architecture)

```sh
frontend/src
|
+-- components  # 意味を持たせたコンポーネント, UIの汎用コンポーネント
|
+-- config  # 設定, 環境変数など
|
+-- features  # アプリケーションの機能
|
+-- hooks  # 汎用的なhooks
|
+-- lib  # アプリケーション内でのlibrary
|
+-- pages  # ページ
|
+-- styles  # 全体に影響を与えるstyle
|
+-- types  # 全体で定義しておきたいTSの型
|
+-- utils  # 汎用的な関数
```

外部moduleからの呼び出しはaliasを用いた絶対パス  
内部moduleからの呼び出しは相対パス

<br />

### src/components

```sh
components
|
+-- App  # 役割を持ったステートレスなコンポーネント
+---- Footer.tsx
+---- index.ts  # App endpoint
|
+-- Elements  # 汎用的でありステートレスなコンポーネント
+---- CommonComponent
+------ CommonComponent.tsx
+------ index.ts
:
+---- index.ts # Elements endpoint
|
+-- OtherComponent  # アプリケーション全体に影響するステートレスなコンポーネント
+---- OtherComponent
+---- index.ts
```

- components/*で定義されているコンポーネントからfeaturesを呼ぶことはしない

### 外部moduleからの呼び出し

```typescript
import { Footer } from '@/components/App'
import { CommonComponent } from '@/components/Elements'
import { OtherComponent } from '@/components/OtherComponent'
```

### component/Elements/index.ts

> **📘 参考資料**
> 
> [barrel - TypeScript Deep Dive](https://typescript-jp.gitbook.io/deep-dive/main-1/barrel)

```typescript
export * from './CommonComponent'
export * from './Hoge'
```

<br />

***

<br />

### src/features

```sh
src/features
|
+-- awesome-feature
|
+-- hoge-hoge
:
```

```sh
awesome-feature
|
+-- assets
|
+-- api
|
+-- components
|
+-- hooks
|
+-- types
|
+-- index.ts  # feature endpoint
```

- featureの粒度はそのfeatureを削除すると機能が無くなるかどうかで判断

### 外部moduleからの呼び出し

```typescript
import { AwesomeFeature, useAwesomeFeature } from '@/features/awesome-feature'
```

### features/awesome-feature/index.ts

> **📘 参考資料**
> 
> [barrel - TypeScript Deep Dive](https://typescript-jp.gitbook.io/deep-dive/main-1/barrel)

```typescript
/* その機能(awesome-feature)を実現するために必要なmoduleをexport */
export * from './components/AwesomeFeature'
export * from './types'
```

featureが他のfeatureを包括することもできるが、包括されたfeatureは外部moduleからは
使わないようにする。

### example

```sh
src
|
+-- features
+---- featureA
+---- featureB
:
|
+-- pages
+---- Hoge.tsx
```

- featureAはfeatureBを包括した機能

### pages/Hoge.tsx

```typescript
import { FeatureA } from '@/features/featureA' // good
```

```typescript
import { FeatureB } from '@/features/featureB' // bad
```

例外

- 型のimport

```typescript
import type { FeatureB } from '@/features/featureB' // bad
```

<br />

### ESLintを用いたimportの制限

```
// rulesの中
"no-restricted-imports": [
  "error",
  {
    patterns: [
      /* @/components */
      "@/components/*/*",
      "!@/components/*",

      /* @/features */
      "@/features/*/*"
    ]
  }
],
```
