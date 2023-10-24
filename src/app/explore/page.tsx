import "./_page.scss";

// COMPONENTS
import Navbar from "@/components/Navbar/navbar";
import SearchBar from "@/components/Search-Bar/search_bar";

const Explore = () => {
	return (
		<div className="explore">
			<Navbar />

			<SearchBar />
		</div>
	);
};

export default Explore;
