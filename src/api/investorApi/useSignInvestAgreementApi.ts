import { useHistory } from 'react-router';
import {useSetRecoilState} from 'recoil';
import { RoutePaths } from 'src/components/common/App/routes';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSignInvestAgreementApi {
  export type Payload = {
    code: number,
    loan_request_id: string
  };

  export type Response = {
  };
}

export const useSignInvestAgreementApi = () => {
  const request = useApiRequest();

  return useApi<useSignInvestAgreementApi.Payload, null>(async(payload) => {
    const result = await request<useSignInvestAgreementApi.Response>(api.investor.signInvestAgreement(), {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return result;
  }, null);
};

