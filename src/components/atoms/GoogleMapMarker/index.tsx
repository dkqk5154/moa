import React from 'react';
import theme from 'styles/theme';

export interface GoogleMapMarkerProps {
	number: number;
	isHover: boolean;
	width: number;
	height: number;
	fill : string;
}

const GoogleMapMarker = ({
	number,
	isHover,
	fill,
	width,
	height,
}: GoogleMapMarkerProps) => {

	return (
		<svg
			id="레이어_2"
			data-name="레이어 2"
			xmlns="http://www.w3.org/2000/svg"
			width={isHover ? width * 2 : width}
			height={isHover ? height * 2 : height}
			viewBox="0 0 27.72 39.45"
		>
			<g id="레이어_1" data-name="레이어 1">
				<path
					id="패스_992"
					data-name="패스 992"
					d="M13.86,0A13.87,13.87,0,0,0,0,13.86C0,27.33,13.86,39.45,13.86,39.45S27.72,27.33,27.72,13.86A13.87,13.87,0,0,0,13.86,0Z"
					fill={fill}
				/>
				<path
					id="패스_993"
					data-name="패스 993"
					d="M10.41,0A10.41,10.41,0,1,1,0,10.41,10.41,10.41,0,0,1,10.41,0Z"
					transform="translate(3.45 3.7)"
					fill={theme.colors.white}
				/>
				<text
					id="_1"
					data-name="1"
					transform={`translate(${
						String(number).length === 1 ? 10 : 5
					} 20)`}
					fill={fill}
					fontSize="1rem"
					fontFamily="AppleSDGothicNeo-Regular, Apple SD Gothic Neo"
				>
					<tspan x="0" y="0">
						{number}
					</tspan>
				</text>
			</g>
		</svg>
	);
};

GoogleMapMarker.defaultProps = {
	number: 1,
	width: 27.72,
	height: 39.45,
	isHover: false,
	// status?: statusProps;
};

export default GoogleMapMarker;
