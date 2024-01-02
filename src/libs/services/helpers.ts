export const uploadPropertyPicture = (callback: (event: Event) => void) => {
	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.name = "uploader";
	fileInput.accept = "image/*";
	fileInput.addEventListener("change", callback);
	fileInput.click();
};

export const getExchangeRate = async () => {
	const result = await fetch(
		"https://api.coinbase.com/v2/exchange-rates?currency=ETH"
	);

	if (result.ok) {
		const { data } = await result.json();

		return data.rates.USD;
	}

	return -1;
};
