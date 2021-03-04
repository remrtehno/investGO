import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {User} from 'src/types/User';

export declare namespace useSignUpApi {
    export type Payload = {
        email: string,
        password: string,
        phone: string,
    }
}

export const useUserDocuments = () => {
  const request = useApiRequest();

  return useApi<useSignUpApi.Payload, null>(async(payload) => {
    await request<User | null>(api.user.signUp(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });
    return null;
  }, null);
};

