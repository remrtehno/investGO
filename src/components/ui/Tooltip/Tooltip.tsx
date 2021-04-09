import cx from 'classnames';
import type {FC, ReactElement, ReactNode} from 'react';
import React, {useState} from 'react';
import {usePopper} from 'react-popper';

import {InfoIcon} from 'src/icons/InfoIcon';

import s from './Tooltip.scss';

declare namespace Tooltip {
  export type Props = {
    content: string | ReactNode| ReactElement
    componentIcon?: any,
    showButton?: boolean,
    background?: 'black' | 'white',
    className?: string,
  }
}

export const Tooltip: FC<Tooltip.Props> = (props) => {
  const [show, setShow] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
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
    <span className={cx(s.wrapper, props.className && props.className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={setReferenceElement}
    >
      { props.children }

      { props.showButton ? (
        <button
          className={s.buttonTooltip}
          type='button'
        >
          <Icon className={s.iconTooltip} />
        </button>
      ) : null }

      {
        show ? (
          <div
            className={cx(s.tooltip, props.background === 'white' && s.bgWhite)}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            { props.content }
            <div ref={setArrowElement} style={styles.arrow} className={s.arrow} />
          </div>
        ) : null
      }
    </span>
  );
};
