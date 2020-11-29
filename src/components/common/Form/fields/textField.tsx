import React, {FC} from "react";
import {Input} from "../../../ui/Input";
import {useFormModel} from "../Form";
import {FieldProps, fieldsModel} from "./fieldsModel";
import {Field, FieldType} from "./types";

export const TextField: FC<FieldProps<Field>> = (props) => {
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
