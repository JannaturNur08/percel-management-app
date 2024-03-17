import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import Dashboard from "../layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DeliveryMenRoute from "./DeliveryMenRoute";
import AdminRoute from "./AdminRoute";
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import AllParcel from "../pages/Dashboard/Admin/AllParcel/AllParcel";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen";



import BookParcel from "../pages/Dashboard/Users/BookAParcel/BookParcel";
import MyPercel from "../pages/Dashboard/Users/MyParcel/MyPercel";
import MyProfilee from "../pages/Dashboard/Users/MyProfile/MyProfilee";

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
				path: "bookAParcel",
				element: <BookParcel></BookParcel>,
			},
			{
				path: "myParcel",
				element: <MyPercel></MyPercel>,
			},
			{
				path: "myProfile",
				element: <MyProfilee></MyProfilee>,
			},

			// admin routes
			{
				path: "statistics",
				element: (
					<AdminRoute>
						<Statistics></Statistics>
					</AdminRoute>
				),
			},
			{
				path: "allParcel",
				element: (
					<AdminRoute>
						<AllParcel></AllParcel>
					</AdminRoute>
				),
			},
			{
				path: "allUser",
				element: (
					<AdminRoute>
						<AllUsers></AllUsers>
					</AdminRoute>
				),
			},
			{
				path: "allDeliveryMen",
				element: (
					<AdminRoute>
						<AllDeliveryMen> </AllDeliveryMen>
					</AdminRoute>
				),
			},

			// deliverymen routes
			{
				path: "myDelivery",
				element: (
					<DeliveryMenRoute>
						
					</DeliveryMenRoute>
				),
			},
			{
				path: "myReviews",
				element: (
					<DeliveryMenRoute>
						
					</DeliveryMenRoute>
				),
			},
		],
	},
]);
