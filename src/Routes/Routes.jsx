
import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
		path: "/",
		element: <Main></Main>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "login",
				element: <Login></Login>,
			},
			{
				path: "signup",
				element: <SignUp></SignUp>,
			},

		
		
		],
	},

  {
		path: "dashboard",
		element: (
			<PrivateRoute>
			<Dashboard></Dashboard>
			</PrivateRoute>
		),
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			// user routes
			{
				path: "myProfile",
				element: ,
			},
		

			// admin routes
			{
				path: "statistics",
				element: (
					
				),
			},
			{
				path: "users",
				element: (
					
				),
			},
		

			// deliverymen routes
			{
				path: "reviewProducts",
				element: (
				
				),
			},
			{
				path: "reportedProducts",
				element: (
					
				),
			},
		],
	},
  ]);