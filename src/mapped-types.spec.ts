import {
  DiffKeys,
  Diff,
  Omit,
  Overwrite,
} from '.';

interface Shape { a: string, b?: number, c: boolean }
interface Shape2 { a: number, d: number }

type DiffKeysTest = DiffKeys<keyof Shape, keyof Shape2>;
// Expect: 'b' | 'c'

type DiffTest = Diff<Shape, Shape2>;
// Expect { b?: number | undefined, c: boolean }

type OmitTest = Omit<Shape, 'a'>;
// Expect: { b?: number | undefined, c: boolean }

type OverwriteTest = Overwrite<Shape, { a: number }>;
// Expect: { a: number, b?: number | undefined, c: boolean }
