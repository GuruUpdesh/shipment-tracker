import React from "react";
import { useLocation, Navigate, Outlet, Route } from "react-router-dom";
import useUser from "../../context/useUser";
import useAuthenticate from "../../features/authentication/hooks/useAuthenticate";

const RequireAuthForRoutes = () => {
	const { user } = useUser();
	const location = useLocation();
	
	useAuthenticate()
	return user.isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuthForRoutes;
