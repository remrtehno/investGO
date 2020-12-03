import {useSetRecoilState} from "recoil";
// import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
// import useApiRequest from "../../hooks/useApiRequest";
import {userState} from "../../recoil/userState";
// import {User} from "../../types/User";

export const useGetUserApi = () => {
  // const request = useApiRequest();
  const setUser = useSetRecoilState(userState);

  return useApi<void, null>(async() => {
    try {
      const lsUser = window.localStorage.getItem('user');
      if (!lsUser) {
        setUser(null);
      } else {
        setUser(JSON.parse(lsUser));
      }
    } catch (e) {}

    // const user = await request<User | null>(api.user.get(), {
    //   method: 'GET',
    // });
    // setUser(user);
    return null;
  }, null);
};

