import { createStore } from 'redux';
import { createActionCreator } from '.';

const store = createStore(() => ({}));

export const actionCreators = {
  incrementCounter: createActionCreator('INCREMENT_COUNTER'),
  showNotification: createActionCreator(
    'SHOW_NOTIFICATION',
    (message: string, severity?: string) => ({ message, severity }),
  ),
};

// Examples
store.dispatch(actionCreators.incrementCounter(4));
// Error: Expected 0 arguments, but got 1.
store.dispatch(actionCreators.incrementCounter());
// OK: { type: "INCREMENT_COUNTER" }
console.log(actionCreators.incrementCounter.type === 'INCREMENT_COUNTER');
// true

store.dispatch(actionCreators.showNotification());
// Error: Expected 1 arguments, but got 0.
store.dispatch(actionCreators.showNotification('Hello!'));
// OK: { type: "SHOW_NOTIFICATION", payload: { message: 'Hello!' } }
store.dispatch(actionCreators.showNotification('Hello!', 'info'));
// OK: { type: "SHOW_NOTIFICATION", payload: { message: 'Hello!', severity: 'info } }
console.log(actionCreators.showNotification.type === 'SHOW_NOTIFICATION'); // true
