import React, {FC} from 'react';
import Modal from '../../../../common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from '../../../../ui/Button/Button';
import {Text, TextSize} from '../../../../ui/Text';
import s from './CheckEmailModal.scss';

export declare namespace CheckEmailModal {
  export type Props = {
    onClose(): void,
  };
}

export const CheckEmailModal: FC<CheckEmailModal.Props> = (props) => (
  <Modal className={s.CheckEmailModal}>
    <Text className={s.message} size={TextSize.body1}>
      Письмо с подтверждением email отправлено на вашу почту.
    </Text>
    <Button
      size={ButtonSize.m}
      theme={ButtonTheme.black}
      onClick={props.onClose}
    >Ок</Button>
  </Modal>
);
