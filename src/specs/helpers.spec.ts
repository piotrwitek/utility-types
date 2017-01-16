import { EmptyAction, PayloadAction, createEmptyAction, createPayloadAction } from '..';

// testing createAction

const APP_STARTED = 'app/APP_STARTED';
const SHOW_MESSAGE = 'app/SHOW_MESSAGE';
const HIDE_MESSAGE = 'app/HIDE_MESSAGE';

type AppActions =
  EmptyAction<typeof APP_STARTED> |
  PayloadAction<typeof SHOW_MESSAGE, string> |
  PayloadAction<typeof HIDE_MESSAGE, undefined>;

const appStarted = createEmptyAction<typeof APP_STARTED>(APP_STARTED);
const showMessage = createPayloadAction<typeof SHOW_MESSAGE, string>(SHOW_MESSAGE);
const hideMessage = createPayloadAction<typeof HIDE_MESSAGE, undefined>(HIDE_MESSAGE);

type AppState = {
  readonly isLoading: boolean;
  readonly message: string | undefined;
};
const initialState: AppState = {
  isLoading: true,
  message: undefined,
};

function appReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    case APP_STARTED: return {
      ...state, isLoading: !action,
    };
    case SHOW_MESSAGE: return {
      ...state, message: action.payload,
    };
    case HIDE_MESSAGE: return {
      ...state, message: action.payload,
    };

    default: return state;
  }
}

const state1 = appReducer(undefined, appStarted());
// assert true
if (state1.isLoading !== false) {
  console.log('state1', state1);
  process.exit(1);
}

const state2 = appReducer(undefined, showMessage('App Started!'));
// assert true
if (state2.message !== 'App Started!') {
  console.log('state2', state2);
  process.exit(1);
}

const state3 = appReducer(undefined, hideMessage(undefined));
// assert true
if (state3.message !== undefined) {
  console.log('state3', state3);
  process.exit(1);
}
