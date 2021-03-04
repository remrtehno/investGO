import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace useConfirmPhoneCode {
  export type Payload = {
    confirm_code: string,
    phone: string,
  };

  export type Response = boolean
}

export const useConfirmPhoneCode = () => {
  const request = useApiRequest();

  return useApi<useConfirmPhoneCode.Payload, boolean>(async(payload) => {
    await request<useConfirmPhoneCode.Response>(api.user.confirmPhoneCode(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return true;
  }, false);
};

