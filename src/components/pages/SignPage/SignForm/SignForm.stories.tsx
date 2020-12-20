import React from 'react';
import {SignForm} from "./SignForm";

export default {
  component: SignForm,
  title: 'pages/SignPage'
};

export const SignFormStory = () => {
  return (
    <div className='container' style={{ backgroundColor: '#F8F9FA' }}>
      <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='col-4'>
          <SignForm/>
        </div>
      </div>
    </div>
  );
};

SignFormStory.story = { name: 'SignForm' };
