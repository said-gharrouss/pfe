import { createContext, useContext, useState } from "react"
import PropTypes from 'prop-types';
import userApi from "../services/api/student/userApi";

export const userStateContext = createContext({
    user : {},
    setUser : () => {},
    login : () => {},
    logout : () => {},
    isAuthenticated : false,
    setIsAuthenticated : () => {},
    setToken : () => {},
})



function UserContext({children}) {
    const [user,setUser] = useState({});
    const [isAuthenticated,setIsAuthenticated] = useState("true" === window.localStorage.getItem("AUTHENTICATED"));

    const login = async (email,password) => {
        return await userApi.login(email,password);
    }

    const logout = () => {
        setUser({});
        setIsAuthenticated(false);
        window.localStorage.setItem("AUTHENTICATED",false);
    }

    const setToken = (token) => {
        window.localStorage.setItem("token",token);
    }



    return (
        <userStateContext.Provider value={{
            user,
            setUser,
            login,
            logout,
            isAuthenticated,
            setIsAuthenticated,
            setToken
        }}>
            {children}
        </userStateContext.Provider>
    )
}

UserContext.propTypes = {
    children : PropTypes.node.isRequired,
}

export const useUserContext = () => useContext(userStateContext);

export default UserContext
