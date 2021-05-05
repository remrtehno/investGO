import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import {useRef} from 'react';
import React, {useCallback, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSaveCompanyApi} from 'src/api/companyApi/useSaveCompanyApi';
import {useSaveProjectApi} from 'src/api/companyApi/useSaveProjectApi';
// import {useSaveCompanyEditApi} from 'src/api/companyApi/useSaveCompanyEditApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextEditor} from 'src/components/ui/TextEditor';
import {Color} from 'src/contstants/Color';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';

import type {AddMemberForm} from './TeamField/AddMemberForm';
import {VideoPreview} from './VideoPreview/VideoPreview';

import s from './CompanyEditForm.scss';
import {CompanyEditNavigation} from './CompanyEditNavigation';
import {useCompanyEditFields} from './useCompanyEditFields';

export declare namespace CompanyEditForm {
  export type Props = {};
}

export const CompanyEditForm: FC<CompanyEditForm.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const fields = useCompanyEditFields(user?.company || {});
  const [, saveProjectApi] = useSaveProjectApi();
  const formApiRef = useRef<Form.Api | null>(null);

  const getValuesFromUser = () => ({
    ...getDefaultFieldValues(fields),
    ...({
      title: user?.company?.name,
      email: user?.company?.emails[0],
      phone: user?.company?.phones[0],
    }),
  });

  const initialValues = useMemo(() => getValuesFromUser(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function processLinksforSave(links: {}) {
    return Object.entries(links).map((entry) => {
      return {
        source: entry[0],
        url: entry[1],
      };
    });
  }

  function processValuesForSave() {
    const valuesForSave = {...values};
    if (values.link) {
      valuesForSave.link = processLinksforSave(values.link);
    }
    if (values.team) {
      valuesForSave.team.forEach((team: AddMemberForm.Values) => {
        if (team.link) {
          team.link = processLinksforSave(team.link);
        }
      });
    }
    return valuesForSave;
  }

  const onSave = useCallback(() => {
    const valuesForSave = processValuesForSave();
    saveProjectApi(valuesForSave);
  }, [values]);

  return (
    <Form
      initialValues={initialValues}
      errors={errors}
      values={values}
      onChange={onChange}
      fields={fields}
      onSubmit={onSave}
      formApiRef={formApiRef}
    >
      <CompanyEditNavigation />
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
      </section>
      <section id='description-section' className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Описание</Text>
        <FormRow>
          <Field className='col-12' name='video_link' />
        </FormRow>
        { values.video_link ? (
          <VideoPreview videoLink={values.video_link} />
        ) : null }
        <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
          Расскажите о вашем проекте.
          Заполните описание (цели, миссия, планы, история, технологии, методы, достижения и т.д.).
        </Text>
        <FormRow>
          <Field className='col-12' name='description' />
        </FormRow>
      </section>
      <section id='gallery-section' className={cx(s.section, s.gallerySection)}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Галерея</Text>
        <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
          Добавьте фотографии проекта.
        </Text>
        <FormRow>
          <Field className='col-12' name='gallery_images' />
        </FormRow>
      </section>
      <section id='team-section' className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Команда</Text>
        <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
          Добавьте представителей вашей команды с описанием их опыта.
        </Text>
        <FormRow>
          <Field className='col-12' name='team' />
        </FormRow>
      </section>
      <section id='roadmap-section' className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Дорожная карта</Text>
        <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
          Добавьте этапы развития проекта.
        </Text>
        <FormRow>
          <Field className='col-12' name='roadmap' />
        </FormRow>
      </section>
      <section id='contacts-section' className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Контактные данные</Text>
        <FormRow>
          <Field className='col-6' name='email' />
          <Field className='col-6' name='phone' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='site' />
          <Field className='col-6' name='link' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='data_valid' />
        </FormRow>
        <FormActions>
          <div className='col-sm-12 col-md-5 col-xl-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
              disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
            >Готово</Button>
          </div>
        </FormActions>
      </section>
    </Form>
  );
};
