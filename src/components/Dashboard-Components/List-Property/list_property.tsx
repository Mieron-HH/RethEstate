"use client";

import { useEffect, useRef, useState } from "react";
import "./_list_property.scss";
import { useAppDispatch } from "@/libs/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useAddress, useContract } from "@thirdweb-dev/react";

// ICONS
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillBuildingFill, BsHousesFill } from "react-icons/bs";
import { FaSwimmingPool } from "react-icons/fa";
import { FaWarehouse, FaXmark } from "react-icons/fa6";
import { GiHouse, GiCheckMark } from "react-icons/gi";
import { IoAddCircle, IoBed } from "react-icons/io5";
import { MdApartment, MdVilla } from "react-icons/md";
import { PiToiletFill } from "react-icons/pi";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import CloseIcon from "@mui/icons-material/Close";

// SCHEMAS
import listPropertySchema from "@/libs/schemas/list-property-schema";

// SERVICES
import { uploadPropertyPicture } from "@/libs/services/helpers";

// INTERFACES
import { PropertyImage } from "@/libs/interfaces";
import { setToast } from "@/libs/slices/common-slice";

// API-CALLS
import { createProperty } from "../../../libs/services/api-calls";

// HELPERS
import { getExchangeRate } from "@/libs/services/helpers";

// ABIS
import RethEstateABI from "@/libs/abis/RethEstate.json";

type TInputs = z.infer<typeof listPropertySchema>;
type TCategory =
	| "house"
	| "building"
	| "apartment"
	| "villa"
	| "duplex"
	| "warehouse";

