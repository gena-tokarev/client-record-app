import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "providers/Auth/AuthContext";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { isAuth } = useContext(AuthContext);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
