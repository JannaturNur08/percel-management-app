import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useMyPercels from "../../../../hooks/useMyPercels";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const MyPercel = () => {
    const [myParcels, refetch] = useMyPercels();
    const axiosPublic = useAxiosPublic();

    const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axiosPublic.delete(`/parcels/${id}`).then((res) => {
					if (res.data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your parcel has been deleted.",
							icon: "success",
						});
					}
				});
			}
		});
	};

    return (
        <div>
            <div>
				<div className="overflow-x-auto">
					<table className="table  w-full">
						{/* head */}
						<thead>
							<tr>
								<th>Index</th>
								<th>Parcel Type</th>
								<th>Requested Delivery Date</th>
								<th>Approx. Delivery Date</th>
								<th>Booking Date</th>
								<th>Delivery Man ID</th>
								<th>Booking Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{myParcels.map((item, index) => (
								<tr key={item._id}>
									<th>{index + 1}</th>
									<th>{item.parcelType}</th>
									<th>{item.requestedDeliveryDate}</th>
									<th>{item.requestedDeliveryDate}</th>
                                    <th>{item.bookingDate}</th>
                                    <th></th>
									<th style={{ color: item.status === 'accepted' ? "green" : "red" }}>{item.status}</th>
									

									
									
									<th>
                                    <Link to={`/dashboard/updateParcels/${item._id}`}>
                                            <button
                                                className="btn btn-ghost btn-md bg-blue-500">
                                                <FaEdit className="text-white 
                                        "></FaEdit>
                                            </button>
                                        </Link>
                                        <button
											onClick={() =>
												handleDelete(item._id)
											}
											className="btn btn-ghost btn-lg">
											<FaTrashAlt className="text-red-600"></FaTrashAlt>
										</button>
									</th>
									<th>
										
									</th>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
        </div>
    );
};

export default MyPercel;