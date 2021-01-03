import React from 'react';
import {Button, ButtonSize, ButtonTheme} from './Button';

export default {
  component: Button,
  title: 'Common/ui',
};

export const ButtonsStory = () => <Button size={ButtonSize.m} theme={ButtonTheme.black} />;
ButtonsStory.story = {name: 'Buttons'};
