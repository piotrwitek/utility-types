import { testType } from './test-utils';
import { $call, getReturnOfExpression } from '.';

//#region Docs Example
const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = $call(increment);
type IncrementAction = typeof returnOfIncrement; // { type: "INCREMENT"; }
//#endregion

describe('Type Utils', () => {
  describe('$call', () => {
    it('should return null value', () => {
      expect(returnOfIncrement).toBe(undefined);
      testType<{ type: 'INCREMENT'; }>(returnOfIncrement);
    });
    it('should be equal with alias returntypeof', () => {
      expect($call).toBe(getReturnOfExpression);
    });
  });
});
