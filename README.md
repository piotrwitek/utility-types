# React / Redux / TypeScript Utils
> Utility belt for React + Redux + TypeScript Projects

- Semantic Versioning
- Output separate bundles for your specific workflow needs:
  - ES5 + CommonJS - `main`
  - ES5 + ES-Modules - `module` 
  - ES2015 + CommonJS - `jsnext:main`

# Table of Contents (v3.0)

## Redux Actions Utils
> For advanced docs check here: https://github.com/piotrwitek/ts-redux-actions
- [createAction](#createaction)

## Mapped Types
- [DiffKeys](#diffkeys)
- [OmitKeys](#omitkeys)
- [Diff](#diff)
- [Omit](#omit)
- [Overwrite](#overwrite)
- [Assign](#assign)

## Type Utils
- [getReturnOfExpression](#getreturnofexpression)

---

Archived docs:
- [Docs v2.X](#READMEv2.0.md)

---

## Redux Actions Utils

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

### DiffKeys
> Return a difference of non-related string literal unions
```ts
type DiffKeys<T extends string, U extends string>
```

Usage:
```ts
interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Diffed_Keys = DiffKeys<keyof Props, keyof Props2>;
// Expect: 'b' | 'c'
```

### OmitKeys
> Omit part of string literal union with constraint to existing literals
```ts
type OmitKeys<T extends string, U extends T>
```

Usage:
```ts
interface BaseProps { a: string, b?: number, c: boolean }

type Omitted_Keys = OmitKeys<keyof BaseProps, 'a'>;
// Expect: 'b' | 'c'
```

### Diff
> Return an object containing non-intersecting properties of non-related objects
```ts
type Diff<T extends object, U extends object>
```

Usage:
```ts
interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Diffed_Props = Diff<BaseProps, Props>;
// Expect { b?: number | undefined, c: boolean }
```

### Omit
> Omit object property with constraint to existing keys
```ts
type Omit<T extends object, K extends keyof T>
```

Usage:
```ts
interface BaseProps { a: string, b?: number, c: boolean }

type Omitted_Props = Omit<BaseProps, 'a'>;
// Expect: { b?: number | undefined, c: boolean }
```

### Overwrite
> Overwrite intersecting properties from <U> to <T>
```ts
type Overwrite<T extends object, U extends object>
```

Usage:
```ts
interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Overwritten_Props = Overwrite<BaseProps, Props>;
// Expect: { a: number, b?: number | undefined, c: boolean }
```

### Assign
> Assign properties from <U> to <T> (overwrite intersecting)
```ts
type Assign<T extends object, U extends object>
```

Usage:
```ts
interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Assigned_Props = Assign<BaseProps, Props>;
// Expect: { a: number, b?: number | undefined, c: boolean, d: number }
```

---

## Type Utils

### getReturnOfExpression
> Get return value of an "expression" with inferred return type  
Alias: `returntypeof`
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
