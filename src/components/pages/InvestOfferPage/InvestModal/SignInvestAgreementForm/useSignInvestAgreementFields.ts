import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {maxValue} from 'src/validations/maxValue';
import {minLength} from 'src/validations/minLength';
import {minValue} from 'src/validations/minValue';
import {required} from 'src/validations/required';

export const useSignInvestAgreementFields = () => {
  return useMemo((): Form.FieldModels => ({
    loan_request_id: {
      name: 'loan_request_id',
      type: FieldType.hidden,
    },
    offer_agreement: {
      name: 'offer_agreement',
      type: FieldType.checkbox,
      label: `Ознакомился с офертой Платформы`,
      defaultValue: true,
      validations: [required()],
    },
  }), []);
};
