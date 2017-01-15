/**
 * @interface IAction - FluxStandardAction Interface
 * @template T - Type
 * @template P - Payload
 */
export interface IAction<T, P> {
  readonly type: T;
  readonly payload?: P;
  readonly error?: boolean;
}