const ListProperty = () => {
	const dispatch = useAppDispatch();
	const address = useAddress();
	const { contract: rethEstate, error } = useContract(
		process.env.NEXT_PUBLIC_RETHESTATE_ADDRESS!,
		RethEstateABI
	);

	const PostData = useRef(new FormData());
	const [exchangeRate, setExchangeRate] = useState<number>(-1);
	const [approximateValue, setApproximateValue] = useState("Approximate value");
	const [percentageValue, setPercentageValue] = useState("Percentage value");
	const [uploadingImage, setUploadingImage] = useState<boolean>(false);
	const [thumbnailImage, setThumbnailImage] = useState<
		string | ArrayBuffer | null
	>(null);
	const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
	const [category, setCategory] = useState<TCategory>("house");
	const [bedrooms, setBedrooms] = useState<number>(1);
	const [bathrooms, setBathrooms] = useState<number>(1);
	const [swimmingPool, setSwimmingPool] = useState<boolean>(false);
	const [displayDownPayment, setDisplayDownPayment] = useState<boolean>(false);
	const [introdcutionLength, setIntroductionLength] = useState<number>(0);
	const [descriptionLength, setDescriptionLength] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<TInputs>({
		resolver: zodResolver(listPropertySchema),
	});

	useEffect(() => {
		(async () => {
			const rate = await getExchangeRate();
			setExchangeRate(rate);
		})();
	}, []);

	useEffect(() => {
		const priceSubscription = watch(
			({ introduction, description, price, downPayment }) => {
				if (introduction) setIntroductionLength(() => introduction.length);
				if (description) setDescriptionLength(() => description.length);
				if (!price) setDisplayDownPayment(false);
				if (price) {
					if (exchangeRate < 0)
						return setApproximateValue("Error loading exchange rate");

					const parsedValue = parseFloat(price);

					setDisplayDownPayment(false);
					if (price === "") setApproximateValue("0");
					else if (!/^\d+(\.\d+)?$/.test(price))
						setApproximateValue("Invalid price");
					else if (isNaN(parsedValue) || parsedValue < 0)
						setApproximateValue("Invalid price");
					else {
						setDisplayDownPayment(true);
						const usdPrice = parsedValue * exchangeRate;

						setApproximateValue(
							"Approx: " +
								usdPrice.toLocaleString("en-US", {
									style: "currency",
									currency: "USD",
								})
						);
					}
				}
				if (price && !downPayment) setPercentageValue("0");
				if (downPayment) {
					if (price) {
						const parsedPrice = parseFloat(price);
						const parsedDownPayment = parseFloat(downPayment);

						if (downPayment === "") setPercentageValue("0");
						else if (!/^\d+(\.\d+)?$/.test(price))
							setPercentageValue("Invalid down payment");
						else if (isNaN(parsedDownPayment) || parsedDownPayment < 0)
							setPercentageValue("Invalid down payment");
						else if (parsedDownPayment > parsedPrice)
							setPercentageValue("Invalid down payment");
						else {
							const percentage = (parsedDownPayment / parsedPrice) * 100;
							setPercentageValue(percentage.toFixed(1).toString());
						}
					}
				}
			}
		);

		return () => {
			priceSubscription.unsubscribe();
		};
	});

	const handleThumbnailPictureSelect = (event: Event) => {
		const fileInput = event.target as HTMLInputElement;

		if (fileInput.files?.length === 0) {
			fileInput.remove();
			return;
		}

		const file: File | undefined = fileInput.files?.[0];
		setUploadingImage(true);

		if (file) {
			PostData.current.append("thumbnail", file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setTimeout(() => {
					setUploadingImage(false);
					setThumbnailImage(reader.result);
				}, 500);
			};

			reader.readAsDataURL(file);
		} else {
			setUploadingImage(false);
		}

		fileInput.remove();
	};

	const handlePropertyPictureSelect = (event: Event) => {
		const fileInput = event.target as HTMLInputElement;

		if (fileInput.files?.length === 0) {
			fileInput.remove();
			return;
		}

		const files = fileInput.files;
		const file = files && files.length > 0 ? files[0] : undefined;

		setUploadingImage(true);

		if (file) {
			PostData.current.append("images", file);

			const reader = new FileReader();
			reader.onloadend = () => {
				const dataUrl = reader.result;

				setPropertyImages((prevPictures) => {
					return [
						...prevPictures,
						{
							name: file.name,
							data: dataUrl,
						},
					];
				});

				setTimeout(() => {
					setUploadingImage(false);
				}, 500);
			};

			reader.readAsDataURL(file);
		} else {
			setUploadingImage(false);
		}

		fileInput.remove();
	};

	const removeUploadedPicture = (index = -1) => {
		if (index >= 0)
			setPropertyImages((prevPictures) => {
				const newPictures = [...prevPictures];
				const removedImage = newPictures.splice(index, 1)[0];

				if (removedImage) {
					const formDataEntries = PostData.current.getAll("images");

					for (let i = 0; i < formDataEntries.length; i++) {
						if ((formDataEntries[i] as File).name === removedImage.name) {
							PostData.current.delete("images");
							break;
						}
					}
				}

				return newPictures;
			});
		else {
			PostData.current.delete("thumbnail");
			setThumbnailImage(null);
		}
	};

	const updateCount = ({
		state,
		setState,
		type,
	}: {
		state: number;
		setState: any;
		type: string;
	}) => {
		if (type === "increment") {
			setState(() => state + 1);
		} else {
			if (state === 0) return;

			setState(() => state - 1);
		}
	};

	const listProperty: SubmitHandler<TInputs> = async (data) => {
		// if (!rethEstate || !address) return;

		// if (!PostData.current.get("thumbnail")) {
		// 	return dispatch(
		// 		setToast({ type: "error", message: "No thumbnail uploaded" })
		// 	);
		// }

		// if (PostData.current.getAll("images").length < 3) {
		// 	return dispatch(
		// 		setToast({
		// 			type: "error",
		// 			message: "Minimum number of three images must be provided",
		// 		})
		// 	);
		// }
		// setLoading(true);

		// for (let key in data) {
		// 	if (data.hasOwnProperty(key)) {
		// 		PostData.current.append(key, (data as any)[key]);
		// 	}
		// }

		const initialData = {
			...data,
			category,
			bedrooms,
			bathrooms,
			swimmingPool,
		};

		const { data: result, error } = await createProperty(initialData);
		if (error) return dispatch(setToast({ type: "error", message: error }));
		console.log({ result, error });
		try {
			// const metadata = {
			// 	name: PostData.current.get("introduction")?.toString(),
			// 	description: PostData.current.get("description")?.toString(),
			// 	image: PostData.current.get("thumbnail") as File,
			// 	properties: {
			// 		seller: address,
			// 		price: PostData.current.get("price")?.toString(),
			// 		downPayment: PostData.current.get("downPayment")?.toString(),
			// 		street: PostData.current.get("street")?.toString(),
			// 		city: PostData.current.get("city")?.toString(),
			// 		state: PostData.current.get("state")?.toString(),
			// 		category: PostData.current.get("category")?.toString(),
			// 		bedrooms: PostData.current.get("bedrooms")?.toString(),
			// 		bathrooms: PostData.current.get("bathrooms")?.toString(),
			// 		size: PostData.current.get("size")?.toString(),
			// 		swimmingPool: PostData.current.get("swimmingPool")
			// 			? "available"
			// 			: "not available",
			// 	},
			// };
			// const txn = await rethEstate.call("mint", ["this is a string"]);
			// console.log({ txn });
			// const receipt = txn.receipt;
			// const tokenId = txn.id;
			// const nftData = await txn.data();
			// console.log({ receipt, tokenId, nftData });
		} catch (error) {
			console.log({ error });
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			className="listProperty__component"
			onSubmit={handleSubmit(listProperty)}
		>
			<div className="property__images">
				<div className="thumbnail__image">
					{thumbnailImage ? (
						<div className="previewer">
							<Image src={thumbnailImage as string} quality={100} fill alt="" />

							<div
								className="remove__button"
								onClick={() => removeUploadedPicture()}
							>
								<CloseIcon className="icon" />
							</div>
						</div>
					) : (
						<>
							<div className="label">
								Thumbnail Image
								<IoAddCircle
									className="upload__button"
									onClick={() =>
										uploadPropertyPicture(handleThumbnailPictureSelect)
									}
								/>
							</div>
							{uploadingImage && (
								<div className="uploading">
									<Image
										className="loading__gif"
										src="/spinning-gif.gif"
										width={20}
										height={20}
										alt=""
									/>
								</div>
							)}
						</>
					)}
				</div>

				<div className="images">
					{Array.from({ length: 9 }).map((_, index) => {
						return (
							<div key={index} className="image">
								{index < propertyImages.length && propertyImages[index].data ? (
									<div className="previewer">
										<Image
											src={propertyImages[index].data as string}
											quality={100}
											fill
											alt=""
										/>

										<div
											className="remove__button"
											onClick={() => removeUploadedPicture(index)}
										>
											<CloseIcon className="icon" />
										</div>
									</div>
								) : (
									<>
										<IoAddCircle
											className="upload__button"
											onClick={() =>
												uploadPropertyPicture(handlePropertyPictureSelect)
											}
										/>

										{uploadingImage && (
											<div className="uploading">
												<Image
													className="loading__gif"
													src="/spinning-gif.gif"
													width={20}
													height={20}
													alt=""
												/>
											</div>
										)}
									</>
								)}
							</div>
						);
					})}
				</div>
			</div>

			<div className="introduction">
				<div className="label">
					Introduction
					<div className="char__count">{introdcutionLength} / 100</div>
				</div>

				<input
					type="text"
					className="input__field"
					{...register("introduction")}
					maxLength={100}
					placeholder="Hilltop Luxury Retreat"
				/>

				<div className="input__error">{errors.introduction?.message}</div>
			</div>

			<div className="description">
				<div className="label">
					Description
					<div className="char__count">{descriptionLength} / 500</div>
				</div>

				<textarea
					className="input__field"
					rows={7}
					{...register("description")}
					maxLength={500}
					placeholder="Nestled on a hill, this luxurious residence offers unrivaled elegance and breathtaking views. Meticulously designed with high-end finishes, the spacious interior seamlessly merges modern sophistication with timeless style. Floor-to-ceiling windows bathe the space in natural light, creating a captivating atmosphere. Embrace a life of opulence and tranquility in this exclusive hilltop haven."
				></textarea>

				<div className="input__error">{errors.description?.message}</div>
			</div>

			<div className="category">
				<div className="label">Category</div>

				<div className="category__list">
					<div
						className={`category__item ${category === "house" && "selected"}`}
						onClick={() => setCategory("house")}
					>
						<GiHouse className="icon" />
						House
					</div>

					<div
						className={`category__item ${
							category === "building" && "selected"
						}`}
						onClick={() => setCategory("building")}
					>
						<BsFillBuildingFill className="icon" />
						Building
					</div>

					<div
						className={`category__item ${
							category === "apartment" && "selected"
						}`}
						onClick={() => setCategory("apartment")}
					>
						<MdApartment className="icon" />
						Apartment
					</div>

					<div
						className={`category__item ${category === "villa" && "selected"}`}
						onClick={() => setCategory("villa")}
					>
						<MdVilla className="icon" />
						Villa
					</div>

					<div
						className={`category__item ${category === "duplex" && "selected"}`}
						onClick={() => setCategory("duplex")}
					>
						<BsHousesFill className="icon" />
						Duplex
					</div>

					<div
						className={`category__item ${
							category === "warehouse" && "selected"
						}`}
						onClick={() => setCategory("warehouse")}
					>
						<FaWarehouse className="icon" />
						Warehouse
					</div>
				</div>
			</div>

			<div className="price">
				<div className="input__group">
					<div className="label eth__price">
						Price <span>in ETH</span>
					</div>

					<input
						type="text"
						className="input__field"
						{...register("price")}
						placeholder="85"
					/>

					<div className="input__error">{errors.price?.message}</div>
				</div>

				<div className="input__group justify__left">
					<div className="label usd__price">
						Price <span>in USD</span>
					</div>

					<div className="approximateDollar__value">{approximateValue}</div>

					<div className="input__error"></div>
				</div>
			</div>

			{displayDownPayment && (
				<div className="price">
					<div className="input__group">
						<div className="label eth__price">
							Down Payment <span>in ETH</span>
						</div>

						<input
							type="text"
							className="input__field"
							{...register("downPayment")}
							placeholder="20"
						/>

						<div className="input__error">{errors.price?.message}</div>
					</div>

					<div className="input__group justify__left">
						<div className="label usd__price">
							Percentage Value<span>%</span>
						</div>

						<div className="approximateDollar__value">{percentageValue}</div>

						<div className="input__error"></div>
					</div>
				</div>
			)}

			<div className="features">
				<div className="label">Features</div>

				<div className="inputs__container">
					<div className="input__group">
						<IoBed className="icon" />

						<div className="input__item">
							<div
								className="input button"
								onClick={() =>
									updateCount({
										state: bedrooms,
										setState: setBedrooms,
										type: "decrement",
									})
								}
							>
								{bedrooms > 0 && <AiOutlineMinus className="icon" />}
							</div>

							<div className="input value">{bedrooms}</div>

							<div
								className="input button"
								onClick={() =>
									updateCount({
										state: bedrooms,
										setState: setBedrooms,
										type: "increment",
									})
								}
							>
								<AiOutlinePlus className="icon" />
							</div>
						</div>
					</div>

					<div className="input__group">
						<PiToiletFill className="icon" />

						<div className="input__item">
							<div
								className="input button"
								onClick={() =>
									updateCount({
										state: bathrooms,
										setState: setBathrooms,
										type: "decrement",
									})
								}
							>
								{bathrooms > 0 && <AiOutlineMinus className="icon" />}
							</div>

							<div className="input value">{bathrooms}</div>

							<div
								className="input button"
								onClick={() =>
									updateCount({
										state: bathrooms,
										setState: setBathrooms,
										type: "increment",
									})
								}
							>
								<AiOutlinePlus className="icon" />
							</div>
						</div>
					</div>

					<div className="input__group">
						<SquareFootIcon className="icon" />

						<div className="input__item">
							<input
								className="input field"
								{...register("size")}
								placeholder="Size in sqft"
							/>
						</div>
						{errors.size && (
							<div className="input__error">{errors.size?.message}</div>
						)}
					</div>

					<div className="input__group">
						<FaSwimmingPool className="icon" />

						<div className="input__item toggle">
							<div className="input toggle">
								<div
									className={`button ${swimmingPool && "selected"}`}
									onClick={() => setSwimmingPool(() => !swimmingPool)}
								>
									<FaXmark className="indicator__icon unselected" />
									<GiCheckMark className="indicator__icon selected" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="address">
				<div className="label">Address</div>

				<div className="input__group">
					<div className="input__label">Street</div>

					<input
						type="text"
						className="input__field"
						{...register("street")}
						placeholder="123 Elma St."
					/>

					<div className="input__error">{errors.street?.message}</div>
				</div>

				<div className="multiple__inputs">
					<div className="input__group">
						<div className="input__label">City</div>

						<input
							type="text"
							className="input__field"
							{...register("city")}
							placeholder="San Jose"
						/>

						<div className="input__error">{errors.city?.message}</div>
					</div>

					<div className="input__group">
						<div className="input__label">State</div>

						<input
							type="text"
							className="input__field"
							{...register("state")}
							maxLength={2}
							placeholder="CA"
						/>

						<div className="input__error">{errors.state?.message}</div>
					</div>

					<div className="input__group">
						<div className="input__label">ZIP code</div>

						<input
							type="text"
							className="input__field"
							{...register("zipCode")}
							maxLength={5}
							placeholder="97292"
						/>

						<div className="input__error">{errors.zipCode?.message}</div>
					</div>
				</div>
			</div>

			<div className="submit">
				<button type="submit" className="submit__button">
					List
					{loading && (
						<Image
							className="loading__gif"
							src="/spinning-gif.gif"
							width={17}
							height={17}
							alt=""
						/>
					)}
				</button>
			</div>
		</form>
	);
};

export default ListProperty;
