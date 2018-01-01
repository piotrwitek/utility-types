# Utility Types
## Utility Types for TypeScript inspired by [Flow](https://flow.org)
(_Compatible with TS v2.6.2_)

## Goals
- provide set of consistent Utility Types based on [Set Theory](https://en.wikipedia.org/wiki/Set_theory) that are idiomatic and complementary to existing [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- port all of [Flow's Utility Types](https://flow.org/en/docs/types/utilities/) that are currently possible to implement in TypeScript
- clean idiomatic implementation based on composition of smaller generic types that are easy to understand and learn how these type operations works

## Motivation

The primary goal of this library is to provide a set of consistent Utility Types based on [Set Theory](https://en.wikipedia.org/wiki/Set_theory) that should be complementary to existing set of [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) and that should be idiomatic to use.

The secondary goal is to port [Flow's Utility Types](https://flow.org/en/docs/types/utilities/) to TypeScript.
[Flow](https://flow.org) and [TypeScript](https://typescriptlang.org) have a lot in common. I hope that by using this library you'll be able to become more familiar with "Flow" API and also extend your type level toolbelt for your "TypeScript" projects.

I believe this solution will help developers transition between "Flow" and "TypeScript" projects much easier from both sides and also make the refactoring of such codebases a smaller effort in case that you might decide in the future to switch from one to another.

- Thoroughly tested for type correctness
- No third-party dependencies
- Semantic Versioning
- Output separate bundles for different workflow needs (es5-commonjs, es5-module, jsnext)

# Table of Contents

## Mapped Types
- [SetDifference](#setdifference)
- [SetComplement](#setcomplement)
- [SymmetricDifference](#symmetricdifference)
- [Omit](#omit)
- [Diff](#diff)
- [Subtract](#subtract)
- [Overwrite](#overwrite)
- [Assign](#assign)

## Utility Types

## Functional helpers
- [$call](#call)

---

## Mapped Types

### DiffKeys
`DiffKeys<K extends string, L extends string>`  
Compare set of keys `K` and `L` and return a subset with a difference  

**Usage:**
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Diffed_Keys = DiffKeys<keyof Props, keyof Props2>;
// Expect: 'b' | 'c'
```

### OmitKeys
`OmitKeys<K extends string, K2 extends K>`  
From set of keys `K` subtract it's subset `K2`  

**Usage:**
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }

type Omitted_Keys = OmitKeys<keyof BaseProps, 'a'>;
// Expect: 'b' | 'c'
```

### Diff
`Diff<T extends object, U extends object>`  
From `T` remove intersecting properties with `U`  

**Usage:**
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Diffed_Props = Diff<BaseProps, Props>;
// Expect { b?: number | undefined, c: boolean }
```

### Omit
`Omit<T extends object, K extends keyof T>`  
From `T` remove a set of properties `K`  

**Usage:**
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }

type Omitted_Props = Omit<BaseProps, 'a'>;
// Expect: { b?: number | undefined, c: boolean }
```

### Overwrite
`Overwrite<T extends object, U extends object>`  
Replace intersecting properties from `U` to `T`  

**Usage:**
```ts
import { OmitKeys } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Overwritten_Props = Overwrite<BaseProps, Props>;
// Expect: { a: number, b?: number | undefined, c: boolean }
```

### Assign
`Assign<T extends object, U extends object>`  
Copy and replace all properties from `U` to `T`  

**Usage:**
```ts
import { Assign } from 'utility-types';

interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

type Assigned_Props = Assign<BaseProps, Props>;
// Expect: { a: number, b?: number | undefined, c: boolean, d: number }
```

---

## Utility Types

---

## Functional helpers

### $call
`function $call<T>(expression: (...params: any[]) => T): T;`  
Infer the return type from a given "expression" (at runtime it's equivalent of "noop")  
Alias: `getReturnOfExpression`  

**Usage:**
> **WARNING**: `$call` function must work on a runtime level as opposed to Flow where it works on a type level. The current limitation exist due to TypeScript not supporting calling expressions on a type level, check this issue for more details: [#6606](https://github.com/Microsoft/TypeScript/issues/6606) 
```ts
import { $call } from 'utility-types';

const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = $call(increment);
type IncrementAction = typeof returnOfIncrement; // { type: "INCREMENT"; }
```

---
MIT License

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
