import { useContext } from "react";
import AuthContext from "../providers/Auth/AuthContext";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
