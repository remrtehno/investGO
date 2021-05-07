import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {Field} from 'src/components/common/Form/Field';
import {FormRow} from 'src/components/common/Form/FormRow';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';

import s from './CompanyEditForm.scss';

export declare namespace CompanyEditTeam {
  export type Props = {
    onSave(): void,
  }
}

export const CompanyEditTeam: FC<CompanyEditTeam.Props> = (props) => {
  return (
    <section id='team-section' className={s.section}>
      <Text size={TextSize.h2} className={s.sectionHeader}>Команда</Text>
      <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
        Добавьте представителей вашей команды с описанием их опыта.
      </Text>
      <FormRow>
        <Field className='col-12' name='team' />
      </FormRow>
      <FormRow>
        <div className={cx('col-3', s.sectionButton)}>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.s}
            type='button'
            onClick={props.onSave}
          >Сохранить</Button>
        </div>
      </FormRow>
    </section>
  );
};
