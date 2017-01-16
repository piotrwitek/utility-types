
/**
 * @interface IEmptyAction - Empty Action Interface
 * @template T - Type
 */
export interface IEmptyAction<T> {
  readonly type: T;
}

/**
 * @interface IAction - Flux Standard Action Interface
 * @template T - Type
 * @template P - Payload
 */
export interface IAction<T, P> {
  readonly type: T;
  readonly payload?: P;
  readonly error?: boolean;
}
