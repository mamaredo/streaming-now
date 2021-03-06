# Frontend Architecture

- NextJS
- TypeScript
- Chakra UI

[ãã®ä» - package.json](https://github.com/mamaredo/streaming-now/blob/develop/frontend/package.json)

## Directory

> **ð åèã«ãã¦ããè¨äº, Repository**
>
> [bulletproof-react - repository](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)  
> [Reactãã¹ããã©ã¯ãã£ã¹ã®å®åº«ï¼ãbulletproof-reactããåå¼·ã«ãªããããä»¶ - zenn](https://zenn.dev/meijin/articles/bulletproof-react-is-best-architecture)

```sh
frontend/src
|
+-- components  # æå³ãæãããã³ã³ãã¼ãã³ã, UIã®æ±ç¨ã³ã³ãã¼ãã³ã
|
+-- config  # è¨­å®, ç°å¢å¤æ°ãªã©
|
+-- features  # ã¢ããªã±ã¼ã·ã§ã³ã®æ©è½
|
+-- hooks  # æ±ç¨çãªhooks
|
+-- lib  # ã¢ããªã±ã¼ã·ã§ã³åã§ã®library
|
+-- pages  # ãã¼ã¸
|
+-- styles  # å¨ä½ã«å½±é¿ãä¸ããstyle
|
+-- types  # å¨ä½ã§å®ç¾©ãã¦ããããTSã®å
|
+-- utils  # æ±ç¨çãªé¢æ°
```

å¤é¨moduleããã®å¼ã³åºãã¯aliasãç¨ããçµ¶å¯¾ãã¹  
åé¨moduleããã®å¼ã³åºãã¯ç¸å¯¾ãã¹

<br />

### src/components

```sh
components
|
+-- App  # å½¹å²ãæã£ãã¹ãã¼ãã¬ã¹ãªã³ã³ãã¼ãã³ã
+---- Footer.tsx
+---- index.ts  # App endpoint
|
+-- Elements  # æ±ç¨çã§ããã¹ãã¼ãã¬ã¹ãªã³ã³ãã¼ãã³ã
+---- CommonComponent
+------ CommonComponent.tsx
+------ index.ts
:
+---- index.ts # Elements endpoint
|
+-- OtherComponent  # ã¢ããªã±ã¼ã·ã§ã³å¨ä½ã«å½±é¿ããã¹ãã¼ãã¬ã¹ãªã³ã³ãã¼ãã³ã
+---- OtherComponent
+---- index.ts
```

- components/*ã§å®ç¾©ããã¦ããã³ã³ãã¼ãã³ãããfeaturesãå¼ã¶ãã¨ã¯ããªã

### å¤é¨moduleããã®å¼ã³åºã

```typescript
import { Footer } from '@/components/App'
import { CommonComponent } from '@/components/Elements'
import { OtherComponent } from '@/components/OtherComponent'
```

### component/Elements/index.ts

> **ð åèè³æ**
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

- featureã®ç²åº¦ã¯ãã®featureãåé¤ããã¨æ©è½ãç¡ããªããã©ããã§å¤æ­

### å¤é¨moduleããã®å¼ã³åºã

```typescript
import { AwesomeFeature, useAwesomeFeature } from '@/features/awesome-feature'
```

### features/awesome-feature/index.ts

> **ð åèè³æ**
> 
> [barrel - TypeScript Deep Dive](https://typescript-jp.gitbook.io/deep-dive/main-1/barrel)

```typescript
/* ãã®æ©è½(awesome-feature)ãå®ç¾ããããã«å¿è¦ãªmoduleãexport */
export * from './components/AwesomeFeature'
export * from './types'
```

featureãä»ã®featureãåæ¬ãããã¨ãã§ããããåæ¬ãããfeatureã¯å¤é¨moduleããã¯
ä½¿ããªãããã«ããã

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

- featureAã¯featureBãåæ¬ããæ©è½

### pages/Hoge.tsx

```typescript
import { FeatureA } from '@/features/featureA' // good
```

```typescript
import { FeatureB } from '@/features/featureB' // bad
```

ä¾å¤

- åã®import

```typescript
import type { FeatureB } from '@/features/featureB' // bad
```

<br />

### ESLintãç¨ããimportã®å¶é

```
// rulesã®ä¸­
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
