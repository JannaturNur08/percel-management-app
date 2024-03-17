import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import useDeliveryMen from "../hooks/useDeliveryMen";

const Dashboard = () => {
	const { user } = useAuth();
	//get isAdmin from the database
	const [isAdmin] = useAdmin();
	// const isAdmin = true;
	const [isDeliveryMen] = useDeliveryMen();

	return (
		<div className="flex">
			{/* dashboard side bar */}
			<div className="w-64 min-h-screen bg-primary text-white">
				<ul className="menu p-4">
					{isAdmin ? (
						<>
							<li>
								<NavLink to="/dashboard/statistics">
									<FaHome></FaHome>
									Statistics
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/parcels">
									<FaUsers></FaUsers>
									All Parcel
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/users">
									<FaUsers></FaUsers>
									All Users
								</NavLink>
							</li>

							<li>
								<NavLink to="/dashboard/deliveryMen">
									<RiCoupon5Line />
									All DeliveryMen
								</NavLink>
							</li>
						</>
					) : isDeliveryMen ? (
						<>
							<li>
								<NavLink to="/dashboard/myDelivery">
									<MdPreview />
									My Delivery
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/myReviews">
                                <MdPreview />
									My Reviews
								</NavLink>
							</li>
						</>
					) : user ? (
						<>
							<li>
								<NavLink to="/dashboard/bookAParcel">
									<FaUtensils></FaUtensils>
									Book A Parcel
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/myParcel">
									<FaShoppingCart></FaShoppingCart>
									My Parcel
								</NavLink>
							</li>

							<li>
								<NavLink to="/dashboard/myProfile">
									<CgProfile />
									My Profile
								</NavLink>
							</li>
						</>
					) : null}
					<div className="divider"></div>
					<li>
						<NavLink to="/">
							<FaHome></FaHome>
							Home
						</NavLink>
					</li>
				</ul>
				;
			</div>
			{/* dashboard content */}
			<div className="flex-1 p-8">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default Dashboard;
