import React from "react";
import locationImg from "../assets/whiteLocay.svg";
import ratingImg from "../assets/whiteStar.svg";
import { DetailsBtn } from "./DetailsBtn";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

interface Props {
	img: string;
	name: string;
	desc: string;
	location: string;
	id: number;
}

export const SkillsCard = ({ img, name, desc, location, id }: Props) => {
	const history = useNavigate();
	const store = useStore();

	const handleCardClick = () => {
		if (store.auth.token) {
			history(`/service/${id}`);
		} else {
			history("/signup");
		}
	};

	return (
		<div className="relative rounded-[2rem] w-max border shadow-lg border-background p-[0.75rem] bg-[#EBEFFE] scale-up 	trans">
			<div className="h-[523px] w-[351px]  relative">
				<img
					src={img}
					alt=""
					className="object-cover h-full w-full bg-cover bg-center rounded-[1.25rem]"
				/>

				<div className="absolute inset-0 flex flex-col justify-end p-4 rounded-[1.25rem] bg-black bg-opacity-50 text-white">
					<div className="flex justify-between items-center">
						<h1 className=" text-xl font-medium leading-4 mb-2">{name}</h1>
						<div className="flex items-center gap-1 mb-2">
							{/* <img src={ratingImg} alt="" />
							<p className=" text-lg font-bold leading-3 tracking-tighter">
								{5.0}
							</p> */}
						</div>{" "}
					</div>
					<p className="text-gray-900 text-base font-normal leading-relaxed mb-2 truncate">
						{desc}
					</p>
					<div className="flex items-center gap-1 mb-2">
						<img src={locationImg} alt="" />
						<p className=" text-base font-normal leading-5">{location}</p>
					</div>
					<div onClick={handleCardClick}>
						<DetailsBtn text="See Details" />
					</div>
				</div>
			</div>
		</div>
	);
};
