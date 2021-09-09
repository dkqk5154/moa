import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import Svg from 'images/Svg';
import formatWeather from 'config/weather';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)``,
	WeatherName: styled(GlobalStyled.Row)<{ isShow?: boolean }>`
		color: ${props => props.theme.gray};
		display: ${props => (props.isShow ? 'flex' : 'none')};
	`,
	Temperature: styled(GlobalStyled.Row)<{ isShow?: boolean }>`
		display: ${props => (props.isShow ? 'flex' : 'none')};
	`,
};

export interface WeatherProps {
	info?: {
		PTY: string;
		SKY: string;
		T1H: string;
	};
	stroke: string;
	size: string | number;
	isShowTemperature?: boolean;
	isShowName?: boolean;
	margin: number;
	positionTheme?: 'default' | 'row';
}

const Weather = (props: WeatherProps) => {
	const {
		info,
		stroke,
		size,
		margin,
		isShowTemperature,
		isShowName,
		positionTheme,
	} = props;

	const { name, imgSrc, temperature } = formatWeather(info);

	return positionTheme === 'row' ? (
		<GlobalStyled.Row>
			<GlobalStyled.Col mr={1}>
				<Svg name={imgSrc} size={size} stroke={stroke} />
			</GlobalStyled.Col>
			<GlobalStyled.Col flexDirection="row">
				<Styled.WeatherName isShow={isShowName}>
					{name}
				</Styled.WeatherName>
				<Styled.Temperature isShow={isShowTemperature} mb={margin}>
					<b>{temperature}</b>℃
				</Styled.Temperature>
			</GlobalStyled.Col>
		</GlobalStyled.Row>
	) : (
		<Styled.Wrapper>
			<Styled.Temperature isShow={isShowTemperature} mb={margin}>
				{temperature}℃
			</Styled.Temperature>
			<GlobalStyled.Row mb={isShowName ? margin : 0}>
				<Svg name={imgSrc} size={size} stroke={stroke} />
			</GlobalStyled.Row>
			<Styled.WeatherName isShow={isShowName}>{name}</Styled.WeatherName>
		</Styled.Wrapper>
	);
};
Weather.defaultProps = {
	info: '',
	stroke: 'company',
	size: '4.5rem',
	isShowName: true,
	margin: 1,
};

export default Weather;
