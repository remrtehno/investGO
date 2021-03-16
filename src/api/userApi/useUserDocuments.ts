import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {documentsAtom} from 'src/recoil/documentsAtom';
import {RequestStatus} from 'src/types/common';

export const useUserDocuments = () => {
  const request = useApiRequest();
  const [{documents}, setDocuments] = useRecoilState(documentsAtom);

  return useApi(async() => {
    const docs = await request<[]>(api.user.documents(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setDocuments({
      documents: docs,
      status: RequestStatus.success,
      error: null,
    });

    return docs;
  }, null);
};

