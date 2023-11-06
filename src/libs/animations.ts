export const navLogoAnim = {
	hidden: (animate: boolean) => ({
		opacity: animate ? 0 : 1,
		scale: animate ? 0 : 1,
	}),
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
	hidden: (animate: boolean) => ({
		opacity: animate ? 0 : 1,
		x: animate ? -100 : 0,
	}),
	show: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};

export const heroAnim = {
	hidden: {
		y: 100,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
};

export const heroHalfCircleAnim = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			delay: 0.2,
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};

export const searchBArAnim = {
	hidden: {
		x: -50,
		opacity: 0,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};

export const propertyCardAnim = {
	hidden: {
		y: -50,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 0.1,
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};

export const mapAnim = {
	hidden: {
		x: 100,
		opacity: 0,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: "easeInOut",
		},
	},
};

export const authFormAnim = {
	hidden: {
		y: 100,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};

export const toastAnim = {
	hidden: {
		x: 100,
		opacity: 0,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.75,
			ease: "easeInOut",
		},
	},
};

export const drawerAnim = {
	hidden: {
		x: 200,
		opacity: 0.5,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeInOut",
		},
	},
};
