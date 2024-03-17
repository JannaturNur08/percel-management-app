import { Outlet } from "react-router-dom";

import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
	return (
		<div className="flex flex-col min-h-screen m-0">
			<div>
				<Navbar></Navbar>
			</div>

			<div className="flex-1">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default Main;
