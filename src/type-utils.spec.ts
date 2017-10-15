// testing getReturnOfExpression
import { returntypeof } from '.';
import { getReturnOfExpression } from '.';

const increment = () => ({ type: 'INCREMENT' as 'INCREMENT' });

const returnOfIncrement = getReturnOfExpression(increment);
type INCREMENT = typeof returnOfIncrement; // { type: "INCREMENT"; }

// assert true
if (returnOfIncrement !== null) { process.exit(1); }
if (getReturnOfExpression !== returntypeof) { process.exit(1); }
