import {api} from '../../contstants/api';
import useApi from '../../hooks/useApi';
import useApiRequest from '../../hooks/useApiRequest';
import {User} from '../../types/User';

export declare namespace useSignUpApi {
    export type Payload = {
        email: string,
        password: string,
        phone: string,
    }
}

export const useSignUpApi = () => {
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

