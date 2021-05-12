import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {Project} from 'src/types/Project';

export declare namespace useSaveProjectApi {
  export type Payload = {}
}

export const useSaveProjectApi = () => {
  const request = useApiRequest();

  return useApi<useSaveProjectApi.Payload, null>(async(payload) => {
    await request<Project | null>(api.project.saveProject(), {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    return null;
  }, null);
};

