import cx from 'classnames';
import _ from 'lodash';
import type {FC} from 'react';
import React, {useEffect, useState} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {AddButtonIcon} from 'src/components/ui/FileArrayInput/AddButtonIcon';
import {Text, TextSize} from 'src/components/ui/Text';
import {Color} from 'src/contstants/Color';

import {AddPointForm} from './AddPointForm';
import s from './RoadmapField.scss';

export declare namespace RoadmapField {
  export type Props = FieldProps<FormField.Custom>
}

export const RoadmapField: FC<RoadmapField.Props> = (props) => {
  const form = useFormModel();
  const {field} = props;
  const value = field.value || [];
  const [isModalOpened, setIsModalOpened] = useState(false);

  function openForm() {
    setIsModalOpened(true);
  }

  function handleModalClose() {
    setIsModalOpened(false);
  }

  function addPoint(point: AddPointForm.Values) {
    value.push(point);
    form.onChange(value, field.name);
    setIsModalOpened(false);
  }

  return (
    <div className={s.roadmapField}>
      <div className={s.items}>
        { value.map((item: AddPointForm.Values, index: number) => {
          return (
            <div className={cx(s.item, index === value.length - 1 && s.itemLast)} key={index}>
              <div className={s.name}>{ item.name }</div>
              <Text size={TextSize.body0}>{ item.description }</Text>
            </div>
          );
        }) }
      </div>
      <Button
        size={ButtonSize.s}
        sizeSm={ButtonSize.m}
        theme={ButtonTheme.light}
        onClick={openForm}
        className={s.addButton}
      >
        <Text className={s.addButtonLabel} size={TextSize.body1}>+&nbsp;&nbsp;Добавить пункт</Text>
      </Button>

      { isModalOpened ? (
        <Modal
          className={s.modal}
          allowClose={true}
          onClose={handleModalClose}
        >
          <AddPointForm onAddPoint={addPoint} />
        </Modal>
      ) : null }
    </div>
  );
};
