/**
 * @author Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
 * @copyright Copyright (c) 2016 Piotr Witek
 * @license MIT
 * @export
 * @template S
 * @template T
 * @param {(state: S) => T} mapStateToProps
 * @returns {T}
 */
export function getStateProps<S, T>(mapStateToProps: (state: S) => T): T {
  return {} as false || mapStateToProps({} as S);
}
