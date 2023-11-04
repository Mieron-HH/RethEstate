import "./_loader.scss";
import Image from "next/image";

const Loader = () => {
	return (
		<div className="loader__copmonent">
			<div className="logo">
				<Image
					className="light"
					src="/logo-light-theme.png"
					quality={100}
					width={80}
					height={80}
					alt=""
				/>

				<Image
					className="dark"
					src="/logo-dark-theme.png"
					quality={100}
					width={80}
					height={80}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Loader;
