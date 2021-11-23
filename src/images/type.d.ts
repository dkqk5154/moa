declare interface ImageSourceProps {
	name: string;
	sources: Array<string>;
	width: number;
	height: number;
	locationName: {
		kr: string;
		en: string;
	};
	up: {
		sx: number;
		sy: number;
	};
	right: {
		sx: number;
		sy: number;
	};
	left: {
		sx: number;
		sy: number;
	};
	down: {
		sx: number;
		sy: number;
	};
}
