/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import OptionsBoardPriceRow from './OptionsBoardPriceRow';
import { Booktop } from '../OptionsBoard/OptionsBoard';

storiesOf('OptionsBoardPriceRow', module).add('default', () => <OptionsBoardPriceRow bitcoinPrice={12} />);
