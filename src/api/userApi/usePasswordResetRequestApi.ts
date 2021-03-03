import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";

export declare namespace usePasswordResetRequestApi {
  export type Payload = {
    email: string
  }

  export type Response = {
    result: any,
    status: string
  }
}

export const usePasswordResetRequestApi = () => {
  const request = useApiRequest();

  return useApi<usePasswordResetRequestApi.Payload, null>(async (payload) => {
    const response = await request<usePasswordResetRequestApi.Response>(api.user.passwordResetRequest(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return null;

  }, null);
}