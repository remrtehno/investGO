import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {RequestStatus} from 'src/types/common';
import {documentsAtom} from 'src/recoil/documentsAtom';
import {useRecoilState} from 'recoil';
import type {User} from 'src/types/User';

export const useUserDocuments = () => {
  const request = useApiRequest();
  const [{documents}, setDocuments] = useRecoilState(documentsAtom);

  return useApi(async() => {
    const docs = await request<User.SignDocuments[] | null>(api.user.documents(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setDocuments({
      documents: docs,
      status: RequestStatus.success,
      error: null,
    })

    // @TODO replace by redux or recoil
    return docs;
  }, null);
};

