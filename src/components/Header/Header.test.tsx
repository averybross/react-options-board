import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

describe('<Header />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Header />);
    const header = getByTestId('Header');

    expect(header).toBeInTheDocument();
  });
});