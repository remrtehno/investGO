import {api} from "../../contstants/api";
import {useApi} from "../../hooks/useApi";
import {useApiRequest} from "../../hooks/useApiRequest";

export declare namespace useBorrowerAccessionAgreementApi {
  export type Response = {
    result: any,
    status: string
  }
}

export const useBorrowerAccessionAgreementApi = () => {
  const request = useApiRequest();

  return useApi<null, null>(async (payload) => {
    const response = await request<useBorrowerAccessionAgreementApi.Response>(api.borrower.accessionAgreement(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return null;

  }, null);
}