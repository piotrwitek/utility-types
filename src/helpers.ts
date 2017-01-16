import { EmptyAction, PayloadAction } from './types';

/**
 * @export createEmptyAction - empty action creator function
 * @template T - Type
 * @param type: T 
 * @returns () => EmptyAction<T>
 */
export function createEmptyAction<T>(type: T): () => EmptyAction<T> {
  return () => ({ type });
};

/**
 * @export createPayloadAction - FSA action creator function
 * @template T - Type
 * @template P - Payload
 * @param type: T
 * @returns (payload: P) => PayloadAction<T, P>
 */
export function createPayloadAction<T, P>(type: T): (payload: P) => PayloadAction<T, P> {
  return (payload) => ({ type, payload });
}
