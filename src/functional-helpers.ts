// Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
// (tracking issue: https://github.com/Microsoft/TypeScript/issues/6606)

/**
 * @function $call
 * @alias getReturnOfExpression
 * @description infer the return type from a given "expression" (at runtime it's equivalent of "noop")
 * @template RT - Return Type
 * @param expression: (...params: any[]) => RT
 * @returns undefined as RT
 */
export function $call<RT>(
  expression: (...params: any[]) => RT,
): RT {
  return null as any as RT;
}

// ALIAS
export const getReturnOfExpression = $call;
