import type {FC} from 'react';
import React, {useMemo, useState} from 'react';

import type {FieldProps} from 'src/components/common/Form/fields/fieldsModel';
import {fieldsModel} from 'src/components/common/Form/fields/fieldsModel';
import {TextField} from 'src/components/common/Form/fields/textField';
import {FieldType} from 'src/components/common/Form/Form';
import type {FormField} from 'src/components/common/Form/types';
import type {SvgProps} from 'src/types/common';

import s from './passwordField.scss';

function ShowIcon(props: SvgProps) {
  return (
    <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M12 9.5C10.358 9.5 9 10.859 9 12.5C9 14.142 10.358 15.5 12 15.5C13.641 15.5 15 14.142 15 12.5C15 10.859 13.641 9.5 12 9.5Z' fill='#D1CED2' />
      <path d='M12 5.5C4.408 5.5 2.12632 12.117 2.10543 12.184L2 12.5L2.10444 12.816C2.12632 12.883 4.408 19.5 12 19.5C19.592 19.5 21.8737 12.883 21.8946 12.816L22 12.5L21.8956 12.184C21.8737 12.117 19.592 5.5 12 5.5ZM12 17.5C6.67774 17.5 4.61587 13.654 4.11657 12.5C4.61786 11.342 6.68072 7.5 12 7.5C17.3223 7.5 19.3841 11.346 19.8834 12.5C19.3821 13.658 17.3193 17.5 12 17.5Z' fill='#D1CED2' />
    </svg>
  );
}

function HideIcon(props: SvgProps) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path fillRule='evenodd' clipRule='evenodd' d='M4.41246 3L21.3813 19.9688L21.3831 19.9671L21.3848 19.9688L19.9706 21.383L16.6137 18.0262C15.3568 18.6124 13.8332 18.9982 12 18.9982C4.408 18.9982 2.12632 12.3812 2.10444 12.3142L2 11.9982L2.10543 11.6822C2.11863 11.6399 3.03404 8.98367 5.62047 7.03293L3 4.41246L4.41246 3ZM15.0867 16.4992L13.2895 14.7019C12.8976 14.8916 12.4599 14.9982 12 14.9982C10.358 14.9982 9 13.6402 9 11.9982C9 11.5384 9.10665 11.1006 9.29631 10.7088L7.03632 8.44878C5.26898 9.66417 4.41537 11.308 4.11657 11.9982C4.61587 13.1522 6.67774 16.9982 12 16.9982C13.184 16.9982 14.2067 16.8079 15.0867 16.4992Z' fill='#D1CED2' />
      <path d='M9.50022 5.25933C10.2611 5.09277 11.0926 4.99825 12 4.99825C19.592 4.99825 21.8737 11.6152 21.8956 11.6822L22 11.9982L21.8946 12.3142C21.8843 12.3473 21.3248 13.9714 19.8511 15.6102L18.4594 14.2185C19.2458 13.3279 19.6859 12.4546 19.8834 11.9982C19.3841 10.8442 17.3223 6.99825 12 6.99825C11.7475 6.99825 11.5024 7.0069 11.2644 7.02352L9.50022 5.25933Z' fill='#D1CED2' />
    </svg>
  );
}

export const passwordField: FC<FieldProps<FormField.Text>> = (props) => {
  const [isPassportVisible, setIsPasswordVisible] = useState(false);

  const field = useMemo((): FormField.Text => ({
    ...props.field,
    type: FieldType.text,
  }), [props.field]);

  return (
    <div className={s.passwordField}>
      <TextField
        field={field}
        isPassword={!isPassportVisible}
      />
      { isPassportVisible
        ? <HideIcon className={s.icon} onClick={() => setIsPasswordVisible(false)} />
        : <ShowIcon className={s.icon} onClick={() => setIsPasswordVisible(true)} />
      }
    </div>
  );
};

fieldsModel.register({
  type: FieldType.password,
  component: passwordField,
});
