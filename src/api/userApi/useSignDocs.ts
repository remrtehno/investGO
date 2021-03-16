import {useRecoilState} from 'recoil';

import {useUserDocuments} from 'src/api/userApi/useUserDocuments';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {useLatestRef} from 'src/hooks/useLatestRef';
import {userAtom} from 'src/recoil/userAtom';
import {RequestStatus} from 'src/types/common';

import {getUserApi} from './useGetUserApi';

export declare namespace useSignInApi {
  export type Payload = {
    code: number
  }
}

export const useSignDocs = (type?: string) => {
  const request = useApiRequest();
  const [{user}, setUser] = useRecoilState(userAtom);
  const userRef = useLatestRef(user);
  const [, getSignDocuments] = useUserDocuments();

  return useApi<useSignInApi.Payload, null>(async(payload: useSignInApi.Payload) => {
    if (!userRef.current) {
      return null;
    }

    let url = '/investor/accession-agreement/sign';

    if (type === 'borrower_accession_agreement') {
      url = '/borrower/accession-agreement/sign';
    }

    await request(url, {
      method: 'POST',
      showNotifyOnError: false,
      preventNotifyOn400: true,
      body: JSON.stringify(payload),
    });

    getSignDocuments(null);

    const user = await getUserApi(request);

    setUser({
      user,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

