import React, { useEffect, useRef, useState } from "react";
import uploadImgIcon from "../assets/Cloud upload.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useStore } from "../hooks/useStore";
import { useAuth } from "../hooks/useAuth";
import { ApiResponseError } from "./SignUpForm";

export const EditListingForm = () => {
	const store = useStore();
	const { listingId } = useParams();
	const [listing, setListing] = useState<any>({});
	const [selectedImage, setSelectedImage] = useState<File[] | null>(null);
	const [previewImageUrl, setPreviewImageUrl] = useState<string[] | null>(null);
	const inputRefs = useRef<
		HTMLInputElement[] | HTMLSelectElement[] | HTMLTextAreaElement[]
	>([]);
	const [error, setError] = useState<any>({});
	const navigate = useNavigate();

	const { role } = useAuth();

	const getListingDetails = async () => {
		try {
			if (!store.auth.role) return;
			const res = await axios.get(
				`${store.url}/${store.auth.role
					?.split(" ")[0]
					.toLowerCase()}/${listingId}`,
				{ headers: { Authorization: "Bearer " + store.auth.token } }
			);
			console.log(res);
			setListing(res.data?.service || res.data?.accommodation);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getListingDetails();
	}, [store.auth.role]);
	// console.log('listing', listing)

	const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const formData = new FormData();

			formData.append("name", inputRefs.current[0]?.value);
			formData.append("description", inputRefs.current[1]?.value);
			formData.append("type", inputRefs.current[3]?.value);
			formData.append("address", inputRefs.current[2]?.value);
			formData.append("noOfRooms", inputRefs.current[4]?.value);
			formData.append("noOfKitchens", inputRefs.current[5]?.value);
			formData.append("noOfBathrooms", inputRefs.current[6]?.value);
			formData.append("city", "Ile-Ife");
			formData.append("state", "Osun");

			if (selectedImage) {
				for (let i = 0; i < selectedImage.length; i++) {
					formData.append("media", selectedImage[i]);
				}
			}

			const url =
				`${store.url}/` + role?.split(" ")[0].toLowerCase() + `/${listingId}`;

			const headers = {
				Authorization: "Bearer " + store.auth.token,
				"Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
			};

			const res = await axios.put(url, formData, { headers });

			console.log(res.data);
			navigate("/dashboard/listings");
		} catch (err: any) {
			const error: AxiosError<ApiResponseError> = err;
			setError({ message: error.response?.data.message || error.message });
			console.log(err);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const selectedFiles = Array.from(files);
			setSelectedImage(selectedFiles);

			// Create preview URLs for each selected file
			const previewUrls = selectedFiles.map((file) =>
				URL.createObjectURL(file)
			);
			setPreviewImageUrl((prev: any) => {
				if (prev) return [...prev, previewUrls];
				else return previewUrls;
			});
		}
	};

	return (
		<div>
			<form
				method="PUT"
				encType="multipart/form-data"
				className="flex flex-col"
				onSubmit={handlePost}
			>
				{error.message && (
					<div className="bg-red-100 border animate-shake border-red-400 text-red-700 mt-4 px-4 py-3 rounded relative">
						<strong className="font-bold">Error!</strong>
						<span className="block sm:inline"> {error.message}</span>
						<span className="absolute top-0 bottom-0 right-0 px-4 py-3">
							<svg
								className="fill-current h-6 w-6 text-red-500"
								role="button"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								onClick={() => setError(null)}
							>
								<title>Close</title>
								<path
									fillRule="evenodd"
									d="M14.95 5.879l-4.95 4.95-4.95-4.95a.9.9 0 10-1.272 1.272l4.95 4.95-4.95 4.95a.9.9 0 101.272 1.272l4.95-4.95 4.95 4.95a.9.9 0 101.272-1.272l-4.95-4.95 4.95-4.95a.9.9 0 00-1.272-1.272z"
									clipRule="evenodd"
								/>
							</svg>
						</span>
					</div>
				)}
				<div className="flex items-center  gap-16">
					<div className="">
						<label
							htmlFor="Name"
							className="block my-3 text-sm font-medium text-gray-600"
						>
							{role?.toLocaleLowerCase().includes("service")
								? "Service "
								: "Accommodation "}
							name
						</label>
						<input
							type="text"
							id="Name"
							defaultValue={listing?.name}
							ref={(el) => (inputRefs.current[0] = el!)}
							name="Name"
							className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2 px-4"
						/>
					</div>

					<div className="flex gap-5 flex-grow">
						<div>
							<label
								htmlFor="City"
								className="block my-3 text-sm font-medium text-gray-600"
							>
								City
							</label>
							<select
								className="cursor-pointer outline-none pr-1 bg-background text-sm font-thin w-[190px] border rounded-full border-solid border-light bg-white p-2"
								defaultValue={"City"}
								name="city"
							>
								<option value="City" hidden>
									City
								</option>
								<option value="Ile-Ife">Ile-Ife</option>
								<option value="Oshogbo">Oshogbo</option>
							</select>
						</div>

						<div>
							<label
								htmlFor="State"
								className="block my-3 text-sm font-medium text-gray-600"
							>
								State
							</label>
							<select
								className="cursor-pointer outline-none pr-1 bg-light text-sm font-thin w-[190px] border rounded-full border-solid border-light bg-white p-2 "
								defaultValue={"State"}
							>
								<option value="State" hidden>
									State
								</option>
								<option value="Osun">Osun</option>
								<option value="Oyo">Oyo</option>
							</select>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-16">
					<div>
						<label
							htmlFor="Description"
							className="block my-3 text-sm font-medium text-gray-600"
						>
							Description
						</label>
						<textarea
							id="Description"
							defaultValue={listing?.description}
							ref={(el) => (inputRefs.current[1] = el!)}
							name="Description"
							className="w-[400px] h-[120px] max-h-[120px] min-h-[120px] border outline-none rounded-[1.4rem] border-solid border-light bg-white p-2 px-4"
						/>
						<label
							htmlFor="Address"
							className="block my-3 text-sm font-medium text-gray-600"
						>
							{role?.toLocaleLowerCase().includes("service")
								? "Service "
								: "Accommodation "}
							Address
						</label>
						<input
							ref={(el) => (inputRefs.current[2] = el!)}
							type="text"
							id="Address"
							defaultValue={listing?.address}
							name="Address"
							className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2 px-4"
						/>
					</div>
					<div>
						<label
							htmlFor="Address"
							className="block my-3 text-sm font-medium text-gray-600"
						>
							Image
						</label>

						<div className="w-full h-[150px] border outline-none rounded-[1.4rem] border-solid border-light bg-white p-2 px-4 flex flex-col justify-center items-center">
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="hidden"
								name="media"
								id="upload"
								ref={(el) => (inputRefs.current[5] = el!)}
							/>
							<div className="flex gap-1">
								{listing?.images?.length > 0 ||
									(Array.isArray(previewImageUrl) &&
										previewImageUrl.map((url, index) => (
											<img
												key={index}
												src={url || listing?.images[0]}
												className="cursor-pointer h-[70px] w-[70px]"
												alt={`Preview ${index}`}
											/>
										)))}
							</div>
							<label htmlFor="upload">
								<img
									src={uploadImgIcon}
									onClick={() => inputRefs.current[5]?.click()}
									className="cursor-pointer"
									alt="Upload"
								/>
							</label>

							<p className="text-center text-xs font-thin">
								Drag or Upload Images
							</p>
						</div>
						<p className="text-center text-xs font-thin w-[430px] mt-4">
							At least 3 images of the accommodation being listed is required,
							each of different views. Images asttached should be under the size
							of 10MB each.
						</p>
					</div>
				</div>

				{/*  */}
				{role?.split(" ")[0].toLowerCase() === "accommodation" && (
					<>
						<div className="flex items-center gap-16">
							<div>
								<label
									htmlFor="Description"
									className="block my-3 text-sm font-medium text-gray-600"
								>
									Accommodation Type
								</label>
								<select
									className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2 px-4"
									defaultValue={"type"}
									ref={(el) => (inputRefs.current[3] = el!)}
								>
									<option value="hotel">Hotel</option>
									<option value="self-contained apartment">
										Self-contained apartment
									</option>
									<option value="hostel">Hostel</option>
									<option value="flat apartment">Flat apartment</option>
									<option value="short let apartment">
										Short let apartment
									</option>
								</select>
								<label
									htmlFor="Address"
									className="block my-3 text-sm font-medium text-gray-600"
								>
									Number of rooms
								</label>
								<select
									className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2 px-4"
									defaultValue={"number"}
									ref={(el) => (inputRefs.current[4] = el!)}
								>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="Description"
									className="block my-3 text-sm font-medium text-gray-600"
								>
									Number of Kitchen
								</label>
								<select
									className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2 px-4"
									defaultValue={"type"}
									ref={(el) => (inputRefs.current[5] = el!)}
								>
									<option value={1}>One</option>
									<option value={2}>Two</option>
									<option value={3}>Three</option>
								</select>
								<label
									htmlFor="Address"
									className="block my-3 text-sm font-medium text-gray-600"
								>
									Number of Bathrooms
								</label>
								<select
									className="w-[400px] border outline-none rounded-full border-solid border-light bg-white p-2 px-4"
									defaultValue={"number"}
									ref={(el) => (inputRefs.current[6] = el!)}
								>
									<option value={1}>One</option>
									<option value={2}>Two</option>
									<option value={3}>Three</option>
								</select>
							</div>
						</div>
					</>
				)}

				<div className="mt-4">
					<button
						type="submit"
						className={`bg-primary text-white rounded-3xl py-2 px-6 flex items-center gap-4 disabled:bg-blue-300 disabled:cursor-not-allowed`}
					>
						Upload
					</button>
				</div>
			</form>
		</div>
	);
};
