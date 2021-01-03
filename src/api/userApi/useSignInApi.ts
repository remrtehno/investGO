import {useSetRecoilState} from 'recoil';
import {api} from '../../contstants/api';
import useApi from '../../hooks/useApi';
import useApiRequest from '../../hooks/useApiRequest';
import {userAtom} from '../../recoil/userAtom';
import {RequestStatus} from '../../types/common';
import {User} from '../../types/User';

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

