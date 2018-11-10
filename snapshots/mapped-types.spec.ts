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

describe('mapped types', () => {
  it('SetIntersection', () => {
    // @dts-jest:pass:snap -> "2" | "3"
    inferType<SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>>();
    // @dts-jest:pass:snap -> () => void
    inferType<SetIntersection<string | number | (() => void), () => void>>();
  });

  it('SetDifference', () => {
    // @dts-jest:pass:snap -> "1"
    inferType<SetDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
    // @dts-jest:pass:snap -> string | number
    inferType<SetDifference<string | number | (() => void), () => void>>();
  });

  it('SetComplement', () => {
    // @dts-jest:pass:snap -> "1"
    inferType<SetComplement<'1' | '2' | '3', '2' | '3'>>();
  });

  it('SymmetricDifference', () => {
    // @dts-jest:pass:snap -> "1" | "4"
    inferType<SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
  });

  it('NonUndefined', () => {
    // @dts-jest:pass:snap -> "1" | "2"
    inferType<NonUndefined<'1' | '2' | undefined>>();
    // @dts-jest:pass:snap -> never
    inferType<NonUndefined<undefined>>();
  });

  it('FunctionKeys', () => {
    // @dts-jest:pass:snap -> "setName"
    inferType<FunctionKeys<MixedProps>>();
  });

  it('NonFunctionKeys', () => {
    // @dts-jest:pass:snap -> "name"
    inferType<NonFunctionKeys<MixedProps>>();
  });

  it('Omit', () => {
    // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
    inferType<Omit<Props, 'age'>>();
    // @dts-jest:pass:snap -> Pick<Props, "name" | "visible"> | Pick<NewProps, "other">
    inferType<Omit<Props | NewProps, 'age'>>();
  });

  it('Intersection', () => {
    // @dts-jest:pass:snap -> Pick<Props, "age">
    inferType<Intersection<Props, DefaultProps>>();
    // @dts-jest:pass:snap -> Pick<Props, "age"> | Pick<NewProps, "age">
    inferType<Intersection<Props | NewProps, DefaultProps>>();
  });

  it('Diff', () => {
    // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
    inferType<Diff<Props, NewProps>>();
  });

  it('Subtract', () => {
    // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
    inferType<Subtract<Props, DefaultProps>>();
  });

  it('Overwrite', () => {
    // @dts-jest:pass:snap -> Pick<Pick<Props, "name" | "visible"> & Pick<NewProps, "age">, "name" | "age" | "visible">
    inferType<Overwrite<Props, NewProps>>();
  });

  it('Assign', () => {
    // @dts-jest:pass:snap -> Pick<Pick<Props, "name" | "visible"> & Pick<NewProps, "age"> & Pick<NewProps, "other">, "name" | "age" | "visible" | "other">
    inferType<Assign<Props, NewProps>>();
  });

  it('Unionize', () => {
    // @dts-jest:pass:snap -> { name: string; } | { age: number; } | { visible: boolean; }
    inferType<Unionize<Props>>();
  });

  it('PromiseType', () => {
    // @dts-jest:pass:snap -> string
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
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepReadonlyObject<{ second: { name: string; }; }>
    inferType<DeepReadonly<NestedProps>['first']>();
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepReadonlyObject<{ name: string; }>
    inferType<DeepReadonly<NestedProps>['first']['second']>();
    // @dts-jest:pass:snap -> string
    inferType<DeepReadonly<NestedProps>['first']['second']['name']>();

    type NestedArrayProps = {
      first: {
        second: Array<{ name: string }>;
      };
    };
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepReadonlyObject<{ second: { name: string; }[]; }>
    inferType<DeepReadonly<NestedArrayProps>['first']>();
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepReadonlyArray<{ name: string; }>
    inferType<DeepReadonly<NestedArrayProps>['first']['second']>();
    // @dts-jest:pass:snap -> string
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
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepRequiredObject<{ second?: { name?: string | null | undefined; } | undefined; }>
    inferType<DeepRequired<NestedProps>['first']>();
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepRequiredObject<{ name?: string | null | undefined; }>
    inferType<DeepRequired<NestedProps>['first']['second']>();
    // @dts-jest:pass:snap -> string | null
    inferType<DeepRequired<NestedProps>['first']['second']['name']>();

    type NestedArrayProps = {
      first?: {
        second?: Array<{ name?: string | null } | undefined>;
      };
    };
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepRequiredObject<{ second?: ({ name?: string | null | undefined; } | undefined)[] | undefined; }>
    inferType<DeepRequired<NestedArrayProps>['first']>();
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepRequiredArray<{ name?: string | null | undefined; } | undefined>
    inferType<DeepRequired<NestedArrayProps>['first']['second']>();
    // @dts-jest:pass:snap -> string | null
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
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepNonNullableObject<{ second?: { name?: string | null | undefined; } | null | undefined; }>
    inferType<DeepNonNullable<NestedProps>['first']>();
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepNonNullableObject<{ name?: string | null | undefined; }>
    inferType<DeepNonNullable<NestedProps>['first']['second']>();
    // @dts-jest:pass:snap -> string
    inferType<DeepNonNullable<NestedProps>['first']['second']['name']>();

    type NestedArrayProps = {
      first?: null | {
        second?: Array<{ name?: string | null } | undefined | null>;
      };
    };
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepNonNullableObject<{ second?: ({ name?: string | null | undefined; } | null | undefined)[] | undefined; }>
    inferType<DeepNonNullable<NestedArrayProps>['first']>();
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepNonNullableArray<{ name?: string | null | undefined; } | null | undefined>
    inferType<DeepNonNullable<NestedArrayProps>['first']['second']>();
    // @dts-jest:pass:snap -> string
    inferType<
      DeepNonNullable<NestedArrayProps>['first']['second'][number]['name']
    >();
  });
});
