import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OptionsBoardTableHead from './OptionsBoardTableHead';

describe('<OptionsBoardTableHead />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<OptionsBoardTableHead />);
    const optionsBoardTableHead = getByTestId('OptionsBoardTableHead');

    expect(optionsBoardTableHead).toBeInTheDocument();
  });
});