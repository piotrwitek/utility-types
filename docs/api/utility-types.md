# Flow's Utility Types

Generated from `src/utility-types.ts`.

- [`$Call`](#dollar-call)
- [`$Diff`](#dollar-diff)
- [`$ElementType`](#dollar-elementtype)
- [`$Keys`](#dollar-keys)
- [`$NonMaybeType`](#dollar-nonmaybetype)
- [`$PropertyType`](#dollar-propertytype)
- [`$ReadOnly`](#dollar-readonly)
- [`$Shape`](#dollar-shape)
- [`$Values`](#dollar-values)
- [`Class`](#class)

## `$Call`

Get the return type from a given typeof expression

```ts
export type $Call<Fn extends (...args: any[]) => any> = Fn extends (
  arg: any
) => infer RT
  ? RT
  : never;
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-call

### Examples

```ts
// Common use-case
  const add = (amount: number) => ({ type: 'ADD' as 'ADD', payload: amount });
  type AddAction = $Call<typeof add>; // { type: 'ADD'; payload: number }

  // Examples migrated from Flow docs
  type ExtractPropType<T extends { prop: any }> = (arg: T) => T['prop'];
  type Obj = { prop: number };
  type PropType = $Call<ExtractPropType<Obj>>; // number

  type ExtractReturnType<T extends () => any> = (arg: T) => ReturnType<T>;
  type Fn = () => number;
  type FnReturnType = $Call<ExtractReturnType<Fn>>; // number
```

## `$Diff`

Get the set difference of a given object types `T` and `U` (`T \ U`)

```ts
export type $Diff<T extends U, U extends object> = Pick<
  T,
  SetComplement<keyof T, keyof U>
>;
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-diff

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };
  type DefaultProps = { age: number };

  // Expect: { name: string; visible: boolean; }
  type RequiredProps = $Diff<Props, DefaultProps>;
```

## `$ElementType`

Get the type of elements inside of array, tuple or object of type `T`, that matches the given index type `K`

```ts
export type $ElementType<
  T extends { [P in K & any]: any },
  K extends keyof T | number
> = T[K];
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-elementtype

### Examples

```ts
// Expect: string;
  type Props = { name: string; age: number; visible: boolean };
  type NameType = $ElementType<Props, 'name'>;

  // Expect: boolean
  type Tuple = [boolean, number];
  type A = $ElementType<Tuple, '0'>;
  // Expect: number
  type B = $ElementType<Tuple, '1'>;

  // Expect: boolean
  type Arr = boolean[];
  type ItemsType = $ElementType<Arr, number>;

  // Expect: number
  type Obj = { [key: string]: number };
  type ValuesType = $ElementType<Obj, string>;
```

## `$Keys`

Get the union type of all the keys in an object type `T`

```ts
export type $Keys<T extends object> = keyof T;
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-keys

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };

  // Expect: "name" | "age" | "visible"
  type PropsKeys = $Keys<Props>;
```

## `$NonMaybeType`

Excludes null and undefined from T

```ts
export type $NonMaybeType<T> = NonNullable<T>;
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-nonmaybe

### Examples

```ts
type MaybeName = string | null;

  // Expect: string
  type Name = $NonMaybeType<MaybeName>;
```

## `$PropertyType`

Get the type of property of an object at a given key `K`

```ts
export type $PropertyType<T extends object, K extends keyof T> = T[K];
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-propertytype

### Examples

```ts
// Expect: string;
  type Props = { name: string; age: number; visible: boolean };
  type NameType = $PropertyType<Props, 'name'>;

  // Expect: boolean
  type Tuple = [boolean, number];
  type A = $PropertyType<Tuple, '0'>;
  // Expect: number
  type B = $PropertyType<Tuple, '1'>;
```

## `$ReadOnly`

Get the read-only version of a given object type `T` (it works on nested data structure)

```ts
export type $ReadOnly<T extends object> = DeepReadonly<T>;
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-readonly

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };

  // Expect: Readonly<{ name: string; age: number; visible: boolean; }>
  type ReadOnlyProps = $ReadOnly<Props>;
```

## `$Shape`

Copies the shape of the type supplied, but marks every field optional.

```ts
export type $Shape<T extends object> = Partial<T>;
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-shape

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };

  // Expect: Partial<Props>
  type PartialProps = $Shape<Props>;
```

## `$Values`

Get the union type of all the values in an object type `T`

```ts
export type $Values<T extends object> = T[keyof T];
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-values

### Examples

```ts
type Props = { name: string; age: number; visible: boolean };

  // Expect: string | number | boolean
  type PropsValues = $Values<Props>;
```

## `Class`

Represents constructor of type T

```ts
export type Class<T> = new (...args: any[]) => T;
```

### Notes

- `@see` https://flow.org/en/docs/types/utilities/#toc-class

### Examples

```ts
class Store {}
  function makeStore(storeClass: Class<Store>): Store {
    return new storeClass();
  }
```
