import React, {useState} from 'react';
import {Input} from "./Input";

export default {
  component: Input,
  title: 'Common/ui'
};

export const InputsStory = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      label='Test label'
      value={value}
      onChange={(value) => setValue(value)}
    />
  )
};

InputsStory.story = { name: 'Inputs' };
