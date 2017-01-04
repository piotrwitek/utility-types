/**
 * @author Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
 * @copyright Copyright (c) 2016 Piotr Witek
 * @license MIT
 */

/**
 * @export get function return object type
 * @template S - State
 * @template P - Props
 * @param {(state: S) => P} mapStateToProps
 * @returns {P}
 */
export function getStateProps<S, P>(mapStateToProps: (state: S) => P): P {
  return {} as false || mapStateToProps({} as S);
}

/**
 * @export FluxStandardAction generic interface
 * @interface FluxStandardAction
 * @template Type
 * @template Payload
 */
export interface FluxStandardAction<Type, Payload> {
  type: Type;
  payload?: Payload;
  error?: boolean;
}

/**
 * @export createAction helper for FSA actions
 * @template Type
 * @template Payload
 * @param {Type} type
 * @returns
 */
export function createAction<Type, Payload>(type: Type) {
  return (payload?: Payload): FluxStandardAction<Type, Payload> => ({
    type,
    payload,
  });
}

