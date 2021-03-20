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
    onApply(selectedRoles: Role[]): void,
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
    <Modal
      allowClose={true}
      className={s.SelectRolesModal}
      onClose={() => props.onClose()}
    >
      <Text className={s.title} size={TextSize.body2}>{ getTitle() }</Text>
      { props.roles.map((role, i) => {
        return (
          <CheckBox
            key={i}
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
          <div className='col-12'>
            <Button
              className={s.action}
              size={ButtonSize.m}
              theme={ButtonTheme.black}
              onClick={() => props.onApply(values)}
            >Продолжить</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
