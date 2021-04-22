import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React from 'react';

import {Color} from 'src/contstants/Color';
import {CloseIcon} from 'src/icons/CloseIcon';

import s from './Modal.scss';
import {ModalPortal} from './ModalPortal';

type Props = {
  hardClose?: boolean,
  className?: string,
  title?: string,
  hideHeader?: boolean,
  onClose(): void,
  allowClose: boolean,
  isFullscreen?: boolean,
  width?: number,
};

export const Modal: FC<Props> = (props) => {
  const {
    hardClose = true,
    className,
    onClose = _.noop,
    children,
    allowClose = true,
    width,
  } = props;

  return (
    <ModalPortal>
      <div
        className={cx(s.modal, {isFullscreen: props.isFullscreen}, className)}
        onClick={() => !hardClose && allowClose && onClose()}
      >
        <div
          className={s.container}
          style={{minWidth: width}}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={s.content}>
            { children }
          </div>
          { props.allowClose ? (
            <CloseIcon
              className={s.closeIcon}
              color={Color.black}
              onClick={() => {
                if (props.onClose) {
                  props.onClose();
                }
              }}
            />
          ) : null }
        </div>
      </div>
    </ModalPortal>
  );
};
