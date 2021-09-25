import { navigate } from "@reach/router";
import { AxiosResponse } from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { axios } from "services";

const AuthContext = createContext<any>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user") as string);
    if (token) {
      setIsAuthenticated(true);
      setUser(userData)
    } else {
      setIsAuthenticated(false);
      localStorage.clear();
      navigate("/", { replace: true });
    }
  }, []);

  const register = async (payload: IRegister) => {
    try {
      const response = await axios.post("/auth/register", payload);
      if (response) {
        navigate("/login");
      }
    } catch (error: any) {
      throw error.response.data
    } 
  };

  const login = async (payload: ILogin) => {
    try {
      const response: AxiosResponse<ILoginResponse> = await axios.post(
        "/auth/login",
        payload
      );
      if (response) {
        const user = {
          name: response?.data.name,
          email: response?.data.email
        }
        axios.defaults.headers["Authorization"] = response?.data.token;
        setIsAuthenticated(true);
        setUser(user)
        localStorage.setItem("token", response?.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/calendar", { replace: true });
      }
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const logout = () => {
    axios.defaults.headers["Authorization"] = null;
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  const navigateToDashBoard = (pathname: string) => {
    if(pathname === "/" || pathname === "/login") {
      if(isAuthenticated) {
        navigate("/calendar", { 
          replace: true
        })
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        register,
        login,
        logout,
        navigateToDashBoard,
        user
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
