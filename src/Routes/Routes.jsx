
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
import BookAParcel from "../pages/Dashboard/Users/bookAParcel/bookAParcel";
import MyParcel from "../pages/Dashboard/Users/myParcel/myParcel";
import MyProfile from "../pages/Dashboard/Users/myProfile/myProfile";
import AdminRoute from "./AdminRoute";
import Statistics from "../pages/Dashboard/Admin/Statistics/Statistics";
import AllParcel from "../pages/Dashboard/Admin/AllParcel/AllParcel";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllDeliveryMen from "../pages/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen";
import DeliveryMenRoute from "./DeliveryMenRoute";
import MyDelivery from "../pages/Dashboard/DeliveryMen/myDelivery/myDelivery";
import MyReviews from "../pages/Dashboard/DeliveryMen/myReviews/myReviews";

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
				element: <BookAParcel></BookAParcel> ,
			},
			{
				path: "myParcel",
				element: <MyParcel></MyParcel> ,
			},
			{
				path: "myProfile",
				element: <MyProfile></MyProfile> ,
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
				path: "allUsers",
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
          <MyDelivery></MyDelivery>
        </DeliveryMenRoute>
				),
			},
			{
				path: "myReviews",
				element: (
					<DeliveryMenRoute>
          <MyReviews></MyReviews>
        </DeliveryMenRoute>
				),
			},
		],
	},
  ]);