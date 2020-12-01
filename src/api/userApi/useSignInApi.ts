import {useSetRecoilState} from "recoil";
import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";
import {userState} from "../../recoil/userState";
import {User} from "../../types/User";

export declare namespace useSignInApi {
  export type Payload = {
    email: string,
    password: string,
  }
}

export const useSignInApi = () => {
  const request = useApiRequest();
  const setUser = useSetRecoilState(userState);

  return useApi<useSignInApi.Payload, null>(async (payload) => {
    const user = await request<User | null>(api.user.signIn(), {
      method: 'POST',
      body: JSON.stringify(payload),
      showNotifyOnError: false,
      preventNotifyOn400: true,
    });

    setUser(user);
    return null;

  }, null);
};

