import {useSetRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSignOutApi {
  export type Payload = void;
}

export const useSignOutApi = () => {
  const request = useApiRequest();
  const setUser = useSetRecoilState(userAtom);

  return useApi<useSignOutApi.Payload, null>(async() => {
    await request<User | null>(api.user.signOut(), {
      method: 'POST',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setUser({
      user: null,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

