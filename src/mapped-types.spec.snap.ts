import { testType } from '../utils/test-utils';
import {
  SetIntersection,
  SetDifference,
  SetComplement,
  SymmetricDifference,
  FunctionKeys,
  NonUndefined,
  NonFunctionKeys,
  Omit,
  PickByValue,
  OmitByValue,
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
  DeepPartial,
  WritableKeys,
  ReadonlyKeys,
  _DeepNonNullableArray,
  _DeepNonNullableObject,
  _DeepReadonlyArray,
  _DeepReadonlyObject,
  _DeepRequiredArray,
  _DeepRequiredObject,
  _DeepPartialObject,
  _DeepPartialArray,
} from './mapped-types';

/**
 * Fixtures
 */

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };
type NewProps = { age: string; other: string };
type MixedProps = { name: string; setName: (name: string) => void };
type ReadWriteProps = { readonly a: number; b: string };

/**
 * Tests
 */

// @dts-jest:group SetIntersection
it('SetIntersection', () => {
  // @dts-jest:pass:snap -> "2" | "3"
  testType<SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>>();
  // @dts-jest:pass:snap -> () => void
  testType<SetIntersection<string | number | (() => void), () => void>>();
});

// @dts-jest:group SetDifference
it('SetDifference', () => {
  // @dts-jest:pass:snap -> "1"
  testType<SetDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
  // @dts-jest:pass:snap -> string | number
  testType<SetDifference<string | number | (() => void), () => void>>();
});

// @dts-jest:group SetComplement
it('SetComplement', () => {
  // @dts-jest:pass:snap -> "1"
  testType<SetComplement<'1' | '2' | '3', '2' | '3'>>();
});

// @dts-jest:group SymmetricDifference
it('SymmetricDifference', () => {
  // @dts-jest:pass:snap -> "1" | "4"
  testType<SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
});

// @dts-jest:group NonUndefined
it('NonUndefined', () => {
  // @dts-jest:pass:snap -> "1" | "2"
  testType<NonUndefined<'1' | '2' | undefined>>();
  // @dts-jest:pass:snap -> never
  testType<NonUndefined<undefined>>();
});

// @dts-jest:group FunctionKeys
it('FunctionKeys', () => {
  // @dts-jest:pass:snap -> "setName"
  testType<FunctionKeys<MixedProps>>();
});

// @dts-jest:group NonFunctionKeys
it('NonFunctionKeys', () => {
  // @dts-jest:pass:snap -> "name"
  testType<NonFunctionKeys<MixedProps>>();
});

// @dts-jest:group Omit
it('Omit', () => {
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
  testType<Omit<Props, 'age'>>();
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible"> | Pick<NewProps, "other">
  testType<Omit<Props | NewProps, 'age'>>();
});

// @dts-jest:group PickByValue
it('PickByValue', () => {
  // @dts-jest:pass:snap -> Pick<Props, "name" | "age">
  testType<PickByValue<Props, string | number>>();
});

// @dts-jest:group OmitByValue
it('OmitByValue', () => {
  // @dts-jest:pass:snap -> Pick<Props, "visible">
  testType<OmitByValue<Props, string | number>>();
});

// @dts-jest:group Intersection
it('Intersection', () => {
  // @dts-jest:pass:snap -> Pick<Props, "age">
  testType<Intersection<Props, DefaultProps>>();
  // @dts-jest:pass:snap -> Pick<Props, "age"> | Pick<NewProps, "age">
  testType<Intersection<Props | NewProps, DefaultProps>>();
});

// @dts-jest:group Diff
it('Diff', () => {
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
  testType<Diff<Props, NewProps>>();
});

// @dts-jest:group Subtract
it('Subtract', () => {
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
  testType<Subtract<Props, DefaultProps>>();
});

// @dts-jest:group Overwrite
it('Overwrite', () => {
  // @dts-jest:pass:snap -> Pick<Pick<Props, "name" | "visible"> & Pick<NewProps, "age">, "name" | "age" | "visible">
  testType<Overwrite<Props, NewProps>>();
});

// @dts-jest:group Assign
it('Assign', () => {
  // @dts-jest:pass:snap -> Pick<Pick<Props, "name" | "visible"> & Pick<NewProps, "age"> & Pick<NewProps, "other">, "name" | "age" | "visible" | "other">
  testType<Assign<Props, NewProps>>();
});

