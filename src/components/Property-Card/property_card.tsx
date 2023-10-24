import Image from "next/image";
import "./_property_card.scss";

// ICONS
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedIcon from "@mui/icons-material/Bed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

const PropertyCard = () => {
	return (
		<div className="propertyCard__component">
			<div className="card__image">
				<Image src="/house/house.jpg" quality={100} fill alt="" />

				<div className="favorite__icon">
					<FavoriteIcon className="icon" />
				</div>
			</div>

			<div className="date__listed">
				<div className="date">13</div>

				<div className="month">Sep</div>
			</div>

			<div className="card__detail">
				<div className="price">
					<div className="eth__price">ETH 70</div>

					<div className="approximate__dollars">approx. $116,400</div>
				</div>

				<div className="catchy">Traditional style house</div>

				<div className="features">
					<div className="item">
						<div className="item__icon">
							<BedIcon className="icon" />
						</div>
						3
					</div>

					<div className="item">
						<div className="item__icon">
							<BathtubIcon className="icon" />
						</div>
						3
					</div>

					<div className="item">
						<div className="item__icon">
							<SquareFootIcon className="icon offsetted" />
						</div>
						500 sqft
					</div>
				</div>

				<div className="street__address">
					<LocationOnIcon className="icon" />

					<div className="address__text">2004 Kennedy Ave - Baltimore - MD</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
