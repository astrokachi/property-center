import React, { useContext, useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import AuthContext from "../context/AuthContext";
import { useUserquery } from "../hooks/useUserquery";
import { useNavigate } from "react-router-dom";

export const EditProfileForm = () => {
	const store = useStore();
	useUserquery();
	const [user, setUser] = useState<any>({});
	const navigate = useNavigate();

	useEffect(() => {
		store.auth?.user?.ServiceProfile && setUser(store.auth.user.ServiceProfile);
		store.auth?.user?.AccommodationProfile &&
			setUser(store.auth.user.AccommodationProfile);
		console.log(user);
	}, [store.auth.firstName]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const url = `${store.url}/profile/${
			store.auth.role && store.auth?.role.toLowerCase().split(" ")[0]
		}`;

		try {
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					Authorization: "Bearer " + store.auth.token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			console.log(response);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	return (
		<div>
			<form
				action=""
				className="flex flex-col"
				method="PUT"
				encType="multipart/form-data"
				onSubmit={handleFormSubmit}
			>
				<div className="flex items-center justify-between p-2 m-2 gap-16">
					<div className="">
						<label
							htmlFor="FirstName"
							className="block my-3 text-sm font-medium text-gray-600"
						>
							First Name
						</label>
						<input
							type="text"
							id="FirstName"
							name="firstName"
							className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2"
							defaultValue={store.auth.firstName}
							onChange={handleInputChange}
						/>
					</div>

					<div className="flex gap-5 flex-grow">
						<div className="">
							<label
								htmlFor="LastName"
								className="block my-3 text-sm font-medium text-gray-600"
							>
								Last Name
							</label>
							<input
								type="text"
								id="LastName"
								name="lastName"
								className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2"
								defaultValue={store.auth.lastName}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between p-2 m-2 gap-16">
					<div className="">
						<label
							htmlFor="email"
							className="block my-3 text-sm font-medium text-gray-600"
						>
							Email Address
						</label>
						<input
							type="text"
							id="email"
							name="email"
							className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2"
							defaultValue={store.auth.email}
							onChange={handleInputChange}
						/>
					</div>

					<div className="flex gap-5 flex-grow">
						<div className="">
							<label
								htmlFor="PhoneNumber"
								className="block my-3 text-sm font-medium text-gray-600"
							>
								Phone Number
							</label>
							<input
								type="text"
								id="PhoneNumber"
								name="phoneNumber"
								className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2"
								defaultValue={user?.phoneNumber}
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between p-2 m-2 gap-16">
					<div className="flex-grow w-full">
						<label
							htmlFor="brandName"
							className="block my-3 text-sm font-medium text-gray-600"
						>
							Brand Name
						</label>
						<input
							type="text"
							id="brandName"
							name="brandName"
							className="w-full border outline-none rounded-full border-solid border-light bg-white p-2"
							defaultValue={user?.brandName}
							onChange={handleInputChange}
						/>
					</div>

					{user.areaOfSpecialization && (
						<div className="flex gap-5 flex-grow">
							<div className="">
								<label
									htmlFor="specialization"
									className="block my-3 text-sm font-medium text-gray-600"
								>
									Area of Specialization
								</label>
								<input
									type="text"
									id="specialization"
									name="specialization"
									className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2"
									defaultValue={user?.areaOfSpecialization}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					)}
				</div>

				<div className="">
					<label
						htmlFor="email"
						className="block my-3 text-sm font-medium text-gray-600"
					>
						Company/Brand Address
					</label>
					<input
						type="text"
						id="email"
						name="address"
						className="w-[900px] border outline-none rounded-full border-solid border-light bg-white p-2"
						defaultValue={user?.address}
						onChange={handleInputChange}
					/>
				</div>

				<div className="mt-8">
					<button
						className="bg-primary text-white rounded-3xl py-2 px-6 w-[120px] float-right"
						type="submit"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};