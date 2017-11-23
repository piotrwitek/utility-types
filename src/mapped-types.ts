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
// DiffTestResult expect: 'a' | 'b'
type DiffTestResult =
  Diff<'a' | 'b' | 'c', 'c' | 'd'>;

/** Omit */
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
// OmitTestResult expect: { b?: number | undefined, c: boolean }
type OmitTestResult =
  Omit<{ a: string, b?: number, c: boolean }, 'a'>;

/** Overwrite */
export type Overwrite<T, U> = {
  [P in Diff<keyof T, keyof U>]: T[P]
} & U;
// OverwriteTestResult expect: { b: number, c: boolean } & { a: number }
type OverwriteTestResult =
  Overwrite<{ a: string, b: number, c: boolean }, { a: number }>;
