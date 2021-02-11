import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import type {Role} from 'src/contstants/Role';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';
import {getUserApi} from 'src/api/userApi/useGetUserApi';

export declare namespace useSignInApi {
  export type Payload = {
    mainRole: Role,
    roles: Role[],
  }
}

export const useSelectRolesApi = () => {
  const request = useApiRequest();
  const [, setUser] = useRecoilState(userAtom);

  return useApi<useSignInApi.Payload, null>(async(payload) => {
    await request<User>(api.user.selectRoles(), {
      method: 'PUT',
      body: JSON.stringify({
        role: payload.mainRole,
        type: payload.roles,
      }),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    const user = await getUserApi(request);

    setUser({
      user,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

