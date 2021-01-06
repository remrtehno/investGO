import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React from 'react';

import s from './Modal.scss';
import {ModalPortal} from './ModalPortal';

type Props = {
    isOpen?: boolean,
    hardClose?: boolean,
    className?: string,
    title?: string,
    hideHeader?: boolean,
    onClose?(): void,
    allowClose?: boolean,
    isFullscreen?: boolean,
};

export const Modal: FC<Props> = (props) => {
  const {
    hardClose,
    className,
    onClose = _.noop,
    children,
    allowClose = true,
  } = props;

  return (
    <ModalPortal>
      <div
        className={cx(s.modal, {isFullscreen: props.isFullscreen}, className)}
        onClick={() => !hardClose && allowClose && onClose()}
      >
        <div
          className={s.container}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={s.content}>
            { children }
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
