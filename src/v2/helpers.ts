// API v2 - DEPRECATED
import { EmptyAction, PayloadAction } from '..';

/**
 * @deprecated
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
 * @deprecated
 * @export createEmptyAction - Empty Action creator function
 * @template T - Action Type
 * @param type: T
 * @returns () => EmptyAction<T>
 */
export function createEmptyAction<T extends string>(type: T): () => EmptyAction<T> {
  return () => ({ type });
}

/**
 * @deprecated
 * @export createPayloadAction - Flux Standard Action creator function
 * @template T - Action Type
 * @template P - Payload Type
 * @template M - Meta Type
 * @param type: T
 * @returns (payload: P) => PayloadAction<T, P>
 */
export function createPayloadAction<T extends string, P>(type: T): (payload: P) => PayloadAction<T, P> {
  return (payload) => ({ type, payload });
}
