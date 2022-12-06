/**
 * @format
 */

import {BackHandler} from 'react-native';
import React from 'react';
import App from '../src/App';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from '@testing-library/react-native';

it('renders correctly', async () => {
  await waitFor(() => {
    render(<App />);
  });
});

it('initially shows the Home screen and navigates to Details screen when pressing a Card component in Home screen and navigates back to Home screen when pressing Back button', async () => {
  await waitFor(() => {
    render(<App />);
  });

  const screenHeaderTitles = screen.getAllByTestId('screen-header-title');
  expect(screenHeaderTitles.length).toBe(1);
  expect(screenHeaderTitles[screenHeaderTitles.length - 1].props.children).toBe(
    'Home',
  );
  const cards = screen.getAllByTestId('card');
  expect(cards.length).toBe(4);

  const paragraphNotFound = screen.queryByText(
    'La muerte de Google Reader nos dejó tocados a quienes leíamos las noticias a través de ese servicio de feeds, tanto desde el ordenador como en el móvil. Distintas aplicaciones aspiraron a recoger el testigo dejado por la app de Google, como gReader. Ésta ofrecía una experiencia de lectura limpia con una interfaz basada en Material Design, todo un acierto que terminamos lamentando una vez gReader desapareció de Google Play. Ahora ha vuelto, aunque con algún inconveniente.',
  );
  expect(paragraphNotFound).toBeFalsy();
  const aCard = screen.getByText(
    'Uno de los mejores lectores de noticias regresa: gReader vuelve a actualizarse en Google Play',
  );
  fireEvent.press(aCard);
  const paragraphFound = screen.getByText(
    'La muerte de Google Reader nos dejó tocados a quienes leíamos las noticias a través de ese servicio de feeds, tanto desde el ordenador como en el móvil. Distintas aplicaciones aspiraron a recoger el testigo dejado por la app de Google, como gReader. Ésta ofrecía una experiencia de lectura limpia con una interfaz basada en Material Design, todo un acierto que terminamos lamentando una vez gReader desapareció de Google Play. Ahora ha vuelto, aunque con algún inconveniente.',
  );
  expect(paragraphFound).toBeTruthy();
  const newScreenHeaderTitles = screen.getAllByTestId('screen-header-title');
  expect(newScreenHeaderTitles.length).toBe(2);
  expect(
    newScreenHeaderTitles[newScreenHeaderTitles.length - 1].props.children,
  ).toBe('Details');
  act(() => {
    BackHandler.mockPressBack();
  });
  const newNewScreenHeaderTitles = screen.getAllByTestId('screen-header-title');
  expect(newNewScreenHeaderTitles.length).toBe(1);
  expect(
    newNewScreenHeaderTitles[newNewScreenHeaderTitles.length - 1].props
      .children,
  ).toBe('Home');
});
