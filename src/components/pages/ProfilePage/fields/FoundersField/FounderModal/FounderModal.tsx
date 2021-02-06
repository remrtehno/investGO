import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useMemo, useRef, useState} from 'react';

import {Form} from 'src/components/common/Form';
import {Field} from 'src/components/common/Form/Field';
import {FieldType} from 'src/components/common/Form/Form';
import {getDefaultFieldValues} from 'src/components/common/Form/getDefaultFieldValues';
import {Modal} from 'src/components/common/Modal/Modal';
import type {FoundersField} from 'src/components/pages/ProfilePage/fields/FoundersField/FoundersField';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';
import {maxValue} from 'src/validations/maxValue';
import {minValue} from 'src/validations/minValue';
import {required} from 'src/validations/required';

import s from './FounderModal.scss';

function userFields(): Form.FieldModels {
  return {
    id: {
      type: FieldType.hidden,
      name: 'id',
    },
    name: {
      type: FieldType.text,
      name: 'name',
      label: 'Генеральный директор',
      validations: [required()],
    },
    serialNumber: {
      type: FieldType.text,
      name: 'serialNumber',
      label: 'Серия и номер паспорта',
      mask: '9999 999999',
      validations: [required(), (value) => {
        if (value.replace(/\s/g, '').replace(/_/g, '').length < 10) {
          return 'Обязательно для заполнения';
        }

        return null;
      }],
    },
    passport_page_photo_file: {
      type: FieldType.file,
      name: 'passport_page_photo_file',
      label: 'Паспорт: страница с фотографией',
      validations: [required()],
    },
    passport_page_registration_file: {
      type: FieldType.file,
      name: 'passport_page_registration_file',
      label: 'Паспорт: страница с регистрацией',
      validations: [required()],
    },
    percent: {
      type: FieldType.number,
      label: 'Доля владения',
      name: 'percent',
      isInteger: false,
      validations: [required(), minValue(0), maxValue(100)],
    },
  };
}

export declare namespace FounderModal {
  export type Props = {
    founder: FoundersField.Founder | null,
    onSave(founder: FoundersField.Founder): void,
    onClose(): void,
  };
}

export const FounderModal: FC<FounderModal.Props> = (props) => {
  const [errors, setErrors] = useState<Form.Errors>({});
  const fields = userFields();
  const formApiRef = useRef<Form.Api | null>(null);


  const initialValues = useMemo(() => {
    if (!props.founder) {
      return getDefaultFieldValues(fields);
    }

    return {
      ...getDefaultFieldValues(fields),
      ...props.founder,
      serialNumber: `${props.founder.passport_serial} ${props.founder.passport_number}`,
    };
  }, [props.founder]);

  const [values, setValues] = useState<Form.Values>(initialValues);

  return (
    <Modal
      allowClose={true}
      onClose={props.onClose}
    >
      <Form
        initialValues={initialValues}
        values={values}
        errors={errors}
        fields={fields}
        formApiRef={formApiRef}
        onChange={(values, errors) => {
          setValues(values);
          setErrors(errors);
        }}
      >
        <div className={cx('container', s.FounderModal)}>
          <div className='row'>
            <div className='col-12'>
              <Text size={TextSize.h2}>Добавить учредителя</Text>
            </div>
          </div>
          <div className='row'>
            <Field name='name' className={cx('col-12', s.field)} />
            <Field name='serialNumber' className={cx('col-12', s.field)} />
            <Field name='percent' className={cx('col-12', s.field)} />
            <div className={cx('col-12', s.field)}>
              <Text style={{ marginBottom: 12 }} size={TextSize.subHeadline1} className={s.title}>Страница пасспорта с фотографией</Text>
              <Field name='passport_page_photo_file' />
            </div>
            <div className={cx('col-12', s.field)}>
              <Text style={{ marginBottom: 12 }} size={TextSize.subHeadline1} className={s.title}>Страница пасспорта с регистрацией</Text>
              <Field name='passport_page_registration_file' />
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <Button
            className={cx('col-4', s.saveButton)}
            size={ButtonSize.m}
            theme={ButtonTheme.black}
            onClick={() => {
              if (!formApiRef.current) {
                return;
              }

              formApiRef.current.submit();
              if (!formApiRef.current.isValid) {
                return;
              }

              props.onSave({
                ..._.omit(values, 'serialNumber'),
                passport_serial: values.serialNumber.slice(0, 4),
                passport_number: values.serialNumber.slice(5),
              } as FoundersField.Founder);
              props.onClose();
            }}
          >Сохранить</Button>
        </div>
      </Form>
    </Modal>
  );
};
