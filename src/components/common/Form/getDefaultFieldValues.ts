import _ from 'lodash';
import {FieldType, Form} from "./Form";

function getDefaultFieldValue(field: Form.FieldModel) {
  switch (field.type) {
    case FieldType.text: return '';
    case FieldType.number: return null;
    case FieldType.fileArray: return [];
    case FieldType.date: return '';
    default: return null;
  }
}

export function getDefaultFieldValues(fields: Form.FieldModels): Form.Values {
  return _.reduce(fields, (values: Form.Values, field) => {
    values[field.name] = getDefaultFieldValue(field);
    return values;
  }, {})
}
