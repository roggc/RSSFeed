import {createStore, applyMiddleware, AnyAction} from 'redux';
import appReducer from './reducers';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {ThunkDispatch} from 'redux-thunk';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  timeout: 10000,
};

export type AppState = ReturnType<typeof appReducer>;
type DispatchFunction = ThunkDispatch<AppState, any, AnyAction>;

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware<DispatchFunction, AppState>(thunk),
);
const persistor = persistStore(store);
export type Dispatch = typeof store.dispatch;
export {store, persistor};
