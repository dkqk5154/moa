import React from 'react';
import {
	GoogleMapProps,
	GoogleMap,
	useJsApiLoader,
	Marker,
} from '@react-google-maps/api';

import { renderToStaticMarkup } from 'react-dom/server';

import GoogleMapMarker, {GoogleMapMarkerProps} from 'components/atoms/GoogleMapMarker';

const containerStyle = {
	width: '100%',
	height: '100%',
};

interface GoogleMapsInfoProps {
	id: number | string;
	lat: string | number;
	lng: string | number;
	fill : GoogleMapMarkerProps['fill'];
}

export interface GoogleMapsProps extends GoogleMapProps {
	center: {
		lat: string | number;
		lng: string | number;
	};
	markerInfos: Array<GoogleMapsInfoProps>;
	hoverPlantId?: number | string;
	onClickPlantMarker: ({ id }: { id: string | number }) => void;
}

const GoogleMaps = ({
	center,
	markerInfos,
	hoverPlantId,
	onClickPlantMarker,
}: GoogleMapsProps) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
	});

	const markerList = markerInfos.map(
		(res: GoogleMapsInfoProps, i: number) => {
			const { lat, lng, id, fill } = res;

			const formatIndex = i + 1;

			const svgString = encodeURIComponent(
				renderToStaticMarkup(
					<GoogleMapMarker
						fill={fill}
						isHover={id === hoverPlantId}
						number={formatIndex}
					/>,
				),
			);
			const dataUri = `data:image/svg+xml,${svgString}`;

			return (
				<Marker
					key={formatIndex}
					position={{
						lat: Number(lat),
						lng: Number(lng),
					}}
					icon={dataUri}
					onClick={e => {
						onClickPlantMarker({ id });
						window.location.href = `#${id}`;
					}}
				/>
			);
		},
	);

	return isLoaded ? (
		<GoogleMap zoom={7} mapContainerStyle={containerStyle} center={center}>
			{markerList}
		</GoogleMap>
	) : (
		<></>
	);
};

GoogleMaps.defaultProps = {
	center: {
		lat: 36.5985557,
		lng: 127.38119055,
	},
	markerInfos: [
		{
			lat: 0,
			lng: 0,
			id: 0,
			status: 'fail',
		},
	],
	onClickPlantMarker: ({ id }: { id: string | number }) => id,
};

export default GoogleMaps;
