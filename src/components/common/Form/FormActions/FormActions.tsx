import React, {FC} from 'react';
import {FormRow} from '../FormRow';
import s from './FormActions.scss';
import cx from 'classnames';

export declare namespace FormActions {
  export type Props = {};
}

export const FormActions: FC<FormActions.Props> = (props) => (
  <FormRow className={cx('justify-content-center', s.FormActions)}>
    { props.children }
  </FormRow>
);