// @dts-jest:group Unionize
it('Unionize', () => {
  // @dts-jest:pass:snap -> { name: string; } | { age: number; } | { visible: boolean; }
  testType<Unionize<Props>>();
});

// @dts-jest:group PromiseType
it('PromiseType', () => {
  // @dts-jest:pass:snap -> string
  testType<PromiseType<Promise<string>>>();
});

// @dts-jest:group DeepReadonly
it('DeepReadonly', () => {
  type NestedProps = {
    first: {
      second: {
        name: string;
      };
    };
  };
  // @dts-jest:pass:snap -> _DeepReadonlyObject<{ second: { name: string; }; }>
  testType<DeepReadonly<NestedProps>['first']>();
  // @dts-jest:pass:snap -> _DeepReadonlyObject<{ name: string; }>
  testType<DeepReadonly<NestedProps>['first']['second']>();
  // @dts-jest:pass:snap -> string
  testType<DeepReadonly<NestedProps>['first']['second']['name']>();

  type NestedArrayProps = {
    first: {
      second: Array<{ name: string }>;
    };
  };
  // @dts-jest:pass:snap -> _DeepReadonlyObject<{ second: { name: string; }[]; }>
  testType<DeepReadonly<NestedArrayProps>['first']>();
  // @dts-jest:pass:snap -> _DeepReadonlyArray<{ name: string; }>
  testType<DeepReadonly<NestedArrayProps>['first']['second']>();
  // @dts-jest:pass:snap -> string
  testType<DeepReadonly<NestedArrayProps>['first']['second'][number]['name']>();

  type NestedFunctionProps = {
    first: {
      second: (value: number) => string;
    };
  };
  // @dts-jest:pass:snap -> _DeepReadonlyObject<{ second: (value: number) => string; }>
  testType<DeepReadonly<NestedFunctionProps>['first']>();
  // @dts-jest:pass:snap -> (value: number) => string
  testType<DeepReadonly<NestedFunctionProps>['first']['second']>();
  // @dts-jest:pass:snap -> string
  testType<ReturnType<DeepReadonly<NestedFunctionProps>['first']['second']>>();
});

// @dts-jest:group DeepRequired
it('DeepRequired', () => {
  type NestedProps = {
    first?: {
      second?: {
        name?: string | null;
      };
    };
  };
  // @dts-jest:pass:snap -> _DeepRequiredObject<{ second?: { name?: string | null | undefined; } | undefined; }>
  testType<DeepRequired<NestedProps>['first']>();
  // @dts-jest:pass:snap -> _DeepRequiredObject<{ name?: string | null | undefined; }>
  testType<DeepRequired<NestedProps>['first']['second']>();
  // @dts-jest:pass:snap -> string | null
  testType<DeepRequired<NestedProps>['first']['second']['name']>();

  type NestedArrayProps = {
    first?: {
      second?: Array<{ name?: string | null } | undefined>;
    };
  };
  // @dts-jest:pass:snap -> _DeepRequiredObject<{ second?: ({ name?: string | null | undefined; } | undefined)[] | undefined; }>
  testType<DeepRequired<NestedArrayProps>['first']>();
  // @dts-jest:pass:snap -> _DeepRequiredArray<{ name?: string | null | undefined; } | undefined>
  testType<DeepRequired<NestedArrayProps>['first']['second']>();
  // @dts-jest:pass:snap -> string | null
  testType<DeepRequired<NestedArrayProps>['first']['second'][number]['name']>();

  type NestedFunctionProps = {
    first?: {
      second?: (value: number) => string;
    };
  };
  // @dts-jest:pass:snap -> _DeepRequiredObject<{ second?: ((value: number) => string) | undefined; }>
  testType<DeepRequired<NestedFunctionProps>['first']>();
  // @dts-jest:pass:snap -> (value: number) => string
  testType<DeepRequired<NestedFunctionProps>['first']['second']>();
  // @dts-jest:pass:snap -> string
  testType<ReturnType<DeepRequired<NestedFunctionProps>['first']['second']>>();
});

