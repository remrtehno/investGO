import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {Field} from 'src/components/common/Form/Field';
import {FormRow} from 'src/components/common/Form/FormRow';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';

import s from './CompanyEditForm.scss';

export declare namespace CompanyEditGallery {
  export type Props = {
    onSave(): void,
  }
}

export const CompanyEditGallery: FC<CompanyEditGallery.Props> = (props) => {
  return (
    <section id='gallery-section' className={cx(s.section, s.gallerySection)}>
      <Text size={TextSize.h2} className={s.sectionHeader}>Галерея</Text>
      <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
        Добавьте фотографии проекта.
      </Text>
      <div className='row gx-3'>
        <Field className='col-12' name='gallery_images' />
      </div>
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
