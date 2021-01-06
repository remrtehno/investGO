import cx from 'classnames';
import type {FC} from 'react';
import React from 'react';

import {FormRow} from 'src/components/common/Form/FormRow';

import s from './FormActions.scss';

export declare namespace FormActions {
  export type Props = {};
}

export const FormActions: FC<FormActions.Props> = (props) => (
  <FormRow className={cx('justify-content-center', s.FormActions)}>
    { props.children }
  </FormRow>
);
