import { testType } from './test-utils';
import {
  SetIntersection,
  SetDifference,
  SetComplement,
  SymmetricDifference,
  FunctionKeys,
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
} from './';

/**
 * Fixtures
 */
type Props = { name: string; age: number; visible: boolean };
type DefaultProps = { age: number };
type NewProps = { age: string; other: string };
type MixedProps = { name: string; setName: (name: string) => void };
type MixedProps2 = { age: number; setAge: (age: number) => void };
/**
 * Tests
 */
describe('mapped types', () => {
  it('SetIntersection', () => {
    type ResultSet = SetIntersection<'1' | '2' | '3', '2' | '3' | '4'>;
    // Expect: "2" | "3"
    testType<ResultSet>('2');
    testType<ResultSet>('3');

    type ResultSetMixed = SetIntersection<
      string | number | (() => void),
      Function
    >;
    // Expect: () => void
    testType<ResultSetMixed>(() => undefined);
  });

  it('SetDifference', () => {
    type ResultSet = SetDifference<'1' | '2' | '3', '2' | '3' | '4'>;
    // Expect: "1"
    testType<ResultSet>('1');

    type ResultSetMixed = SetDifference<
      string | number | (() => void),
      Function
    >;
    // Expect: string | number
    testType<ResultSetMixed>('foo');
    testType<ResultSetMixed>(2);
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

  it('FunctionKeys', () => {
    type PropsFunctionKeys = FunctionKeys<MixedProps>;
    // Expect: "setName"
    testType<PropsFunctionKeys>('setName');
  });

  it('NonFunctionKeys', () => {
    type PropsNonFunctionKeys = NonFunctionKeys<MixedProps>;
    // Expect: "name"
    testType<PropsNonFunctionKeys>('name');
  });

  it('Omit', () => {
    type RequiredProps = Omit<Props, 'age'>;
    // Expect: { name: string; visible: boolean; }
    testType<RequiredProps>({ name: 'foo', visible: true });

    type RequiredPropsUnion = Omit<Props | NewProps, 'age'>;
    // Expect: { name: string; visible: boolean; } | { other: string; }
    testType<RequiredPropsUnion>({ name: 'foo', visible: true });
    testType<RequiredPropsUnion>({ other: 'bar' });
  });

  it('Intersection', () => {
    type CommonProps = Intersection<Props, DefaultProps>;
    // Expect: { age: number; }
    testType<CommonProps>({ age: 2 });

    type CommonPropsUnion = Intersection<Props | NewProps, DefaultProps>;
    // Expect: { name: string; visible: boolean; } | { other: string; }
    testType<CommonPropsUnion>({ age: 2 });
    testType<CommonPropsUnion>({ age: 'bar' });
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
    testType<ExtendedProps>({
      name: 'foo',
      age: '2',
      visible: true,
      other: 'baz',
    });
  });

  it('Unionize', () => {
    type UnionizedType = Unionize<Props>;
    // Expect: { name: string; } | { age: number; } | { visible: boolean; }
    testType<UnionizedType>({ name: 'foo' });
    testType<UnionizedType>({ age: 2 });
    testType<UnionizedType>({ visible: true });
  });

  it('PromiseType', () => {
    type Response = PromiseType<Promise<string>>;
    // Expect: string
    testType<Response>('foo');
  });

  it('DeepReadonly', () => {
    type NestedProps = {
      first: {
        second: {
          name: string;
        };
      };
    };
    let a: { readonly name: string };

    type ReadonlyNestedProps = DeepReadonly<NestedProps>;
    a = {} as ReadonlyNestedProps['first']['second'];

    type NestedArrayProps = {
      first: {
        second: Array<{ name: string }>;
      };
    };
    type ReadonlyNestedArrayProps = DeepReadonly<NestedArrayProps>;
    a = {} as ReadonlyNestedArrayProps['first']['second'][number];

    type NestedOptionalProps = {
      first?: {
        second: {};
      };
    };
    type ReadonlyNestedOptionalProps = DeepReadonly<NestedOptionalProps>;
    testType<ReadonlyNestedOptionalProps>({});
    testType<ReadonlyNestedOptionalProps>({ first: { second: {} } });
  });
});
