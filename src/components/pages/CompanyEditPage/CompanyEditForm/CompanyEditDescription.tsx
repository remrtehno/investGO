import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {Field} from 'src/components/common/Form/Field';
import {FormRow} from 'src/components/common/Form/FormRow';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';

import s from './CompanyEditForm.scss';
import {VideoPreview} from './VideoPreview';

export declare namespace CompanyEditDescription {
  export type Props = {
    onSave(): void,
    videoLink: string,
  }
}

export const CompanyEditDescription: FC<CompanyEditDescription.Props> = (props) => {
  return (
    <section id='description-section' className={s.section}>
      <Text size={TextSize.h2} className={s.sectionHeader}>Описание</Text>
      <FormRow>
        <Field className='col-12' name='video_link' />
      </FormRow>
      { props.videoLink ? (
        <VideoPreview videoLink={props.videoLink} />
      ) : null }
      <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
        Расскажите о вашем проекте.
        Заполните описание (цели, миссия, планы, история, технологии, методы, достижения и т.д.).
      </Text>
      <FormRow>
        <Field className='col-12' name='description' />
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
