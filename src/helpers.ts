import { IAction } from './types';

/**
 * @export createAction helper for FSA Actions
 * @template T - Type
 * @template P - Payload
 * @param {T} type
 * @returns (payload?: P): IAction<T, P>
 */
export function createAction<T extends string, P>(type: T) {
  return (payload?: P): IAction<T, P> => ({ type, payload });
}

/**
 * @export get object type returned from mapStateToProps function
 * workaround until TS support getting return types from function
 * @template S - State
 * @template P - Props
 * @param {(state: S) => P} mapStateToProps
 * @returns {P}
 */
export function getStateProps<S, P>(mapStateToProps: (state: S) => P): P {
  return {} as false || mapStateToProps({} as S);
}


