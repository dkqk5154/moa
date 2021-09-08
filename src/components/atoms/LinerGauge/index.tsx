import React from 'react';
import styled, { css } from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		border-radius: 1rem;
	`,
	LeftGauge: styled(GlobalStyled.Col)`
		height: 100%;
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
	`,
	RightGauge: styled(GlobalStyled.Col)`
		height: 100%;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
	`,
	Gauge: styled(GlobalStyled.Col)<{ isTotalMax?: boolean }>`
		height: 100%;

		:last-child {
			${props =>
				props.isTotalMax
					? ''
					: css`
							border-top-right-radius: 1rem;
							border-bottom-right-radius: 1rem;
					  `}
		}
	`,
};

export interface LinerGaugeInfoProps {
	value: number;
	bg: string;
}

export interface LinerGaugeProps {
	height: string;
	infos: Array<LinerGaugeInfoProps>;
	max: number;
}

const LinerGauge = (props: LinerGaugeProps) => {
	const { infos, height, max } = props;

	const isTotalMax =
		(infos.reduce((a: any, b: any) => a.value + b.value) as unknown) >= max;

	const isTotalMin =
		(infos.reduce((a: any, b: any) => a.value + b.value) as unknown) <= 0;

	const list = infos.map((res: LinerGaugeInfoProps, i: number) => {
		return (
			<Styled.Gauge
				isTotalMax={isTotalMax}
				key={i}
				bg={res.bg}
				width={(res.value / max) * 100}
			/>
		);
	});

	return (
		<Styled.Wrapper bg="gray200" height={height}>
			<GlobalStyled.Col width={5}>
				<Styled.LeftGauge
					bg={isTotalMin ? 'gray200' : infos[0].bg}
					width={100}
				/>
			</GlobalStyled.Col>
			<GlobalStyled.Col width={90}>{list}</GlobalStyled.Col>
			<GlobalStyled.Col width={5}>
				<Styled.RightGauge
					bg={isTotalMax ? infos[infos.length - 1].bg : 'gray200'}
					width={100}
				/>
			</GlobalStyled.Col>
		</Styled.Wrapper>
	);
};
LinerGauge.defaultProps = {
	infos: [{ value: 100, bg: 'blue300' }],
	height: '1rem',
	max: 100,
};

export default LinerGauge;
