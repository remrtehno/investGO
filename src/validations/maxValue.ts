import _ from 'lodash';

export const maxValue = (max: number, allowEqual = true, msg = `Максимальное значение: ${max}`) => {
  return (value: any) => {
    value = Number(value);
    if (_.isNaN(value)) {
      return null;
    }

    if ((allowEqual && max === value) || value < max) {
      return null;
    }

    return msg;
  };
};
