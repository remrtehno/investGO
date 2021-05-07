
import _ from 'lodash';
import type {FC} from 'react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';

import {useSaveProjectApi} from 'src/api/companyApi/useSaveProjectApi';
import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FormActions} from 'src/components/common/Form/FormActions';
import {FormRow} from 'src/components/common/Form/FormRow';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {userAtom} from 'src/recoil/userAtom';

import {CompanyEditContacts} from './CompanyEditContacts';
import {CompanyEditDescription} from './CompanyEditDescription';
import s from './CompanyEditForm.scss';
import {CompanyEditGallery} from './CompanyEditGallery';
import {CompanyEditNavigation} from './CompanyEditNavigation';
import {CompanyEditPreview} from './CompanyEditPreview';
import {CompanyEditRoadmap} from './CompanyEditRoadmap';
import {CompanyEditSuccessModal} from './CompanyEditSuccessModal';
import {CompanyEditTeam} from './CompanyEditTeam';
import {useCompanyEditFields} from './useCompanyEditFields';

export declare namespace CompanyEditForm {
  export type Props = {};
}

export const CompanyEditForm: FC<CompanyEditForm.Props> = (props) => {
  const {user} = useRecoilValue(userAtom);
  const fields = useCompanyEditFields();
  const [, saveProjectApi, saveProjectState] = useSaveProjectApi();
  const formApiRef = useRef<Form.Api | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFullySaved, setIsFullySaved] = useState(false);

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
      valuesForSave.team.forEach((team: any) => {
        if (team.link) {
          team.link = processLinksforSave(team.link);
        }
      });
    }
    if (values.gallery_images) {
      valuesForSave.gallery_images = valuesForSave.gallery_images.map((img: any) => {
        return {id: img.id};
      });
    }
    if (values.logo) {
      valuesForSave.logo = {id: valuesForSave.logo.id};
    }
    if (values.preview) {
      valuesForSave.preview = {id: valuesForSave.preview.id};
    }
    return valuesForSave;
  }

  const onSave = useCallback(() => {
    const valuesForSave = processValuesForSave();
    saveProjectApi(valuesForSave);
    setIsFullySaved(true);
  }, [values]);

  function savePartial() {
    const processedValues = processValuesForSave();
    const valuesForSave = {} as any;
    Object.entries(processedValues).forEach((entry) => {
      let add = true;
      const value = entry[1];
      if (!value) {
        add = false;
      }
      if (Array.isArray(value) && !value.length) {
        add = false;
      }
      if ((entry[0] === 'logo' || entry[0] === 'preview') && value && !value.id) {
        add = false;
      }
      if (add) {
        valuesForSave[entry[0]] = value;
      }
    });
    setIsFullySaved(false);
    saveProjectApi(valuesForSave);
  }

  useEffect(() => {
    if (saveProjectState.isSuccess) {
      setIsSuccessModalOpen(true);
    }
  }, [saveProjectState.isSuccess]);

  function handleModalClose() {
    setIsSuccessModalOpen(false);
  }


  function handleSubmit() {
    return false;
  }

  return (
    <Form
      initialValues={initialValues}
      errors={errors}
      values={values}
      onChange={onChange}
      fields={fields}
      onSubmit={handleSubmit}
      formApiRef={formApiRef}
      id='CompanyEditForm'
    >
      <CompanyEditNavigation />
      <CompanyEditPreview onSave={savePartial} />
      <CompanyEditDescription onSave={savePartial} videoLink={values.video_link} />
      <CompanyEditGallery onSave={savePartial} />
      <CompanyEditTeam onSave={savePartial} />
      <CompanyEditRoadmap onSave={savePartial} />
      <CompanyEditContacts />
      <FormRow>
        <Field className='col-12' name='data_valid' />
      </FormRow>
      <FormActions>
        <div className='col-sm-12 col-md-5 col-xl-3'>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.m}
            disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
            type='button'
            onClick={onSave}
          >Готово</Button>
        </div>
        <div className='col-sm-12 col-md-5 col-xl-4'>
          <Button
            theme={ButtonTheme.black}
            size={ButtonSize.m}
            disabled={Boolean(!formApiRef.current || !formApiRef.current.isValid)}
            type='button'
            onClick={onSave}
          >Сохранить и отправить</Button>
        </div>
      </FormActions>
      { isSuccessModalOpen ? (
        <CompanyEditSuccessModal isFullySaved={isFullySaved} onClose={handleModalClose} />
      ) : null }
    </Form>
  );
};
