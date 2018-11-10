import { inferType } from './test-utils';
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

describe('utility types', () => {
  it('$Keys', () => {
    // @dts-jest:pass:snap -> "name" | "age" | "visible"
    inferType<$Keys<Props>>();
  });

  it('$Values', () => {
    // @dts-jest:pass:snap -> string | number | boolean
    inferType<$Values<Props>>();
  });

  it('$ReadOnly', () => {
    // @dts-jest:pass:snap -> import("/Users/piotrek/Dev/utility-types/src/mapped-types")._DeepReadonlyObject<Props>
    inferType<$ReadOnly<Props>>();
  });

  it('$Diff', () => {
    // @dts-jest:pass:snap -> Pick<Props, "name" | "visible">
    inferType<$Diff<Props, DefaultProps>>();
  });

  it('$PropertyType', () => {
    // @dts-jest:pass:snap -> string
    inferType<$PropertyType<Props, 'name'>>();

    // @dts-jest:pass:snap -> boolean
    inferType<$PropertyType<[boolean, number], '0'>>();
    // @dts-jest:pass:snap -> number
    inferType<$PropertyType<[boolean, number], '1'>>();
  });

  it('$ElementType', () => {
    // @dts-jest:pass:snap -> string
    inferType<$ElementType<Props, 'name'>>();

    // @dts-jest:pass:snap -> boolean
    inferType<$ElementType<[boolean, number], 0>>();
    // @dts-jest:pass:snap -> number
    inferType<$ElementType<[boolean, number], 1>>();

    // @dts-jest:pass:snap -> boolean
    inferType<$ElementType<boolean[], number>>();

    // @dts-jest:pass:snap -> number
    inferType<$ElementType<{ [key: string]: number }, string>>();
  });

  it('$Call', () => {
    // @dts-jest:pass:snap -> { type: "ADD"; payload: number; }
    inferType<$Call<(amount: number) => { type: 'ADD'; payload: number }>>();

    type ExtractPropType<T extends { prop: any }> = (arg: T) => T['prop'];
    type Obj = { prop: number };
    type PropType = $Call<ExtractPropType<Obj>>;
    // @dts-jest:pass:snap -> number
    inferType<PropType>();
    // type Nope = $Call<ExtractPropType<{ nope: number }>>; // Error: argument doesn't match `Obj`.

    type ExtractReturnType<T extends () => any> = (arg: T) => ReturnType<T>;
    type Fn = () => number;
    type FnReturnType = $Call<ExtractReturnType<Fn>>;
    // @dts-jest:pass:snap -> number
    inferType<FnReturnType>();
  });
});
