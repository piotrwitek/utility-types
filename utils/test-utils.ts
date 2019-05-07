/** @internal */
export function testType<T>(a?: T): T {
  return undefined as any;
}

// export interface IsType<T> {
//   (v: T): '1';
//   (v: any): '0';
// }
