import { IAction } from './types';

/**
 * @export createAction - FSA Actions constructor function
 * @template T - Type
 * @template P - Payload
 * @param {T} type
 * @returns (payload?: P): IAction<T, P>
 */
export function createAction<T, P>(type: T) {
  return (payload: P): IAction<T, P> => ({ type, payload });
}


/**
 * @export returntypeof - extract return type of "expression"
 * workaround until added support in TS
 * https://github.com/Microsoft/TypeScript/issues/6606
 * @template RT - Return Type
 * @param {(...params: any[]) => RT} expression
 * @returns {RT}
 */
export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
  return {} as RT;
}
