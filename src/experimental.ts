// tslint:disable:ban-types
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Diff<T, U> = T extends U ? never : T;  // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U

type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // "b" | "d"
type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // "a" | "c"
type T32 = Diff<string | number | (() => void), Function>;  // string | number
type T33 = Filter<string | number | (() => void), Function>;  // () => void

// Exclude<T, U> -- Exclude from T those types that are assignable to U.
// Extract<T, U> -- Extract from T those types that are assignable to U.
// NonNullable<T> -- Exclude null and undefined from T.
// ReturnType<T> -- Obtain the return type of a function type.
type PromiseType<T> = T extends Promise<infer U> ? U : T;
// InstanceType<T> -- Obtain the instance type of a constructor function type.

// type GetComponentProps<T> =
//   T extends new (props: infer P) => any ? P :
//   T extends (props: infer P & { children?: React.ReactNode }) => any ? P :
//   any;

type Unionize<T> = { [P in keyof T]: { [Q in P]: T[P] } }[keyof T];
type obj = { a: string, c: number };
type unionizedObj = Unionize<obj>;
