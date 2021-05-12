import {useSetRecoilState} from 'recoil';

import {useUserDocuments} from 'src/api/userApi/useUserDocuments';
import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';

import {getUserApi} from './useGetUserApi';

export declare namespace useSignInApi {
  export type Payload = {
    email: string,
    password: string,
  }
}

export const useSignInApi = () => {
  const request = useApiRequest();
  const setUser = useSetRecoilState(userAtom);
  const [, getSignDocuments] = useUserDocuments();

  return useApi<useSignInApi.Payload, null>(async(payload) => {
    await request(api.user.signIn(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    const user = await getUserApi(request);

    setUser({
      user,
      status: RequestStatus.success,
      error: null,
    });

    getSignDocuments(null);

    return null;
  }, null);
};

