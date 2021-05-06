import cx from 'classnames';
import type {FC} from 'react';
import React, {useState} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {useFormModel} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import {Modal} from 'src/components/common/Modal/Modal';
import {Button, ButtonSize, ButtonTheme} from 'src/components/ui/Button';
import {Text, TextSize} from 'src/components/ui/Text';

import {AddMemberForm} from './AddMemberForm';
import s from './TeamField.scss';
import {TeamMember} from './TeamMember';

export declare namespace TeamField {
  export type Props = FieldProps<FormField.Custom>
}

export const TeamField: FC<TeamField.Props> = (props) => {
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

  function addMember(item: AddMemberForm.Values) {
    value.push(item);
    form.onChange(value, field.name);
    setIsModalOpened(false);
  }

  function removeMember(index: number) {
    const newValue = [...value];
    newValue.splice(index, 1);
    form.onChange(newValue, field.name);
  }

  return (
    <div>
      <div className={cx('row', value.length && s.members)}>
        { value.map((member: AddMemberForm.Values, index: number) => {
          return (
            <div className='col-6' key={index}>
              <TeamMember
                member={member}
                index={index}
                className={index === value.length - 1 ? s.itemLast : undefined}
                onRemove={removeMember}
              />
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
        type='button'
      >
        <Text className={s.addButtonLabel} size={TextSize.body1}>+&nbsp;&nbsp;Добавить человека</Text>
      </Button>

      { isModalOpened ? (
        <Modal
          className={s.modal}
          allowClose={true}
          onClose={handleModalClose}
        >
          <AddMemberForm onAddMember={addMember} />
        </Modal>
      ) : null }
    </div>
  );
};
