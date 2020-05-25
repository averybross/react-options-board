import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OptionRow from './OptionRow';

describe('<OptionRow />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<OptionRow />);
    const optionRow = getByTestId('OptionRow');

    expect(optionRow).toBeInTheDocument();
  });
});