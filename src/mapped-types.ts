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
// KeyDiffTest expect: 'a' | 'b'
type KeyDiffTest =
  KeyDiff<'a' | 'b' | 'c', 'c' | 'd'>;

/** Omit */
export type Omit<T, K extends keyof T> = Pick<T, KeyDiff<keyof T, K>>;
// OmitTest expect: { b?: number | undefined, c: boolean }
type OmitTest =
  Omit<{ a: string, b?: number, c: boolean }, 'a'>;

/** Minus */
export type Minus<T, U> = Pick<T, KeyDiff<keyof T, keyof U>>;
// MinusTest expect { b?: number | undefined, c: boolean }
type MinusTest =
  Minus<{ a: string, b?: number, c: boolean }, { a: any }>;

/** Overwrite */
export type Overwrite<T, U> = {
  [K in KeyDiff<keyof T, keyof U>]: T[K]
} & U;
// OverwriteTest expect: { b?: number | undefined, c: boolean } & { a: number }
// FIX EDGE CASE: Optional prop
type OverwriteTest =
  Overwrite<{ a: string, b?: number, c: boolean }, { a: number }>;
