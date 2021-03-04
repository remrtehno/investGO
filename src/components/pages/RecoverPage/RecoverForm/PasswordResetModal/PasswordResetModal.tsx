import React, {FC} from 'react';
import _ from "lodash"
import {Modal} from "../../../../common/Modal/Modal";
import {Button, ButtonSize, ButtonTheme} from "../../../../ui/Button/Button";
import {Text, TextSize} from "../../../../ui/Text";
import s from './PasswordResetModal.scss';

export declare namespace PasswordResetModal {
  export type Props = {
    onClose(): void,
    text?: string
  };
}

export const PasswordResetModal: FC<PasswordResetModal.Props> = (props) => {
  return (
    <Modal className={s.PasswordResetModal} allowClose={false} onClose={_.noop}>
      <div className={s.inner}>
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
