import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';

export declare namespace useGetPortfolioProjects {
  export type PortfolioProject = {
    accrued_amount: number,
    company_id: string,
    company_logo: string,
    company_name: string,
    invest_amount: number,
    loan_request_id: string,
    loan_request_num: number,
    rate: number,
    status: string,
    term: number
  }
  export type Response = PortfolioProject[]
}

export const useGetPortfolioProjects = () => {
  const request = useApiRequest();

  return useApi(async() => {
    const portfolioProjects = await request<useGetPortfolioProjects.Response>(api.investor.getPortfolioProjects(), {
      method: 'GET',
    });

    return portfolioProjects;
  }, null);
};
