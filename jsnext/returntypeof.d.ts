/**
 * @export returntypeof() - extract return type of an "expression"
 * @template RT - Generic Type
 * @param expression: (...params: any[]) => RT
 * @returns RT
 */
export declare function returntypeof<RT>(expression: (...params: any[]) => RT): RT;
