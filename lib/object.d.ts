/**
 * @export Object.assign for type-safe partial state updates
 * @interface ObjectConstructor
 */
export interface ObjectConstructor {
  assign<T>(targetState: {}, sourceState: T, ...partialStates: Partial<T>[]): T;
}
export declare const Object: ObjectConstructor;
