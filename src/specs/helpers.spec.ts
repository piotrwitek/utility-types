// Test Helpers
const passed = (describe: string) => {
  console.log(describe, true);
};
const failed = (describe: string, state: object) => {
  process.exitCode = 1; console.log(describe, false, state);
};

// Testing createEmptyAction, createPayloadAction
import {
  EmptyAction, PayloadAction, createEmptyAction, createPayloadAction,
} from '..';

export namespace TestHelpers1 {
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
        ...state, isLoading: false,
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
  // assert
  if (state1.isLoading === false) {
    passed('state1');
  } else {
    failed('state1', state1);
  }

  const state2 = appReducer(undefined, showMessage('App Started!'));
  // assert
  if (state2.message === 'App Started!') {
    passed('state2');
  } else {
    failed('state2', state2);
  }

  const state3 = appReducer(undefined, hideMessage(undefined));
  // assert
  if (state3.message === undefined) {
    passed('state3');
  } else {
    failed('state3', state3);
  }
}

// Testing ActionCreator
import {
  ActionCreator,
} from '..';

export namespace TestHelpers2 {
  export const ActionCreators = {
    IncreaseCounter: new ActionCreator<'IncreaseCounter', number>('IncreaseCounter'),
    ChangeBaseCurrency: new ActionCreator<'ChangeBaseCurrency', string>('ChangeBaseCurrency'),
  };

  // Action Types
  type Action = typeof ActionCreators[keyof typeof ActionCreators];

  type State = {
    readonly counter: number;
    readonly baseCurrency: string;
  };
  const initialState: State = {
    counter: 0,
    baseCurrency: 'EUR',
  };

  function reducer(state = initialState, action: Action): State {
    let partialState: Partial<State> | undefined;

    if (action.type === ActionCreators.IncreaseCounter.type) {
      partialState = { counter: action.payload }; // number
    }
    if (action.type === ActionCreators.ChangeBaseCurrency.type) {
      partialState = { baseCurrency: action.payload }; // string
    }

    return partialState != null ? { ...state, ...partialState } : state;
  }

  const action1 = ActionCreators.IncreaseCounter.create(4);
  const state1 = reducer(undefined, action1 as any);
  // assert
  if (state1.counter === 4) {
    passed('state1');
  } else {
    failed('state1', state1);
  }

  const action2 = ActionCreators.ChangeBaseCurrency.create('USD');
  const state2 = reducer(undefined, action2 as any);
  // assert
  if (state2.baseCurrency === 'USD') {
    passed('state2');
  } else {
    failed('state2', state2);
  }
}
