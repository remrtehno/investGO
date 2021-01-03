import React, {useState} from 'react';
import {Input} from './Input';

export default {
  component: Input,
  title: 'Common/ui',
};

export const InputsStory = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      label='Test label'
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

InputsStory.story = {name: 'Inputs'};
