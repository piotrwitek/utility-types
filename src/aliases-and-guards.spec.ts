import { testType } from '../utils/test-utils';
import {
  Primitive,
  isPrimitive,
  Falsy,
  isFalsy,
  Nullish,
  isNullish,
  hasProperty,
  hasDefinedProperty,
} from './aliases-and-guards';

// @dts-jest:group Primitive
{
  // @dts-jest:pass:snap
  testType<Primitive>();
}

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

// @dts-jest:group Falsy
{
  // @dts-jest:pass:snap
  testType<Falsy>();
}

// @dts-jest:group isFalsy
it('narrows to correct type', () => {
  const consumer = (param: Falsy | string): string => {
    if (isFalsy(param)) {
      // @dts-jest:pass:snap
      param;
      return String(param) + ' was Falsy';
    }
    // @dts-jest:pass:snap
    param;
    return param.toString();
  };
});

// @dts-jest:group isFalsy - test falsy values
it('returns true for falsy', () => {
  const falsyTestVals: unknown[] = [false, '', 0, null, undefined];

  const testResults = falsyTestVals.map(isFalsy);
  testResults.forEach(val => expect(val).toBe(true));
});

// @dts-jest:group isFalsy - test truthy values
it('returns false for truthy', () => {
  const truthyTestVals: unknown[] = [' ', true, {}, []];

  const testResults = truthyTestVals.map(isFalsy);
  testResults.forEach(val => expect(val).toBe(false));
});

// @dts-jest:group isNullish
it('narrows to correct type', () => {
  const consumer = (param: Nullish | string): string => {
    if (isNullish(param)) {
      // @dts-jest:pass:snap
      param;
      return String(param) + ' was Nullish';
    }
    // @dts-jest:pass:snap
    param;
    return param.toString();
  };
});

// @dts-jest:group isNullish - test nullish values
it('returns true for nullish', () => {
  const nullishTestVals: unknown[] = [null, undefined];

  const testResults = nullishTestVals.map(isNullish);
  testResults.forEach(val => expect(val).toBe(true));
});

// @dts-jest:group isNullish - test non-nullish values
it('returns false for non-nullish', () => {
  const nonNullishTestVals: unknown[] = [false, '', 0, ' ', true, {}, []];

  const testResults = nonNullishTestVals.map(isNullish);
  testResults.forEach(val => expect(val).toBe(false));
});

// @dts-jest:group hasProperty
it('narrows to correct type', () => {
  const obj1 = {
    name: 'John',
    guestId: '#123',
  } as
    | {
        name?: string;
        employeeId: string;
      }
    | {
        name?: string;
        guestId: string;
      };
  if (hasProperty(obj1, 'guestId')) {
    // @dts-jest:pass:snap
    obj1;

    // @dts-jest:pass:snap
    obj1.name;
    expect(obj1.name).toBe('John');

    // @dts-jest:pass:snap
    obj1.guestId;
    expect(obj1.guestId).toBe('#123');
  }

  const obj2 = {
    name: 'John',
  } as {
    name: string | undefined;
  };
  if (hasProperty(obj2, 'name')) {
    // @dts-jest:pass:snap
    obj2;

    // @dts-jest:pass:snap
    obj2.name;
    expect(obj2.name).toBe('John');
  }

  const obj3 = {
    name: 'John',
  } as {
    name?: string;
  };
  if (hasProperty(obj3, 'name')) {
    // @dts-jest:pass:snap
    obj3;

    // @dts-jest:pass:snap
    obj3.name;
    expect(obj3.name).toBe('John');
  }
});

// @dts-jest:group hasProperty
it('returns false if property is not in object', () => {
  const obj = {
    name: 'John',
  } as {
    name: string;
  };

  // @ts-ignore
  expect(hasProperty(obj, 'guestId')).toBe(false);

  // @ts-ignore
  if (hasProperty(obj, 'guestId')) {
    // @dts-jest:pass:snap
    obj;

    throw new Error('should not reach here');
  }
});

// @dts-jest:group hasDefinedProperty
it('narrows to correct type', () => {
  const obj1 = {
    name: 'John',
  } as {
    name?: string;
  };
  if (hasDefinedProperty(obj1, 'name')) {
    // @dts-jest:pass:snap
    obj1;

    // @dts-jest:pass:snap
    obj1.name;
    expect(obj1.name).toBe('John');
  }

  const obj2 = {
    name: 'John',
  } as {
    name: string | undefined;
  };
  if (hasDefinedProperty(obj2, 'name')) {
    // @dts-jest:pass:snap
    obj2;

    // @dts-jest:pass:snap
    obj2.name;
    expect(obj2.name).toBe('John');
  }

  const obj3 = {
    name: 'John',
  } as {
    name: string | null | undefined;
  };
  if (hasDefinedProperty(obj3, 'name')) {
    // @dts-jest:pass:snap
    obj3;

    // @dts-jest:pass:snap
    obj3.name;
    expect(obj3.name).toBe('John');
  }
});

// @dts-jest:group hasDefinedProperty
it('returns false if property is not in object', () => {
  const obj = {
    name: 'John',
  } as {
    name: string;
  };

  // @ts-ignore
  expect(hasDefinedProperty(obj, 'guestId')).toBe(false);

  // @ts-ignore
  if (hasDefinedProperty(obj, 'guestId')) {
    // @dts-jest:pass:snap
    obj;

    throw new Error('should not reach here');
  }
});
