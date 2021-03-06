import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace usePasswordResetApi {
  export type Payload = {
    new_password: string,
    token: string
  }

  export type Response = {
    result: any,
    status: string
  }
}

export const usePasswordResetApi = () => {
  const request = useApiRequest();

  return useApi<usePasswordResetApi.Payload, null>(async(payload) => {
    const response = await request<usePasswordResetApi.Response>(api.user.passwordReset(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return null;
  }, null);
};
