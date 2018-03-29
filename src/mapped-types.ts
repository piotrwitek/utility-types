// tslint:disable:ban-types
// tslint:disable:max-line-length
/**
 * Credits to all the people who given inspiration and shared some very usefull code snippets
 * in the following github issue: https://github.com/Microsoft/TypeScript/issues/12215
 */

/**
 * SetDifference
 * @desc Set difference of given literal union types `A` and `B`
 */
export type SetDifference<A extends string, B extends string> = (
  { [P in A]: P } & { [P in B]: never } & { [k: string]: never }
)[A];

/**
 * SetComplement
 * @desc Set complement of given literal union types `A` and it's subset `A2`
 */
export type SetComplement<A extends string, A2 extends A> =
  SetDifference<A, A2>;

/**
 * SymmetricDifference
 * @desc Set difference of the union and the intersection of given literal union types `A` and `B`
 */
export type SymmetricDifference<A extends string, B extends string> =
  SetDifference<A | B, A & B>;

/**
 * Omit
 * @desc From `T` remove a set of properties `K`
 */
export type Omit<T extends object, K extends keyof T> = (
  Pick<T, SetComplement<keyof T, K>>
);

/**
 * Diff
 * @desc From `T` pick properties that doesn't exist in `U`
 */
export type Diff<T extends object, U extends object> = (
  Pick<T, SetDifference<keyof T, keyof U>>
);

/**
 * Subtract
 * @desc From `T` pick properties that doesn't exist in `U`, when `U` is a subtype of `T`
 */
export type Subtract<T extends U, U extends object> = (
  Pick<T, SetComplement<keyof T, keyof U>>
);

/**
 * Overwrite
 * @desc Overwrite intersecting properties in `T` with `U`.
 */
export type Overwrite<T extends object, U extends object, N = Diff<T, U> & Omit<U, SetDifference<keyof U, keyof T>>> = (
  Pick<N, keyof N>
);

/**
 * Assign
 * @desc Assign `U` to `T` just like object assign
 */
export type Assign<T extends object, U extends object, N = (Diff<T, U> & U) & Omit<U, SetDifference<keyof U, keyof T>>> =
  Pick<N, keyof N>;

/**
 * FunctionKeys
 */
export type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

/**
 * NonFunctionKeys
 */
export type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

/**
 * DeepReadonly
 * @desc DeepReadonly - works for both Arrays and Objects
 */
export type DeepReadonly<T> =
  T extends any[] ? DeepReadonlyArray<T[number]> :
  T extends object ? DeepReadonlyObject<T> :
  T;

/**
 * DeepReadonlyArray
 * @desc DeepReadonlyArray - works for Arrays
 */
export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }

/**
 * DeepReadonlyObject
 * @desc DeepReadonlyObject - works for Objects
 */
export type DeepReadonlyObject<T> = {
  readonly [P in NonFunctionKeys<T>]: DeepReadonly<T[P]>;
};
