# utility-types

## Utility Types for TypeScript (provide migration from [Flow's Utility Types](https://flow.org/en/docs/types/utilities/))

* v1.X - compatible with TS v2.7.2
* v2.X - compatible with TS v2.8.1 (rewritten to conditional types)

## Motivation

The primary goal of this library is to provide a set of proven Utility Types (inspired by [Set Theory](https://en.wikipedia.org/wiki/Set_theory) and functional languages) that should complement existing [TypeScript Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html).

The secondary goal is to provide a compatibility layer with [Flow's Utility Types](https://flow.org/en/docs/types/utilities/).
[Flow](https://flow.org) and [TypeScript](https://typescriptlang.org) have a lot in common. By using this library TypeScript Developers will become more familiar with differences to "Flow" and extend their static-typing toolbelt.
Moreover it can help to migrate between "Flow" and "TypeScript" projects much easier.

## Goals

* provide a set of consistent Utility Types that are idiomatic and complementary to existing [TypeScript Mapped Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
* provide migration from [Flow's Utility Types](https://flow.org/en/docs/types/utilities/)
* clean idiomatic implementation based on composition of smaller generic types that are easy to follow and learn how they work

## Features

* Tested for type correctness
* No third-party dependencies
* Provides multiple output formats (es5-commonjs, es5-module, jsnext)

## Installation

```bash
npm install --save utility-types
```

# Table of Contents

## Binary operations on sets

* [SetIntersection](#setintersection)
* [SetDifference](#setdifference)
* [SetComplement](#setcomplement)
* [SymmetricDifference](#symmetricdifference)

## Mapped Types

* [FunctionKeys](#functionkeys)
* [NonFunctionKeys](#nonfunctionkeys)
* [Pick](#pick) (standard-lib)
* [Omit](#omit)
* [Intersection](#intersection)
* [Diff](#diff)
* [Subtract](#subtract)
* [Overwrite](#overwrite)
* [Assign](#assign)

## Recursive Types

* [DeepReadonly](#deepreadonly)

## Flow's Utility Types

* [$Keys](#keys)
* [$Values](#values)
* [$ReadOnly](#readonly)
* [$Diff](#diff2)
* [$PropertyType](#propertytype)
* [$ElementType](#elementtype)
* [$Call](#call)

## Flow to TypeScript Migration Guides

* Mixed Types in TypeScript (wip)

---

## Binary operations on sets

### SetIntersection

`SetIntersection<A, B>`  
Set intersection of given literal union types `A` and `B`

**Usage:**

```ts
import { SetIntersection } from 'utility-types';

type ResultSet = SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "2" | "3"

type ResultSetMixed = SetIntersection<string | number | (() => void), Function>;
// Expect: () => void
```

### SetDifference

`SetDifference<A, B>`  
Set difference of given literal union types `A` and `B`

**Usage:**

```ts
import { SetDifference } from 'utility-types';

type ResultSet = SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "1"

type ResultSetMixed = SetDifference<string | number | (() => void), Function>;
// Expect: string | number
```

### SetComplement

`SetComplement<A, A2 extends A>`  
Set complement of given literal union types `A` and it's subset `A2`

**Usage:**

```ts
import { SetComplement } from 'utility-types';

type ResultSet = SetComplement<'1' | '2' | '3', '2' | '3'>;
// Expect: "1"
```

### SymmetricDifference

`SymmetricDifference<A, B>`  
Set difference of the union and the intersection of given literal union types `A` and `B`

**Usage:**

```ts
import { SymmetricDifference } from 'utility-types';

type ResultSet = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "1" | "4"
```

---

## Mapped Types

### Pick

> _(part of standard-lib)_

`Pick<T, keyof T>`  
From `T` pick a set of properties `K`

**Usage:**

```ts
type Props = { name: string; age: number; visible: boolean };

type RequiredProps = Pick<Props, 'name'>;
// Expect: { name: string }
```

### Omit

`Omit<T, keyof T>`  
From `T` remove a set of properties `K`

**Usage:**

```ts
import { Omit } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };

type RequiredProps = Omit<Props, 'age'>;
// Expect: { name: string; visible: boolean; }
```

### Diff

`Diff<A, B>`  
From `A` pick properties that doesn't exist in `B`

**Usage:**

```ts
import { Diff } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

type RequiredProps = Diff<Props, DefaultProps>;
// Expect: { name: string; visible: boolean; }
```

### Subtract

`Subtract<T, U extends T>`  
From `T` pick properties that doesn't exist in `U`, when `U` is a subtype of `T`

**Usage:**

```ts
import { Subtract } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

type RequiredProps = Subtract<Props, DefaultProps>;
// Expect: { name: string; visible: boolean; }
```

### Overwrite

`Overwrite<T, U>`  
Overwrite intersecting properties in `T` with `U`.

**Usage:**

```ts
import { Overwrite } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type NewProps = { age: string; other: string };

type ReplacedProps = Overwrite<Props, NewProps>;
// Expect: { name: string; age: string; visible: boolean; }
```

### Assign

`Assign<T, U>`  
Assign `U` to `T` just like object assign

**Usage:**

```ts
import { Assign } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type NewProps = { age: string; other: string };

type ExtendedProps = Assign<Props, NewProps>;
// Expect: { name: string; age: number; visible: boolean; other: string; }
```

### FunctionKeys

`FunctionKeys<T>`  
get union type of keys that are functions in object type `T`

**Usage:**

```ts
import { FunctionKeys } from 'utility-types';

type MixedProps = { name: string; setName: (name: string) => void };
type FunctionKeysProps = FunctionKeys<MixedProps>;
// Expect: "setName"
```

### NonFunctionKeys

`NonFunctionKeys<T>`  
get union type of keys that are non-functions in object type `T`

**Usage:**

```ts
import { NonFunctionKeys } from 'utility-types';

type MixedProps = { name: string; setName: (name: string) => void };
type NonFunctionKeysProps = NonFunctionKeys<MixedProps>;
// Expect: "name"
```

---

## Recursive Types

### DeepReadonly

`DeepReadonly<T extends object, U extends object>`  
recursive readonly that works for deeply nested structures

**Usage:**

```ts
import { DeepReadonly } from 'utility-types';

type NestedProps = {
  first: {
    second: {
      name: string;
    };
  };
};
type ReadonlyNestedProps = DeepReadonly<NestedProps>;
// Expect: {
//   readonly first: {
//     readonly second: {
//       readonly name: string;
//     };
//   };
// }
```

---

## Flow's Utility Types

### $Keys

`$Keys<T extends object>`  
get the union type of all the keys in an object type `T`  
https://flow.org/en/docs/types/utilities/#toc-keys

**Usage:**

```ts
import { $Keys } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };

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

type Props = { name: string; age: number; visible: boolean };

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

type Props = { name: string; age: number; visible: boolean };

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

type Props = { name: string; age: number; visible: boolean };
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

type Props = { name: string; age: number; visible: boolean };
type NameType = $PropertyType<Props, 'name'>;
// Expect: string

type Tuple = [boolean, number];
type A = $PropertyType<Tuple, '0'>;
// Expect: boolean
type B = $PropertyType<Tuple, '1'>;
// Expect: number
```

### $ElementType

`$ElementType<T extends object, K extends keyof T | number>`  
get the type of elements inside of array, tuple or object of type `T`, that matches the given index type `K`  
https://flow.org/en/docs/types/utilities/#toc-elementtype

**Usage:**

```ts
import { $ElementType } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
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

### $Call

`$Call<T extends (...args: any[]) => any>`  
get the return type of a given expression type
https://flow.org/en/docs/types/utilities/#toc-call

**Usage:**

```ts
import { $Call } from 'utility-types';

// Common use-case
const add = (amount: number) => ({ type: 'ADD' as 'ADD', payload: amount });
type AddAction = $Call<typeof returnOfIncrement>; // { type: 'ADD'; payload: number }

// Examples migrated from Flow docs
type ExtractPropType<T extends { prop: any }> = (arg: T) => T['prop'];
type Obj = { prop: number };
type PropType = $Call<ExtractPropType<Obj>>; // number
// type Nope = $Call<ExtractPropType<{ nope: number }>>; // Error: argument doesn't match `Obj`.

type ExtractReturnType<T extends () => any> = (arg: T) => ReturnType<T>;
type Fn = () => number;
type FnReturnType = $Call<ExtractReturnType<Fn>>; // number
```

---

MIT License

Copyright (c) 2016 Piotr Witek <mailto:piotrek.witek@gmail.com> (http://piotrwitek.github.io)
