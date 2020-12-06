import React, {FC} from "react";
import {Input} from "../../../ui/Input";
import {FieldType, useFormModel} from "../Form";
import {FormField} from "../types";
import {FieldProps, fieldsModel} from "./fieldsModel";

export declare namespace TextField {
  export type Props = FieldProps<FormField.Text> & Pick<Input.Props, 'regExp'>;
}

export const TextField: FC<TextField.Props> = (props) => {
  const { field } = props;
  const form = useFormModel();

  return (
    <div>
      <Input
        value={field.value}
        label={field.label}
        name={field.name}
        error={field.isDirty ? field.error : null}
        onChange={form.onChange}
        isDisabled={field.isDisabled}
        regExp={props.regExp}
      />
    </div>
  )
};

fieldsModel.register({
  type: FieldType.text,
  component: TextField,
});

fieldsModel.register({
  type: FieldType.date,
  component: TextField,
});

fieldsModel.register({
  type: FieldType.documentArray,
  component: TextField,
});
