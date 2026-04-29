import Cookies from "js-cookie";
import { userLoggedIn } from "./authSlice";
import { authApi } from "./authApi";

export const saveTokensAndFetchUser = async (tokens, dispatch) => {
    const { accessToken, refreshToken } = tokens;
    console.log(accessToken, refreshToken);
    
    Cookies.set("accessToken", accessToken, {
        expires: 5,
        secure: false,
        sameSite: "Strict",
    });

    Cookies.set("refreshToken", refreshToken, {
        expires: 5,
        secure: false,
        sameSite: "Strict",
    });

    const userResponse = await dispatch(
        authApi.endpoints.handleCurrentLoggedInUser.initiate(undefined, {
            forceRefetch: true,
        })
    ).unwrap();

    const user = userResponse?.data;
   
    if (user) {
        dispatch(userLoggedIn(user));
    }
};