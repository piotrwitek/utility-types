import { SetComplement } from '.';

/**
 * $Keys
 * @desc get the union type of all the keys in an object type `T`
 * @see https://flow.org/en/docs/types/utilities/#toc-keys
 */
export type $Keys<T extends object> = (
  keyof T
);

/**
 * $Values
 * @desc get the union type of all the values in an object type `T`
 * @see https://flow.org/en/docs/types/utilities/#toc-values
 */
export type $Values<T extends object> = (
  T[keyof T]
);

/**
 * $ReadOnly
 * @desc get the read-only version of a given object type `T`
 * @see https://flow.org/en/docs/types/utilities/#toc-readonly
 */
export type $ReadOnly<T extends object> = (
  Readonly<T>
);

/**
 * $Diff
 * @desc get the set difference of a given object types `T` and `U` (`T \ U`)
 */
export type $Diff<T extends U, U extends object> = (
  Pick<T, SetComplement<keyof T, keyof U>>
);

/**
 * $PropertyType
 * @desc get the type of property of an object at a given key `K`
 */
export type $PropertyType<T extends object, K extends keyof T> = (
  T[K]
);

/**
 * $ElementType
 * @desc get the type of elements inside of array, tuple or object of type `T`, that matches the given index type `K`
 */
export type $ElementType<T extends {[P in K & any]: any }, K extends keyof T | number> = (
  T[K]
);
