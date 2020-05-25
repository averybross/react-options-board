import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyLabel from './CurrencyLabel';

describe('<CurrencyLabel />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<CurrencyLabel />);
    const CurrencyLabel = getByTestId('CurrencyLabel');

    expect(CurrencyLabel).toBeInTheDocument();
  });
});