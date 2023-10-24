import "./_hero.scss";
import Image from "next/image";
import { motion } from "framer-motion";

// ANIMATIONS
import { heroAnim, heroHalfCircleAnim } from "@/libs/animations";

const Hero = () => {
	return (
		<motion.div
			className="hero__component"
			variants={heroAnim}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true }}
		>
			<Image
				className="hero__image"
				src="/images/hero-image.jpg"
				quality={100}
				fill
				alt=""
			/>

			<div className="fade"></div>

			<motion.div
				className="half__circle"
				variants={heroHalfCircleAnim}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
			>
				<div className="hero__text">
					<div className="logo">
						<Image
							className="light"
							src="/logo-light-theme.png"
							quality={100}
							fill
							alt=""
						/>
						<Image
							className="dark"
							src="/logo-dark-theme.png"
							quality={100}
							fill
							alt=""
						/>
					</div>

					<h3>
						Revolutionizing Property Transactions with Ethereum Technology
					</h3>
					<p>Unlocking Endless Possibilities and Effortless Deals</p>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Hero;
