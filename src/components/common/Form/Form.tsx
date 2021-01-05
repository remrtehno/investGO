import React, {createContext, MutableRefObject, ReactNode, useContext, useEffect, useMemo} from 'react';
import _ from 'lodash';
import {useLatestRef} from '../../../hooks/useLatestRef';
import {useStateRef} from '../../../hooks/useStateRef';
import {FormField, FormFieldModel} from './types';

export enum FieldType {
  text = 'text',
  date = 'date',
  number = 'number',
  fileArray = 'fileArray',
  password = 'password',
  phone = 'phone',
}

export declare namespace Form {
  export type FieldModel = FormFieldModel;
  export type Field = FormField;
  export type OnChange = (values: any, errors: Errors) => void
  export type Values = Record<string, any>;
  export type Errors<TValues extends Values = Values> = Partial<Record<keyof TValues, string>>;
  export type Fields = Record<string, Field>;

  export type FieldModels = Record<string, FieldModel>;

  export type Model = {
    initialValues: Values,
    fields: FieldModels,
    onChange(value: any, name: string): void
  };

  export type Api = {
    isValid: boolean,
    submit(): void,
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


export const useFormModel = () => useContext(formModelContext) as Form.Model;

export const useFormFields = () => useContext(formFieldsContext);

export const useFormField = (name: string) => {
  const fields = useFormFields();
  return fields[name] || null;
};

export function Form(props: Form.Props) {
  const [dirtyFields, setDirtyFields, dirtyFieldsRef] = useStateRef<string[]>([]);
  const onChangeRef = useLatestRef(props.onChange);
  const valuesRef = useLatestRef(props.values);
  const errorsRef = useLatestRef(props.errors);
  const fieldsRef = useLatestRef(props.fields);

  function validateField(value: any, name: string) {
    const {validations, isHidden} = props.fields[name];
    if (!validations || isHidden) {
      return null;
    }
    return validations.reduce((error: string | null, validation) => {
      const values = {...valuesRef.current, [name]: value};
      return error || validation(value, values);
    }, null);
  }

  function updateFormApi() {
    if (!props.formApiRef) {
      return;
    }

    props.formApiRef.current = {
      isValid: _.isEmpty(errorsRef.current),
      submit() {
        setDirtyFields(Object.keys(fieldsRef.current));
      },
    };
  }

  useEffect(() => {
    const newErrors = _.reduce(fieldsRef.current, (result: Form.Errors, field, name) => {
      const error = validateField(valuesRef.current[name], name);
      if (error) {
        result[name] = error;
      }

      return result;
    }, {});

    if (!_.isEqual(newErrors, fieldsRef.current)) {
      props.onChange(valuesRef.current, newErrors);
    }
  }, []);

  useEffect(() => {
    updateFormApi();
  }, [props.errors]);

  const fields = useMemo(() => {
    return _.reduce(props.fields, (fields: Form.Fields, field) => {
      let value = props.values[field.name] || null;

      if (field.toValue) {
        value = field.toValue(value);
      }

      fields[field.name] = {
        ...field,
        value,
        isValid: !props.errors[field.name],
        error: (props.errors[field.name] || null) as string | null,
        isDirty: dirtyFields.includes(field.name),
        isChanged: !_.isEqual(props.initialValues[field.name], props.values[field.name]),
      } as any;


      return fields;
    }, {});
  }, [
    props.values,
    props.fields,
    props.initialValues,
    props.errors,
    dirtyFields,
  ]);

  const model = useMemo((): Form.Model => ({
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
      const newErrors = {...errorsRef.current};

      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      const {fromValue} = props.fields[name];

      const newValues = {...valuesRef.current, [name]: fromValue ? fromValue(value) : value};

      onChangeRef.current(
        newValues,
        newErrors
      );

      errorsRef.current = newErrors;
      valuesRef.current = newValues;
      updateFormApi();
    },
  }), [props.fields, props.initialValues]);

  return (
    <FormModelProvider value={model as Form.Model}>
      <FormFieldsProvider value={fields as Form.Fields}>
        { props.children }
      </FormFieldsProvider>
    </FormModelProvider>
  );
}
