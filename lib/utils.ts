/**
 * @author Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
 * @copyright Copyright (c) 2016 Piotr Witek
 * @license MIT
 */

/**
 * @export
 * @template S - State
 * @template P - Props
 * @param {(state: S) => P} mapStateToProps
 * @returns {P}
 */
export function getStateProps<S, P>(mapStateToProps: (state: S) => P): P {
  return {} as false || mapStateToProps({} as S);
}

/**
 * @export
 * @template S - State
 * @template P - Props
 * @param {(state: S) => P} mapStateToProps
 * @returns {P}
 */
// declare class Object {
//   assign<T>(target: T, ...sources: Partial<T>[]): T;
// }
