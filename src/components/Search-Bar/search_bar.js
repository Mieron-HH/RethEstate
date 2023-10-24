"use client";

import { useRef } from "react";
import "./_search_bar.scss";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { motion } from "framer-motion";

// ICONS
import { BiBath, BiBed } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";

// ACTIONS
import {
	setCity,
	setBedroomNumber,
	setBathroomNumber,
} from "@/libs/slices/property-slice";

// ANIMATIONS
import { searchBArAnim } from "@/libs/animations";

const SearchBar = () => {
	const dispatch = useAppDispatch();

	const { city, bedroomNumber, bathroomNumber } = useAppSelector(
		(state) => state.property
	);
	const inputRef = useRef(null);

	return (
		<motion.div
			className="searchBar__component"
			variants={searchBArAnim}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
		>
			<div className="input__group text">
				<input
					className="input__item"
					type="text"
					ref={inputRef}
					value={city}
					onChange={(e) => {
						dispatch(setCity(e.target.value));
					}}
					placeholder="Enter a city. e.g New York"
				/>

				<div className="label__icon">
					<MdOutlineLocationOn className="icon" />
				</div>
			</div>

			<div className="input__group number">
				<input
					className="input__item"
					type="text"
					value={bedroomNumber}
					onChange={(e) => {
						if (
							(/^[0-9]*(\.[0-9]*)?$/.test(e.target.value) &&
								parseInt(e.target.value) < 100) ||
							e.target.value === ""
						)
							dispatch(setBedroomNumber(e.target.value));
					}}
					placeholder="e.g 3"
				/>

				<div className="label__icon">
					<BiBed className="icon" />
				</div>
			</div>

			<div className="input__group number">
				<input
					className="input__item"
					type="text"
					value={bathroomNumber}
					onChange={(e) => {
						if (
							(/^[0-9]*(\.[0-9]*)?$/.test(e.target.value) &&
								parseInt(e.target.value) < 100) ||
							e.target.value === ""
						)
							dispatch(setBathroomNumber(e.target.value));
					}}
					placeholder="e.g 2"
				/>

				<div className="label__icon">
					<BiBath className="icon" />
				</div>
			</div>

			<button className="search__button" type="button">
				Search
			</button>
		</motion.div>
	);
};

export default SearchBar;
