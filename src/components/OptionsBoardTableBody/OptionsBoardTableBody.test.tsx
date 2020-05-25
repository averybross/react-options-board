import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OptionsBoardTableBody from './OptionsBoardTableBody';

describe('<OptionsBoardTableBody />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<OptionsBoardTableBody />);
    const optionsBoardTableBody = getByTestId('OptionsBoardTableBody');

    expect(optionsBoardTableBody).toBeInTheDocument();
  });
});