import { useHistory } from 'react-router';
import {useSetRecoilState} from 'recoil';
import { RoutePaths } from 'src/components/common/App/routes';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace useInvestApi {
  export type Payload = {
    amount: number,
    loan_request_id: string,
    type: string,
  };

  export type Response = {
  };
}

export const useInvestApi = () => {
  const request = useApiRequest();

  return useApi<useInvestApi.Payload, null>(async(payload) => {
    const result = await request<useInvestApi.Response>(api.investor.invest(), {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return result;
  }, null);
};

