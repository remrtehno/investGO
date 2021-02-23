import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {User} from 'src/types/User';

export declare namespace useUserDocuments {
    export type Payload = {
        email: string,
        password: string,
        phone: string,
    }
}

export const useUserDocuments = () => {
  const request = useApiRequest();

  return useApi<useUserDocuments.Payload, null>(async(payload) => {
    await request<User | null>(api.user.documents(), {
      method: 'POST',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });
    return null;
  }, null);
};

