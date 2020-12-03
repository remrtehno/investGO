import React, {FC, useCallback} from "react";
import {fieldsModel} from "./fields/fieldsModel";
import {useFormField, useFormModel} from "./Form";

export declare namespace Field {
  export type Props = {
    name: string,

    className?: string,
  };
}

export const Field: FC<Field.Props> = (props) => {
  const field = useFormField(props.name);
  const form = useFormModel();

  if (!field) {
    return null;
  }

  const fieldModel = fieldsModel.get(field.type);
  if (!fieldModel) {
    console.error(`Field model for "${field.type}" not found`);
    return null;
  }

  const Component = fieldModel.component;

  const onChange = useCallback((value: any) => {
    if (!form) {
      return;
    }
    form.onChange(value, field.name);
  }, [field]);

  if (field.isHidden) {
    return null;
  }

  return (
    <div className={props.className}>
      <Component
        field={field}
        onChange={onChange}
      />
    </div>
  );
};
