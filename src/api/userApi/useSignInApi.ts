import {useSetRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSignInApi {
  export type Payload = {
    email: string,
    password: string,
  }
}

export const useSignInApi = () => {
  const request = useApiRequest();
  const setUser = useSetRecoilState(userAtom);

  return useApi<useSignInApi.Payload, null>(async(payload) => {
    const user = await request<User | null>(api.user.signIn(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setUser({
      user,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

