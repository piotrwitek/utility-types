# Aliases & Type Guards

Generated from `src/aliases-and-guards.ts`.

- [`Falsey`](#falsey)
- [`Falsy`](#falsy)
- [`isFalsy`](#isfalsy)
- [`isNullish`](#isnullish)
- [`isPrimitive`](#isprimitive)
- [`Nullish`](#nullish)
- [`Primitive`](#primitive)

## `Falsey`

Type representing falsy values in TypeScript: `false | "" | 0 | null | undefined`

Source export: `Falsy`

```ts
export type Falsy = false | '' | 0 | null | undefined;
```

### Examples

```ts
type Various = 'a' | 'b' | undefined | false;

  // Expect: "a" | "b"
  Exclude<Various, Falsy>;
```

## `Falsy`

Type representing falsy values in TypeScript: `false | "" | 0 | null | undefined`

```ts
export type Falsy = false | '' | 0 | null | undefined;
```

### Examples

```ts
type Various = 'a' | 'b' | undefined | false;

  // Expect: "a" | "b"
  Exclude<Various, Falsy>;
```

## `isFalsy`

Tests for Falsy by simply applying negation `!` to the tested `val`.

The value is mostly in added type-information and explicity,
but in case of this simple type much the same can often be archived by just using negation `!`:

```ts
export const isFalsy: (val: unknown) => val is Falsy;
```

### Examples

```ts
const consumer = (value: boolean | Falsy) => {
    if (!value) {
        return ;
    }
    type newType = typeof value; // === true
    // do stuff
  };
```

## `isNullish`

Tests for Nullish by simply comparing `val` for equality with `null`.

```ts
export const isNullish: (val: unknown) => val is Nullish;
```

### Examples

```ts
const consumer = (param: Nullish | string): string => {
    if (isNullish(param)) {
      // typeof param === Nullish
      return String(param) + ' was Nullish';
    }
    // typeof param === string
    return param.toString();
  };
```

## `isPrimitive`

Tests for one of the [`Primitive`](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) types using the JavaScript [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator

Clarification: TypeScript overloads this operator to produce TypeScript types if used in context of types.

```ts
export const isPrimitive: (val: unknown) => val is Primitive;
```

### Notes

- `@param` val The value to be tested
- `@returns` If `val` is primitive. If used in the flow of the program typescript will infer type-information from this.

### Examples

```ts
const consumer = (value: Primitive | Primitive[]) => {
      if (isPrimitive(value)) {
          return console.log('Primitive value: ', value);
      }
      // type of value now inferred as Primitive[]
      value.map((primitive) => consumer(primitive));
  };
```

## `Nullish`

Type representing [nullish values](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing) in TypeScript: `null | undefined`

```ts
export type Nullish = null | undefined;
```

### Examples

```ts
type Various = 'a' | 'b' | undefined;

  // Expect: "a" | "b"
  Exclude<Various, Nullish>;
```

## `Primitive`

Type representing [`Primitive`](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) types in TypeScript: `string | number | bigint | boolean |  symbol | null | undefined`

```ts
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;
```

### Examples

```ts
type Various = number | string | object;

   // Expect: object
  type Cleaned = Exclude<Various, Primitive>
```
