import {createStore, applyMiddleware, AnyAction} from 'redux';
import appReducer from './reducers';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {ThunkDispatch} from 'redux-thunk';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};

type AppState = ReturnType<typeof appReducer>;
export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const persistedReducer = persistReducer(persistConfig, appReducer);

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);
  return {store, persistor};
};
