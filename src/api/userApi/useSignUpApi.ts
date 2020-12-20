import {useSetRecoilState} from "recoil";
import {api} from "../../contstants/api";
import useApi from "../../hooks/useApi";
import useApiRequest from "../../hooks/useApiRequest";
import {userState} from "../../recoil/userState";
import {RequestStatus} from "../../types/common";
import {User} from "../../types/User";

export declare namespace useSignUpApi {
    export type Payload = {
        email: string,
        password: string,
        phone: string,
    }
}

export const useSignUpApi = () => {
    const request = useApiRequest();
    const setUser = useSetRecoilState(userState);

    return useApi<useSignUpApi.Payload, null>(async (payload) => {
        const user = await request<User | null>(api.user.signUp(), {
            method: 'POST',
            body: JSON.stringify(payload),
            showNotifyOnError: false,
            preventNotifyOn400: true,
        });

        setUser({
            user,
            status: RequestStatus.loading,
            error: null,
        });
        return null;

    }, null);
};

