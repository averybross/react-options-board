import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContractCell from './ContractCell';

describe('<ContractCell />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<ContractCell />);
    const contractCell = getByTestId('ContractCell');

    expect(contractCell).toBeInTheDocument();
  });
});