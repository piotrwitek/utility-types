// Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

/**
 * @export returntypeof() - extract return type of an "expression"
 * @template RT - Generic Type
 * @param expression: (...params: any[]) => RT
 * @returns RT
 */
export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
  const safeguard = () => {
    throw new Error(`
      You have accidentally invoked returnOfExpression return value.
      You should use it only to get inferred type using "typeof" operation.
    `);
  };

  return safeguard as any as RT;
}
