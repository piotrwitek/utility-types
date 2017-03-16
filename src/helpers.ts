import { EmptyAction, PayloadAction } from './types';

/**
 * @export Action Creator helper factory function
 * @class ActionCreator
 * @template T - Generic Type
 * @template P - Generic Type
 */
export class ActionCreator<T, P> {
  readonly type: T;
  readonly payload: P;

  constructor(type: T) { this.type = type; }
  create = (payload: P) => ({ type: this.type, payload });
}

/**
 * @export createEmptyAction - empty action creator function
 * @template T - Generic Type
 * @param type: T
 * @returns () => EmptyAction<T>
 */
export function createEmptyAction<T>(type: T): () => EmptyAction<T> {
  return () => ({ type });
};

/**
 * @export createPayloadAction - FSA action creator function
 * @template T - Generic Type
 * @template P - Generic Type
 * @param type: T
 * @returns (payload: P) => PayloadAction<T, P>
 */
export function createPayloadAction<T, P>(type: T): (payload: P) => PayloadAction<T, P> {
  return (payload) => ({ type, payload });
}
