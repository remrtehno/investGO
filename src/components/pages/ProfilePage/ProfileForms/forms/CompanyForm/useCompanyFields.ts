import {useMemo} from 'react';

import type {Form} from 'src/components/common/Form/Form';
import {FieldType} from 'src/components/common/Form/Form';
import {required} from 'src/components/common/Form/validations/required';

export const useCompanyFields = () => {
  return useMemo((): Form.FieldModels => {
    return {
      ogrn: {
        name: 'ogrn',
        type: FieldType.text,
        label: 'ОГРНИП',
        mask: '999999999999999',
        validations: [required()],
      },
      date_issue_ogrn: {
        name: 'date_issue_ogrn',
        type: FieldType.date,
        label: 'Дата приссвоения ОГРНИП',
      },
      document_registry_file: {
        name: 'document_registry_file',
        type: FieldType.fileArray,
      },
    };
  }, []);
};
