import { PossibleKeys } from './mapped-types';

/**
 * Primitive
 * @desc Type representing [`Primitive`](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) types in TypeScript: `string | number | bigint | boolean |  symbol | null | undefined`
 * @example
 *   type Various = number | string | object;
 *
 *    // Expect: object
 *   type Cleaned = Exclude<Various, Primitive>
 */
export type Primitive =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | null
  | undefined;

/**
 * Falsy
 * @desc Type representing falsy values in TypeScript: `false | "" | 0 | null | undefined`
 * @example
 *   type Various = 'a' | 'b' | undefined | false;
 *
 *   // Expect: "a" | "b"
 *   Exclude<Various, Falsy>;
 */
export type Falsy = false | '' | 0 | null | undefined;

/**
 * Nullish
 * @desc Type representing [nullish values][https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing] in TypeScript: `null | undefined`
 * @example
 *   type Various = 'a' | 'b' | undefined;
 *
 *   // Expect: "a" | "b"
 *   Exclude<Various, Nullish>;
 */
export type Nullish = null | undefined;

/**
 * Tests for one of the [`Primitive`](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) types using the JavaScript [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator
 *
 * Clarification: TypeScript overloads this operator to produce TypeScript types if used in context of types.
 *
 * @param val The value to be tested
 * @returns If `val` is primitive. If used in the flow of the program typescript will infer type-information from this.
 *
 * @example
 *   const consumer = (value: Primitive | Primitive[]) => {
 *       if (isPrimitive(value)) {
 *           return console.log('Primitive value: ', value);
 *       }
 *       // type of value now inferred as Primitive[]
 *       value.map((primitive) => consumer(primitive));
 *   };
 */
export const isPrimitive = (val: unknown): val is Primitive => {
  if (val === null || val === undefined) {
    return true;
  }
  switch (typeof val) {
    case 'string':
    case 'number':
    case 'bigint':
    case 'boolean':
    case 'symbol': {
      return true;
    }
    default:
      return false;
  }
};

/**
 * Tests for Falsy by simply applying negation `!` to the tested `val`.
 *
 * The value is mostly in added type-information and explicity,
 * but in case of this simple type much the same can often be archived by just using negation `!`:
 * @example
 *   const consumer = (value: boolean | Falsy) => {
 *     if (!value) {
 *         return ;
 *     }
 *     type newType = typeof value; // === true
 *     // do stuff
 *   };
 */
export const isFalsy = (val: unknown): val is Falsy => !val;

/**
 * Tests for Nullish by simply comparing `val` for equality with `null`.
 * @example
 *   const consumer = (param: Nullish | string): string => {
 *     if (isNullish(param)) {
 *       // typeof param === Nullish
 *       return String(param) + ' was Nullish';
 *     }
 *     // typeof param === string
 *     return param.toString();
 *   };
 */
export const isNullish = (val: unknown): val is Nullish => val == null;

type ExtractByProperty<O extends object, P extends PossibleKeys<O>> = Extract<
  O,
  { [K in P]?: any }
>;
/**
 * Check if the object has the property, similar to
 * {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing | the `in` operator}
 * `'key' in obj` but unexistent properties are not allowed and it allows intellisense
 *
 * @template O - object
 * @template P - a property of O
 * @param {O} obj: {@type O}
 * @param {P} property: P
 * @returns {boolean} `true` if the object has the property, `false` otherwise
 *
 * @example
 *   if (hasProperty(obj, 'prop')) {
 *     // `prop` in `obj`
 *   }
 */
export const hasProperty = <O extends object, P extends PossibleKeys<O>>(
  obj: O,
  property: P
  // @ts-ignore
): obj is ExtractByProperty<O, P> => {
  return property in obj;
};

type ExtractByPropertyAndAssertNotUndefined<
  O extends object,
  P extends PossibleKeys<O>
> = ExtractByProperty<O, P> &
  { [K in P]: Exclude<ExtractByProperty<O, K>[K], undefined> };
/**
 * Check if the object has the property and it is not `undefined`
 *
 * @template O - object
 * @template P - a property of O
 * @param {O} obj: {@type O}
 * @param {P} property: P
 * @returns {boolean} `true` if the object has the property and is not `undefined`, `false` otherwise
 *
 * @example
 *   if (hasDefinedProperty(obj, 'prop')) {
 *     // `prop` in `obj` and `obj.prop` is not `undefined`
 *   }
 */
export const hasDefinedProperty = <O extends object, P extends PossibleKeys<O>>(
  obj: O,
  property: P
  // @ts-ignore
): obj is ExtractByPropertyAndAssertNotUndefined<O, P> => {
  return property in obj && obj[property] !== undefined;
};
