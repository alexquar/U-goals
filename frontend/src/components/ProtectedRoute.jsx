import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        //watch for changes in auth status
        auth().catch(() => setIsAuthorized(false))
    }, [])
    //refresh expired tokens
    const refreshToken = async () => {
        //pull refresh token from ls
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            //req the refresh api route
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            //check if success
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };
    //get auth status
    const auth = async () => {
        //check for tokem in ls
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        //get token
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        //refresh expired token
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    //if no auth return this
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    //if authorized provide access to routes if not push to login
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;