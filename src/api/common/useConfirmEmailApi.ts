import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace useConfirmEmailApi {
  export type Payload = {
    token: string
  };

  export type Response = boolean;
}

export const useConfirmEmailApi = () => {
  const request = useApiRequest();

  return useApi<useConfirmEmailApi.Payload, null>(async(payload) => {
    await request(api.common.confirmEmail(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return null;
  }, null);
};

