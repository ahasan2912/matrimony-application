import Cookies from "js-cookie";
import { baseQuery } from "./apiSlice";

export const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

     if (result.error?.status === 500 && result.error?.data?.message === 'jwt expired') {
            const refreshResult = await baseQuery(
                {
                    url: "/auth/get_new_access_token",
                    method: "GET",
                },
                api,
                extraOptions
            );
            if (refreshResult?.data?.data?.accessToken) {
                const accessToken = refreshResult?.data?.data?.accessToken;
                Cookies.set("accessToken", accessToken, {
                    expires: 5,
                    secure: false,
                    sameSite: "Strict",
                });
            } else {
                console("");
            }
        }
    return result;
};