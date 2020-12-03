import React, {FC} from 'react';
import s from './Modal.scss';
import cx from 'classnames';
import {ModalPortal} from "./ModalPortal";
import _ from 'lodash';

type Props = {
    isOpen?: boolean,
    hardClose?: boolean,
    className?: string,
    title?: string,
    hideHeader?: boolean,
    onClose?(): void,
    allowClose?: boolean,
};

const Modal: FC<Props> = (props) => {
    const {
        hardClose,
        className,
        onClose = _.noop,
        children,
        allowClose = true
    } = props;

    return (
        <ModalPortal>
            <div
                className={cx(s.modal, className)}
                onClick={() => { !hardClose && allowClose && onClose();}}
            >
                <div
                  className={s.container}
                  onClick={(e) => e.stopPropagation()}
                >
                    <div className={s.content}>
                        {children}
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
};

export default Modal;
