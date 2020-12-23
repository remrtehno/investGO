import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";

export declare namespace useSendPhoneCode {
  export type Payload = {
    phone: string
  };

  export type Response = boolean;
}

export const useSendPhoneCode = () => {
  const request = useApiRequest();

  return useApi<useSendPhoneCode.Payload, null>(async (payload) => {
    await request(api.user.sendPhoneCode(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return null;

  }, null);
};

