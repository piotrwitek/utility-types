# Mapped Types

Generated from `src/mapped-types.ts`.

- [`Assign`](#assign)
- [`Brand`](#brand)
- [`DeepNonNullable`](#deepnonnullable)
- [`DeepPartial`](#deeppartial)
- [`DeepReadonly`](#deepreadonly)
- [`DeepRequired`](#deeprequired)
- [`Diff`](#diff)
- [`FunctionKeys`](#functionkeys)
- [`Intersection`](#intersection)
- [`Mutable`](#mutable)
- [`MutableKeys`](#mutablekeys)
- [`NonFunctionKeys`](#nonfunctionkeys)
- [`NonUndefined`](#nonundefined)
- [`Omit`](#omit)
- [`OmitByValue`](#omitbyvalue)
- [`OmitByValueExact`](#omitbyvalueexact)
- [`Optional`](#optional)
- [`OptionalKeys`](#optionalkeys)
- [`Overwrite`](#overwrite)
- [`PickByValue`](#pickbyvalue)
- [`PickByValueExact`](#pickbyvalueexact)
- [`PromiseType`](#promisetype)
- [`ReadonlyKeys`](#readonlykeys)
- [`Required`](#required)
- [`RequiredKeys`](#requiredkeys)
- [`SetComplement`](#setcomplement)
- [`SetDifference`](#setdifference)
- [`SetIntersection`](#setintersection)
- [`Subtract`](#subtract)
- [`SymmetricDifference`](#symmetricdifference)
- [`Unionize`](#unionize)
- [`UnionKeys`](#unionkeys)
- [`UnionToIntersection`](#uniontointersection)
- [`ValuesType`](#valuestype)
- [`Writable`](#writable)
- [`WritableKeys`](#writablekeys)

## `Assign`

From `U` assign properties to `T` (just like object assign)

```ts
export type Assign<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T> & Diff<U, T>
> = Pick<I, keyof I>;
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };
  type NewProps = { age: string; other: string };

  // Expect: { name: string; age: number; visible: boolean; other: string; }
  type ExtendedProps = Assign<Props, NewProps>;
```

## `Brand`

Define nominal type of U based on type of T. Similar to Opaque types in Flow.

```ts
export type Brand<T, U> = T & { __brand: U };
```

### Examples

```ts
type USD = Brand<number, "USD">
  type EUR = Brand<number, "EUR">

  const tax = 5 as USD;
  const usd = 10 as USD;
  const eur = 10 as EUR;

  function gross(net: USD): USD {
    return (net + tax) as USD;
  }

  // Expect: No compile error
  gross(usd);
  // Expect: Compile error (Type '"EUR"' is not assignable to type '"USD"'.)
  gross(eur);
```

## `DeepNonNullable`

NonNullable that works for deeply nested structure

```ts
export type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepNonNullableArray<T[number]>
  : T extends object
  ? _DeepNonNullableObject<T>
  : T;
```

### Examples

```ts
// Expect: {
  //   first: {
  //     second: {
  //       name: string;
  //     };
  //   };
  // }
  type NestedProps = {
    first?: null | {
      second?: null | {
        name?: string | null |
        undefined;
      };
    };
  };
  type RequiredNestedProps = DeepNonNullable<NestedProps>;
```

## `DeepPartial`

Partial that works for deeply nested structure

```ts
export type DeepPartial<T> = { [P in keyof T]?: _DeepPartial<T[P]> };
```

### Examples

```ts
// Expect: {
  //   first?: {
  //     second?: {
  //       name?: string;
  //     };
  //   };
  // }
  type NestedProps = {
    first: {
      second: {
        name: string;
      };
    };
  };
  type PartialNestedProps = DeepPartial<NestedProps>;
```

## `DeepReadonly`

Readonly that works for deeply nested structure

```ts
export type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive
  ? T
  : T extends _DeepReadonlyArray<infer U>
  ? _DeepReadonlyArray<U>
  : T extends _DeepReadonlyObject<infer V>
  ? _DeepReadonlyObject<V>
  : T;
```

### Examples

```ts
// Expect: {
  //   readonly first: {
  //     readonly second: {
  //       readonly name: string;
  //     };
  //   };
  // }
  type NestedProps = {
    first: {
      second: {
        name: string;
      };
    };
  };
  type ReadonlyNestedProps = DeepReadonly<NestedProps>;
```

## `DeepRequired`

Required that works for deeply nested structure

```ts
export type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepRequiredArray<T[number]>
  : T extends object
  ? _DeepRequiredObject<T>
  : T;
```

### Examples

```ts
// Expect: {
  //   first: {
  //     second: {
  //       name: string;
  //     };
  //   };
  // }
  type NestedProps = {
    first?: {
      second?: {
        name?: string;
      };
    };
  };
  type RequiredNestedProps = DeepRequired<NestedProps>;
```

## `Diff`

From `T` remove properties that exist in `U`

```ts
export type Diff<T extends object, U extends object> = Pick<
  T,
  SetDifference<keyof T, keyof U>
>;
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };
  type DefaultProps = { age: number };

  // Expect: { name: string; visible: boolean; }
  type DiffProps = Diff<Props, DefaultProps>;
```

## `FunctionKeys`

Get union type of keys that are functions in object type `T`

```ts
export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];
```

### Examples

```ts
type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};

  // Expect: "setName | someFn"
  type Keys = FunctionKeys<MixedProps>;
```

## `Intersection`

From `T` pick properties that exist in `U`

```ts
export type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>;
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };
  type DefaultProps = { age: number };

  // Expect: { age: number; }
  type DuplicateProps = Intersection<Props, DefaultProps>;
```

## `Mutable`

From `T` make all properties become mutable

```ts
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
```

### Examples

```ts
type Props = {
     readonly name: string;
     readonly age: number;
     readonly visible: boolean;
   };

   // Expect: { name: string; age: number; visible: boolean; }
   Mutable<Props>;
```

## `MutableKeys`

Get union type of keys that are mutable in object type `T`
Credit: Matt McCutchen
https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript

```ts
export type MutableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];
```

### Examples

```ts
type Props = { readonly foo: string; bar: number };

  // Expect: "bar"
  type Keys = MutableKeys<Props>;
```

## `NonFunctionKeys`

Get union type of keys that are non-functions in object type `T`

```ts
export type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];
```

### Examples

```ts
type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};

  // Expect: "name | someKey"
  type Keys = NonFunctionKeys<MixedProps>;
```

## `NonUndefined`

Exclude undefined from set `A`

```ts
export type NonUndefined<A> = A extends undefined ? never : A;
```

### Examples

```ts
// Expect: "string | null"
  SymmetricDifference<string | null | undefined>;
```

## `Omit`

From `T` remove a set of properties by key `K`

```ts
export type Omit<T, K extends keyof any> = Pick<T, SetDifference<keyof T, K>>;
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };

  // Expect: { name: string; visible: boolean; }
  type Props = Omit<Props, 'age'>;
```

## `OmitByValue`

From `T` remove a set of properties by value matching `ValueType`.
Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)

```ts
export type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? never : Key }[keyof T]
>;
```

### Examples

```ts
type Props = { req: number; reqUndef: number | undefined; opt?: string; };

  // Expect: { reqUndef: number | undefined; opt?: string; }
  type Props = OmitByValue<Props, number>;
  // Expect: { opt?: string; }
  type Props = OmitByValue<Props, number | undefined>;
```

## `OmitByValueExact`

From `T` remove a set of properties by value matching exact `ValueType`.

```ts
export type OmitByValueExact<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]-?: [ValueType] extends [T[Key]]
      ? [T[Key]] extends [ValueType]
        ? never
        : Key
      : Key;
  }[keyof T]
>;
```

### Examples

```ts
type Props = { req: number; reqUndef: number | undefined; opt?: string; };

  // Expect: { reqUndef: number | undefined; opt?: string; }
  type Props = OmitByValueExact<Props, number>;
  // Expect: { req: number; opt?: string }
  type Props = OmitByValueExact<Props, number | undefined>;
```

## `Optional`

From `T` make a set of properties by key `K` become optional

```ts
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  Partial<Pick<T, K>>;
```

### Examples

```ts
type Props = {
     name: string;
     age: number;
     visible: boolean;
   };

   // Expect: { name?: string; age?: number; visible?: boolean; }
   type Props = Optional<Props>;

   // Expect: { name: string; age?: number; visible?: boolean; }
   type Props = Optional<Props, 'age' | 'visible'>;
```

## `OptionalKeys`

Get union type of keys that are optional in object type `T`

```ts
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
```

### Notes

- `@see` https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object

### Examples

```ts
type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };

  // Expect: "opt" | "optUndef"
  type Keys = OptionalKeys<Props>;
```

## `Overwrite`

From `U` overwrite properties to `T`

```ts
export type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };
  type NewProps = { age: string; other: string };

  // Expect: { name: string; age: string; visible: boolean; }
  type ReplacedProps = Overwrite<Props, NewProps>;
```

## `PickByValue`

From `T` pick a set of properties by value matching `ValueType`.
Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)

```ts
export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>;
```

### Examples

```ts
type Props = { req: number; reqUndef: number | undefined; opt?: string; };

  // Expect: { req: number }
  type Props = PickByValue<Props, number>;
  // Expect: { req: number; reqUndef: number | undefined; }
  type Props = PickByValue<Props, number | undefined>;
```

## `PickByValueExact`

From `T` pick a set of properties by value matching exact `ValueType`.

```ts
export type PickByValueExact<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]-?: [ValueType] extends [T[Key]]
      ? [T[Key]] extends [ValueType]
        ? Key
        : never
      : never;
  }[keyof T]
>;
```

### Examples

```ts
type Props = { req: number; reqUndef: number | undefined; opt?: string; };

  // Expect: { req: number }
  type Props = PickByValueExact<Props, number>;
  // Expect: { reqUndef: number | undefined; }
  type Props = PickByValueExact<Props, number | undefined>;
```

## `PromiseType`

Obtain Promise resolve type

```ts
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
```

### Examples

```ts
// Expect: string;
  type Response = PromiseType<Promise<string>>;
```

## `ReadonlyKeys`

Get union type of keys that are readonly in object type `T`
Credit: Matt McCutchen
https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript

```ts
export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];
```

### Examples

```ts
type Props = { readonly foo: string; bar: number };

  // Expect: "foo"
  type Keys = ReadonlyKeys<Props>;
```

## `Required`

From `T` make a set of properties by key `K` become required

Source export: `AugmentedRequired`

```ts
export type AugmentedRequired<
  T extends object,
  K extends keyof T = keyof T
> = Omit<T, K> & Required<Pick<T, K>>;
```

### Examples

```ts
type Props = {
     name?: string;
     age?: number;
     visible?: boolean;
   };

   // Expect: { name: string; age: number; visible: boolean; }
   type Props = Required<Props>;

   // Expect: { name?: string; age: number; visible: boolean; }
   type Props = Required<Props, 'age' | 'visible'>;
```

## `RequiredKeys`

Get union type of keys that are required in object type `T`

```ts
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
```

### Notes

- `@see` https://stackoverflow.com/questions/52984808/is-there-a-way-to-get-all-required-properties-of-a-typescript-object

### Examples

```ts
type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };

  // Expect: "req" | "reqUndef"
  type Keys = RequiredKeys<Props>;
```

## `SetComplement`

Set complement of given union types `A` and (it's subset) `A1`

```ts
export type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
```

### Examples

```ts
// Expect: "1"
  SetComplement<'1' | '2' | '3', '2' | '3'>;
```

## `SetDifference`

Set difference of given union types `A` and `B`

```ts
export type SetDifference<A, B> = A extends B ? never : A;
```

### Examples

```ts
// Expect: "1"
  SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;

  // Expect: string | number
  SetDifference<string | number | (() => void), Function>;
```

## `SetIntersection`

Set intersection of given union types `A` and `B`

```ts
export type SetIntersection<A, B> = A extends B ? A : never;
```

### Examples

```ts
// Expect: "2" | "3"
  SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>;

  // Expect: () => void
  SetIntersection<string | number | (() => void), Function>;
```

## `Subtract`

From `T` remove properties that exist in `T1` (`T1` has a subset of the properties of `T`)

```ts
export type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };
  type DefaultProps = { age: number };

  // Expect: { name: string; visible: boolean; }
  type RestProps = Subtract<Props, DefaultProps>;
```

## `SymmetricDifference`

Set difference of union and intersection of given union types `A` and `B`

```ts
export type SymmetricDifference<A, B> = SetDifference<A | B, A & B>;
```

### Examples

```ts
// Expect: "1" | "4"
  SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>;
```

## `Unionize`

Disjoin object to form union of objects, each with single property

```ts
export type Unionize<T extends object> = {
  [P in keyof T]: { [Q in P]: T[P] };
}[keyof T];
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };

  // Expect: { name: string; } | { age: number; } | { visible: boolean; }
  type UnionizedType = Unionize<Props>;
```

## `UnionKeys`

Get keys of all objects in the union type `U`
Credit: filipomar

```ts
export type UnionKeys<U> = keyof UnionToIntersection<Partial<U>>;
```

### Notes

- `@see` https://github.com/piotrwitek/utility-types/issues/192

### Examples

```ts
// Expect: 'name' | 'age' | 'visible'
  UnionKeys<{ name: string; age: string } | { age: number } | { visible: boolean }>
```

## `UnionToIntersection`

Get intersection type given union type `U`
Credit: jcalz

```ts
export type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;
```

### Notes

- `@see` https://stackoverflow.com/a/50375286/7381355

### Examples

```ts
// Expect: { name: string } & { age: number } & { visible: boolean }
  UnionToIntersection<{ name: string } | { age: number } | { visible: boolean }>
```

## `ValuesType`

Get the union type of all the values in an object, array or array-like type `T`

```ts
export type ValuesType<
  T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any>
> = T extends ReadonlyArray<any>
  ? T[number]
  : T extends ArrayLike<any>
  ? T[number]
  : T extends object
  ? T[keyof T]
  : never;
```

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };
   // Expect: string | number | boolean
   type PropsValues = ValuesType<Props>;

   type NumberArray = number[];
   // Expect: number
   type NumberItems = ValuesType<NumberArray>;

   type ReadonlySymbolArray = readonly symbol[];
   // Expect: symbol
   type SymbolItems = ValuesType<ReadonlySymbolArray>;

   type NumberTuple = [1, 2];
   // Expect: 1 | 2
   type NumberUnion = ValuesType<NumberTuple>;

   type ReadonlyNumberTuple = readonly [1, 2];
   // Expect: 1 | 2
   type AnotherNumberUnion = ValuesType<NumberTuple>;

   type BinaryArray = Uint8Array;
   // Expect: number
   type BinaryItems = ValuesType<BinaryArray>;
```

## `Writable`

```ts
export type Writable<T> = Mutable<T>;
```

## `WritableKeys`

```ts
export type WritableKeys<T extends object> = MutableKeys<T>;
```
