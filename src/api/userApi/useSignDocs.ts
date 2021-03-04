import {useRecoilState} from 'recoil';

import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';

import {getUserApi} from './useGetUserApi';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {Role} from 'src/contstants/Role';

export declare namespace useSignInApi {
  export type Payload = void
}

export const useSignDocs = () => {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);
  const userRef = useLatestRef(user);

  return useApi<useSignInApi.Payload, null>(async(payload) => {
    if (!userRef.current) {
      return null;
    }

    if (userRef.current.roles.includes(Role.borrower)) {
      await request('/borrower/accession-agreement/sign', {
        method: 'POST',
        showNotifyOnError: false,
        preventNotifyOn400: true,
      });
    }

    if (userRef.current.roles.includes(Role.investor)) {
      await request('/investor/accession-agreement/sign', {
        method: 'POST',
        showNotifyOnError: false,
        preventNotifyOn400: true,
      });
    }

    const user = await getUserApi(request);

    setUser({
      user,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

