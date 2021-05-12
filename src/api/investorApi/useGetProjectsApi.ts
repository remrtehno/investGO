import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import type {Project} from 'src/types/Project';

export declare namespace useGetProjectsApi {
  export type Payload = null

  export type Response = {
    data: Project.InvestorProject[],
    pagination: {
      limit: number,
      page: number,
      total: number
    }
  };
}

export const useGetProjectsApi = () => {
  const request = useApiRequest();

  return useApi<useGetProjectsApi.Payload, useGetProjectsApi.Response | null>(async() => {
    const projects = await request<useGetProjectsApi.Response | null>(api.investor.projects(), {
      method: 'GET',
    });

    return projects;
  }, null);
};

