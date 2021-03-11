import {api} from "../../contstants/api";
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import { useSignInApi } from "../userApi/useSignInApi";

export declare namespace useSmsSignApi {
  export type Payload = {
    entity_id: string,
    entity_type: string
  };

  export type Response = boolean;
}

export const useSmsSignApi = () => {
  const request = useApiRequest();

  return useApi<useSmsSignApi.Payload, null>(async (payload) => {
    console.log("useSignInApi", payload)
    const response = await request<useSmsSignApi.Response>(api.sms.sign(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return null;

  }, null);
}