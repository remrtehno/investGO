import React, {FC} from 'react';
import Modal from "../../../../common/Modal/Modal";
import {Button, ButtonSize, ButtonTheme} from "../../../../ui/Button/Button";
import {Text, TextSize} from "../../../../ui/Text";
import s from './ResetEmailModal.scss';

export declare namespace ResetEmailModal {
  export type Props = {
    onClose(): void,
  };
}

export const ResetEmailModal: FC<ResetEmailModal.Props> = (props) => {
  return (
    <Modal className={s.ResetEmailModal}>
      <div className={s.inner}>
        <Text className={s.message} size={TextSize.body2}>
          На вашу почту отправлена ссылка для восстановления пароля
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
