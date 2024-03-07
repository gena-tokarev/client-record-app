import { act, renderHook } from "@testing-library/react-hooks";
import AuthProvider from "./AuthProvider";
import { ReactNode, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import Cookies from "js-cookie";
import { useLoginMutation } from "graphql/generated/graphql";

jest.mock("graphql/generated/graphql");

const mockedUseLoginMutation = useLoginMutation as jest.Mock;

const useAuthProvider = () => {
    return useContext(AuthContext);
};

const MOCK_EMAIL = "gena@test.com";
const MOCK_PASSWORD = "gena_password";
const MOCK_TOKEN = "testAccessToken";

describe("AuthProvider", () => {
    test("Should set isAuth to true and add cookie after login", async () => {
        mockedUseLoginMutation.mockImplementation(
            jest.fn(() => {
                const [data, setData] = useState<{
                    login: { accessToken: string };
                } | null>(null);

                const loginMutation = () => {
                    setData({ login: { accessToken: MOCK_TOKEN } });
                };

                return [
                    loginMutation,
                    {
                        data,
                        loading: false,
                        error: false,
                    },
                ];
            })
        );

        const wrapper = ({ children }: { children: ReactNode }) => (
            <AuthProvider>{children}</AuthProvider>
        );
        const { result } = renderHook(() => useAuthProvider(), { wrapper });

        const cookiesSetSpy = jest.spyOn(Cookies, "set");

        expect(result.current.isAuth).toBeFalsy();

        await act(() => result.current.login(MOCK_EMAIL, MOCK_PASSWORD));

        expect(result.current.isAuth).toBeTruthy();
        expect(cookiesSetSpy).toBeCalledWith("token", MOCK_TOKEN, {
            expires: 1,
        });
    });

    test("Should set isAuth to false and remove cookie after logout", async () => {
        mockedUseLoginMutation.mockReturnValue([
            jest.fn(),
            {
                data: { login: { accessToken: "testAccessToken" } },
                loading: false,
                error: false,
            },
        ]);

        const wrapper = ({ children }: { children: ReactNode }) => (
            <AuthProvider>{children}</AuthProvider>
        );
        const { result } = renderHook(() => useAuthProvider(), { wrapper });

        const cookiesSetSpy = jest.spyOn(Cookies, "remove");

        expect(result.current.isAuth).toBeTruthy();

        await act(() => result.current.logout());

        expect(result.current.isAuth).toBeFalsy();
        expect(cookiesSetSpy).toBeCalled();
    });
});
