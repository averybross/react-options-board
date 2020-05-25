/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import OptionsBoardTableBody from './OptionsBoardTableBody';
import { Booktop, ContractTable } from '../OptionsBoard/OptionsBoard';

storiesOf('OptionsBoardTableBody', module).add('default', () => <OptionsBoardTableBody contracts={{} as ContractTable} bitcoin={{} as Booktop} />);
