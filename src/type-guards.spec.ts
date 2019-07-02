import { Primitive } from './mapped-types';
import { isPrimitive, isFalsey } from './type-guards';

// @dts-jest:group isPrimitive
it('narrows to correct type', () => {
  const consumer = (param: Primitive[] | Primitive): string => {
    if (isPrimitive(param)) {
      // @dts-jest:pass:snap
      param;
      return String(param) + ' was Primitive';
    }
    // @dts-jest:pass:snap
    param;
    const resultArray = param
      .map(consumer)
      .map(rootString => '\n\t' + rootString);
    return resultArray.reduce((comm, newV) => comm + newV, 'this was nested:');
  };
});

// @dts-jest:group isFalsey-Group-Falsey
it('returns true for falsey and narrows type', () => {
  const falseyTestVals: unknown[] = ['', null, undefined, false, 0];

  falseyTestVals.forEach(val => {
    if (isFalsey(val)) {
      // @dts-jest:pass:snap
      val;
    }
    // @dts-jest:pass:snap
    val;
  });

  const testResults = falseyTestVals.map(isFalsey);

  testResults.forEach(val => expect(val).toBe(true));
});

// @dts-jest:group isFalsey-Group-Truthy
it('returns false for truthy and narrows type', () => {
  const truthyTestVals: unknown[] = [' ', true, {}, []];

  truthyTestVals.forEach(val => {
    if (isFalsey(val)) {
      // @dts-jest:pass:snap
      val;
    }
    // @dts-jest:pass:snap
    val;
  });

  const testResults = truthyTestVals.map(isFalsey);

  testResults.forEach(val => expect(val).toBe(false));
});
