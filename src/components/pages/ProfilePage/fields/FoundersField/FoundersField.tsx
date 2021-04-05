import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import type {FieldType} from 'src/components/common/Form/Form';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {InfoPanel} from 'src/components/common/InfoPanel';
import {InfoPanelTheme} from 'src/components/common/InfoPanel/InfoPanel';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import { AddButtonIcon } from 'src/components/ui/FileArray/AddButtonIcon';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';
import {CloseIcon} from 'src/icons/CloseIcon';
import type {FilePrimitive} from 'src/types/FilePrimitive';

import {FounderModal} from './FounderModal';
import s from './FoundersField.scss';

export declare namespace FoundersField {
  export type Founder = {
    id: string,
    name: string,
    passport_number: string,
    passport_page_photo: FilePrimitive[],
    passport_page_registration_file: FilePrimitive[],
    passport_serial: string,
    percent: number,
  }

  type Field = Omit<FormField.BaseField, 'value'> & {
    type: FieldType.custom,
    value: Founder[],
  }

  export type Props = FieldProps<Field>;
}

export const FoundersField: FC<FoundersField.Props> = (props) => {
  const {field} = props;
  const founders = field.value || [];
  const form = useFormModel();
  const [isShowFounderModal, setIsShowFounderModal] = useState(false);
  const [changingFounderIndex, setChangingFounderIndex] = useState<number | null>(null);

  function renderFounders() {
    return founders.map((founder, index) => {
      return (
        <div className='container p-0' key={index}>
          <div
            className={s.founder}
            onClick={() => {
              setChangingFounderIndex(index);
              setIsShowFounderModal(true);
            }}
          >
            <CloseIcon
              color={Color.black}
              className={s.removeFounderIcon}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.onChange(founders.filter((f, i) => i !== index), field.name);
              }}
            />
            <div className='row'>
              <div className={cx('col-6', s.founderLabel)}>
                <Text
                  className={s.label}
                  size={TextSize.caption1}
                >Генеральный директор</Text>
                <Text size={TextSize.subHeadline1}>
                  { founder.name }
                </Text>
              </div>
              <div className={cx('col-6', s.founderLabel)}>
                <Text
                  className={s.label}
                  size={TextSize.caption1}
                >Серия и номер паспорта</Text>
                <Text size={TextSize.body1}>
                  { founder.passport_serial } / { founder.passport_number }
                </Text>
              </div>
              <div className={cx('col-6', s.founderLabel)}>
                <Text
                  className={s.label}
                  size={TextSize.caption1}
                >Доля владения</Text>
                <Text size={TextSize.body1}>
                  { founder.percent }%
                </Text>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className={s.FoundersField}>
      { field.error ? (
        <div className='row'>
          <div className='col-12'>
            <InfoPanel style={{marginTop: 28}} isBorderless={true} theme={InfoPanelTheme.error}>
              { field.error }
            </InfoPanel>
          </div>
        </div>
      ) : null }
      { renderFounders() }
      <div className='row'>
        <div className='col-9 col-md-4'>
          <Button
            style={{marginTop: 28}}
            className={s.addFounderButton}
            size={ButtonSize.s}
            sizeSm={ButtonSize.m}
            theme={ButtonTheme.light}
            onClick={() => {
              setChangingFounderIndex(null);
              setIsShowFounderModal(true);
            }}
          >
            <AddButtonIcon />
            <span className={s.addButtonText}>Добавить учредителя</span>
          </Button>
        </div>
      </div>
      { isShowFounderModal ? (
        <FounderModal
          founder={changingFounderIndex == null ? changingFounderIndex : founders[changingFounderIndex]}
          onClose={() => setIsShowFounderModal(false)}
          onSave={(newFounder) => {
            if (changingFounderIndex == null) {
              form.onChange([
                ...founders,
                newFounder,
              ], field.name);
              return;
            }

            form.onChange(founders.map((founder, index) => {
              return index === changingFounderIndex ? newFounder : founder;
            }), field.name);
          }}
        />
      ) : null }
    </div>
  );
};
