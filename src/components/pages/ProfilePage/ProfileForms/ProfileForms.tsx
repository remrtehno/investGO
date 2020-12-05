import React, {FC} from "react";
import {ProfilePage} from "../ProfilePage";
import {ProfileFormType} from "../profilePageTypes";
import {ProfileForm} from "./forms/ProfileForm";
import s from './ProfileForms.scss';

const forms: Record<ProfileFormType, FC<ProfileForms.FormProps>> = {
  [ProfileFormType.profile]: ProfileForm,
  [ProfileFormType.passport]: () => null,
};

export declare namespace ProfileForms {
  export type Props = {
    forms: ProfilePage.FormInfo[]
  }

  export type FormProps = {
    form: ProfilePage.FormInfo,
  }
}

export const ProfileForms: FC<ProfileForms.Props> = (props) => {
  return (
    <div className={s.ProfileForms}>
      {props.forms.map((form) => {
        const Form = forms[form.id];

        return (
          <Form key={form.id} form={form}/>
        );
      })}
    </div>
  )
};
