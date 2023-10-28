"use client";

import { useEffect, useState } from "react";
import "./_slider.scss";
import Image from "next/image";

const Slider = () => {
	const [slide, setSlide] = useState(1);

	useEffect(() => {
		setTimeout(() => {
			if (slide < 3) setSlide((previous) => previous + 1);
			else setSlide(1);
		}, 7000);
	}, [slide]);

	return (
		<div className="slider__component">
			<div className="slider__image">
				<Image src={`/auth-sliders/auth-slider-${slide}.jpg`} fill alt="" />
			</div>

			<div className="fade" />

			<div className="catchy__text">
				Experience real estate&apos;s digital revolution: Our NFT and
				Ethereum-powered website redefines property transactions, making
				homeownership as unique as your digital fingerprint.
			</div>

			<div className="slide__indicator">
				<div
					className={`indicator ${slide === 1 && "active"}`}
					onClick={() => setSlide(1)}
				/>
				<div
					className={`indicator ${slide === 2 && "active"}`}
					onClick={() => setSlide(2)}
				/>
				<div
					className={`indicator ${slide === 3 && "active"}`}
					onClick={() => setSlide(3)}
				/>
			</div>
		</div>
	);
};

export default Slider;
