import { testType } from './test-utils';
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
type UpdatedProps = { age: string };
type OtherProps = { other: string };
/**
 * Tests
 */
describe('utility types', () => {
  it('$Keys', () => {
    type PropsKeys = $Keys<Props>;
    // Expect: "name" | "age" | "visible"
    testType<PropsKeys>('name');
    testType<PropsKeys>('age');
    testType<PropsKeys>('visible');
  });

  it('$Values', () => {
    type PropsValues = $Values<Props>;
    // Expect: string | number | boolean
    testType<PropsValues>('a');
    testType<PropsValues>(1);
    testType<PropsValues>(true);
  });

  it('$ReadOnly', () => {
    type ReadOnlyProps = $ReadOnly<Props>;
    // Expect: Readonly<{ name: string; age?: number | undefined; visible: boolean; }>
    testType<ReadOnlyProps>({ name: 'a', age: 2, visible: true });
  });

  it('$Diff', () => {
    type RequiredProps = $Diff<Props, DefaultProps>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });
  });

  it('$PropertyType', () => {
    type NameType = $PropertyType<Props, 'name'>;
    // Expect: string
    testType<NameType>('foo');

    type Tuple = [boolean, number];
    type A = $PropertyType<Tuple, '0'>;
    // Expect: boolean
    type B = $PropertyType<Tuple, '1'>;
    // Expect: number
    testType<A>(true);
    testType<B>(42);
  });

  it('$ElementType', () => {
    type NameType = $ElementType<Props, 'name'>;
    // Expect: string
    testType<NameType>('foo');

    type Tuple = [boolean, number];
    type A = $ElementType<Tuple, 0>;
    // Expect: boolean
    type B = $ElementType<Tuple, 1>;
    // Expect: number
    testType<A>(true);
    testType<B>(42);

    type Arr = boolean[];
    type ItemsType = $ElementType<Arr, number>;
    // Expect: boolean
    testType<ItemsType>(true);

    type Obj = { [key: string]: number };
    type ValuesType = $ElementType<Obj, string>;
    // Expect: number
    testType<ValuesType>(42);
  });

  it('$Call', () => {
    type ActionType = $Call<
      (amount: number) => { type: 'ADD'; payload: number }
    >;
    // Expect: { type: 'ADD'; payload: number }
    testType<ActionType>({ type: 'ADD', payload: 1 });

    type ExtractPropType<T extends { prop: any }> = (arg: T) => T['prop'];
    type Obj = { prop: number };
    type PropType = $Call<ExtractPropType<Obj>>;
    testType<PropType>(4);
    // type Nope = $Call<ExtractPropType<{ nope: number }>>; // Error: argument doesn't match `Obj`.

    type ExtractReturnType<T extends () => any> = (arg: T) => ReturnType<T>;
    type Fn = () => number;
    type FnReturnType = $Call<ExtractReturnType<Fn>>;
    testType<FnReturnType>(4);
  });
});
