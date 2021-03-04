import React, {FC} from 'react';
import cx from "classnames"
import _ from "lodash"
import {Modal} from "../../../../common/Modal/Modal";
import {Button, ButtonSize, ButtonTheme} from "../../../../ui/Button/Button";
import {Text, TextSize} from "../../../../ui/Text";
import {EmailSendedIcon} from 'src/icons/EmailSended';
import s from './PasswordResetModal.scss';
import { AccountIcon } from 'src/icons/AccountIcon';

export declare namespace PasswordResetModal {
  export type Props = {
    onClose(): void,
    text?: string,
    icon?: string
  };
}

export const PasswordResetModal: FC<PasswordResetModal.Props> = (props) => {
  return (
    <Modal className={s.PasswordResetModal} allowClose={false} onClose={_.noop}>
      <div className={s.inner}>
        {props.icon && props.icon === "email" ? (
          <EmailSendedIcon className={cx(s.icon, s.icon_email)} />
        ) : null}
        {props.icon && props.icon === "account" ? (
          <AccountIcon className={cx(s.icon)} />
        ) : null}
        <Text className={s.message} size={TextSize.body2}>
          {props.text}
        </Text>
        <div className={s.buttonPlace}>
          <Button
            size={ButtonSize.s}
            theme={ButtonTheme.black}
            onClick={props.onClose}
          >Ок</Button>
        </div>
      </div>
    </Modal>
  );
}; 
