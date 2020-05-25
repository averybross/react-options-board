/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import OptionRow from './OptionRow';
import { Contract } from '../OptionsBoard/OptionsBoard';
storiesOf('OptionRow', module).add('default', () => <OptionRow put={{} as Contract} call={{} as Contract} />);

