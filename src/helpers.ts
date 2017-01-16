import { IEmptyAction, IAction } from './types';

/**
 * @export createAction - empty action creator constructor function
 * @template T - Type
 * @param {T} type
 * @returns () => IEmptyAction<T>
 */
export function createEmptyAction<T>(type: T): () => IEmptyAction<T> {
  return () => ({ type });
};

/**
 * @export createFSAction - FSA action creator constructor function
 * @template T - Type
 * @template P - Payload
 * @param {T} type
 * @returns (payload?: P) => IAction<T, P>
 */
export function createAction<T, P>(type: T): (payload: P) => IAction<T, P> {
  return (payload) => ({ type, payload });
}
