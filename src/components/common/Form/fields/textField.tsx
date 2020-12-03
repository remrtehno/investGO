import React, {FC} from "react";
import {Input} from "../../../ui/Input";
import {FieldType, Form, useFormModel} from "../Form";
import {FieldProps, fieldsModel} from "./fieldsModel";

export const TextField: FC<FieldProps<Form.Field>> = (props) => {
  const { field } = props;
  const form = useFormModel();

  if (field.type !== FieldType.text) {
    throw `TextField: "${field.type}" not supported`;
  }

  return (
    <div>
      <Input
        value={field.value}
        label={field.label}
        name={field.name}
        error={field.isDirty ? field.error : null}
        onChange={form.onChange}
      />
    </div>
  )
};

fieldsModel.register({
  type: FieldType.text,
  component: TextField,
});
