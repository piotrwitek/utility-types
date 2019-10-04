import { testType } from '../utils/test-utils';
import {
  $Call,
  $Keys,
  $Values,
  $ReadOnly,
  $Diff,
  $PropertyType,
  $ElementType,
  $Shape,
  $NonMaybeType,
  Class,
  mixed,
} from './utility-types';
import { _DeepReadonlyObject } from './mapped-types';
/**
 * Fixtures
 */

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

class Foo {}

/**
 * Tests
 */

// @dts-jest:group $Keys
it('$Keys', () => {
  // @dts-jest:pass:snap -> "name" | "age" | "visible"
  testType<$Keys<Props>>();
});

// @dts-jest:group $Values
it('$Values', () => {
  // @dts-jest:pass:snap -> string | number | boolean
  testType<$Values<Props>>();
});

// @dts-jest:group $ReadOnly
it('$ReadOnly', () => {
  // @dts-jest:pass:snap -> _DeepReadonlyObject<{ name: string; age: number; visible: boolean; }>
  testType<$ReadOnly<Props>>();
});

// @dts-jest:group $Diff
it('$Diff', () => {
  // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
  testType<$Diff<Props, DefaultProps>>();
});

// @dts-jest:group $PropertyType
it('$PropertyType', () => {
  // @dts-jest:pass:snap -> string
  testType<$PropertyType<Props, 'name'>>();

  // @dts-jest:pass:snap -> boolean
  testType<$PropertyType<[boolean, number], '0'>>();
  // @dts-jest:pass:snap -> number
  testType<$PropertyType<[boolean, number], '1'>>();
});

// @dts-jest:group $ElementType
it('$ElementType', () => {
  // @dts-jest:pass:snap -> string
  testType<$ElementType<Props, 'name'>>();

  // @dts-jest:pass:snap -> boolean
  testType<$ElementType<[boolean, number], 0>>();
  // @dts-jest:pass:snap -> number
  testType<$ElementType<[boolean, number], 1>>();

  // @dts-jest:pass:snap -> boolean
  testType<$ElementType<boolean[], number>>();

  // @dts-jest:pass:snap -> number
  testType<$ElementType<{ [key: string]: number }, string>>();
});

// @dts-jest:group $Call
it('$Call', () => {
  // @dts-jest:pass:snap -> { type: "ADD"; payload: number; }
  testType<$Call<(amount: number) => { type: 'ADD'; payload: number }>>();

  type ExtractPropType<T extends { prop: any }> = (arg: T) => T['prop'];
  type Obj = { prop: number };
  type PropType = $Call<ExtractPropType<Obj>>;
  // @dts-jest:pass:snap -> number
  testType<PropType>();
  // type Nope = $Call<ExtractPropType<{ nope: number }>>; // Error: argument doesn't match `Obj`.

  type ExtractReturnType<T extends () => any> = (arg: T) => ReturnType<T>;
  type Fn = () => number;
  type FnReturnType = $Call<ExtractReturnType<Fn>>;
  // @dts-jest:pass:snap -> number
  testType<FnReturnType>();
});

// @dts-jest:group $Shape
it('$Shape', () => {
  // @dts-jest:pass:snap -> Partial<Props>
  testType<$Shape<Props>>();
});

// @dts-jest:group $NonMaybeType
it('$NonMaybeType', () => {
  // @dts-jest:pass:snap -> string
  testType<$NonMaybeType<string | null | undefined>>();
});

// @dts-jest:group Class
it('Class', () => {
  // @dts-jest:pass:snap -> Class<Foo>
  testType<Class<Foo>>();
});

// @dts-jest:group mixed
it('mixed', () => {
  // @dts-jest:pass:snap -> unknown
  testType<mixed>();
});
