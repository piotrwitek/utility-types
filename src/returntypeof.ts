// Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

/**
 * @export returntypeof() - extract return type of an "expression"
 * @template RT - Generic Type
 * @param expression: (...params: any[]) => RT
 * @returns RT
 */
export function returntypeof<RT>(expression: (...params: any[]) => RT): RT {
  return {} as RT;
}
