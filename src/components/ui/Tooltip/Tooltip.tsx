import type {FC} from 'react';
import React, {useState} from 'react';
import {usePopper} from 'react-popper';

import {InfoIcon} from 'src/icons/InfoIcon';

import s from './Tooltip.scss';

declare namespace Tooltip {
  export type Props = {
    componentIcon?: any,
  }
}

export const Tooltip: FC<Tooltip.Props> = (props) => {
  const [show, setShow] = useState(true);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    modifiers: [{name: 'arrow', options: {element: arrowElement}}],
    placement: 'top',
  });

  const Icon = props.componentIcon || InfoIcon;

  const onMouseEnter = () => {
    setShow(true);
  };

  const onMouseLeave = () => {
    setShow(false);
  };


  return (
    <React.Fragment>
      <button
        className={s.buttonTooltip}
        type='button'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={setReferenceElement}
      >
        <Icon className={s.iconTooltip} />
      </button>

      {
        show
          ? <div className={s.tooltip} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            { props.children }
            <div ref={setArrowElement} style={styles.arrow} className={s.arrow} />
          </div>
          : null
      }
    </React.Fragment>
  );
};
