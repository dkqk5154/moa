import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		font-weight: bold;
		border-radius: 1rem;
	`,
};

export type RechartTooltipInfoProps = {
	dataKey: string;
	payload: { name: string | number; [key: string]: any };
};

export interface RechartTooltipProps {
	infos: Array<RechartTooltipInfoProps>;
	bg: string;
	children?: React.ReactNode;
}

const RechartTooltip = (props: RechartTooltipProps) => {
	const { infos, bg, children } = props;
	const list = infos.map((res: RechartTooltipInfoProps) => {
		const { dataKey, payload } = res;

		return (
			<GlobalStyled.Row key={dataKey}>
				{`${dataKey} ${payload[dataKey]}`}
			</GlobalStyled.Row>
		);
	});
	return (
		<Styled.Wrapper bg={bg} color="white" p={3} fontSize={3}>
			{children}
			{list}
		</Styled.Wrapper>
	);
};
RechartTooltip.defaultProps = {
	infos: [],
	bg: 'blue500',
};

export default RechartTooltip;
