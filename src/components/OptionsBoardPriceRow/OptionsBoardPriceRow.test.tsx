import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OptionsBoardPriceRow from './OptionsBoardPriceRow';

describe('<OptionsBoardPriceRow />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<OptionsBoardPriceRow />);
    const optionsBoardPriceRow = getByTestId('OptionsBoardPriceRow');

    expect(optionsBoardPriceRow).toBeInTheDocument();
  });
});