/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import ContractCell from './ContractCell';
import { Contract } from '../OptionsBoard/OptionsBoard';

storiesOf('ContractCell', module).add('default', () => <ContractCell contract={{} as Contract} />);
