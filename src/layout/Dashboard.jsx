import { NavLink, Outlet } from "react-router-dom";
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
									Admin Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/users">
									<FaUsers></FaUsers>
									All Users
								</NavLink>
							</li>

							<li>
								<NavLink to="/dashboard/coupons">
									<RiCoupon5Line />
									Coupons
								</NavLink>
							</li>
						</>
					) : isDeliveryMen ? (
						<>
						
							<li>
								<NavLink to="/dashboard/reviewProducts">
									<MdPreview />
									Review Products
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/reportedProducts">
									<MdReport />
									Reported Products
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
								<NavLink to="/dashboard/addProduct">
									
                                    <FaShoppingCart></FaShoppingCart>
									My Parcel
								</NavLink>
							</li>

							<li>
								<NavLink to="/dashboard/myProducts">
									
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