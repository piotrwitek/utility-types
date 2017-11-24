import {
  DiffKeys,
  Diff,
  OmitKeys,
  Omit,
  Overwrite,
  Assign,
} from '.';

/**
 * Fixtures
 */
interface BaseProps { a: string, b?: number, c: boolean }
interface Props { a: number, d: number }

describe('mapped types', () => {

  /**
   * Tests
   */

  it('Diffed_Keys', () => {
    type Diffed_Keys = DiffKeys<keyof BaseProps, keyof Props>;
    // Expect: 'b' | 'c'
    const value: Diffed_Keys = 'b' && 'c';
  });

  it('Omitted_Keys', () => {
    type Omitted_Keys = OmitKeys<keyof BaseProps, 'a'>;
    // Expect: 'b' | 'c'
    const value: Omitted_Keys = 'b' && 'c';
  });

  it('Diffed_Props', () => {
    type Diffed_Props = Diff<BaseProps, Props>;
    // Expect { b?: number | undefined, c: boolean }
  });

  it('Omitted_Props', () => {
    type Omitted_Props = Omit<BaseProps, 'a'>;
    // Expect: { b?: number | undefined, c: boolean }
  });

  it('Overwritten_Props', () => {
    type Overwritten_Props = Overwrite<BaseProps, Props>;
    // Expect: { a: number, b?: number | undefined, c: boolean }
  });

  it('Assigned_Props', () => {
    type Assigned_Props = Assign<BaseProps, Props>;
    // Expect: { a: number, b?: number | undefined, c: boolean, d: number }
  });

});
