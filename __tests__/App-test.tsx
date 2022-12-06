/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import {
  render,
  waitFor,
  screen,
  fireEvent,
} from '@testing-library/react-native';

it('renders correctly', async () => {
  await waitFor(() => {
    render(<App />);
  });
});

it('initially shows the Home screen and navigates to Details screen when pressing a Card component in Home screen', async () => {
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
  const paragraphFound = await screen.findByText(
    'La muerte de Google Reader nos dejó tocados a quienes leíamos las noticias a través de ese servicio de feeds, tanto desde el ordenador como en el móvil. Distintas aplicaciones aspiraron a recoger el testigo dejado por la app de Google, como gReader. Ésta ofrecía una experiencia de lectura limpia con una interfaz basada en Material Design, todo un acierto que terminamos lamentando una vez gReader desapareció de Google Play. Ahora ha vuelto, aunque con algún inconveniente.',
  );
  expect(paragraphFound).toBeTruthy();
  const newScreenHeaderTitles = screen.getAllByTestId('screen-header-title');
  expect(newScreenHeaderTitles.length).toBe(2);
  expect(
    newScreenHeaderTitles[newScreenHeaderTitles.length - 1].props.children,
  ).toBe('Details');
});
