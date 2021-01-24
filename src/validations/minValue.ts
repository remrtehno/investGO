import _ from 'lodash';

export const minValue = (min: number, allowEqual = true, msg = `Минимальное значение: ${min}`) => {
  return (value: any) => {
    value = Number(value);
    if (_.isNaN(value)) {
      return null;
    }

    if ((allowEqual && min === value) || value > min) {
      return null;
    }

    return msg;
  };
};
