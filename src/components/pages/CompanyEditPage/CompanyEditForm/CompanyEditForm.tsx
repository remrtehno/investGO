import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import {CSSProperties, useRef} from 'react';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSaveCompanyApi} from 'src/api/companyApi/useSaveCompanyApi';
// import {useSaveCompanyEditApi} from 'src/api/companyApi/useSaveCompanyEditApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import Tabs from 'src/components/ui/Tabs/Tabs';
import {Text, TextSize} from 'src/components/ui/Text';
import {TextEditor} from 'src/components/ui/TextEditor';
import {Color} from 'src/contstants/Color';
import {usePageScroll} from 'src/hooks/usePageScroll';
import {usePosition} from 'src/hooks/usePosition';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';
import {getElementPosition} from 'src/utils/getElementPosition';

import s from './CompanyEditForm.scss';
import {useCompanyEditFields} from './useCompanyEditFields';

export declare namespace CompanyEditForm {
  export type Props = {};
}

const tabs = [
  {id: 'preview-section', label: 'Превью'},
  {id: 'description-section', label: 'Описание'},
  {id: 'gallery-section', label: 'Галерея'},
  {id: 'team-section', label: 'Команда'},
  {id: 'roadmap-section', label: 'Дорожная карта'},
  {id: 'contacts-section', label: 'Контакты'},
];

export const CompanyEditForm: FC<CompanyEditForm.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const fields = useCompanyEditFields(user?.company || {});
  const [, saveCompanyApi] = useSaveCompanyApi();
  const [activeSection, setActiveSection] = useState('');
  const preventHandleScrollRef = useRef(false);
  const {scrollTop} = usePageScroll();
  const navRef = useRef<HTMLDivElement | null>(null);
  const navPos = usePosition(navRef);

  const getValuesFromUser = () => ({
    ...getDefaultFieldValues(fields),
    ...(user?.company || {}),
  });

  const initialValues = useMemo(() => getValuesFromUser(), [fields]);
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  function handleChangeTab(tab: string) {
    setActiveSection(tab);
  }

  useEffect(() => {
    if (preventHandleScrollRef.current) {
      return;
    }
    const sectionEl = document.getElementById(activeSection);
    if (sectionEl) {
      preventHandleScrollRef.current = true;
      sectionEl.scrollIntoView();
      // prevFormRef.current = props.currentForm;
      setTimeout(() => {
        preventHandleScrollRef.current = false;
      }, 100);
    }
  }, [activeSection]);

  return (
    <Form
      initialValues={initialValues}
      errors={errors}
      values={values}
      onChange={onChange}
      fields={fields}
    >
      <div className={s.navigationContainer} ref={navRef}>
        <div className={s.navigation}>
          <Tabs
            tabs={tabs}
            activeTab={activeSection}
            onChange={handleChangeTab}
          />
        </div>
      </div>
      <section id='preview-section' className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Превью</Text>
        <Text size={TextSize.body2} className={s.sectionDescr}>
          Укажите название проекта и дайте краткое описание его деятельности.<br />
          Загрузите изображения.
        </Text>
        <FormRow>
          <Field className={cx(s.bgField, 'col-12')} name='bg_image' />
        </FormRow>
        <FormRow>
          <Field className={cx('col-2', s.logoField)} name='logo' />
          <Field className={cx('col-10', s.nameField)} name='name' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='field_of_activity' />
        </FormRow>
      </section>
      <section id='description-section' className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Описание</Text>
        <FormRow>
          <Field className='col-12' name='video' />
        </FormRow>
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
          <Field className='col-12' name='gallery' />
        </FormRow>
      </section>
      <section id='team-section' className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Команда</Text>
        <Text size={TextSize.body2} color={Color.label} className={s.sectionDescr}>
          Добавьте представителей вашей команды с описанием их опыта.
        </Text>
        <FormRow>
          <Field className='col-12' name='founders' />
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
          <Field className='col-12' name='emails' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='phones' />
        </FormRow>
        <FormRow>
          <Field className='col-6' name='site' />
          <Field className='col-6' name='socials' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='data_valid' />
        </FormRow>
        <FormActions>
          <div className='col-sm-12 col-md-5 col-xl-3'>
            <Button
              theme={ButtonTheme.black}
              size={ButtonSize.m}
            >Готово</Button>
          </div>
        </FormActions>
      </section>
    </Form>
  );
};
