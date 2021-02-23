import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {User} from 'src/types/User';

export const useUserSignDocuments = () => {
  const request = useApiRequest();

  return useApi(async() => {
    const docs = await request<User.SignDocuments[] | null>(api.user.sugnDocuments(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    // @TODO replace by redux or recoil
    return docs;
  }, null);
};

