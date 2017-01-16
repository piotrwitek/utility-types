/**
 * @type EmptyAction - Empty Action Type
 * @template T - Type
 */
export type EmptyAction<T> = {
  readonly type: T;
};

/**
 * @type PayloadAction - Flux Standard Action Type
 * @template T - Type
 * @template P - Payload
 */
export type PayloadAction<T, P> = {
  readonly type: T;
  readonly payload: P;
  readonly error?: boolean;
};
