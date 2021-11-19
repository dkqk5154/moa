import { BlockStateInfoProps } from 'components/objects/Block/blockSlice';
import { CharacterState } from 'components/objects/Character/characterSlice';

export const loadingCanvasImageInfo = async ({
	blockInfos,
	scale,
}: {
	blockInfos: Array<BlockStateInfoProps>;
	scale: number;
}): Promise<object> => {
	const imageSourceInfos = Array.from(
		new Set(
			blockInfos.map((res: BlockStateInfoProps) => {
				if (res.type === 'system') {
					return '';
				}
				return res.imageInfo.sources[scale];
			}),
		),
	);
	const result = await formatLoadingImageInfos(imageSourceInfos);

	return result;
};

export const formatLoadingImage = (image: HTMLImageElement) => {
	return new Promise(resolve => {
		image.onload = () => {
			resolve(image);
		};
	});
};

export const formatLoadingImageInfos = async (
	imageSourceInfos: Array<string>,
) => {
	let result = {};
	await Promise.all(
		imageSourceInfos.map(async (res: string) => {
			let imageData = new Image();
			imageData.src = res;
			const formatImage = await formatLoadingImage(imageData);
			result = {
				...result,
				[res]: formatImage,
			};
		}),
	);
	return result;
};

export const drawCanvasCamera = ({
	canvas,
	ctx,
	point,
	callback,
}: {
	ctx: any;
	canvas: HTMLCanvasElement;
	point: CharacterState['point'];
	callback: () => any;
}) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(canvas.width / 2 - point.x, canvas.height / 2 - point.y);
	callback();
	ctx.restore();
};

export interface ScaleDrawImageProps {
	ctx: any;
	info: {
		imageInfo:
			| CharacterState['imageInfo']
			| BlockStateInfoProps['imageInfo'];
		size: CharacterState['size'] | BlockStateInfoProps['size'];
		point: CharacterState['point'] | BlockStateInfoProps['point'];
	};
	loadingImageInfo: object;
	scale: number;
	direction: string;
	animationFrame: number;
}

export const scaleDrawImage = ({
	ctx,
	info,
	loadingImageInfo,
	direction,
	scale,
	animationFrame,
}: ScaleDrawImageProps) => {
	// console.log('info : ', info);
	// console.log('loadingImageInfo : ', loadingImageInfo);
	ctx.drawImage(
		loadingImageInfo[info.imageInfo.sources[scale]],
		(info.imageInfo[direction].sx + info.size.width * animationFrame) *
			scale,
		info.imageInfo[direction].sy * scale,
		info.size.width * scale,
		info.size.height * scale,
		info.point.x * scale,
		info.point.y * scale,
		info.size.width * scale,
		info.size.height * scale,
	);
};

export const scaleBlockCanvasDraw = ({
	canvas,
	ctx,
	infos,
	scale,
	point,
	loadingImageInfo,
}: {
	canvas: HTMLCanvasElement;
	ctx: ScaleDrawImageProps['ctx'];
	infos: Array<ScaleDrawImageProps['info']>;
	scale: ScaleDrawImageProps['scale'];
	point: ScaleDrawImageProps['info']['point'];
	loadingImageInfo: ScaleDrawImageProps['loadingImageInfo'];
}) => {
	drawCanvasCamera({
		ctx,
		canvas,
		point,
		callback: () => {
			infos.forEach((res: BlockStateInfoProps | CharacterState) => {
				if (loadingImageInfo[res.imageInfo.sources[scale]])
					scaleDrawImage({
						ctx,
						scale,
						loadingImageInfo,
						info: res,
						direction: 'up',
						animationFrame: 0,
					});
			});
		},
	});
};
