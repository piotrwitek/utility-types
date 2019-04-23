/**
 * Credits to all the people who given inspiration and shared some very useful code snippets
 * in the following github issue: https://github.com/Microsoft/TypeScript/issues/12215
 */

/**
 * Primitive
 * @desc Type representing primitive types in TypeScript: `number | boolean | string | symbol`
 * @example
 *   // Expect: object
 *   // type ResultStripPrimitives = Exclude<string | object, Primitive>
 */
export type Primitive = number | boolean | string | symbol;

/**
 * Falsey
 * @desc Type representing falsey values in TypeScript: `null | undefined | false | 0 | ''`
 * @example
 *   // Expect: "a" | "b"
 *   // type ResultCompact = Exclude<'a' | 'b' | undefined | false, Falsey>;
 */
export type Falsey = null | undefined | false | 0 | '';

/**
 * SetIntersection (same as Extract)
 * @desc Set intersection of given union types `A` and `B`
 * @example
 *   // Expect: "2" | "3"
 *   type ResultSet = SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>;
 *
 *   // Expect: () => void
 *   type ResultSetMixed = SetIntersection<string | number | (() => void), Function>;
 */
export type SetIntersection<A, B> = A extends B ? A : never;

/**
 * SetDifference (same as Exclude)
 * @desc Set difference of given union types `A` and `B`
 * @example
 *   // Expect: "1"
 *   type ResultSet = SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
 *
 *   // Expect: string | number
 *   type ResultSetMixed = SetDifference<string | number | (() => void), Function>;
 */
export type SetDifference<A, B> = A extends B ? never : A;

/**
 * SetComplement
 * @desc Set complement of given union types `A` and (it's subset) `A1`
 * @example
 *   // Expect: "1"
 *   type ResultSet = SetComplement<'1' | '2' | '3', '2' | '3'>;
 */
export type SetComplement<A, A1 extends A> = SetDifference<A, A1>;

/**
 * SymmetricDifference
 * @desc Set difference of union and intersection of given union types `A` and `B`
 * @example
 *   // Expect: "1" | "4"
 *   type ResultSet = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>;
 */
export type SymmetricDifference<A, B> = SetDifference<A | B, A & B>;

/**
 * NonUndefined
 * @desc Exclude undefined from set `A`
 */
export type NonUndefined<A> = A extends undefined ? never : A;

/**
 * Keys
 * @desc get union type of keys in object type `T`
 * @example
 *   type MixedProps = { name: string; setName: (name: string) => void };
 *
 *   // Expect: "name" | "setName"
 *   type FunctionKeysProps = FunctionKeys<MixedProps>;
 */
export type Keys<T extends object> = keyof T;

/**
 * FunctionKeys
 * @desc get union type of keys that are functions in object type `T`
 * @example
 *   type MixedProps = { name: string; setName: (name: string) => void };
 *
 *   // Expect: "setName"
 *   type FunctionKeysProps = FunctionKeys<MixedProps>;
 */
export type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];

/**
 * NonFunctionKeys
 * @desc get union type of keys that are non-functions in object type `T`
 * @example
 *   type MixedProps = { name: string; setName: (name: string) => void };
 *
 *   // Expect: "name"
 *   type NonFunctionKeysProps = NonFunctionKeys<MixedProps>;
 */
export type NonFunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];

/**
 * Omit (complements Pick)
 * @desc From `T` remove a set of properties `K`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *
 *   // Expect: { name: string; visible: boolean; }
 *   type RequiredProps = Omit<Props, 'age'>;
 */
export type Omit<T extends object, K extends keyof T> = T extends any
  ? Pick<T, SetDifference<keyof T, K>>
  : never;

/**
 * PickByValue
 * @desc From `T` pick a set of properties with value type of `ValueType`.
 * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *
 *   // Expect: { name: string; age: number }
 *   type RequiredProps = PickByValue<Props, string | number>;
 */
export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? Key : never }[keyof T]
>;

/**
 * OmitByValue
 * @desc From `T` remove a set of properties with value type of `ValueType`.
 * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *
 *   // Expect: { visible: boolean }
 *   type RequiredProps = OmitByValue<Props, string | number>;
 */
export type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? never : Key }[keyof T]
>;

/**
 * Intersection
 * @desc From `T` pick properties that exist in `U`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   // Expect: { age: number; }
 *   type DuplicatedProps = Intersection<Props, DefaultProps>;
 */
export type Intersection<T extends object, U extends object> = T extends any
  ? Pick<T, SetIntersection<keyof T, keyof U>>
  : never;

/**
 * Diff
 * @desc From `T` remove properties that exist in `U`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   // Expect: { name: string; visible: boolean; }
 *   type RequiredProps = Diff<Props, DefaultProps>;
 */
export type Diff<T extends object, U extends object> = Pick<
  T,
  SetDifference<keyof T, keyof U>
>;

/**
 * Subtract
 * @desc From `T` remove properties that exist in `T1` (`T1` is a subtype of `T`)
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type DefaultProps = { age: number };
 *
 *   // Expect: { name: string; visible: boolean; }
 *   type RequiredProps = Subtract<Props, DefaultProps>;
 */
export type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;

/**
 * Overwrite
 * @desc From `U` overwrite properties to `T`
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type NewProps = { age: string; other: string };
 *
 *   // Expect: { name: string; age: string; visible: boolean; }
 *   type ReplacedProps = Overwrite<Props, NewProps>;
 */
export type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

