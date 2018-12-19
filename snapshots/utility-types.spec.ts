import { testType } from '../utils/test-utils';
import {
  $Call,
  $Keys,
  $Values,
  $ReadOnly,
  $Diff,
  $PropertyType,
  $ElementType,
} from './';

/**
 * Fixtures
 */

type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };

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
  // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepReadonlyObject<Props>
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
