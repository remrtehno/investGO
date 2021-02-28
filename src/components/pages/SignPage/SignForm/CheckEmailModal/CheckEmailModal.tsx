import type {FC} from 'react';
import React from 'react';
import _ from 'lodash';

import {Modal} from 'src/components/common/Modal/Modal';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './CheckEmailModal.scss';
import {EmailSendedIcon} from "src/icons/EmailSended";

export declare namespace CheckEmailModal {
  export type Props = {
    onClose(): void,
  };
}

export const CheckEmailModal: FC<CheckEmailModal.Props> = (props) => (
  <Modal
    allowClose={true}
    className={s.CheckEmailModal}
    onClose={_.noop}
  >
    <EmailSendedIcon/>
    <Text className={s.message} size={TextSize.body1}>
      Письмо с подтверждением email отправлено на вашу почту. <br/>
      Пройдите по ссылке из письма для активизации вашего аккаунта.
    </Text>
  </Modal>
);
