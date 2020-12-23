import React, {FC} from "react";
import {useRecoilValue} from "recoil";
import {isPageInitAtom} from "../../recoil/isPageInitAtom";
import {userAtom} from "../../recoil/userAtom";
import {isLoaded} from "../../utils/isLoaded";
import {SignPage} from "../pages/SignPage";

export declare namespace withAuth {
  export type Props<TProps> = TProps & {
    checkAuth?: boolean,
  };
}

export function withAuth<TProps>(Component: FC<TProps>): FC<withAuth.Props<TProps>> {
  return (props) => {
    const { user, status } = useRecoilValue(userAtom);
    const isPageInit = useRecoilValue(isPageInitAtom);
    const { checkAuth = true } = props;

    if (checkAuth && !user) {
      if (!isPageInit || !isLoaded(status)) {
        return null;
      }

      return (
        <SignPage/>
      );
    }

    return (
      <Component {...props}/>
    );
  }
}