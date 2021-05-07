import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {Field} from 'src/components/common/Form/Field';
import {FormRow} from 'src/components/common/Form/FormRow';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';

import s from './CompanyEditForm.scss';

export declare namespace CompanyEditPreview {
  export type Props = {
    onSave(): void,
  }
}

export const CompanyEditPreview: FC<CompanyEditPreview.Props> = (props) => {
  return (
    <section id='preview-section' className={s.section}>
      <Text size={TextSize.h2} className={s.sectionHeader}>Превью</Text>
      <Text size={TextSize.body2} className={s.sectionDescr}>
        Укажите название проекта и дайте краткое описание его деятельности.<br />
        Загрузите изображения.
      </Text>
      <FormRow>
        <Field className={cx(s.bgField, 'col-12')} name='preview' />
      </FormRow>
      <FormRow>
        <Field className={cx('col-2', s.logoField)} name='logo' />
        <Field className={cx('col-10', s.nameField)} name='title' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='small_description' />
      </FormRow>
      <FormRow>
        <Field className='col-12' name='address' />
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
