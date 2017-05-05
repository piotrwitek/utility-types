/**
 * @type EmptyAction - Empty Action Type
 * @template T - Generic Type
 */
export declare type EmptyAction<T> = {
    readonly type: T;
};
/**
 * @type PayloadAction - Flux Standard Action Type
 * @template T - Generic Type
 * @template P - Generic Type
 */
export declare type PayloadAction<T, P> = {
    readonly type: T;
    readonly payload: P;
    readonly error?: boolean;
};
