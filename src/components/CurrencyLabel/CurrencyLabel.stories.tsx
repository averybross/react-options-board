/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import CurrencyLabel from './CurrencyLabel';

storiesOf('CurrencyLabel', module).add('default', () => <CurrencyLabel price={500000} />);
