import React, {createContext, MutableRefObject, ReactNode, useContext, useEffect, useMemo} from "react";
import _ from 'lodash';
import {useLatestRef} from "../../../hooks/useLatestRef";
import {useStateRef} from "../../../hooks/useStateRef";

export enum FieldType {
  text = 'text',
}

export declare namespace Form {
  export type TextFieldModel = {
    type: FieldType.text,
    label: string,
  };

  export type FieldModel = ({
    name: string,
    type: string,

    isDisabled?: boolean,
    isHidden?: boolean,
    validations?: Array<(value: any, values: any) => string | null>,
  }) & (
    TextFieldModel
  );

  export type OnChange = (values: any, errors: Errors) => void
  export type Values = Record<string, any>;
  export type Errors<TValues extends Values = Values> = Partial<Record<keyof TValues, string>>;
  export type Fields = Record<string, Field>;

  export type Field = FieldModel & {
    value: any,
    error: string | null,
    isValid: boolean,
    isDirty: boolean,
    isChanged: boolean,
  };

  export type FieldModels = Record<string, FieldModel>;

  export type Model = {
    initialValues: Values,
    fields: FieldModels,
    onChange(value: any, name: string): void
  };

  export type Api = {
    isValid: boolean
  }

  export type Props = Pick<Model, 'initialValues' | 'fields'> & {
    children: ReactNode,
    values: Values,
    errors: Errors,
    onChange: OnChange,

    formApiRef?: MutableRefObject<Api | null>,
  };
}

const formModelContext = createContext<Form.Model | null>(null);
const FormModelProvider = formModelContext.Provider;

const formFieldsContext = createContext<Record<string, Form.Field>>({});
const FormFieldsProvider = formFieldsContext.Provider;


export const useFormModel = () => {
  return useContext(formModelContext) as Form.Model;
};

export const useFormFields = () => {
  return useContext(formFieldsContext);
};

export const useFormField = (name: string) => {
  const fields = useFormFields();
  return fields[name] || null;
};

export function Form<TValues extends Form.Values = Form.Values>(props: Form.Props) {
  const [dirtyFieldsRef, setDirtyFields] = useStateRef<string[]>([]);
  const onChangeRef = useLatestRef(props.onChange);
  const valuesRef = useLatestRef(props.values);
  const errorsRef = useLatestRef(props.errors);

  function validateField(value: any, name: string) {
    const { validations, isHidden } = props.fields[name];
    if (!validations || isHidden) {
      return null;
    } else {
      return validations.reduce((error: string | null, validation) => {
        return error || validation(value, { ...valuesRef.current, [name]: value });
      }, null);
    }
  }

  function updateFormApi() {
    if (!props.formApiRef) {
      return;
    }

    props.formApiRef.current = {
      isValid: _.isEmpty(errorsRef.current),
    };
  }

  useEffect(() => {
    updateFormApi();
  }, [props.errors]);

  const fields = useMemo(() => {
    return _.reduce(props.fields, (fields: Form.Fields, field) => {
      fields[field.name] = {
        ...field,
        value: props.values[field.name] || null,
        isValid: !props.errors[field.name],
        error: (props.errors[field.name] || null) as string | null,
        isDirty: dirtyFieldsRef.current.includes(field.name),
        isChanged: !_.isEqual(props.initialValues[field.name], props.values[field.name])
      };

      return fields;
    }, {});
  }, [
    props.values,
    props.fields,
    props.initialValues,
    props.errors,
  ]);

  const model = useMemo((): Form.Model => {
    return {
      fields: props.fields,
      initialValues: props.initialValues,
      onChange(value, name) {
        if (_.isEqual(value, valuesRef.current[name])) {
          return;
        }

        if (!dirtyFieldsRef.current.includes(name)) {
          setDirtyFields([...dirtyFieldsRef.current, name]);
        }

        const error = validateField(value, name);
        const newErrors = { ...errorsRef.current };

        if (error) {
          newErrors[name] = error;
        } else {
          delete newErrors[name];
        }

        const newValues = { ...valuesRef.current, [name]: value };

        onChangeRef.current(
          newValues,
          newErrors
        );

        errorsRef.current = newErrors;
        valuesRef.current = newValues;
        updateFormApi();
      }
    };
  }, [props.fields, props.initialValues]);

  return (
    <FormModelProvider value={model as Form.Model}>
      <FormFieldsProvider value={fields as Form.Fields}>
        {props.children}
      </FormFieldsProvider>
    </FormModelProvider>
  )
}
