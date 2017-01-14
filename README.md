# React / Redux / TypeScript Utils

### Interfaces
```ts
/**
 * @interface IAction - FluxStandardAction Interface
 * @template T - Type
 * @template P - Payload
 */
interface IAction<T extends string, P> {
  readonly type: T;
  readonly payload?: P;
  readonly error?: boolean;
}

```

### Helper Functions
```ts
/**
 * @export createAction helper for FSA Actions
 * @template T - Type
 * @template P - Payload
 * @param {T} type
 * @returns (payload?: P): IAction<T, P>
 */
createAction<T, P>(type)

/**
 * @export get object type returned from mapStateToProps function
 * workaround until TS support getting return types from function
 * @template S - State
 * @template P - Props
 * @param {(state: S) => P} mapStateToProps
 * @returns {P}
 */
getStateProps(mapStateToProps)

```
