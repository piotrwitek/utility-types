import { testType } from '../utils/test-utils';
import {
  Primitive,
  Falsey,
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
  Brand,
  _DeepNonNullableArray,
  _DeepNonNullableObject,
  _DeepReadonlyArray,
  _DeepReadonlyObject,
  _DeepRequiredArray,
  _DeepRequiredObject,
  _DeepPartialObject,
  _DeepPartialArray,
  RequiredKeys,
  OptionalKeys,
  PickByValueExact,
  OmitByValueExact,
  Optional,
} from './mapped-types';

/**
 * Fixtures
 */

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };
type NewProps = { age: string; other: string };
type MixedProps = {
  name: string;
  setName: (name: string) => void;
  someKeys?: string;
  someFn?: (...args: any) => any;
};
type ReadWriteProps = { readonly a: number; b: string };
type RequiredOptionalProps = {
  req: number;
  reqUndef: number | undefined;
  opt?: string;
  optUndef?: string | undefined;
};

/**
 * Tests
 */

// @dts-jest:group Primitive
{
  // @dts-jest:pass:snap -> Primitive
  testType<Primitive>();
}

// @dts-jest:group Falsey
{
  // @dts-jest:pass:snap -> Falsey
  testType<Falsey>();
}

// @dts-jest:group SetIntersection
{
  // @dts-jest:pass:snap -> "2" | "3"
  testType<SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>>();
  // @dts-jest:pass:snap -> () => void
  testType<SetIntersection<string | number | (() => void), () => void>>();
}

// @dts-jest:group SetDifference
{
  // @dts-jest:pass:snap -> "1"
  testType<SetDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
  // @dts-jest:pass:snap -> string | number
  testType<SetDifference<string | number | (() => void), () => void>>();
}

// @dts-jest:group SetComplement
{
  // @dts-jest:pass:snap -> "1"
  testType<SetComplement<'1' | '2' | '3', '2' | '3'>>();
}

// @dts-jest:group SymmetricDifference
{
  // @dts-jest:pass:snap -> "1" | "4"
  testType<SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>>();
}

// @dts-jest:group NonUndefined
{
  // @dts-jest:pass:snap -> string | null
  testType<NonUndefined<string | null | undefined>>();
  // @dts-jest:pass:snap -> never
  testType<NonUndefined<undefined>>();
}

// @dts-jest:group FunctionKeys
{
  // @dts-jest:pass:snap -> "setName | someFn "
  testType<FunctionKeys<MixedProps>>();
}

// @dts-jest:group NonFunctionKeys
{
  // @dts-jest:pass:snap -> "name | someKeys"
  testType<NonFunctionKeys<MixedProps>>();
}

// @dts-jest:group WritableKeys
{
  // @dts-jest:pass:snap -> "b"
  testType<WritableKeys<ReadWriteProps>>();
}

// @dts-jest:group ReadonlyKeys
{
  // @dts-jest:pass:snap -> "a"
  testType<ReadonlyKeys<ReadWriteProps>>();
}

// @dts-jest:group RequiredKeys
{
  // @dts-jest:pass:snap -> "req" | "reqUndef"
  testType<RequiredKeys<RequiredOptionalProps>>();
}

// @dts-jest:group OptionalKeys
{
  // @dts-jest:pass:snap -> "opt" | "optUndef"
  testType<OptionalKeys<RequiredOptionalProps>>();
}

// @dts-jest:group PickByValue
{
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "req" | undefined>
  testType<PickByValue<RequiredOptionalProps, number>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "req" | "reqUndef" | undefined>
  testType<PickByValue<RequiredOptionalProps, number | undefined>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, undefined>
  testType<PickByValue<RequiredOptionalProps, undefined>>();

  const fn = <T extends Props>(props: T) => {
    // @dts-jest:pass:snap -> Pick<T, { [Key in keyof T]: T[Key] extends number ? Key : never; }[keyof T]>
    testType<PickByValue<T, number>>();
  };
}

// @dts-jest:group PickByValueExact
{
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "req" | undefined>
  testType<PickByValueExact<RequiredOptionalProps, number>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "reqUndef" | undefined>
  testType<PickByValueExact<RequiredOptionalProps, number | undefined>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, undefined>
  testType<PickByValueExact<RequiredOptionalProps, undefined>>();

  const fn = <T extends Props>(props: T) => {
    // @dts-jest:pass:snap -> Pick<T, { [Key in keyof T]: [number] extends [T[Key]] ? [T[Key]] extends [T[Key] & number] ? Key : never : never; }[keyof T]>
    testType<PickByValueExact<T, number>>();
  };
}

// @dts-jest:group Omit
{
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
  testType<Omit<Props, 'age'>>();
  // @dts-jest:pass:snap -> Pick<Props | NewProps, never>
  testType<Omit<Props | NewProps, 'age'>>();

  const fn = <T extends Props>(props: T) => {
    // @dts-jest:pass:snap -> Pick<T, SetDifference<keyof T, "age">>
    testType<Omit<T, 'age'>>();

    const { age, ...rest } = props;
    // @dts-jest:pass:snap -> any
    const result: Omit<T, 'age'> = rest;
  };
}

