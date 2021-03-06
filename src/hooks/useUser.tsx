import {useGetUserApi} from 'src/api/userApi/useGetUserApi';
import {useSignInApi} from 'src/api/userApi/useSignInApi';

export declare namespace useUserApi {
  export type Api = {
    sign(payload: useSignInApi.Payload): void,
    get(): void,
  };
}

export function useUserApi(): useUserApi.Api {
  const getUserApi = useGetUserApi();
  const signApi = useSignInApi();

  return {
    sign: signApi,
    get: getUserApi,
  };
}
