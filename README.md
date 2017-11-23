# React / Redux / TypeScript Utils
> Utility belt for React + Redux + TypeScript Projects

- Semantic Versioning
- Output separate bundles for your specific workflow needs:
  - ES5 + CommonJS - `main`
  - ES5 + ES-Modules - `module` 
  - ES2015 + CommonJS - `jsnext:main`

# Table of Contents (v3.0)

## TS Redux Actions
> For advanced docs check here: https://github.com/piotrwitek/ts-redux-actions
- [createAction](#createaction)

## Mapped Types
- [Diff](#diff)
- [Omit](#omit)
- [Overwrite](#overwrite)

## Type Utils
- [getReturnOfExpression](#getreturnofexpression)

---

Archived docs:
- [Docs v2.X](#READMEv2.0.md)

---

## TS Redux Actions

### createAction
> https://github.com/piotrwitek/ts-redux-actions#createaction

```ts
createAction(typeString, creatorFunction?)
typeString: TS extends string,
creatorFunction: (...args: any[]) => { type: TS, payload?: P, meta?: M, error?: boolean }
return: (
  (...args: any[]) => { type: TS, payload?: P, meta?: M, error?: boolean }
) & { readonly type: TS }
```

---

## Mapped Types

### KeyDiff<T extends string, U extends string>
```ts
// KeyDiffTest expect: 'a' | 'b'
type KeyDiffTest =
  KeyDiff<'a' | 'b' | 'c', 'c' | 'd'>;
```

### Omit<T, K extends keyof T>
```ts
// OmitTest expect: { b?: number | undefined, c: boolean }
type OmitTest =
  Omit<{ a: string, b?: number, c: boolean }, 'a'>;
```

### Minus<T, U>
```ts
// MinusTest expect { b?: number | undefined, c: boolean }
type MinusTest =
  Minus<{ a: string, b?: number, c: boolean }, { a: any }>;
```

### Overwrite<T, U>
```ts
// OverwriteTest expect: { b?: number | undefined, c: boolean } & { a: number }
type OverwriteTest =
  Overwrite<{ a: string, b?: number, c: boolean }, { a: number }>;
```

---

## Type Utils

### getReturnOfExpression
> Get return value of an "expression" with inferred return type  
> alias: returntypeof  
https://github.com/Microsoft/TypeScript/issues/6606

```ts
// this polyfill exist because TypeScript does not support getting type of expression 
// (tracking issue: https://github.com/Microsoft/TypeScript/issues/6606)
function getReturnOfExpression<T>(
  expression: (...params: any[]) => T,
): T;

// Example:
import { getReturnOfExpression } from 'react-redux-typescript';

const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = getReturnOfExpression(increment);
type INCREMENT = typeof returnOfIncrement; // { type: "INCREMENT"; }
```

---
MIT License

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
