import React, {createContext, ReactNode, useContext, useEffect, useMemo} from "react";
import _ from 'lodash';

export declare namespace Form {
  export type FieldModel = {
    name: string,
    type: string,

    validations?: Array<(value: any, values: any) => string | null>,
  };

  export type OnChange = (values: any, errors: Errors) => void
  export type Values = Record<string, any>;
  export type Errors<TValues extends Values = Values> = Partial<Record<keyof TValues, string>>;
  export type Fields = Record<string, Field>;

  export type Field = FieldModel & {
    value: any,
    error: string | null,
    isValid: boolean,
    isDirty: boolean,
  };

  export type Model = {
    initialValues: Values,
    fields: Record<string, FieldModel>,
    onChange(value: any, name: string): void
  };

  export type FormApi = {
    validateFields(): void,
  }

  export type Props = Pick<Model, 'initialValues' | 'fields'> & {
    children: ReactNode,
    values: Values,
    errors: Errors,
    onChange: OnChange,

    formApi?(api: FormApi): void
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
  function validateField(value: any, name: string) {
    const { validations } = props.fields[name];
    if (!validations) {
      return null;
    } else {
      return validations.reduce((error: string | null, validation) => {
        return error || validation(value, { ...props.values, [name]: value });
      }, null);
    }
  }

  useEffect(() => {
    if (props.formApi) {
      props.formApi({
        validateFields() {
          const errors = _.reduce(props.fields, (errors: Form.Errors, field) => {
            const error = validateField(props.values[field.name], field.name);
            if (error) {
              errors[field.name] = error;
            }
            return errors;
          }, {});

          if (!_.isEqual(errors, props.errors)) {
            props.onChange(props.values, errors);
          }
        }
      });
    }
  }, [props.formApi, props.fields, props.values, props.errors]);

  const fields = useMemo(() => {
    return _.reduce(props.fields, (fields: Form.Fields, field) => {
      fields[field.name] = {
        ...field,
        value: props.values[field.name] || null,
        isValid: !props.errors[field.name],
        error: (props.errors[field.name] || null) as string | null,
        isDirty: !_.isEqual(props.initialValues[field.name], props.values[field.name])
      };

      return fields;
    }, {});
  }, [props.values, props.fields, props.initialValues, props.errors]);

  const model = useMemo((): Form.Model => {
    return {
      fields: props.fields,
      initialValues: props.initialValues,
      onChange(value, name) {
        const error = validateField(value, name);
        const newErrors = { ...props.errors };

        if (error) {
          newErrors[name] = error;
        } else {
          delete newErrors[name];
        }

        props.onChange(
          { ...props.values, [name]: value },
          newErrors
        );
      }
    };
  }, [props.fields, props.onChange, props.initialValues, props.values]);

  return (
    <FormModelProvider value={model as Form.Model}>
      <FormFieldsProvider value={fields as Form.Fields}>
        {props.children}
      </FormFieldsProvider>
    </FormModelProvider>
  )
}
