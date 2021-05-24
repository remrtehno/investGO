import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {projectAtom} from 'src/recoil/projectAtom';
import { RequestStatus } from 'src/types/common';
import type {Project} from 'src/types/Project';

export declare namespace useGetProjectApi {
  export type Payload = null
}

export const useGetProjectApi = () => {
  const request = useApiRequest();
  const [, setProject] = useRecoilState(projectAtom);

  return useApi<useGetProjectApi.Payload, Project.Project | null>(async() => {
    const project = await request<Project.Project | null>(api.project.getProject(), {
      method: 'GET',
    });

    setProject({
      project,
      status: RequestStatus.success,
      error: null,
    });

    return project;
  }, null);
};

