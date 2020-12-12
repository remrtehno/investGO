import React, {FC} from "react";
import {useRecoilValue} from "recoil";
import {userState} from "../../recoil/userState";
import {isLoaded} from "../../utils/isLoaded";
import {SignPage} from "../pages/SignPage";

export declare namespace withAuth {
  export type Props<TProps> = TProps & {
    checkAuth?: boolean,
  };
}

export function withAuth<TProps>(Component: FC<TProps>): FC<withAuth.Props<TProps>> {
  return (props) => {
    const { user, status } = useRecoilValue(userState);
    const { checkAuth = true } = props;

    if (checkAuth && !user) {
      if (!isLoaded(status)) {
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