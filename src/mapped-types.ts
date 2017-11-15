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
export type Diff<T extends string, U extends string> = (
  & {[P in T]: P }
  & {[P in U]: never }
  & { [x: string]: never }
)[T];
// TestDiff expects: 'a' | 'b'
type TestDiff =
  Diff<'a' | 'b' | 'c', 'c' | 'd'>;

/** Omit */
export type Omit<T, K extends keyof T> = {
  [P in Diff<keyof T, K>]: T[P]
};
// TestOmit expects: { b: number, c: boolean }
type TestOmit =
  Omit<{ a: string, b: number, c: boolean }, 'a'>;

/** Overwrite */
export type Overwrite<T, U> = {
  [P in Diff<keyof T, keyof U>]: T[P]
} & U;
// TestOverwrite expects: { b: number, c: boolean } & { a: number }
type TestOverwrite =
  Overwrite<{ a: string, b: number, c: boolean }, { a: number }>;
