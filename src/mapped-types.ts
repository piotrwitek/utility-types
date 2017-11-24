/**
 * TypeScript type-mapping utilities to complement Pick and Record.
 * I'm not the author, please check linked issue to find more
 * @see https://github.com/Microsoft/TypeScript/issues/12215
 */

// export interface IsType<T> {
//   (v: T): '1';
//   (v: any): '0';
// }

/** Diff */
export type KeyDiff<T extends string, U extends string> = (
  & {[K in T]: K }
  & {[K in U]: never }
  & { [k: string]: never }
)[T];

type KeyDiffTest =
  KeyDiff<'a' | 'b' | 'c', 'c' | 'd'>;
// Expect: 'a' | 'b'

/** Omit */
export type Omit<T, K extends keyof T> = Pick<T, KeyDiff<keyof T, K>>;

type OmitTest =
  Omit<{ a: string, b?: number, c: boolean }, 'a'>;
// Expect: { b?: number | undefined, c: boolean }

/** Minus */
export type Minus<T, U> = Pick<T, KeyDiff<keyof T, keyof U>>;

type MinusTest =
  Minus<{ a: string, b?: number, c: boolean }, { a: any }>;
// Expect { b?: number | undefined, c: boolean }

/** Overwrite */
export type Overwrite<T, U> = Pick<T, KeyDiff<keyof T, keyof U>> & U;

type OverwriteTest =
  Overwrite<{ a: string, b?: number, c: boolean }, { a: number }>;
// Expect: { b?: number | undefined, c: boolean } & { a: number }
