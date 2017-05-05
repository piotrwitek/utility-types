export declare type EmptyActionCreator<T extends string> = {
    (): {
        type: T;
    };
    type?: T;
};
export declare type PayloadActionCreator<T extends string, S, M, P> = {
    (state: S, meta?: M): {
        type: T;
        payload: P;
    };
    type?: T;
};
export declare type PayloadSelector<S, M, P> = (state: S, meta?: M) => P;
export declare function createActionCreator<T extends string, S, M, P>(type: T, payloadSelector: PayloadSelector<S, M, P>): PayloadActionCreator<T, S, M, P>;
export declare function createActionCreator<T extends string>(type: T): EmptyActionCreator<T>;
