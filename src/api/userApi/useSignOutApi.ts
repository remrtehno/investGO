import {useSetRecoilState} from "recoil";
import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";
import {userState} from "../../recoil/userState";
import {RequestStatus} from "../../types/common";
import {User} from "../../types/User";

export declare namespace useSignOutApi {
  export type Payload = void;
}

export const useSignOutApi = () => {
  const request = useApiRequest();
  const setUser = useSetRecoilState(userState);

  return useApi<useSignOutApi.Payload, null>(async (payload) => {
    await request<User | null>(api.user.signOut(), {
      method: 'POST',
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setUser({
      user: null,
      status: RequestStatus.success,
      error: null,
    });

    return null;
  }, null);
};

