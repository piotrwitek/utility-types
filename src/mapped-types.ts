/**
 * TypeScript type-mapping utilities to complement Pick and Record.
 * Credits to people who shared some of below snippets in the following github issue:
 * @see https://github.com/Microsoft/TypeScript/issues/12215
 */

// export interface IsType<T> {
//   (v: T): '1';
//   (v: any): '0';
// }

/**
 * DiffKeys
 * @desc Compare set of keys `K` and `L` and return a subset with a difference
 * by @ahejlsberg
 */
export type DiffKeys<K extends string, L extends string> = (
  & {[P in K]: P }
  & {[P in L]: never }
  & { [k: string]: never }
)[K];

/**
 * OmitKeys
 * @desc From set of keys `K` subtract it's subset `K2`
 * by -
 */

export type OmitKeys<K extends string, K2 extends K> = (
  DiffKeys<K, K2>
);
/**
 * Diff
 * @desc From `T` remove intersecting properties with `U`
 * by -
 */
export type Diff<T extends object, U extends object> = Pick<T, DiffKeys<keyof T, keyof U>>;

/**
 * Omit
 * @desc From `T` remove a set of properties `K`
 * by @ahejlsberg, @Pinpickle
 */
export type Omit<T extends object, K extends keyof T> = Pick<T, DiffKeys<keyof T, K>>;

/**
 * Overwrite
 * @desc Replace intersecting properties from `U` to `T`
 * by @ahejlsberg
 */
export type Overwrite<T extends object, U extends object> =
  Pick<
  (Diff<T, U> & U),
  OmitKeys<keyof T, never>
  >;

/**
 * Assign
 * @desc Copy and replace all properties from `U` to `T`
 * by -
 */
export type Assign<T extends object, U extends object> =
  Pick<
  (Diff<T, U> & U),
  OmitKeys<keyof (T & U), never>
  >;
