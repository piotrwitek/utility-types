import { testType } from './test-utils';
import { getReturnOfExpression } from '.';

//#region Docs Example
const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = getReturnOfExpression(increment);
type IncrementAction = typeof returnOfIncrement; // { type: "INCREMENT"; }
//#endregion

describe('Type Utils', () => {
  describe('$call', () => {
    it('should return null value', () => {
      expect(returnOfIncrement).toBe(undefined);
      testType<{ type: 'INCREMENT' }>(returnOfIncrement);
    });
  });
});
