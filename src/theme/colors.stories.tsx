import React from 'react';

export default {
  title: 'Common/ui',
};

const colors = ['black', 'white', 'red', 'gray1', 'gray2', 'gray3', 'gray4', 'label', 'text', 'link'];

export const ColorsStory = () => {
  function renderColor(color: string) {
    return (
      <div key={color} style={{marginRight: 24}}>
        <div style={{textAlign: 'center'}}>{ color }</div>
        <div
          style={{
            marginTop: 16,
            width: 64,
            height: 64,
            backgroundColor: `var(--${color})`,
            borderRadius: 64,
            boxShadow: '0 0 4px rgba(0,0,0,0.5)',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      { colors.map(renderColor) }
    </div>
  );
};

ColorsStory.story = {name: 'colors'};