// @dts-jest:group OmitByValue
{
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "reqUndef" | "opt" | "optUndef" | undefined>
  testType<OmitByValue<RequiredOptionalProps, number>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "opt" | "optUndef" | undefined>
  testType<OmitByValue<RequiredOptionalProps, number | undefined>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "req" | "reqUndef" | "opt" | "optUndef" | undefined>
  testType<OmitByValue<RequiredOptionalProps, undefined>>();

  const fn = <T extends Props>(props: T) => {
    // @dts-jest:pass:snap -> Pick<T, { [Key in keyof T]: T[Key] extends string | boolean ? never : Key; }[keyof T]>
    testType<OmitByValue<T, string | boolean>>();
  };
}

// @dts-jest:group OmitByValueExact
{
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "reqUndef" | "opt" | "optUndef" | undefined>
  testType<OmitByValueExact<RequiredOptionalProps, number>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "req" | "opt" | "optUndef" | undefined>
  testType<OmitByValueExact<RequiredOptionalProps, number | undefined>>();
  // @dts-jest:pass:snap -> Pick<RequiredOptionalProps, "req" | "reqUndef" | "opt" | "optUndef" | undefined>
  testType<OmitByValueExact<RequiredOptionalProps, undefined>>();

  const fn = <T extends Props>(props: T) => {
    // @dts-jest:pass:snap -> Pick<T, { [Key in keyof T]: [number] extends [T[Key]] ? [T[Key]] extends [T[Key] & number] ? never : Key : Key; }[keyof T]>
    testType<OmitByValueExact<T, number>>();
  };
}

// @dts-jest:group Intersection
{
  // @dts-jest:pass:snap -> Pick<Props, "age">
  testType<Intersection<Props, DefaultProps>>();
  // @dts-jest:pass:snap -> Pick<Props | NewProps, "age">
  testType<Intersection<Props | NewProps, DefaultProps>>();

  const fn = <T extends Props>(props: T) => {
    const { age, ...rest } = props;
    // @dts-jest:pass:snap -> any
    const result: Intersection<T, Omit<T, 'age'>> = rest;
  };
}

// @dts-jest:group Diff
{
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
  testType<Diff<Props, NewProps>>();

  const fn = <T extends Props>(props: T) => {
    const { age, ...rest } = props;
    // @dts-jest:pass:snap -> any
    const result: Diff<T, Pick<T, 'age'>> = rest;
  };
}

// @dts-jest:group Subtract
{
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
  testType<Subtract<Props, DefaultProps>>();

  const fn = <T extends Props>(props: T) => {
    const { age, ...rest } = props;
    // @dts-jest:pass:snap -> any
    const result: Subtract<T, Pick<T, 'age'>> = rest;
  };
}

// @dts-jest:group Overwrite
{
  // @dts-jest:pass:snap -> Pick<Pick<Props, "name" | "visible"> & Pick<NewProps, "age">, "name" | "age" | "visible">
  testType<Overwrite<Props, NewProps>>();

  const fn = <T extends Props>(props: T) => {
    const { age, ...rest } = props;
    // @dts-jest:pass:snap -> any
    const result: Overwrite<Omit<T, 'age'>, T> = rest;
  };
}

// @dts-jest:group Assign
{
  // @dts-jest:pass:snap -> Pick<Pick<Props, "name" | "visible"> & Pick<NewProps, "age"> & Pick<NewProps, "other">, "name" | "age" | "visible" | "other">
  testType<Assign<Props, NewProps>>();

  const fn = <T extends Props>(props: T) => {
    const { age, ...rest } = props;
    // @dts-jest:pass:snap -> any
    const result: Assign<{}, Omit<T, 'age'>> = rest;
  };
}

// @dts-jest:group Unionize
{
  // @dts-jest:pass:snap -> { name: string; } | { age: number; } | { visible: boolean; }
  testType<Unionize<Props>>();
}

// @dts-jest:group PromiseType
{
  // @dts-jest:pass:snap -> string
  testType<PromiseType<Promise<string>>>();
}

// @dts-jest:group DeepReadonly
{
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
}

// @dts-jest:group DeepRequired
{
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
}

// @dts-jest:group DeepNonNullable
{
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
}

// @dts-jest:group DeepPartial
{
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
}

// @dts-jest:group Brand
{
  // @dts-jest:pass:snap -> Brand<number, "USD">
  testType<Brand<number, 'USD'>>();
}

// @dts-jest:group Optional
{
  // @dts-jest:pass:snap -> Optional<Props, "name" | "age" | "visible">
  testType<Optional<Props>>({});
  // @dts-jest:pass:snap -> Optional<Props, "name" | "age" | "visible">
  testType<Optional<Props>>({ age: 99 });

  // @dts-jest:pass:snap -> Optional<Props, "age" | "visible">
  testType<Optional<Props, 'age' | 'visible'>>({ name: 'Yolo' });
  // @dts-jest:pass:snap -> Optional<Props, "age" | "visible">
  testType<Optional<Props, 'age' | 'visible'>>({ name: 'Yolo', age: 99 });
}
