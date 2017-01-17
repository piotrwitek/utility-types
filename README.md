# React / Redux / TypeScript Utils
- Semantic Versioning
- No dependencies!  
- 100% test coverage!  
- Fully typed Redux (action types, action creators, reducers)!
- Futureproof - output es5 and es6 bundles.

### Types
```ts
/**
 * @type EmptyAction - Empty Action Type
 * @template T - Type
 */
export type EmptyAction<T> = {
  readonly type: T;
}

/**
 * @type PayloadAction - Flux Standard Action Type
 * @template T - Type
 * @template P - Payload
 */
export type PayloadAction<T, P> = {
  readonly type: T;
  readonly payload: P;
  readonly error?: boolean;
}

```

### Helper Functions
```ts
/**
 * @export createEmptyAction - empty action creator function
 * @template T - Type
 * @param type: T
 * @returns () => EmptyAction<T>
 */
createEmptyAction<T>(type)

/**
 * @export createPayloadAction - FSA action creator function
 * @template T - Type
 * @template P - Payload
 * @param type: T
 * @returns (payload: P) => PayloadAction<T, P>
 */
createPayloadAction<T, P>(type)

```

### TypeScript Patches
```ts
/**
 * @export returntypeof - typeof patch to extract return type of "expression/function"
 * Indispensable until native support will arrive in TS
 * https://github.com/Microsoft/TypeScript/issues/6606
 * @template RT - ReturnType
 * @param expression: (...params: any[]) => RT
 * @returns RT
 */
returntypeof(expression)
```

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
