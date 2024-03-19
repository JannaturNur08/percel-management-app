import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {  FaUsers } from "react-icons/fa";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
	const { data: users = [], refetch } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users");
			return res.data;
		},
	});

	const handleMakeDeliveryman = (user) => {
		axiosSecure.patch(`/users/deliveryman/${user._id}`).then((res) => {
			console.log(res.data);
			if (res.data.modifiedCount > 0) {
				refetch();
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${user.name} is Moderator Now!.`,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	};
	const handleMakeAdmin = (user) => {
		axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
			console.log(res.data);
			if (res.data.modifiedCount > 0) {
				refetch();
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${user.name} is Admin Now!.`,
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	};

	
    return (
        <div>
            <div className="flex justify-evenly my-4">
				<h2 className="text-3xl">All Users</h2>
				<h2 className="text-3xl">Total Users: {users.length} </h2>
			</div>
			<div className="overflow-x-auto">
				<table className="table table-zebra w-full">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Make Deliveryman</th>
							<th>Make Admin</th>
							
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user._id}>
								<th>{index + 1}</th>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>
									{user.role === "DeliveryMen" ? (
										"DeliveryMen"
									) : user.role === "Admin" ? (
										" "
									) : (
										<button
											onClick={() =>
												handleMakeDeliveryman(user)
											}
											className="btn btn-lg bg-blue-500 text-white"
											disabled={user.role === "Admin"}>
											<FaUsers className="text-white text-2xl"></FaUsers>
											Make Deliveryman
										</button>
									)}
								</td>
								<td>
									{user.role === "Admin" ? (
										"Admin"
									) : (
										<button
											onClick={() =>
												handleMakeAdmin(user)
											}
											className="btn btn-lg bg-red-200 text-red-600">
											<FaUsers
												className="text-white 
                                        text-2xl"></FaUsers>
											Make Admin
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

export default AllUsers;