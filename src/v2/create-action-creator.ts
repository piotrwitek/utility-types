// DEPRECATED: delete soon after new Major is realeased

export type EmptyActionCreator<T extends string> = {
  (): { type: T }, type?: T,
};

export type PayloadActionCreator<T extends string, S, M, P> = {
  (state: S, meta?: M): { type: T, payload: P }, type?: T,
};

export type PayloadSelector<S, M, P> = (state: S, meta?: M) => P;

export function createActionCreator<T extends string, S, M, P>(
  type: T, payloadSelector: PayloadSelector<S, M, P>,
): PayloadActionCreator<T, S, M, P>;

export function createActionCreator<T extends string>(
  type: T,
): EmptyActionCreator<T>;

/**
 *
 * @deprecated
 * @export
 * @template T
 * @template S
 * @template M
 * @template P
 * @param {T} type
 * @param {PayloadSelector<S, M, P>} [payloadSelector]
 * @returns {(PayloadActionCreator<T, S, M, P> | EmptyActionCreator<T>)}
 */
export function createActionCreator<T extends string, S, M, P>(
  type: T, payloadSelector?: PayloadSelector<S, M, P>,
): PayloadActionCreator<T, S, M, P> | EmptyActionCreator<T> {
  if (payloadSelector == null) {
    const actionCreator: EmptyActionCreator<T> =
      () => ({ type });
    actionCreator.type = type;

    return actionCreator;
  } else {
    const actionCreator: PayloadActionCreator<T, S, M, P> =
      (state: S, meta?: M) => ({ type, payload: payloadSelector(state, meta) });
    actionCreator.type = type;

    return actionCreator;
  }
}
