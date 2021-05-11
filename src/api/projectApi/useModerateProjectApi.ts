import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {User} from 'src/types/User';

export declare namespace useModerateProjectApi {
  export type Payload = null
}

export const useModerateProjectApi = () => {
  const request = useApiRequest();

  return useApi<useModerateProjectApi.Payload, null>(async() => {
    await request<User.BankDetails | null>(api.project.moderateProject(), {
      method: 'POST',
    });

    return null;
  }, null);
};

