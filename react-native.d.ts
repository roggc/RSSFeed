import 'react-native';

declare module 'react-native' {
  interface BackHandlerStatic {
    mockPressBack: () => void;
  }
}
