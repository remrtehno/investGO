import type {FC} from 'react';
import React, {useState} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';

import {AddPointForm} from './AddPointForm';
import s from './RoadmapField.scss';
import {RoadmapItem} from './RoadmapItem';

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

  function addItem(item: AddPointForm.Values) {
    value.push(item);
    form.onChange(value, field.name);
    setIsModalOpened(false);
  }

  function removeItem(index: number) {
    const newValue = [...value];
    newValue.splice(index, 1);
    form.onChange(newValue, field.name);
  }

  return (
    <div className={s.roadmapField}>
      <div className={s.items}>
        { value.map((item: AddPointForm.Values, index: number) => {
          return (
            <RoadmapItem
              item={item}
              index={index}
              className={index === value.length - 1 ? s.itemLast : undefined}
              onRemove={removeItem}
              key={index}
            />
          );
        }) }
      </div>
      <Button
        size={ButtonSize.s}
        sizeSm={ButtonSize.m}
        theme={ButtonTheme.light}
        onClick={openForm}
        className={s.addButton}
        type='button'
      >
        <Text className={s.addButtonLabel} size={TextSize.body1}>+&nbsp;&nbsp;Добавить пункт</Text>
      </Button>

      { isModalOpened ? (
        <Modal
          className={s.modal}
          allowClose={true}
          onClose={handleModalClose}
        >
          <AddPointForm onAddPoint={addItem} />
        </Modal>
      ) : null }
    </div>
  );
};