// @dts-jest:group DeepNonNullable
it('DeepNonNullable', () => {
  type NestedProps = {
    first?: null | {
      second?: null | {
        name?: null | string;
      };
    };
  };
  // @dts-jest:pass:snap -> _DeepNonNullableObject<{ second?: { name?: string | null | undefined; } | null | undefined; }>
  testType<DeepNonNullable<NestedProps>['first']>();
  // @dts-jest:pass:snap -> _DeepNonNullableObject<{ name?: string | null | undefined; }>
  testType<DeepNonNullable<NestedProps>['first']['second']>();
  // @dts-jest:pass:snap -> string
  testType<DeepNonNullable<NestedProps>['first']['second']['name']>();

  type NestedArrayProps = {
    first?: null | {
      second?: Array<{ name?: string | null } | undefined | null>;
    };
  };
  // @dts-jest:pass:snap -> _DeepNonNullableObject<{ second?: ({ name?: string | null | undefined; } | null | undefined)[] | undefined; }>
  testType<DeepNonNullable<NestedArrayProps>['first']>();
  // @dts-jest:pass:snap -> _DeepNonNullableArray<{ name?: string | null | undefined; } | null | undefined>
  testType<DeepNonNullable<NestedArrayProps>['first']['second']>();
  // @dts-jest:pass:snap -> string
  testType<
    DeepNonNullable<NestedArrayProps>['first']['second'][number]['name']
  >();

  type NestedFunctionProps = {
    first?: null | {
      second?: (value: number) => string;
    };
  };
  // @dts-jest:pass:snap -> _DeepNonNullableObject<{ second?: ((value: number) => string) | undefined; }>
  testType<DeepNonNullable<NestedFunctionProps>['first']>();
  // @dts-jest:pass:snap -> (value: number) => string
  testType<DeepNonNullable<NestedFunctionProps>['first']['second']>();
  // @dts-jest:pass:snap -> string
  testType<
    ReturnType<DeepNonNullable<NestedFunctionProps>['first']['second']>
  >();
});

// @dts-jest:group DeepPartial
it('DeepPartial', () => {
  type NestedProps = {
    first: {
      second: {
        name: string;
      };
    };
  };
  const partialNested: DeepPartial<NestedProps> = {} as any;
  // @dts-jest:pass:snap -> _DeepPartialObject<{ second: { name: string; }; }> | undefined
  testType<typeof partialNested.first>();

  const second = partialNested.first!.second;
  // @dts-jest:pass:snap -> _DeepPartialObject<{ name: string; }> | undefined
  testType<typeof second>();

  const name = second!.name;
  // @dts-jest:pass:snap -> string | undefined
  testType<typeof name>();

  type NestedArrayProps = {
    first: {
      second: Array<{ name: string }>;
    };
  };

  const nestedArrayPartial: DeepPartial<NestedArrayProps> = {};
  // @dts-jest:pass:snap -> _DeepPartialObject<{ second: { name: string; }[]; }> | undefined
  testType<typeof nestedArrayPartial.first>();

  const arrayProp = nestedArrayPartial.first!.second;
  // @dts-jest:pass:snap -> _DeepPartialArray<{ name: string; }> | undefined
  testType<typeof arrayProp>();

  const arrayItem = arrayProp![0];
  // @dts-jest:pass:snap -> string | undefined
  testType<typeof arrayItem.name>();

  type NestedFunctionProps = {
    first: {
      second: (value: number) => string;
    };
  };
  const nestedFunctionPartial: DeepPartial<NestedFunctionProps> = {};
  // @dts-jest:pass:snap -> _DeepPartialObject<{ second: (value: number) => string; }> | undefined
  testType<typeof nestedFunctionPartial.first>();

  const functionProp = nestedFunctionPartial.first!.second;
  // @dts-jest:pass:snap -> ((value: number) => string) | undefined
  testType<typeof functionProp>();
  // @dts-jest:pass:snap -> string
  testType<ReturnType<NonNullable<typeof functionProp>>>();
});

// @dts-jest:group WritableKeys
it('WritableKeys', () => {
  // @dts-jest:pass:snap -> "b"
  testType<WritableKeys<ReadWriteProps>>();
});

// @dts-jest:group ReadonlyKeys
it('ReadonlyKeys', () => {
  // @dts-jest:pass:snap -> "a"
  testType<ReadonlyKeys<ReadWriteProps>>();
});
