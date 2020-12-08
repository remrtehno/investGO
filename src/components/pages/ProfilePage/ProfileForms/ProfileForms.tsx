import React, {FC, useEffect, useRef} from "react";
import {usePageScroll} from "../../../../hooks/usePageScroll";
import {getElementPosition} from "../../../../utils/getElementPosition";
import {ProfilePage} from "../ProfilePage";
import {ProfileFormType} from "../profilePageTypes";
import {IndividualEntrepreneurForm} from "./forms/IndividualEntrepreneurForm";
import {PassportForm} from "./forms/PassportForm";
import {ProfileForm} from "./forms/ProfileForm";
import {RequisitionsForm} from "./forms/RequisitionsForm";
import s from './ProfileForms.scss';
import cx from 'classnames';

const forms: Record<ProfileFormType, FC<ProfileForms.FormProps>> = {
  [ProfileFormType.profile]: ProfileForm,
  [ProfileFormType.passport]: PassportForm,
  [ProfileFormType.requisitions]: RequisitionsForm,
  [ProfileFormType.individualEntrepreneur]: IndividualEntrepreneurForm,
};

export declare namespace ProfileForms {
  export type Props = {
    forms: ProfilePage.FormInfo[],
    onChangeCurrentForm(form: ProfileFormType): void
    currentForm: ProfileFormType,

    className?: string,
  }

  export type FormProps = {
    form: ProfilePage.FormInfo,
    formRef(formEl: HTMLDivElement): void,
  }
}

export const ProfileForms: FC<ProfileForms.Props> = (props) => {
  const { scrollTop } = usePageScroll();
  const formsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const prevFormRef = useRef<ProfileFormType | null>(null);
  const preventHandleScrollRef = useRef(false);

  useEffect(() => {
    if (preventHandleScrollRef.current) {
      return;
    }

    let newCurrentForm: { id: ProfileFormType, pos: number } | null = null;

    props.forms.forEach((form) => {
      const el = formsRef.current[form.id];

      if (!el) {
        return;
      }

      const { top } = getElementPosition(el);
      const pos = Math.abs(top + el.offsetHeight / 2);

      if (!newCurrentForm || newCurrentForm.pos > pos) {
        newCurrentForm = {
          id: form.id,
          pos
        };
        return;
      }
    });

    const formId = newCurrentForm && (newCurrentForm as any).id
    if (formId && formId !== prevFormRef.current) {
      props.onChangeCurrentForm(formId);
      prevFormRef.current = formId;
    }
  }, [scrollTop]);

  useEffect(() => {
    const formEl = formsRef.current[props.currentForm];
    if (formEl && props.currentForm !== prevFormRef.current) {
      preventHandleScrollRef.current = true;
      formEl.scrollIntoView();
      prevFormRef.current = props.currentForm;
      setTimeout(() => {
        preventHandleScrollRef.current = false;
      }, 100);
    }
  }, [props.currentForm]);

  return (
    <div className={cx(s.ProfileForms, props.className)}>
      {props.forms.map((form) => {
        const Form = forms[form.id];

        return (
          <Form
            key={form.id}
            form={form}
            formRef={(el) => {
              formsRef.current[form.id] = el;
            }}
          />
        );
      })}
    </div>
  )
};
