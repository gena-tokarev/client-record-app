import { LoginMutationVariables } from "graphql/generated/graphql";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "providers/Auth/AuthContext";

const useLoginPage = () => {
    const { isAuth, login, loading, error } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const from = (location.state?.from?.pathname ?? "/") as string;

    useEffect(() => {
        if (isAuth) {
            navigate(from, { replace: true });
        }
    }, [isAuth, navigate, from]);

    const initialValues = useMemo(
        () => ({
            email: "",
            password: "",
        }),
        []
    );

    const onSubmit = useCallback(
        (values: LoginMutationVariables) => {
            login(values.email, values.password);
        },
        [login]
    );

    const formConfig = {
        initialValues,
        onSubmit,
    };

    return {
        formConfig,
        loading,
        error,
    };
};

export default useLoginPage;
