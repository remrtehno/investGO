import useReduxFormApi from "#/hooks/useReduxFormApi";
import useApiRequest from "#/hooks/useApiRequest";

export type SignUpPayload = {
    email: string,
    password: string,
}

export const useSignUpApi = (formName: string) => {
    const request = useApiRequest();

    return useReduxFormApi<SignUpPayload, null>(formName, async (payload) => {
        await request('/user/signup', {
            method: 'POST',
            body: payload,
            preventNotifyOn400: true,
        });
        return null;
    });
};
