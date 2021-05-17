import { useHistory } from 'react-router';
import {useSetRecoilState} from 'recoil';
import { RoutePaths } from 'src/components/common/App/routes';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import { FilePrimitive } from 'src/types/FilePrimitive';
import type {User} from 'src/types/User';

export declare namespace useCreateInvestAgreementApi {
  export type Payload = {
    amount: number,
    loan_request_id: string
  };

  export type Response = {
    file: FilePrimitive
  };
}

export const useCreateInvestAgreementApi = () => {
  const request = useApiRequest();
  // const setUser = useSetRecoilState(userAtom);

  return useApi<useCreateInvestAgreementApi.Payload, null>(async(payload) => {
    const result = await request<useCreateInvestAgreementApi.Response>(api.investor.createInvestAgreement(), {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // setUser({
    //   user: null,
    //   status: RequestStatus.success,
    //   error: null,
    // });

    return result;
  }, null);
};

