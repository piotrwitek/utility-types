// Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
// (tracking issue: https://github.com/Microsoft/TypeScript/issues/6606)

/**
 * @function getReturnOfExpression
 * @deprecated returntypeof
 * @description Get return value of an "expression" with inferred return type
 * @template RT - Return Type
 * @param expression: (...params: any[]) => RT
 * @returns null as RT
 */
export function getReturnOfExpression<RT>(
  expression: (...params: any[]) => RT,
): RT {
  return null as any as RT;
}

// ALIAS
export const returntypeof = getReturnOfExpression;
