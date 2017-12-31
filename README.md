# Utility Types
> Utility Types Library for TypeScript

- Thoroughly tested for type correctness
- No third-party dependencies
- Semantic Versioning
- Output separate bundles for different workflow needs (es5-commonjs, es5-module, jsnext)

# Table of Contents

## Utility Types
- [DiffKeys](#diffkeys)
- [OmitKeys](#omitkeys)
- [Diff](#diff)
- [Omit](#omit)
- [Overwrite](#overwrite)
- [Assign](#assign)

## Functional helpers
- [getReturnOfExpression](#getreturnofexpression)

---

## Utility Types

### DiffKeys
> `DiffKeys<K extends string, L extends string>`  
> Compare set of keys `K` and `L` and return a subset with a difference  

Usage:
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Diffed_Keys = DiffKeys<keyof Props, keyof Props2>;
// Expect: 'b' | 'c'
```

### OmitKeys
> `OmitKeys<K extends string, K2 extends K>`  
> From set of keys `K` subtract it's subset `K2`  

Usage:
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }

type Omitted_Keys = OmitKeys<keyof BaseProps, 'a'>;
// Expect: 'b' | 'c'
```

### Diff
> `Diff<T extends object, U extends object>`  
> From `T` remove intersecting properties with `U`  

Usage:
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Diffed_Props = Diff<BaseProps, Props>;
// Expect { b?: number | undefined, c: boolean }
```

### Omit
> `Omit<T extends object, K extends keyof T>`  
> From `T` remove a set of properties `K`  

Usage:
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }

type Omitted_Props = Omit<BaseProps, 'a'>;
// Expect: { b?: number | undefined, c: boolean }
```

### Overwrite
> `Overwrite<T extends object, U extends object>`  
> Replace intersecting properties from `U` to `T`  

Usage:
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Overwritten_Props = Overwrite<BaseProps, Props>;
// Expect: { a: number, b?: number | undefined, c: boolean }
```

### Assign
> `Assign<T extends object, U extends object>`  
> Copy and replace all properties from `U` to `T`  

Usage:
```ts
import { Assign } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Assigned_Props = Assign<BaseProps, Props>;
// Expect: { a: number, b?: number | undefined, c: boolean, d: number }
```

---

## Functional helpers

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
import { getReturnOfExpression } from 'utility-types';

const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = getReturnOfExpression(increment);
type INCREMENT = typeof returnOfIncrement; // { type: "INCREMENT"; }
```

---
MIT License

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
