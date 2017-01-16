/**
 * @export returntypeof - extract return type of "expression"
 * workaround until added support in TS
 * https://github.com/Microsoft/TypeScript/issues/6606
 * @template RT - ReturnType
 * @param {(...params: any[]) => RT} expression
 * @returns {RT}
 */
export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
  return {} as RT;
}
