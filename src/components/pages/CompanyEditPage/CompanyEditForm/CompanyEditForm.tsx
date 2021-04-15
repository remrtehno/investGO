import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';

// import {useSaveCompanyEditApi} from 'src/api/companyApi/useSaveCompanyEditApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {FormTitle} from 'src/components/common/Form/FormTitle';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import type {ProfileForms} from 'src/components/pages/ProfilePage/ProfileForms/ProfileForms';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {userAtom} from 'src/recoil/userAtom';
import type {User} from 'src/types/User';
import { Text, TextSize } from 'src/components/ui/Text';

import s from './CompanyEditForm.scss';
import {useCompanyEditFields} from './useCompanyEditFields';

export declare namespace CompanyEditForm {
  export type Props = {};
}

export const CompanyEditForm: FC<CompanyEditForm.Props> = (props) => {
  const fields = useCompanyEditFields();
  const initialValues = {};
  const [values, setValues] = useState<Form.Values>(initialValues);
  const [errors, setErrors] = useState<Form.Errors>({});

  const onChange: Form.OnChange = useCallback((values, errors) => {
    setValues(values);
    setErrors(errors);
  }, []);

  return (
    <Form
      initialValues={initialValues}
      errors={errors}
      values={values}
      onChange={onChange}
      fields={fields}
    >
      <section className={s.section}>
        <Text size={TextSize.h2} className={s.sectionHeader}>Контактные данные</Text>
        <FormRow>
          <Field className='col-12' name='emails' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='phones' />
        </FormRow>
        <FormRow>
          <Field className='col-12' name='site' />
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
}