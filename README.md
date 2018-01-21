# utility-types
## Utility Types for TypeScript inspired by [Flow](https://flow.org)
(_Compatible with TS v2.6.2_)

## Goals
- provide set of consistent Utility Types based on [Set Theory](https://en.wikipedia.org/wiki/Set_theory) that are idiomatic and complementary to existing [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- port all of [Flow's Utility Types](https://flow.org/en/docs/types/utilities/) that are currently possible to implement in TypeScript
- clean idiomatic implementation based on composition of smaller generic types that are easy to understand and learn how these type operations works

## Motivation

The primary goal of this library is to provide a set of Utility Types (loosely based on [Set Theory](https://en.wikipedia.org/wiki/Set_theory))that should complement existing set of [Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) and that are proven usefull in common use cases.

The secondary goal is to port [Flow's Utility Types](https://flow.org/en/docs/types/utilities/) to TypeScript.
[Flow](https://flow.org) and [TypeScript](https://typescriptlang.org) have a lot in common. I hope that by using this library TypeScript Developers will be able to become more familiar with "Flow" API while also extend their type level toolbelt.

I hope that this solution will help transition process between "Flow" and "TypeScript" projects much easier from both sides and also make the refactoring of such codebases a smaller effort in case that one might decide in the future to migrate from one to another.

- Thoroughly tested for type correctness
- No third-party dependencies
- Semantic Versioning
- Output separate bundles for different workflow needs (es5-commonjs, es5-module, jsnext)

## Installation

```bash
npm install --save utility-types
```

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

### SetDifference
`SetDifference<A extends string, B extends string>`  
Set difference of given literal union types `A` and `B`

**Usage:**
```ts
import { SetDifference } from 'utility-types';

type ResultSet = SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "1"
```

### SetComplement
`SetComplement<A extends string, A2 extends A>`  
Set complement of given literal union types `A` and it's subset `A2`

**Usage:**
```ts
import { SetComplement } from 'utility-types';

type ResultSet = SetComplement<'1' | '2' | '3', '2' | '3'>;
// Expect: "1"
```

### SymmetricDifference
`SymmetricDifference<A extends string, B extends string>`  
Set difference of the union and the intersection of given literal union types `A` and `B`

**Usage:**
```ts
import { SymmetricDifference } from 'utility-types';

type ResultSet = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "1" | "4"
```

### Omit
`Omit<T extends object, K extends keyof T>`  
From `T` remove a set of properties `K`

**Usage:**
```ts
import { Omit } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type DefaultProps = { age: number };

type RequiredProps = Omit<Props, keyof DefaultProps>;
// Expect: { name: string; visible: boolean; }
```

### Diff
`Diff<T extends object, U extends object>`  
From `T` pick properties that doesn't exist in `U`

**Usage:**
```ts
import { Diff } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type UpdatedProps = { age: string };
type OtherProps = { other: string };

type RequiredProps = Diff<Props, UpdatedProps & OtherProps>;
// Expect: { name: string; visible: boolean; }
```

### Subtract
`Subtract<T extends U, U extends object>`  
From `T` pick properties that doesn't exist in `U`, when `U` is a subtype of `T`

**Usage:**
```ts
import { Subtract } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type DefaultProps = { age: number };

type RequiredProps = Subtract<Props, DefaultProps>;
// Expect: { name: string; visible: boolean; }
```

### Overwrite
`Overwrite<T extends object, U extends object>`  
Overwrite intersecting properties in `T` with `U`.

**Usage:**
```ts
import { Overwrite } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type UpdatedProps = { age: string };

type ReplacedProps = Overwrite<Props, UpdatedProps>;
// Expect: { name: string; age: string; visible: boolean; }
```

### Assign
`Assign<T extends object, U extends object>`  
Assign `U` to `T` just like object assign

**Usage:**
```ts
import { Assign } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type UpdatedProps = { age: string };
type OtherProps = { other: string };

type ExtendedProps = Assign<Props, UpdatedProps & OtherProps>;
// Expect: { name: string; age: number; visible: boolean; other: string; }
```

---

## Utility Types

### $Keys
`$Keys<T extends object>`  
get the union type of all the keys in an object type `T`  
https://flow.org/en/docs/types/utilities/#toc-keys

**Usage:**
```ts
import { $Keys } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };

type PropsKeys = $Keys<Props>;
// Expect: "name" | "age" | "visible"
```

### $Values
`$Values<T extends object>`  
get the union type of all the values in an object type `T`  
https://flow.org/en/docs/types/utilities/#toc-values

**Usage:**
```ts
import { $Values } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };

type PropsValues = $Values<Props>;
// Expect: string | number | boolean
```

### $ReadOnly
`$ReadOnly<T extends object>`  
get the read-only version of a given object type `T`  
https://flow.org/en/docs/types/utilities/#toc-readonly

**Usage:**
```ts
import { $ReadOnly } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };

type ReadOnlyProps = $ReadOnly<Props>;
// Expect: Readonly<{ name: string; age?: number | undefined; visible: boolean; }>
```

### $Diff
`$Diff<T extends U, U extends object>`  
get the set difference of a given object types `T` and `U` (`T \ U`)  
https://flow.org/en/docs/types/utilities/#toc-diff

**Usage:**
```ts
import { $Diff } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type DefaultProps = { age: number };

type RequiredProps = $Diff<Props, DefaultProps>;
// Expect: { name: string; visible: boolean; }
```

### $PropertyType
`$PropertyType<T extends object, K extends keyof T>`  
desc get the type of property of an object at a given key `K`  
https://flow.org/en/docs/types/utilities/#toc-propertytype

**Usage:**
```ts
import { $PropertyType } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type NameType = $PropertyType<Props, 'name'>;
// Expect: string

type Tuple = [boolean, number];
type A = $PropertyType<Tuple, '0'>;
// Expect: boolean
type B = $PropertyType<Tuple, '1'>;
// Expect: number
```

### $ElementType
`$ElementType<T extends {}, K extends keyof T | number>`  
get the type of elements inside of array, tuple or object of type `T`, that matches the given index type `K`  
https://flow.org/en/docs/types/utilities/#toc-elementtype

**Usage:**
```ts
import { $ElementType } from 'utility-types';

type Props = { name: string, age: number, visible: boolean };
type NameType = $ElementType<Props, 'name'>;
// Expect: string

type Tuple = [boolean, number];
type A = $ElementType<Tuple, 0>;
// Expect: boolean
type B = $ElementType<Tuple, 1>;
// Expect: number

type Arr = boolean[];
type ItemsType = $ElementType<Arr, number>;
// Expect: boolean

type Obj = { [key: string]: number };
type ValuesType = $ElementType<Obj, string>;
// Expect: number
```

---

## Functional helpers

### $call
`function $call<T>(expression: (...params: any[]) => T): T;`  
Infer the return type from a given "expression" (at runtime it's equivalent of "noop")  
Alias: `getReturnOfExpression`  
https://flow.org/en/docs/types/utilities/#toc-call

> **WARNING**: `$call` function must work on a runtime level as opposed to Flow where it works on a type level. The current limitation exist due to TypeScript not supporting calling expressions on a type level, check this issue for more details: [#6606](https://github.com/Microsoft/TypeScript/issues/6606)

**Usage:**
```ts
import { $call } from 'utility-types';

const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = $call(increment);
type IncrementAction = typeof returnOfIncrement; // { type: "INCREMENT"; }
```

---

MIT License

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
