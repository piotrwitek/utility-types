import { inferType } from './test-utils';
import {
  SetIntersection,
  SetDifference,
  SetComplement,
  SymmetricDifference,
  FunctionKeys,
  NonUndefined,
  NonFunctionKeys,
  Omit,
  Intersection,
  Diff,
  Subtract,
  Overwrite,
  Assign,
  Unionize,
  PromiseType,
  DeepReadonly,
  DeepRequired,
  DeepNonNullable,
} from '.';

/**
 * Fixtures
 */

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };
type NewProps = { age: string; other: string };
type MixedProps = { name: string; setName: (name: string) => void };

/**
 * Tests
 */
// TODO: make grouping using dts-jest
describe('mapped types', () => {
  it('SetIntersection', () => {
    // @dts-jest:pass:snap
    inferType<SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>>();
    // @dts-jest:pass:snap
    inferType<SetIntersection<string | number | (() => void), () => void>>();
  });

  it('SetDifference', () => {
    // @dts-jest:pass:snap
    inferType<SetDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
    // @dts-jest:pass:snap
    inferType<SetDifference<string | number | (() => void), () => void>>();
  });

  it('SetComplement', () => {
    // @dts-jest:pass:snap
    inferType<SetComplement<'1' | '2' | '3', '2' | '3'>>();
  });

  it('SymmetricDifference', () => {
    // @dts-jest:pass:snap
    inferType<SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
  });

  it('NonUndefined', () => {
    // @dts-jest:pass:snap
    inferType<NonUndefined<'1' | '2' | undefined>>();
    // @dts-jest:pass:snap
    inferType<NonUndefined<undefined>>();
  });

  it('FunctionKeys', () => {
    // @dts-jest:pass:snap
    inferType<FunctionKeys<MixedProps>>();
  });

  it('NonFunctionKeys', () => {
    // @dts-jest:pass:snap
    inferType<NonFunctionKeys<MixedProps>>();
  });

  it('Omit', () => {
    // @dts-jest:pass:snap
    inferType<Omit<Props, 'age'>>();
    // @dts-jest:pass:snap
    inferType<Omit<Props | NewProps, 'age'>>();
  });

  it('Intersection', () => {
    // @dts-jest:pass:snap
    inferType<Intersection<Props, DefaultProps>>();
    // @dts-jest:pass:snap
    inferType<Intersection<Props | NewProps, DefaultProps>>();
  });

  it('Diff', () => {
    // @dts-jest:pass:snap
    inferType<Diff<Props, NewProps>>();
  });

  it('Subtract', () => {
    // @dts-jest:pass:snap
    inferType<Subtract<Props, DefaultProps>>();
  });

  it('Overwrite', () => {
    // @dts-jest:pass:snap
    inferType<Overwrite<Props, NewProps>>();
  });

  it('Assign', () => {
    // @dts-jest:pass:snap
    inferType<Assign<Props, NewProps>>();
  });

  it('Unionize', () => {
    // @dts-jest:pass:snap
    inferType<Unionize<Props>>();
  });

  it('PromiseType', () => {
    // @dts-jest:pass:snap
    inferType<PromiseType<Promise<string>>>();
  });

  it('DeepReadonly', () => {
    type NestedProps = {
      first: {
        second: {
          name: string;
        };
      };
    };
    // @dts-jest:pass:snap
    inferType<DeepReadonly<NestedProps>['first']>();
    // @dts-jest:pass:snap
    inferType<DeepReadonly<NestedProps>['first']['second']>();
    // @dts-jest:pass:snap
    inferType<DeepReadonly<NestedProps>['first']['second']['name']>();

    type NestedArrayProps = {
      first: {
        second: Array<{ name: string }>;
      };
    };
    // @dts-jest:pass:snap
    inferType<DeepReadonly<NestedArrayProps>['first']>();
    // @dts-jest:pass:snap
    inferType<DeepReadonly<NestedArrayProps>['first']['second']>();
    // @dts-jest:pass:snap
    inferType<
      DeepReadonly<NestedArrayProps>['first']['second'][number]['name']
    >();
  });

  it('DeepRequired', () => {
    type NestedProps = {
      first?: {
        second?: {
          name?: string | null;
        };
      };
    };
    // @dts-jest:pass:snap
    inferType<DeepRequired<NestedProps>['first']>();
    // @dts-jest:pass:snap
    inferType<DeepRequired<NestedProps>['first']['second']>();
    // @dts-jest:pass:snap
    inferType<DeepRequired<NestedProps>['first']['second']['name']>();

    type NestedArrayProps = {
      first?: {
        second?: Array<{ name?: string | null } | undefined>;
      };
    };
    // @dts-jest:pass:snap
    inferType<DeepRequired<NestedArrayProps>['first']>();
    // @dts-jest:pass:snap
    inferType<DeepRequired<NestedArrayProps>['first']['second']>();
    // @dts-jest:pass:snap
    inferType<
      DeepRequired<NestedArrayProps>['first']['second'][number]['name']
    >();
  });

  it('DeepNonNullable', () => {
    type NestedProps = {
      first?: null | {
        second?: null | {
          name?: null | string;
        };
      };
    };
    // @dts-jest:pass:snap
    inferType<DeepNonNullable<NestedProps>['first']>();
    // @dts-jest:pass:snap
    inferType<DeepNonNullable<NestedProps>['first']['second']>();
    // @dts-jest:pass:snap
    inferType<DeepNonNullable<NestedProps>['first']['second']['name']>();

    type NestedArrayProps = {
      first?: null | {
        second?: Array<{ name?: string | null } | undefined | null>;
      };
    };
    // @dts-jest:pass:snap
    inferType<DeepNonNullable<NestedArrayProps>['first']>();
    // @dts-jest:pass:snap
    inferType<DeepNonNullable<NestedArrayProps>['first']['second']>();
    // @dts-jest:pass:snap
    inferType<
      DeepNonNullable<NestedArrayProps>['first']['second'][number]['name']
    >();
  });
});
