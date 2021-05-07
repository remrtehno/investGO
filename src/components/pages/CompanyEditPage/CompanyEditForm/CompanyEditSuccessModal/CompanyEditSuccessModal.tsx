import type {FC} from 'react';
import React from 'react';

import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './CompanyEditSuccessModal.scss';

export declare namespace CompanyEditSuccessModal {
  export type Props = {
    onClose(): void,
    isFullySaved?: boolean
  }
}

export const CompanyEditSuccessModal: FC<CompanyEditSuccessModal.Props> = (props) => {
  return (
    <Modal className={s.successModal} allowClose={true} onClose={props.onClose}>
      <div className={s.modalInner}>
        { props.isFullySaved ? (
          <Text size={TextSize.body2}>
            Ваши данные отправлены на проверку.
            Информация о статусе проверки будет отправлена на ваш электронный адрес.
          </Text>
        ) : (
          <Text size={TextSize.body2}>
            Данные сохранены.
          </Text>
        ) }
        <div className={s.modalButtons}>
          <Button
            size={ButtonSize.s}
            theme={ButtonTheme.black}
            onClick={props.onClose}
          >
            Понятно
          </Button>
        </div>
      </div>
    </Modal>
  );
};
