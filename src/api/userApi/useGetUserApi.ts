import _ from 'lodash';
import {useRecoilState} from "recoil";
import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";
import {userState} from "../../recoil/userState";
import {RequestStatus} from "../../types/common";
import {User} from "../../types/User";

export const useGetUserApi = () => {
  const request = useApiRequest();
  const [{ user }, setUser] = useRecoilState(userState);

  const [, getUser] = useApi<void, null>(async() => {
    try {
      const newUser = await request<User | null>(api.user.get(), {
        method: 'GET',
      });

      setUser({
        user: newUser ? {
          ...newUser,
          passport: user && user.id === newUser.id ? user.passport : null
        } : null,
        status: RequestStatus.success,
        error: null,
      });
    } catch (err) {
      const error = _.get(err, '0', null);
      if (error && error.message === 'forbidden') {
        setUser({
          user,
          status: RequestStatus.failed,
          error: { code: 'accessDenied', message: 'Пользователь не авторизован' }
        });
      } else {
        setUser({
          user,
          status: RequestStatus.failed,
          error: { code: 'internalError', message: 'Что-то пошло не так' }
        })
      }
    }

    return null;
  }, null);

  return getUser;
};

