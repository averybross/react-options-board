import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OptionsBoard from './OptionsBoard';

describe('<OptionsBoard />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<OptionsBoard />);
    const optionsBoard = getByTestId('OptionsBoard');

    expect(optionsBoard).toBeInTheDocument();
  });
});