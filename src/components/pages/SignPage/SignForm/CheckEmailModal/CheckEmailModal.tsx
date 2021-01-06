import type {FC} from 'react';
import React from 'react';

import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {Text, TextSize} from 'src/components/ui/Text';

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