/**
 * Assign
 * @desc From `U` assign properties to `T` (just like object assign)
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *   type NewProps = { age: string; other: string };
 *
 *   // Expect: { name: string; age: number; visible: boolean; other: string; }
 *   type ExtendedProps = Assign<Props, NewProps>;
 */
export type Assign<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T> & Diff<U, T>
> = Pick<I, keyof I>;

/**
 * Exact
 * @desc create branded object type for exact type matching
 */
export type Exact<A extends object> = A & { __brand: keyof A };

/**
 * Unionize
 * @desc Disjoin object to form union of objects, each with single property
 * @example
 *   type Props = { name: string; age: number; visible: boolean };
 *
 *   // Expect: { name: string; } | { age: number; } | { visible: boolean; }
 *   type UnionizedType = Unionize<Props>;
 */
export type Unionize<T extends object> = {
  [P in keyof T]: { [Q in P]: T[P] }
}[keyof T];

/**
 * PromiseType
 * @desc Obtain Promise resolve type
 * @example
 *   // Expect: string;
 *   type Response = PromiseType<Promise<string>>;
 */
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

// TODO: inline _DeepReadonlyArray with infer in DeepReadonly, same for all other deep types
/**
 * DeepReadonly
 * @desc Readonly that works for deeply nested structure
 * @example
 *   // Expect: {
 *   //   readonly first: {
 *   //     readonly second: {
 *   //       readonly name: string;
 *   //     };
 *   //   };
 *   // }
 *   type NestedProps = {
 *     first: {
 *       second: {
 *         name: string;
 *       };
 *     };
 *   };
 *   type ReadonlyNestedProps = DeepReadonly<NestedProps>;
 */
export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepReadonlyArray<T[number]>
  : T extends object
  ? _DeepReadonlyObject<T>
  : T;
/** @private */
// tslint:disable-next-line:class-name
export interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
/** @private */
export type _DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
};

/**
 * DeepRequired
 * @desc Required that works for deeply nested structure
 * @example
 *   // Expect: {
 *   //   first: {
 *   //     second: {
 *   //       name: string;
 *   //     };
 *   //   };
 *   // }
 *   type NestedProps = {
 *     first?: {
 *       second?: {
 *         name?: string;
 *       };
 *     };
 *   };
 *   type RequiredNestedProps = DeepRequired<NestedProps>;
 */
export type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepRequiredArray<T[number]>
  : T extends object
  ? _DeepRequiredObject<T>
  : T;
/** @private */
// tslint:disable-next-line:class-name
export interface _DeepRequiredArray<T>
  extends Array<DeepRequired<NonUndefined<T>>> {}
/** @private */
export type _DeepRequiredObject<T> = {
  [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>>
};

/**
 * DeepNonNullable
 * @desc NonNullable that works for deeply nested structure
 * @example
 *   // Expect: {
 *   //   first: {
 *   //     second: {
 *   //       name: string;
 *   //     };
 *   //   };
 *   // }
 *   type NestedProps = {
 *     first?: null | {
 *       second?: null | {
 *         name?: string | null |
 *         undefined;
 *       };
 *     };
 *   };
 *   type RequiredNestedProps = DeepNonNullable<NestedProps>;
 */
export type DeepNonNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
  ? _DeepNonNullableArray<T[number]>
  : T extends object
  ? _DeepNonNullableObject<T>
  : T;
/** @private */
// tslint:disable-next-line:class-name
export interface _DeepNonNullableArray<T>
  extends Array<DeepNonNullable<NonNullable<T>>> {}
/** @private */
export type _DeepNonNullableObject<T> = {
  [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>>
};

/**
 * DeepPartial
 * @desc Partial that works for deeply nested structure
 * @example
 *   // Expect: {
 *   //   first?: {
 *   //     second?: {
 *   //       name?: string;
 *   //     };
 *   //   };
 *   // }
 *   type NestedProps = {
 *     first: {
 *       second: {
 *         name: string;
 *       };
 *     };
 *   };
 *   type PartialNestedProps = DeepPartial<NestedProps>;
 */
export type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? _DeepPartialArray<U>
  : T extends object
  ? _DeepPartialObject<T>
  : T | undefined;
/** @private */
// tslint:disable-next-line:class-name
export interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}
/** @private */
export type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? A
  : B;

/**
 * WritableKeys
 * @desc get union type of keys that are writable in object type `T`
 * Credit: Matt McCutchen
 * https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript
 * @example
 *   // Expect: "bar"
 *   type Props = { readonly foo: string; bar: number };
 *   type WritableProps = WritableKeys<Props>;
 */
export type WritableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >
}[keyof T];

/**
 * ReadonlyKeys
 * @desc get union type of keys that are readonly in object type `T`
 * Credit: Matt McCutchen
 * https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript
 * @example
 *   // Expect: "foo"
 *   type Props = { readonly foo: string; bar: number };
 *   type ReadonlyProps = ReadonlyKeys<Props>;
 */
export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
}[keyof T];

/**
 * Brand
 * @desc Define nominal type of U based on type of T.
 * @example
 *   type USD = Brand<number, "USD">
 *   type EUR = Brand<number, "EUR">
 *
 *   const tax = 5 as USD;
 *   const usd = 10 as USD;
 *   const eur = 10 as EUR;
 *
 *   function gross(net: USD): USD {
 *     return (net + tax) as USD;
 *   }
 *
 *   // Expect: No compile error
 *   gross(usd);
 *   // Expect: Compile error (Type '"EUR"' is not assignable to type '"USD"'.)
 *   gross(eur);
 */
export type Brand<T, U> = T & { __brand: U };
