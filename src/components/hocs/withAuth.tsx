import type {FC} from 'react';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {SignPage} from 'src/components/pages/SignPage';
import {isPageInitAtom} from 'src/recoil/isPageInitAtom';
import {userAtom} from 'src/recoil/userAtom';
import {isLoaded} from 'src/utils/isLoaded';

export declare namespace withAuth {
  export type Props<TProps> = TProps & {
    checkAuth?: boolean,
  };
}

export function withAuth<TProps>(Component: FC<TProps>): FC<withAuth.Props<TProps>> {
  return (props) => {
    const {user, status} = useRecoilValue(userAtom);
    const isPageInit = useRecoilValue(isPageInitAtom);
    const {checkAuth = true} = props;

    if (checkAuth && !user) {
      if (!isPageInit || !isLoaded(status)) {
        return null;
      }

      return (
        <SignPage />
      );
    }

    return (
      <Component {...props} />
    );
  };
}
