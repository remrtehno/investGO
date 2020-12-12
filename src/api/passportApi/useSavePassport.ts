import {useRecoilState} from "recoil";
import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";
import {userState} from "../../recoil/userState";
import {RequestStatus} from "../../types/common";
import {User} from "../../types/User";

export declare namespace useSavePassport {
  export type Payload = User.Passport;
}

export function useSavePassport() {
  const request = useApiRequest();
  const [{ user }, setUser] = useRecoilState(userState);

  return useApi<useSavePassport.Payload, null>(async(payload) => {
    if (!user) {
      return null;
    }

    const serial = payload.serial.slice(0, 4);
    const number = payload.serial.slice(4);

    const passport = await request<User.Passport | null>(api.passport.save(), {
      method: user.passport ? 'POST' : 'PUT',
      body: {
        ...payload,
        serial,
        number,
      },
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