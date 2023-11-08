import "./_my_properties.scss";
import Image from "next/image";

// ICONS
import { BsSortUp } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const MyProperties = () => {
	return (
		<div className="myProperties__component">
			<>
				<div className="header">
					<div className="sort__button">
						Date Listed
						<BsSortUp className="icon" />
					</div>
				</div>

				<div className="myProperties__list">
					{Array.from({ length: 5 }).map((_, index) => {
						return (
							<div key={index} className="property__card">
								<div className="image">
									<Image src="/house/house.jpg" quality={100} fill alt="" />
								</div>

								<div className="view__button">
									<ArrowRightAltIcon className="icon" />
								</div>

								<div className="count__item views">
									<VisibilityIcon className="icon" />
									2,289
								</div>

								<div className="count__item likes">
									<IoMdHeart className="icon" />
									273
								</div>

								<div className="detail">
									<div className="description">
										Luxury house on a hill Luxury house on a hill Luxury house
										on a hill Luxury house on a hill Luxury house on a hill
									</div>

									<div className="more__info">
										<div className="price">Eth 70</div>

										<div className="date">Listed on Tue 11, 2023</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</>

			<div className="no__data">
				<Image
					src="/no-data-image.png"
					quality={100}
					width={250}
					height={190}
					alt=""
				/>
			</div>
		</div>
	);
};

export default MyProperties;
