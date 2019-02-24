/**
 * Credits to all the people who given inspiration and shared some very usefull code snippets
 * in the following github issue: https://github.com/Microsoft/TypeScript/issues/12215
 */

/**
 * SetIntersection (same as Extract)
 * @desc Set intersection of given union types `A` and `B`
 */
export type SetIntersection<A, B> = A extends B ? A : never;

/**
 * SetDifference (same as Exclude)
 * @desc Set difference of given union types `A` and `B`
 */
export type SetDifference<A, B> = A extends B ? never : A;

/**
 * SetComplement
 * @desc Set complement of given union types `A` and (it's subset) `A1`
 */
export type SetComplement<A, A1 extends A> = SetDifference<A, A1>;

/**
 * SymmetricDifference
 * @desc Set difference of union and intersection of given union types `A` and `B`
 */
export type SymmetricDifference<A, B> = SetDifference<A | B, A & B>;

/**
 * NonUndefined
 * @desc Exclude undefined from set `A`
 */
export type NonUndefined<A> = A extends undefined ? never : A;

/**
 * FunctionKeys
 * @desc get union type of keys that are functions in object type `T`
 */
export type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];

/**
 * NonFunctionKeys
 * @desc get union type of keys that are non-functions in object type `T`
 */
export type NonFunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];

/**
 * Omit (complements Pick)
 * @desc From `T` remove a set of properties `K`
 */
export type Omit<T extends object, K extends keyof T> = T extends any
  ? Pick<T, SetDifference<keyof T, K>>
  : never;

/**
 * PickByValue
 * @desc From `T` pick a set of properties with value type of `ValueType`.
 * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
 */
export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? Key : never }[keyof T]
>;

/**
 * OmitByValue
 * @desc From `T` remove a set of properties with value type of `ValueType`.
 * Credit: [Piotr Lewandowski](https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c)
 */
export type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? never : Key }[keyof T]
>;

/**
 * Intersection
 * @desc From `T` pick properties that exist in `U`
 */
export type Intersection<T extends object, U extends object> = T extends any
  ? Pick<T, SetIntersection<keyof T, keyof U>>
  : never;

/**
 * Diff
 * @desc From `T` remove properties that exist in `U`
 */
export type Diff<T extends object, U extends object> = Pick<
  T,
  SetDifference<keyof T, keyof U>
>;

/**
 * Subtract
 * @desc From `T` remove properties that exist in `T1` (`T1` is a subtype of `T`)
 */
export type Subtract<T extends T1, T1 extends object> = Pick<
  T,
  SetComplement<keyof T, keyof T1>
>;

/**
 * Overwrite
 * @desc From `U` overwrite properties to `T`
 */
export type Overwrite<
  T extends object,
  U extends object,
  I = Diff<T, U> & Intersection<U, T>
> = Pick<I, keyof I>;

/**
 * Assign
 * @desc From `U` assign properties to `T` (just like object assign)
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
 */
export type Unionize<T extends object> = {
  [P in keyof T]: { [Q in P]: T[P] }
}[keyof T];

/**
 * PromiseType
 * @desc Obtain Promise resolve type
 */
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

// TODO: inline _DeepReadonlyArray with infer in DeepReadonly, same for all other deep types
/**
 * DeepReadonly
 * @desc Readonly that works for deeply nested structure
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
 */
export type DeepPartial<T> =
  T extends Function ? T :
  T extends Array<infer U> ? _DeepPartialArray<U> :
  T extends object ? _DeepPartialObject<T> :
  T | undefined;
/** @private */
// tslint:disable-next-line:class-name
export interface _DeepPartialArray<T> extends Array<DeepPartial<T>> { }
/** @private */
export type _DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

/**
 * WritableKeys
 * @desc get union type of keys that are writable in object type `T`
 * Credit: Matt McCutchen
 * https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript
 */
export type WritableKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];

/**
 * ReadonlyKeys
 * @desc get union type of keys that are readonly in object type `T`
 * Credit: Matt McCutchen
 * https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript
 */
export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T];

/**
 * Brand
 * @desc Define nominal type of U based on type of T.
 */
export type Brand<T, U> = T & { __brand: U };
