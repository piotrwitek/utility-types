# utility-types
## Utility Types for TypeScript (provide compatibility with [Flow's Utility Types](https://flow.org/en/docs/types/utilities/))
(_Compatible with TS v2.6.2_)

## Motivation

The primary goal of this library is to provide a set of proven Utility Types (inspired by [Set Theory](https://en.wikipedia.org/wiki/Set_theory) and functional languages) that should complement existing [TypeScript Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

The secondary goal is to provide a compatibility layer with [Flow's Utility Types](https://flow.org/en/docs/types/utilities/).
[Flow](https://flow.org) and [TypeScript](https://typescriptlang.org) have a lot in common. By using this library TypeScript Developers will become more familiar with differences to "Flow" and extend their static-typing toolbelt.
Moreover it can help to make a transition between "Flow" and "TypeScript" projects much easier.

## Goals
- provide a set of consistent Utility Types that are idiomatic and complementary to existing [TypeScript Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- provide compatibility with [Flow's Utility Types](https://flow.org/en/docs/types/utilities/)
- clean idiomatic implementation based on composition of smaller generic types that are easy to follow and learn how they work

## Features
- Tested for type correctness
- No third-party dependencies
- Provides multiple output formats (es5-commonjs, es5-module, jsnext)

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

## Flow's Utility Types
- [$Keys](#keys)
- [$Values](#values)
- [$ReadOnly](#readonly)
- [$Diff](#diff2)
- [$PropertyType](#propertytype)
- [$ElementType](#elementtype)
- [$Call](#call2) (soon -> [#15](../../issues/15))
- [Class](#class) (soon -> [#15](../../issues/15))

## Flow to TypeScript Migration Guides
- Mixed Types in TypeScript (soon -> [#15](../../issues/15))
- Existential Type (*) in TypeScript (soon -> [#15](../../issues/15))

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

### <a id="diff2"></a> $Diff
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
