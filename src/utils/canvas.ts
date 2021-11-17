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
	scale,
}: {
	canvas: HTMLCanvasElement;
	imgFile: any;
	scale: number;
}) => {
	//imgFile input img type file
	const ctx = canvas.getContext('2d');
	ctx.drawImage(imgFile, 0, 0);
	const scaleUpImage = ctx.getImageData(0, 0, imgFile.width, imgFile.height);
	const scaleImg = scalePixels(scaleUpImage, scale, {
		from: 0,
	});
	return scaleImg;
	// canvas.width = canvas.width * scale;
	// canvas.height = canvas.height * scale;
	// ctx.putImageData(scaleImg, 0, 0);
};

export const getImgDataToRgba = (imgData: Array<number>) => {
	let result = `rgba(${imgData[0]},${imgData[1]},${imgData[2]},${imgData[3]})`;
	return result;
};
