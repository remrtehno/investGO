import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace useInvestorAccessionAgreementApi {
  export type Response = {
    result: any,
    status: string
  }
}

export const useInvestorAccessionAgreementApi = () => {
  const request = useApiRequest();

  return useApi<null, null>(async(payload) => {
    const response = await request<useInvestorAccessionAgreementApi.Response>(api.investor.accessionAgreement(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    return null;
  }, null);
};
