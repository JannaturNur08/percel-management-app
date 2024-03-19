import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllParcel = () => {
	const axiosSecure = useAxiosSecure();
	const { data: parcels = [], refetch } = useQuery({
		queryKey: ["parcels"],
		queryFn: async () => {
			const res = await axiosSecure.get("/parcels");
			return res.data;
		},
	});
	return (
		<div>
			
				<h2 className="text-3xl mb-10">All Parcels</h2>
				
			
			<div className="overflow-x-auto">
				<table className="table table-zebra w-full">
					{/* head */}
					<thead>
						<tr>
							
							<th>User Name</th>
							<th>User Phone</th>
							<th>Booking Date</th>
							<th>Req. Delivery Date</th>
							<th>Cost </th>
							<th>Status</th>
							<th>Manage</th>
						</tr>
					</thead>
					<tbody>
						{parcels.map((user) => (
							<tr key={user._id}>
								
								<td>{user.name}</td>
								<td>{user.phoneNumber}</td>
								<td>{user.bookingDate}</td>
								<td>{user.requestedDeliveryDate}</td>
								<td>{user.price}</td>
								<td className="text-yellow-400">{user.status}</td>
                                <td className="text-red-500 font-bold">
									{user.role === "Admin" ? (
										"Admin"
									) : (
										<button
											onClick={() =>
												handleManage(user)
											}
											className="btn btn-lg bg-blue-500 text-white">
											
											Manage
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllParcel;
