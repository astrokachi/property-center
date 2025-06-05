import React, { useEffect, useState } from "react";
import { SkillsCard } from "./SkillsCard";
import { useSkillsQuery } from "../hooks/useSkillsQuery";
import axios from "axios";
import { useStore } from "../hooks/useStore";

interface Skill {
	id: string;
	images: string[];
	address: string;
	name: string;
	description: string;
}

export const SkillsSection = () => {
	// const { data, error } = useSkillsQuery();
	const [currentPage, setCurrentPage] = useState(1);
	const skillsPerPage = 9;
	const [skills, setSkills] = useState<Skill[]>([]);
	const store = useStore();

	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const response = await axios.get(store.url + "/service");
				setSkills(response?.data?.services);
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		};

		fetchSkills();
	}, []);
	// useEffect(() => {
	//   console.log(error, data)
	//   if (data?.services) {
	//     setSkills(data.services);
	//   }
	// }, [data?.services, skills]);

	const indexOfLastSkill = currentPage * skillsPerPage;
	const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
	const currentSkills = skills?.slice(indexOfFirstSkill, indexOfLastSkill);

	const handleNextPage = () => {
		if (currentPage < Math.ceil(skills?.length / skillsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className="relative w-full h-full flex min-h-screen flex-col items-start gap-4 justify-around flex-shrink-0 my-3">
			<div
				className="grid items-start self-stretch justify-between gap-10 flex-wrap px-32 py-8"
				style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
			>
				{currentSkills?.length > 0 ? (
					currentSkills?.map((skill) => (
						<SkillsCard
							img={(skill.images && skill.images[0]) || ""}
							location={skill.address}
							name={skill.name}
							desc={skill.description}
							key={skill.id}
							id={Number(skill.id)}
						/>
					))
				) : (
					<div className="absolute top-[30%] left-[50%] translate-x-[-50%] text-4xl">
						No skills listings yet.
					</div>
				)}
			</div>
			<div className="flex my-6 gap-8 mx-auto">
				<button
					onClick={handlePrevPage}
					disabled={currentPage === 1}
					className="text-base py-2 px-8 w-full bg-primary font-semibold text-white rounded-[50px] source-sans border-primary border btn-trans scale-up"
				>
					Previous
				</button>
				<button
					onClick={handleNextPage}
					disabled={
						currentPage === Math.ceil(skills?.length / skillsPerPage) ||
						currentSkills?.length === 0
					}
					className="text-base py-2 px-8 w-full bg-primary font-semibold text-white rounded-[50px] source-sans border-primary border btn-trans scale-up"
				>
					Next
				</button>
			</div>
		</div>
	);
};
