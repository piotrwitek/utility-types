# React / Redux / TypeScript Utils
> Redux helpers for Type-safety (action types, action creators, reducers)
- Semantic Versioning
- No external dependencies
- 100% test coverage
- output es5 and es6 bundles

## Table of Contents (v3.0)

### Redux Utils

### Mapped Types
- [Diff](#diff)
- [Omit](#omit)
- [Overwrite](#overwrite)

### Types Utils
- [getReturnOfExpression](#getreturnofexpression)

> [Docs v2.X](/READMEv2.0.md)

---

### Redux Utils

```ts


```

---

### Mapped Types

#### Diff
```ts
// TestDiff expects: ('a' | 'b')
type TestDiff = Diff<'a' | 'b' | 'c', 'c' | 'd'>;
```

#### Omit
```ts
// TestOmit expects: { b: number, c: boolean }
type TestOmit = Omit<{ a: string, b: number, c: boolean }, 'a'>;
```

#### Overwrite
```ts
// TestOverwrite expects: { b: number, c: boolean } & { a: number }
type TestOverwrite = Overwrite<{ a: string, b: number, c: boolean }, { a: number }>;
```

---

### Types Utils

#### getReturnOfExpression
> Get return value of an "expression" with inferred return type  
> alias: returntypeof  
https://github.com/Microsoft/TypeScript/issues/6606

```ts
// this polyfill exist because TypeScript does not support getting type of expression 
// (tracking issue: https://github.com/Microsoft/TypeScript/issues/6606)
export function getReturnOfExpression<RT>(
  expression: (...params: any[]) => RT,
): RT {
  return null as any as RT;
}

// Example:
import { getReturnOfExpression } from 'react-redux-typescript';

const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = getReturnOfExpression(increment);
type INCREMENT = typeof returnOfIncrement; // { type: "INCREMENT"; }
```

---
MIT License

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
