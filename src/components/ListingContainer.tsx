import React, { useEffect, useState } from "react";
import ListedImage from "../assets/listedHostel.svg";
import { ListingComponent } from "./ListingComponent";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../hooks/useStore";
import axios from "axios";
import Cookies from "js-cookie";
import { useUserquery } from "../hooks/useUserquery";

export const ListingContainer = () => {
	const [services, setServices] = useState([]);
	const [accommodations, setAccommodations] = useState([]);
	const store = useStore();

	useUserquery();

	useEffect(() => {
		setServices(store.auth.user?.ServiceDetails);
		setAccommodations(store.auth.user?.AccommodationDetails);
	}, [store.auth]);

	return (
		<div className="relative w-full h-full  flex flex-col items-start gap-4 justify-around flex-shrink-0 my-3">
			<div
				className="grid items-start self-stretch  justify-between  px-4 py-8 gap-4"
				style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
			>
				{services?.map((service: any, index) => (
					<>
						<ListingComponent
							key={index}
							img={service.images}
							name={service.name}
							location={service.address}
							price=""
							id={service?.id}
						/>
					</>
				))}

				{accommodations?.map((accommodation: any, index) => (
					<>
						<ListingComponent
							key={index}
							img={accommodation.images}
							name={accommodation.name}
							location={accommodation.address}
							price="N15,000.00/Night"
							id={accommodation?.id}
						/>
					</>
				))}

				{(!services && !accommodations) ||
					(services.length == 0 && accommodations.length === 0 && (
						<div className="absolute top-[30%] left-[50%]  translate-x-[-50%] text-4xl">
							No listings yet.
						</div>
					))}
			</div>
		</div>
	);
};
