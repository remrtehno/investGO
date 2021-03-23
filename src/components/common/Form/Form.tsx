import _ from 'lodash';
import type {MutableRefObject, ReactNode} from 'react';
import React, {createContext, useContext, useEffect, useMemo} from 'react';

import {useLatestRef} from 'src/hooks/useLatestRef';
import {useStateRef} from 'src/hooks/useStateRef';

import {fieldsModel} from './fields/fieldsModel';

import type {FormField, FormFieldModel} from './types';

export enum FieldType {
  hidden = 'hidden',
  text = 'text',
  textArea = 'textArea',
  date = 'date',
  number = 'number',
  fileArray = 'fileArray',
  file = 'file',
  password = 'password',
  phone = 'phone',
  select = 'select',
  custom = 'custom'
}

export declare namespace Form {
  export type FieldModel = FormFieldModel;
  export type Field = FormField;
  export type OnChange = (values: any, errors: Errors) => void
  export type OnSubmit = () => void
  export type Values = Record<string, any>;
  export type Errors<TValues extends Values = Values> = Partial<Record<keyof TValues, string>>;
  export type Fields = Record<string, Field>;

  export type FieldModels = Record<string, FieldModel>;

  export type Model = {
    initialValues: Values,
    fields: FieldModels,
    onChange(value: any, name: string): void,
    onError(error: string, name: string): void,
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

    onSubmit?: OnSubmit,
    disabled?: boolean,
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

  const fields = useMemo(() => {
    return _.reduce(props.fields, (result: Record<string, FormFieldModel>, field, key) => {
      const fieldModel = fieldsModel.get(field.type);
      let newField = field;
      if (fieldModel && fieldModel.transform) {
        newField = fieldModel.transform(field);
      }
      if (field.transform) {
        newField = field.transform(result[key]);
      }

      result[key] = newField;
      return result;
    }, {});
  }, [props.fields]);
  const fieldsRef = useLatestRef(fields);

  const formFields = useMemo(() => {
    return _.reduce(fields, (fields: Form.Fields, field) => {
      let value = props.values[field.name] || null;

      if (field.toValue) {
        value = field.toValue(value);
      }

      fields[field.name] = {
        ...field,
        disabled: props.disabled || field.disabled,
        value,
        isValid: !props.errors[field.name],
        error: ((dirtyFields.includes(field.name) && props.errors[field.name]) || null) as string | null,
        isDirty: dirtyFields.includes(field.name),
        isChanged: !_.isEqual(props.initialValues[field.name], props.values[field.name]),
      } as any;


      return fields;
    }, {});
  }, [
    props.values,
    fields,
    props.initialValues,
    props.errors,
    dirtyFields,
  ]);

  function validateField(value: any, name: string) {
    const {validations, isHidden} = formFields[name];
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
    const newErrors = _.reduce(fields, (result: Form.Errors, field, name) => {
      if (!formFields[name]) {
        console.error(`Missing field ${name}`);
        return result;
      }
      const error = validateField(props.values[name], name);
      if (error) {
        result[name] = error;
      }

      return result;
    }, {});

    if (!_.isEqual(newErrors, errorsRef.current)) {
      props.onChange(props.values, newErrors);
    }
  }, [props.values, fields]);

  useEffect(() => {
    updateFormApi();
  }, [props.errors]);

  const model = useMemo((): Form.Model => ({
    fields,
    initialValues: props.initialValues,
    onError(error, name) {
      onChangeRef.current(valuesRef.current, {
        ...errorsRef.current,
        [name]: error,
      });
    },
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

      const {fromValue} = fields[name];

      const newValues = {...valuesRef.current, [name]: fromValue ? fromValue(value) : value};

      onChangeRef.current(
        newValues,
        newErrors
      );

      errorsRef.current = newErrors;
      valuesRef.current = newValues;
      updateFormApi();
    },
  }), [fields, props.initialValues]);

  function handleSubmit(event: any) {
    if (props.onSubmit && props.formApiRef?.current?.isValid) {
      props.onSubmit();
    }
    event.preventDefault();
  }

  return (
    <FormModelProvider value={model}>
      <FormFieldsProvider value={formFields}>
        <form onSubmit={handleSubmit}>
          { props.children }
        </form>
      </FormFieldsProvider>
    </FormModelProvider>
  );
}
