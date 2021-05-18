import {useRecoilState} from 'recoil';

import {api} from 'src/contstants/api';
import {useApi} from 'src/hooks/useApi';
import {useApiRequest} from 'src/hooks/useApiRequest';
import {investorPortfolioAtom} from 'src/recoil/investorPortfolioAtom';
import {RequestStatus} from 'src/types/common';

export const useGetInvestorPortfolio = () => {
  const request = useApiRequest();
  const [, setPortfolio] = useRecoilState(investorPortfolioAtom);

  return useApi(async() => {
    const portfolio = await request(api.investor.getPortfolio(), {
      method: 'GET',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setPortfolio({
      portfolio,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};
