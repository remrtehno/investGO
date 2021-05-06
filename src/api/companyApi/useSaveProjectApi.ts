import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSaveProjectApi {
  export type Payload = {}
}

export const useSaveProjectApi = () => {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);
  const userRef = useLatestRef(user);

  return useApi<useSaveProjectApi.Payload, null>(async(payload) => {
    await request<User.BankDetails | null>(api.company.saveProject(), {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    return null;
  }, null);
};

