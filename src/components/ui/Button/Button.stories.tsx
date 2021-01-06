import _ from 'lodash';
import React from 'react';

import {Button, ButtonSize, ButtonTheme} from './Button';

// eslint-disable-next-line
export default {
  component: Button,
  title: 'Common/ui',
};

export const ButtonsStory = () => (<Button
  size={ButtonSize.m}
  theme={ButtonTheme.black}
  onClick={_.noop}
/>);
ButtonsStory.story = {name: 'Buttons'};
