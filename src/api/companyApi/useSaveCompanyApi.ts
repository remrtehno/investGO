import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {Role} from 'src/contstants/Role';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';
import type {User} from 'src/types/User';

export declare namespace useSaveCompanyApi {
  export type Payload = Partial<User.Company>;
}

export const useSaveCompanyApi = () => {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);
  const userRef = useLatestRef(user);

  return useApi<useSaveCompanyApi.Payload, null>(async(payload) => {
    const company = await request<User.Company | null>(api.company.save(), {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        type: Role.ip,
        document_registry_file: payload.document_registry_file && (payload.document_registry_file as any)[0],
      }),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    if (!userRef.current) {
      return null;
    }

    setUser({
      user: {
        ...userRef.current,
        company,
      },
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

