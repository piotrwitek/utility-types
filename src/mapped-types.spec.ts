import { testType } from './test-utils';
import {
  SetIntersection,
  SetDifference,
  SetComplement,
  SymmetricDifference,
  Omit,
  Subtract,
  Diff,
  Overwrite,
  Assign,
  FunctionKeys,
  NonFunctionKeys,
  DeepReadonly,
  DeepReadonlyArray,
  DeepReadonlyObject,
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
    type ResultSet = SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>;
    // Expect: "2" | "3"
    testType<ResultSet>('2');
    testType<ResultSet>('3');
  });

  it('SetDifference', () => {
    type ResultSet = SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
    // Expect: "1"
    testType<ResultSet>('1');
  });

  it('SetComplement', () => {
    type ResultSet = SetComplement<'1' | '2' | '3', '2' | '3'>;
    // Expect: "1"
    testType<ResultSet>('1');
  });

  it('SymmetricDifference', () => {
    type ResultSet = SymmetricDifference<'1' | '2' | '3', '2' | '3' | '4'>;
    // Expect: "1" | "4"
    testType<ResultSet>('1');
    testType<ResultSet>('4');
  });

  it('Omit', () => {
    type RequiredProps = Omit<Props, 'age'>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });
  });

  it('Diff', () => {
    type RequiredProps = Diff<Props, NewProps>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });
  });

  it('Subtract', () => {
    type RequiredProps = Subtract<Props, DefaultProps>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });
  });

  it('Overwrite', () => {
    type ReplacedProps = Overwrite<Props, NewProps>;
    // Expect: { name: string; age: string; visible: boolean; }
    testType<ReplacedProps>({ name: 'foo', age: '2', visible: true });
  });

  it('Assign', () => {
    type ExtendedProps = Assign<Props, NewProps>;
    // Expect: { name: string; age: string; visible: boolean; other: string; }
    testType<ExtendedProps>({ name: 'foo', age: '2', visible: true, other: 'baz' });
  });

  it('FunctionKeys', () => {
    type FunctionKeysProps = FunctionKeys<MixedProps>;
    // Expect: "setName"
  });

  it('NonFunctionKeys', () => {
    type NonFunctionKeysProps = NonFunctionKeys<MixedProps>;
    // Expect: "name"
  });

  it('DeepReadonly', () => {
    type NestedProps = {
      first: {
        second: {
          name: string;
        };
      };
    };
    type ReadonlyNestedProps = DeepReadonly<NestedProps>;

    type NestedArrayProps = {
      first: {
        second: string[];
      };
    };
    type ReadonlyNestedArrayProps = DeepReadonly<NestedArrayProps>;
  });
});
