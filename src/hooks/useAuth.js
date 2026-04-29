import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const useAuth = () => {
    const { user } = useSelector((state) => state.auth);
    const token = Cookies.get("accessToken");

    // Return isLoading to handle async behavior if needed
    if (!token || !user) {
        return { isLoggedIn: false, isLoading: false };
    }

    return { isLoggedIn: true, isLoading: false };
};

export default useAuth;