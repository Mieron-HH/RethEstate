export const navLogoAnim = {
	hidden: {
		opacity: 0,
		scale: 0,
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};

export const navLinksAnim = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};
