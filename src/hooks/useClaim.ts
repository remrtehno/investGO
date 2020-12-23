import {useMemo} from "react";
import {useRecoilValue} from "recoil";
import {userAtom} from "../recoil/userAtom";

export function useClaims() {
  const { user } = useRecoilValue(userAtom);

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
