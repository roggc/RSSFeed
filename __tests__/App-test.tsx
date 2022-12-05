/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import {render, waitFor} from '@testing-library/react-native';

it('renders correctly', async () => {
  await waitFor(() => {
    render(<App />);
  });
});
