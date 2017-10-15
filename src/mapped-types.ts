/**
 * TypeScript type-mapping utilities to complement Pick and Record.
 * I'm not the author, please check linked issue to find more
 * @see https://github.com/Microsoft/TypeScript/issues/12215
 */

export interface IsType<T> {
  (v: T): '1';
  (v: any): '0';
}

export type Diff<T extends string, U extends string> = (
  & {[P in T]: P }
  & {[P in U]: never }
  & { [x: string]: never }
)[T];
// Test1 expect: "a" | "b"
type Test1 = Diff<'a' | 'b' | 'c', 'c' | 'd'>;

export type Omit<T, K extends keyof T> = {
  [P in Diff<keyof T, K>]: T[P]
};
// Test2 expect: { b: number, c: boolean }
type Test2 = Omit<{ a: string, b: number, c: boolean }, 'a'>;

export type Overwrite<T, U> =
  {[P in Diff<keyof T, keyof U>]: T[P]} & U;
// Test3 expect: { a: number, b: number, c: boolean }
type Test3 = Overwrite<{ a: string, b: number, c: boolean }, { a: number }>;
