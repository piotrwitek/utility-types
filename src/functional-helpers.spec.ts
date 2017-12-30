// testing getReturnOfExpression
import { returntypeof } from '.';
import { getReturnOfExpression } from '.';

const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = getReturnOfExpression(increment);
type INCREMENT = typeof returnOfIncrement; // { type: "INCREMENT"; }

describe('Type Utils', () => {
  describe('getReturnOfExpression', () => {
    it('should return null value', () => {
      // better than undefined because will not trigger default values in functions and will be easier to spot an issue
      expect(returnOfIncrement).toBe(null);
    });
    it('should be equal with alias returntypeof', () => {
      expect(getReturnOfExpression).toBe(returntypeof);
    });
  });
});
