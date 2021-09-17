import scalePixels from 'pixel-scale';

export const loadCanvasFromSrc = (canvas: HTMLCanvasElement, src: string) => {
	return new Promise(resolve => {
		const image = new Image();

		image.onload = async () => {
			const context = canvas.getContext('2d');

			canvas.width = image.naturalWidth;
			canvas.height = image.naturalHeight;
			context.drawImage(image, 0, 0, canvas.width, canvas.height);

			const imageData = context.getImageData(
				0,
				0,
				canvas.width,
				canvas.height,
			);
			resolve(imageData);
		};

		image.src = src;
	});
};

export const loadCanvasFromFile = (canvas: HTMLCanvasElement, file: any) => {
	return new Promise(resolve => {
		const fileReader = new FileReader();
		fileReader.onload = event => {
			const result = event?.target?.result;
			if (typeof result === 'string') {
				resolve(loadCanvasFromSrc(canvas, result));
			}
		};
		fileReader.readAsDataURL(file);
	});
};

export const scaleCanvas = async ({
	canvas,
	imgFile,
	scale = 1,
}: {
	canvas: HTMLCanvasElement;
	imgFile: any;
	scale?: number;
}) => {
	//imgFile input img type file
	const ctx = canvas.getContext('2d');
	if (imgFile) {
		const loadedImageData = await loadCanvasFromFile(canvas, imgFile);
		const scaleImg = scalePixels(loadedImageData as any, scale, {
			from: 0,
		});
		canvas.width = canvas.width * scale;
		canvas.height = canvas.height * scale;
		ctx.putImageData(scaleImg, 0, 0);
	}
};

export const getImgDataToRgba = (imgData: Array<number>) => {
	let result = `rgba(${imgData[0]},${imgData[1]},${imgData[2]},${imgData[3]})`;
	return result;
};

export interface DrawProps {
	canvas: HTMLCanvasElement;
	imageSource: string;
	sx: number;
	sy: number;
	sWidth: number;
	sHeight: number;
	x: number;
	y: number;
	width: number;
	height: number;
	isClear?: boolean;
}

export interface MoveClearProps {
	canvas: HTMLCanvasElement;
	sWidth: number;
	sHeight: number;
	x: number;
	y: number;
}

// export const draw = ({
// 	canvas,
// 	image,
// 	sx,
// 	sy,
// 	sWidth,
// 	sHeight,
// 	x,
// 	y,
// 	width,
// 	height,
// 	isClear,
// }: DrawProps) => {
// 	const ctx = canvas.getContext('2d');
// 	if (!ctx) return;
// 	else {
// 		let srcImg = new Image();
// 		srcImg.src = image;
// 		srcImg.onload = () => {
// 			if (isClear) ctx.clearRect(0, 0, canvas.width, canvas.height);
// 			ctx.drawImage(srcImg, sx, sy, sWidth, sHeight, x, y, width, height);
// 		};
// 	}
// };

export const draw = async ({
	canvas,
	imageSource,
	sx,
	sy,
	sWidth,
	sHeight,
	x,
	y,
	width,
	height,
	isClear,
}: DrawProps) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	else {
		const imageData = new Image();
		imageData.src = imageSource;
		imageData.onload = () => {
			if (isClear) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			ctx.drawImage(
				imageData,
				sx,
				sy,
				sWidth,
				sHeight,
				x,
				y,
				width,
				height,
			);
		};
	}
};

export const cleanCanvas = ({
	canvas,
	sWidth,
	sHeight,
	x,
	y,
}: MoveClearProps) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	else {
		ctx.clearRect(x, y, sWidth, sHeight);
	}
};
