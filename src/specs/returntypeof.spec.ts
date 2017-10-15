// testing getReturnOfExpression
import { getReturnOfExpression } from '..';
import { returntypeof } from '..';

const increment = () => ({ type: 'INCREMENT' });

const returnOfIncrement = getReturnOfExpression(increment);
type INCREMENT = typeof returnOfIncrement;

// assert true
if (returnOfIncrement !== null) { process.exit(1); }
