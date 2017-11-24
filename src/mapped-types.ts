/**
 * TypeScript type-mapping utilities to complement Pick and Record.
 * Credits to people that shared some of below code snippets in this github issue:
 * @see https://github.com/Microsoft/TypeScript/issues/12215
 */

// export interface IsType<T> {
//   (v: T): '1';
//   (v: any): '0';
// }

/** DiffKeys */
export type DiffKeys<T extends string, U extends string> = (
  & {[K in T]: K }
  & {[K in U]: never }
  & { [k: string]: never }
)[T];

/** Diff */
export type Diff<T, U> = Pick<T, DiffKeys<keyof T, keyof U>>;

/** Omit */
export type Omit<T, K extends keyof T> = Pick<T, DiffKeys<keyof T, K>>;

/** Overwrite */
export type Overwrite<T, U> = Pick<T, KeyDiff<keyof T, keyof U>> & U;
