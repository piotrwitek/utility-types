import { EmptyAction, PayloadAction } from './types';
/**
 * @export Action Creator helper factory function
 * @class ActionCreator
 * @template T - Generic Type
 * @template P - Generic Type
 */
export declare class ActionCreator<T, P> {
    readonly type: T;
    readonly payload: P;
    constructor(type: T);
    create: (payload: P) => {
        type: T;
        payload: P;
    };
}
/**
 * @export createEmptyAction - empty action creator function
 * @template T - Generic Type
 * @param type: T
 * @returns () => EmptyAction<T>
 */
export declare function createEmptyAction<T>(type: T): () => EmptyAction<T>;
/**
 * @export createPayloadAction - FSA action creator function
 * @template T - Generic Type
 * @template P - Generic Type
 * @param type: T
 * @returns (payload: P) => PayloadAction<T, P>
 */
export declare function createPayloadAction<T, P>(type: T): (payload: P) => PayloadAction<T, P>;
