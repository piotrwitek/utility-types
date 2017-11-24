/**
 * TypeScript type-mapping utilities to complement Pick and Record.
 * Credits to people who shared some of below snippets in the following github issue:
 * (mention in each definition)
 * @see https://github.com/Microsoft/TypeScript/issues/12215
 */

// export interface IsType<T> {
//   (v: T): '1';
//   (v: any): '0';
// }

/**
 * DiffKeys
 * @desc Return a difference of non-related string literal unions
 * by @ahejlsberg
 */
export type DiffKeys<T extends string, U extends string> = (
  & {[K in T]: K }
  & {[K in U]: never }
  & { [k: string]: never }
)[T];

/**
 * OmitKeys
 * @desc Omit part of string literal union with constraint to existing literals
 * by -
 */

export type OmitKeys<T extends string, U extends T> = (
  DiffKeys<T, U>
);
/**
 * Diff
 * @desc Return an object containing non-intersecting properties of non-related objects
 * by -
 */
export type Diff<T extends object, U extends object> = Pick<T, DiffKeys<keyof T, keyof U>>;

/**
 * Omit
 * @desc Omit object property with constraint to existing keys
 * by @ahejlsberg, @Pinpickle
 */
export type Omit<T extends object, K extends keyof T> = Pick<T, DiffKeys<keyof T, K>>;

/**
 * Overwrite
 * @desc Overwrite intersecting properties from <U> to <T>
 * by @ahejlsberg
 */
export type Overwrite<T extends object, U extends object> =
  Pick<
  (Diff<T, U> & U),
  OmitKeys<keyof T, never>
  >;

/**
 * Assign
 * @desc Assign properties from <U> to <T> (overwrite intersecting)
 * by -
 */
export type Assign<T extends object, U extends object> =
  Pick<
  (Diff<T, U> & U),
  OmitKeys<keyof (T & U), never>
  >;
