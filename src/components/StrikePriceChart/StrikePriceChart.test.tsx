import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StrikePriceChart from './StrikePriceChart';

describe('<StrikePriceChart />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<StrikePriceChart />);
    const strikePriceChart = getByTestId('StrikePriceChart');

    expect(strikePriceChart).toBeInTheDocument();
  });
});