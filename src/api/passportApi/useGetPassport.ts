import {useRecoilState} from "recoil";
import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";
import {userState} from "../../recoil/userState";
import {RequestStatus} from "../../types/common";
import {User} from "../../types/User";

export function useGetPassport() {
  const request = useApiRequest();
  const [{ user }, setUser] = useRecoilState(userState);

  return useApi<void, null>(async() => {
    if (!user) {
      return null;
    }

    const passport = await request<User.Passport | null>(api.passport.get(), {
      method: 'GET',
    });

    setUser({
      user: {
        ...user,
        passport: passport || null,
      },
      status: RequestStatus.success,
      error: null
    });

    return null;
  }, null);
}