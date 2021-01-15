import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSaveBankDetailsApi {
  export type Payload = Omit<User.BankDetails, 'company_id'> & {
    company_id?: string,
  };
}

export const useSaveBankDetailsApi = () => {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);
  const userRef = useLatestRef(user);

  return useApi<useSaveBankDetailsApi.Payload, null>(async(payload) => {
    const bankDetails = await request<User.BankDetails | null>(api.company.saveBankDetails(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    if (!userRef.current || !userRef.current.company) {
      return null;
    }

    setUser({
      user: {
        ...userRef.current,
        company: {
          ...userRef.current.company,
          bank_details: bankDetails,
        },
      },
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

