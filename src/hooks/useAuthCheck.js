import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export const useAuthCheck = () => {
    const dispatch = useDispatch();
    const [authCheck, setAuthCheck] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const localAuth = localStorage.getItem("auth");
            if (localAuth) {
                const auth = JSON.parse(localAuth);
                if (auth?.accessToken && auth?.user) {
                    dispatch(
                        userLoggedIn({
                            accessToken: auth.accessToken,
                            user: auth.user,
                        })
                    );
                }
            }
            setAuthCheck(true);
        };
        checkAuth();
    }, [dispatch]);

    return authCheck;
}