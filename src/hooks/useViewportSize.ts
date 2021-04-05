import {useMemo} from 'react';

import {getViewportSize} from 'src/utils/getViewportSize';

export const useViewportSize = () => {
  return useMemo(() => {
    return getViewportSize();
  }, []);
};
