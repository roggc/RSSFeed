import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: props => props.children,
}));
jest.mock('redux-persist', () => ({
  ...jest.requireActual('redux-persist'),
  persistReducer: jest.fn().mockImplementation((config, reducer) => reducer),
}));

global.fetch = jest.fn(() => {
  return Promise.resolve({
    text: () => {
      return Promise.resolve('');
    },
  });
});
