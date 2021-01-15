import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';

import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button/Button';
import {CheckBox} from 'src/components/ui/CheckBox';
import {Text, TextSize} from 'src/components/ui/Text';
import {Role} from 'src/contstants/Role';
import {roleLabels} from 'src/contstants/rolesLabels';

import s from './SelectRolesModal.scss';

export declare namespace SelectRolesModal {
  export type Props = {
    mainRole: Role | null,
    roles: Role[],
    onApply(): void,
    onClose(): void,
  };
}

export const SelectRolesModal: FC<SelectRolesModal.Props> = (props) => {
  const [values, setValues] = useState<Role[]>([]);

  function getTitle() {
    if (props.mainRole === Role.fl) {
      return 'Для физического лица в платформе доступна только опция ИНВЕСТОР.';
    }

    return 'Укажите, в роли кого вы будете действовать на платформе InvestGO?';
  }

  return (
    <Modal className={s.SelectRolesModal}>
      <Text className={s.title} size={TextSize.body2}>{ getTitle() }</Text>
      { props.roles.map((role) => {
        return (
          <CheckBox
            value={values.includes(role)}
            name={role}
            label={roleLabels[role]}
            onChange={(checked) => {
              if (checked) {
                setValues([...values, role]);
                return;
              }

              setValues(values.filter((value) => value !== role));
            }}
          />
        );
      }) }
      <div className={cx('container', 'p-0', s.actions)}>
        <div className='row'>
          <div className='col-6'>
            <Button
              className={s.action}
              size={ButtonSize.m}
              theme={ButtonTheme.black}
              onClick={() => props.onApply()}
            >Продолжить</Button>
          </div>
          <div className='col-6'>
            <Button
              className={s.action}
              size={ButtonSize.m}
              theme={ButtonTheme.light}
              onClick={() => props.onClose()}
            >Назад</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
