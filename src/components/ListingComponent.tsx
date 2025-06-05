import React, { useState } from "react";
import locationImg from "../assets/Location on.svg";
import ratingImg from "../assets/Star.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import edit from "../assets/editIcon.svg";
import { Link } from "react-router-dom";

interface Props {
	img: string;
	name: string;
	location: string;
	price: string;
	id: string;
}

export const ListingComponent = ({ img, name, location, price, id }: Props) => {
	const [isOverlayVisible, setOverlayVisible] = useState(false);

	const showOverlay = () => {
		setOverlayVisible(true);
	};
	const hideOverlay = (e: any) => {
		if (isOverlayVisible && e.target.classList.contains("overlay-backdrop")) {
			setOverlayVisible(false);
		}
	};
	return (
		<div className="rounded-[1.25rem] w-max border shadow-lg border-background p-4 bg-[#e7edfd] pb-4">
			<div className="h-[18rem] w-[20rem] p-4 overflow-hidden rounded-[1.25rem] bg-[#f4f5ff] ">
				<img
					src={img}
					alt=""
					className="object-cover m-0 rounded-[1.25rem] h-full w-full"
				/>
			</div>

			<div className="flex justify-between items-center mt-6">
				<h1 className=" text-xl font-medium leading-4 my-3">{name}</h1>
				<div className="flex items-center gap-1">
					<img src={ratingImg} alt="" />
					<p className=" text-lg font-bold leading-3 tracking-tighter">5</p>
				</div>
			</div>

			<div className="flex items-center gap-1">
				<img src={locationImg} alt="" />
				<p className=" text-base font-normal leading-5 my-2">{location}</p>
			</div>

			<p className="text-gray-900  text-base font-normal leading-relaxed my-3">
				{price}
			</p>
			{isOverlayVisible && (
				<div
					className="fixed inset-0  w-full h-full flex justify-center items-center bg-[#F3F7FD] bg-opacity-80 overlay-backdrop"
					onClick={hideOverlay}
				>
					<div className="bg-white p-12 rounded-lg text-center w-[624px] h-[226px] ">
						<h2 className="text-lg font-medium my-4">
							Are you sure you want to delete this Listing?
						</h2>
						<button className="bg-primary py-3 px-6 text-white rounded-md mx-auto">
							Delete
						</button>
					</div>
				</div>
			)}

			{/*  */}
			<div className="flex gap-4 items-center">
				<Link to={`/dashboard/${id}`}>
					<button className="px-4 bg-primary text-whitish rounded-[4px] dm py-3 btn-trans scale-up flex items-center gap-4">
						<img src={edit} alt="" />
						Edit
					</button>
				</Link>
				<button
					className="px-4 bg-primary text-whitish rounded-[4px] dm py-3 btn-trans scale-up flex items-center gap-4"
					onClick={showOverlay}
				>
					<img src={deleteIcon} alt="" />
					Delete
				</button>
			</div>
		</div>
	);
};
