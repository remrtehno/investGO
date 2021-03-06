import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace useUserCheckExists {
  export type Payload = {
    email: string,
  }

  export type Response = {
    exists: boolean,
  }
}

export const useUserCheckExists = () => {
  const request = useApiRequest();

  return useApi<useUserCheckExists.Payload, boolean>(async(payload) => {
    const response = await request<useUserCheckExists.Response>(api.user.checkExists(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return response.exists;
  }, false);
};

