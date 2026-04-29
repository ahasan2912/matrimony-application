import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Skeleton from "../components/loading- skeletons/Skeleton";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading || showLoader) {
        return <Skeleton variant="section" />;
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
