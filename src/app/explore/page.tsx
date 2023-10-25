import "./_page.scss";

// COMPONENTS
import Navbar from "@/components/Navbar/navbar";
import SearchBar from "@/components/Search-Bar/search_bar";
import PropertyCard from "@/components/Property-Card/property_card";
import Map from "@/components/Map/map";

const Explore = () => {
	return (
		<div className="explore">
			<Navbar />

			<div className="explore__searchBar">
				<SearchBar />
			</div>

			<div className="explore__body">
				<div className="properties__list">
					{Array.from({ length: 10 }).map((item, index) => {
						return <PropertyCard key={index} />;
					})}
				</div>

				<div className="map__container">
					<Map />
				</div>
			</div>
		</div>
	);
};

export default Explore;
