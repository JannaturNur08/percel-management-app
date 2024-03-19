import { useState } from "react";
import useParcels from "../../../../hooks/useParcels";
import useUsers from "../../../../hooks/useUsers";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import moment from "moment/moment";

const AllParcel = () => {
	const axiosSecure = useAxiosSecure();
	const [parcels] = useParcels();
	const [users, refetch] = useUsers();
	const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
	const [deliveryDate, setDeliveryDate] = useState("");

	const [openManageModalId, setopenManageModalId] = useState(null);
	const deliveryMen = Array.isArray(users)
		? users.filter((user) => user.role === "DeliveryMen")
		: null;

        const now = moment().format("YYYY-MM-DD");

	const handleAssign = () => {
		// Update booking status and assign delivery man
	};

	// Function to open the review modal
	const openManageModal = (bookingId) => {
		setopenManageModalId(bookingId);
	};

	// Function to close the review modal
	const closeReviewModal = () => {
		setopenManageModalId(null);
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
						{parcels.map((user) => (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.phoneNumber}</td>
								<td>{user.bookingDate}</td>
								<td>{user.requestedDeliveryDate}</td>
								<td>{user.price}</td>
								<td className="text-yellow-400">
									{user.status}
								</td>
								<td>
									<div>
										<button
											className="btn bg-blue-600 text-white"
											onClick={() =>
												openManageModal(user._id)
											}>
											Manage
										</button>
										{openManageModalId === user._id && (
                                            
											<dialog
												open
												className="modal"
												id={`review-modal-${user._id}`}>
												<form
													onSubmit={handleAssign}
													className="form-control bg-base-100 rounded-lg p-10 border-2">
                                                        <h2 className="text-2xl font-bold">Manage parcel</h2>
													<div className="p-5 ">
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
															Approximate Delivery
															Date:
														</label>
														<div className="mt-2">
                                                        <input
															type="date"
                                                            min={now}
															value={deliveryDate}
															onChange={(e) =>
																setDeliveryDate(
																	e.target
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
														className="btn bg-blue-500 text-white border-0 ">
														Assign
													</button>
													<br />
													<button
														className="btn"
														onClick={() =>
															closeReviewModal(
																user._id
															)
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
