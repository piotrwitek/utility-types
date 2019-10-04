import { testType } from '../utils/test-utils';
import { Primitive, isPrimitive, Falsy, isFalsy } from './aliases-and-guards';

// @dts-jest:group Primitive
{
  // @dts-jest:pass:snap -> Primitive
  testType<Primitive>();
}

// @dts-jest:group isPrimitive
it('narrows to correct type', () => {
  const consumer = (param: Primitive[] | Primitive): string => {
    if (isPrimitive(param)) {
      // @dts-jest:pass:snap -> Primitive
      param;
      return String(param) + ' was Primitive';
    }
    // @dts-jest:pass:snap -> Primitive[]
    param;
    const resultArray = param
      .map(consumer)
      .map(rootString => '\n\t' + rootString);
    return resultArray.reduce((comm, newV) => comm + newV, 'this was nested:');
  };
});

// @dts-jest:group Falsy
{
  // @dts-jest:pass:snap -> Falsy
  testType<Falsy>();
}

// @dts-jest:group isFalsy-Falsy
it('returns true for falsy and narrows type', () => {
  const falsyTestVals: unknown[] = ['', null, undefined, false, 0];

  falsyTestVals.forEach(val => {
    if (isFalsy(val)) {
      // @dts-jest:pass:snap -> Falsy
      val;
    }
    // @dts-jest:pass:snap -> unknown
    val;
  });

  const testResults = falsyTestVals.map(isFalsy);

  testResults.forEach(val => expect(val).toBe(true));
});

// @dts-jest:group isFalsy-Truthy
it('returns false for truthy and narrows type', () => {
  const truthyTestVals: unknown[] = [' ', true, {}, []];

  truthyTestVals.forEach(val => {
    if (isFalsy(val)) {
      // @dts-jest:pass:snap -> Falsy
      val;
    }
    // @dts-jest:pass:snap -> unknown
    val;
  });

  const testResults = truthyTestVals.map(isFalsy);

  testResults.forEach(val => expect(val).toBe(false));
});
