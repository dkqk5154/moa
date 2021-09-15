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

export const drawImage = ({ ref, imgSrc }: { ref: any; imgSrc: string }) => {
	let frameWidth = 50;
	let frameHeight = 64;
	let row = 1;
	let column = 16;

	const canvas = ref.current;
	const ctx = canvas.getContext('2d');
	const imageFile = new Image();
	imageFile.src = imgSrc;
	// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);.
	ctx.drawImage(
		imageFile,
		0,
		0,
		// column * frameWidth,
		// row * frameHeight,
		// frameWidth,
		// frameHeight,
		// 10,
		// 30,
		// frameWidth,
		// frameHeight,
	);
};
