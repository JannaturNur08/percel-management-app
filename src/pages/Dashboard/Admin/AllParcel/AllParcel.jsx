import { useState } from "react";
import useParcels from "../../../../hooks/useParcels";
import useUsers from "../../../../hooks/useUsers";

import moment from "moment/moment";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AllParcel = () => {
	const axiosPublic = useAxiosPublic();
	const [parcels, refetch] = useParcels();
	const [users] = useUsers();
	const [loading, setLoading] = useState(false);
	const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");
	const [openManageModalId, setOpenManageModalId] = useState(null);
	const deliveryMen = Array.isArray(users)
		? users.filter((user) => user.role === "DeliveryMen")
		: null;
	const now = moment().format("YYYY-MM-DD");

	const handleAssign = (event,parcelId) => {
        event.preventDefault();
		setLoading(true);
		// Check if a delivery man and delivery date are selected
		if (!selectedDeliveryMan || !deliveryDate) {
			alert(
				"Please select a delivery man and specify the delivery date."
			);
			return;
		}

		const assignedData = {
			parcelId: parcelId,
			deliveryManId: selectedDeliveryMan,
			assignedDate: deliveryDate,
		};

		axiosPublic
			.post("/deliveryAssign", assignedData)
			.then((res) => {
				if (res.data.insertedId) {
					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "DeliveryMan Assigned successfully.",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch((error) => {
				console.error("Error booking parcel: ", error);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong! Please try again later.",
				});
			})
			.finally(() => {
				setLoading(false);
			});

            axiosPublic.patch(`/parcels/${parcelId}`).then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Booking status has changed",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });  
	};

	const openManageModal = (bookingId) => {
		setOpenManageModalId(bookingId);
	};

	const closeReviewModal = () => {
		setOpenManageModalId(null);
	};

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
						{parcels.map((parcel) => (
							<tr key={parcel._id}>
								<td>{parcel.name}</td>
								<td>{parcel.phoneNumber}</td>
								<td>{parcel.bookingDate}</td>
								<td>{parcel.requestedDeliveryDate}</td>
								<td>{parcel.price}</td>
								<td className="text-yellow-400">
									{parcel.status}
								</td>
								<td>
									<div>
										<button
											className="btn bg-blue-600 text-white"
											onClick={() =>
												openManageModal(parcel._id)
											}>
											Manage
										</button>
										{openManageModalId === parcel._id && (
											<dialog
												open
												className="modal"
												id={`review-modal-${parcel._id}`}>
												<form
													onSubmit={() =>
														handleAssign(event,parcel._id)
													}
													className="form-control bg-base-100 rounded-lg p-10 border-2">
													<h2 className="text-2xl font-bold">
														Manage parcel
													</h2>
													<div className="p-5">
														<h2 className="font-bold mb-2">
															Assign Delivery Man
														</h2>
														<select
															value={
																selectedDeliveryMan
															}
															onChange={(e) =>
																setSelectedDeliveryMan(
																	e.target
																		.value
																)
															}>
															<option value="">
																Select Delivery
																Man
															</option>
															{deliveryMen.map(
																(
																	deliveryMan
																) => (
																	<option
																		key={
																			deliveryMan._id
																		}
																		value={
																			deliveryMan._id
																		}>
																		{
																			deliveryMan.name
																		}
																	</option>
																)
															)}
														</select>
														<div className="mt-2">
															<label className="font-bold">
																Approximate
																Delivery Date:
															</label>
															<div className="mt-2">
																<input
																	type="date"
																	min={now}
																	value={
																		deliveryDate
																	}
																	onChange={(
																		e
																	) =>
																		setDeliveryDate(
																			e
																				.target
																				.value
																		)
																	}
																/>
															</div>
														</div>
													</div>
													<div className="flex gap-5">
														<button
															type="submit"
															className="btn bg-blue-500 text-white border-0">
															Assign
														</button>
														<br />
														<button
															className="btn"
															onClick={
																closeReviewModal
															}>
															Cancel
														</button>
													</div>
												</form>
											</dialog>
										)}
									</div>
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
