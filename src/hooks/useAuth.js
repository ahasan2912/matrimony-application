import { useSelector } from "react-redux";

const useAuth = () => {
    const { accessToken } = useSelector((state) => state.auth);
    if (accessToken?.user && accessToken?.accessToken) {
        return true;
    }
};

export default useAuth;
