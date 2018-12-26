import { getReturnOfExpression } from './functional-helpers';

// @dts-jest:group getReturnOfExpression
it('getReturnOfExpression', () => {
  const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });
  // @dts-jest:pass:snap -> { type: "INCREMENT"; }
  getReturnOfExpression(increment); // => undefined
});
