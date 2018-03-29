import { testType } from './test-utils';
import {
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
type Props = { name: string, age: number, visible: boolean };
type DefaultProps = { age: number };
type UpdatedProps = { age: string };
type OtherProps = { other: string };
type MixedProps = { name: string; setName: (name: string) => void };
type DeepArrayProps = { first: { second: MixedProps[]; }; };
type DeepObjectProps = { first: { second: MixedProps; }; };

/**
 * Tests
 */
describe('mapped types', () => {

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
    type RequiredProps = Omit<Props, keyof DefaultProps>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });
  });

  it('Diff', () => {
    type RequiredProps = Diff<Props, UpdatedProps & OtherProps>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });
  });

  it('Subtract', () => {
    type RequiredProps = Subtract<Props, DefaultProps>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });
  });

  it('Overwrite', () => {
    type ReplacedProps = Overwrite<Props, UpdatedProps>;
    // Expect: { name: string; age: string; visible: boolean; }
    testType<ReplacedProps>({ name: 'foo', age: '2', visible: true });
  });

  it('Assign', () => {
    type ExtendedProps = Assign<Props, UpdatedProps & OtherProps>;
    // Expect: { name: string; age: string; visible: boolean; other: string; }
    testType<ExtendedProps>({ name: 'foo', age: '2', visible: true, other: 'baz' });
  });

  it('FunctionKeys', () => {
    type FunctionKeysProps = FunctionKeys<MixedProps>;
  });

  it('NonFunctionKeys', () => {
    type NonFunctionKeysProps = NonFunctionKeys<MixedProps>;
  });

  it('DeepReadonly', () => {
    type ReadonlyArrayProps = DeepReadonly<DeepArrayProps>;
    type ReadonlyObjectProps = DeepReadonly<DeepObjectProps>;
  });
});
