// tslint:disable:no-unused-expression
import { getReturnOfExpression } from '.';

describe('Type Utils', () => {
  describe('$call', () => {
    it('should return undefined', () => {
      const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

      // @dts-jest:pass:snap -> { type: "INCREMENT"; }
      getReturnOfExpression(increment);

      const returnOfIncrement = getReturnOfExpression(increment);
      expect(returnOfIncrement).toBe(undefined);
    });
  });
});
