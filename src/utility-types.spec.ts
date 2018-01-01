import { testType } from './test-utils';
import {
  $Keys,
  $Values,
  $ReadOnly,
  $Diff,
  $PropertyType,
  $ElementType,
} from '.';

/**
 * Fixtures
 */
type Props = { name: string, age: number, visible: boolean };
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
    // Expect: boolean
    testType<$PropertyType<Tuple, '0'>>(true);
    // Expect: number
    testType<$PropertyType<Tuple, '1'>>(42);
  });

  it('$ElementType', () => {
    type NameType = $ElementType<Props, 'name'>;
    // Expect: string
    testType<NameType>('foo');

    type Tuple = [boolean, number];
    // Expect: boolean
    testType<$ElementType<Tuple, 0>>(true);
    // Expect: number
    testType<$ElementType<Tuple, 1>>(42);

    // Expect: boolean
    type Arr = boolean[];
    testType<$ElementType<Arr, number>>(true);

    type Obj = { [key: string]: number };
    // Expect: number
    testType<$ElementType<Obj, string>>(42);
  });

});
