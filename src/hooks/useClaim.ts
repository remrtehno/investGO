import {useMemo} from "react";
import {useRecoilValue} from "recoil";
import {userState} from "../recoil/userState";

export function useClaims() {
  const { user } = useRecoilValue(userState);

  return useMemo(() => {
    return {
      individualEntrepreneurForm: {
        read: () => false || Boolean(user && user.roles.includes('individual'))
      },
      requisitionsForm: {
        read: () => false || Boolean(user && user.roles.includes('individual'))
      }
    }
  }, [user]);
}
