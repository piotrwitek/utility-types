# utility-types

[![Latest Stable Version](https://img.shields.io/npm/v/utility-types.svg)](https://www.npmjs.com/package/utility-types)
[![NPM Downloads](https://img.shields.io/npm/dt/utility-types.svg)](https://www.npmjs.com/package/utility-types)
[![NPM Downloads](https://img.shields.io/npm/dm/utility-types.svg)](https://www.npmjs.com/package/utility-types)

[ ![Codeship Status for piotrwitek/utility-types](https://app.codeship.com/projects/1825f5b0-3b46-0136-3a8e-2a9769e4a9a2/status?branch=master)](https://app.codeship.com/projects/290305)
[![Dependency Status](https://img.shields.io/david/piotrwitek/utility-types.svg)](https://david-dm.org/piotrwitek/utility-types)
[![peerDependency Status](https://img.shields.io/david/peer/piotrwitek/utility-types.svg)](https://david-dm.org/piotrwitek/utility-types#info=devDependencies)

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

## Operations on sets

* [`SetIntersection<A, B>`](#setintersectiona-b)
* [`SetDifference<A, B>`](#setdifferencea-b)
* [`SetComplement<A, A1>`](#setcomplementa-a1)
* [`SymmetricDifference<A, B>`](#symmetricdifferencea-b)
* [`NonNullable<A>`](#nonnullablea) (_\*standard-lib_)
* [`Exclude<A, B>`](#excludea-b) (_\*standard-lib_)
* [`Extract<A, B>`](#extracta-b) (_\*standard-lib_)

## Operations on objects

* [`FunctionKeys<T>`](#functionkeyst)
* [`NonFunctionKeys<T>`](#nonfunctionkeyst)
* [`Pick<T, K>`](#pickt-k) (_\*standard-lib_)
* [`Omit<T, K>`](#omitt-k)
* [`Intersection<T, U>`](#intersectiont-u)
* [`Diff<T, U>`](#difft-u)
* [`Subtract<T, T1>`](#subtractt-t1)
* [`Overwrite<T, U>`](#overwritet-u)
* [`Assign<T, U>`](#assignt-u)

## Mapped Types

* [`Partial<T>`](#partialt) (_\*standard-lib_)
* [`Required<T>`](#requiredt) (_\*standard-lib_)
* [`Readonly<T>`](#readonlyt) (_\*standard-lib_)
* [`ReturnType<T>`](#returntypet) (_\*standard-lib_)
* [`InstanceType<T>`](#instancetypet) (_\*standard-lib_)
* [`Unionize<T>`](#unionizet)
* [`PromiseType<T>`](#promisetypet) (replaced deprecated `UnboxPromise<T>`)
* [`DeepReadonly<T>`](#deepreadonlyt)

## Flow's Utility Types

* [`$Keys<T>`](#keyst)
* [`$Values<T>`](#valuest)
* [`$ReadOnly<T>`](#readonly2)
* [`$Diff<T, U>`](#diff2)
* [`$PropertyType<T, K>`](#propertytypet-k)
* [`$ElementType<T, K>`](#elementtypet-k)
* [`$Call<T>`](#callt)

## Deprecated API (use at own risk)
* `getReturnOfExpression()` - from TS v2.0 it's better to use type-level `ReturnType` instead
* `UnboxPromise` - please use `PromiseType` instead (they are equivalent)

## Flow to TypeScript Migration Guides

* Mixed Types in TypeScript (wip)

---

## Operations on sets

### `SetIntersection<A, B>`

Set intersection of given literal union types `A` and `B`

**Usage:**

```ts
import { SetIntersection } from 'utility-types';

type ResultSet = SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "2" | "3"
type ResultSetMixed = SetIntersection<string | number | (() => void), Function>;
// Expect: () => void
```

[⇧ back to top](#operations-on-sets)

### `SetDifference<A, B>`

Set difference of given literal union types `A` and `B`

**Usage:**

```ts
import { SetDifference } from 'utility-types';

type ResultSet = SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "1"
type ResultSetMixed = SetDifference<string | number | (() => void), Function>;
// Expect: string | number
```

[⇧ back to top](#operations-on-sets)

### `SetComplement<A, A1>`

Set complement of given literal union types `A` and (it's subset) `A1`

**Usage:**

```ts
import { SetComplement } from 'utility-types';

type ResultSet = SetComplement<'1' | '2' | '3', '2' | '3'>;
// Expect: "1"
```

[⇧ back to top](#operations-on-sets)

### `SymmetricDifference<A, B>`

Set difference of the union and the intersection of given literal union types `A` and `B`

**Usage:**

```ts
import { SymmetricDifference } from 'utility-types';

type ResultSet = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>;
// Expect: "1" | "4"
```

[⇧ back to top](#operations-on-sets)

### `NonNullable<A>`

Exclude `null` and `undefined` from set `A`

[⇧ back to top](#operations-on-sets)

### `Exclude<A, B>`

Exclude subset `B` from set `A`

[⇧ back to top](#operations-on-sets)

### `Extract<A, B>`

Extract subset `B` from set `A`

[⇧ back to top](#operations-on-sets)

---

## Operations on objects

### `FunctionKeys<T>`

Get union type of keys that are functions in object type `T`

**Usage:**

```ts
import { FunctionKeys } from 'utility-types';

type MixedProps = { name: string; setName: (name: string) => void };
type FunctionKeysProps = FunctionKeys<MixedProps>;
// Expect: "setName"
```

[⇧ back to top](#operations-on-objects)

### `NonFunctionKeys<T>`

Get union type of keys that are non-functions in object type `T`

**Usage:**

```ts
import { NonFunctionKeys } from 'utility-types';

type MixedProps = { name: string; setName: (name: string) => void };
type NonFunctionKeysProps = NonFunctionKeys<MixedProps>;
// Expect: "name"
```

[⇧ back to top](#operations-on-objects)

### `Pick<T, K>`

From `T` pick a set of properties `K`

> _(part of standard-lib)_

**Usage:**

```ts
type Props = { name: string; age: number; visible: boolean };

type RequiredProps = Pick<Props, 'name'>;
// Expect: { name: string }
```

[⇧ back to top](#operations-on-objects)

### `Omit<T, K>`

From `T` remove a set of properties `K`

**Usage:**

```ts
import { Omit } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };

type RequiredProps = Omit<Props, 'age'>;
// Expect: { name: string; visible: boolean; }
```

[⇧ back to top](#operations-on-objects)

### `Intersection<T, U>`

From `T` pick properties that exist in `U`

**Usage:**

```ts
import { Intersection } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

type DuplicatedProps = Intersection<Props, DefaultProps>;
// Expect: { age: number; }
```

[⇧ back to top](#operations-on-objects)

### `Diff<T, U>`

From `T` remove properties that exist in `U`

**Usage:**

```ts
import { Diff } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

type RequiredProps = Diff<Props, DefaultProps>;
// Expect: { name: string; visible: boolean; }
```

[⇧ back to top](#operations-on-objects)

### `Subtract<T, T1>`

From `T` remove properties that exist in `T1` (`T1` is a subtype of `T`)

**Usage:**

```ts
import { Subtract } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

type RequiredProps = Subtract<Props, DefaultProps>;
// Expect: { name: string; visible: boolean; }
```

[⇧ back to top](#operations-on-objects)

### `Overwrite<T, U>`

From `U` overwrite properties to `T`

**Usage:**

```ts
import { Overwrite } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type NewProps = { age: string; other: string };

type ReplacedProps = Overwrite<Props, NewProps>;
// Expect: { name: string; age: string; visible: boolean; }
```

[⇧ back to top](#operations-on-objects)

### `Assign<T, U>`

From `U` assign properties to `T` (just like object assign)

**Usage:**

```ts
import { Assign } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };
type NewProps = { age: string; other: string };

type ExtendedProps = Assign<Props, NewProps>;
// Expect: { name: string; age: number; visible: boolean; other: string; }
```

[⇧ back to top](#operations-on-objects)

---

## Mapped Types

### `Partial<T>`

Make all properties of object type optional

[⇧ back to top](#mapped-types)

### `Required<T>`

Make all properties of object type non-optional

[⇧ back to top](#mapped-types)

### `Readonly<T>`

Make all properties of object type readonly

[⇧ back to top](#mapped-types)

### `ReturnType<T>`

Obtain the return type of a function

[⇧ back to top](#mapped-types)

### `InstanceType<T>`

Obtain the instance type of a class

[⇧ back to top](#mapped-types)

### `Unionize<T>`

Disjoin object to union of one-property objects types

**Usage:**

```ts
import { Unionize } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };

type UnionizedType = Unionize<Props>;
// Expect: { name: string; } | { age: number; } | { visible: boolean; }
```

[⇧ back to top](#mapped-types)

### `PromiseType<T>`

Obtain Promise resolve type

**Usage:**

```ts
import { PromiseType } from 'utility-types';

type Response = PromiseType<Promise<string>>;
// Expect: string
```

[⇧ back to top](#mapped-types)

### `DeepReadonly<T>`

Readonly that works for deeply nested structures

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

[⇧ back to top](#mapped-types)

---

## Flow's Utility Types

### `$Keys<T>`

get the union type of all the keys in an object type `T`  
https://flow.org/en/docs/types/utilities/#toc-keys

**Usage:**

```ts
import { $Keys } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };

type PropsKeys = $Keys<Props>;
// Expect: "name" | "age" | "visible"
```

[⇧ back to top](#flows-utility-types)

### `$Values<T>`

get the union type of all the values in an object type `T`  
https://flow.org/en/docs/types/utilities/#toc-values

**Usage:**

```ts
import { $Values } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };

type PropsValues = $Values<Props>;
// Expect: string | number | boolean
```

[⇧ back to top](#flows-utility-types)

### <a id="readonly2"></a> `$ReadOnly<T>`

get the read-only version of a given object type `T`  
https://flow.org/en/docs/types/utilities/#toc-readonly

**Usage:**

```ts
import { $ReadOnly } from 'utility-types';

type Props = { name: string; age: number; visible: boolean };

type ReadOnlyProps = $ReadOnly<Props>;
// Expect: Readonly<{ name: string; age?: number | undefined; visible: boolean; }>
```

[⇧ back to top](#flows-utility-types)

### <a id="diff2"></a> `$Diff<T, U>`

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

[⇧ back to top](#flows-utility-types)

### `$PropertyType<T, K>`

get the type of property of an object at a given key `K`  
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

[⇧ back to top](#flows-utility-types)

### `$ElementType<T, K>`

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

[⇧ back to top](#flows-utility-types)

### `$Call<T>`

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

[⇧ back to top](#flows-utility-types)

---

MIT License

Copyright (c) 2016 Piotr Witek <mailto:piotrek.witek@gmail.com> (http://piotrwitek.github.io)
