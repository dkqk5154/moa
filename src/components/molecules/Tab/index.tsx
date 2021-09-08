import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import Button from 'components/atoms/Button';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		border-radius: 1rem;
	`,
};

export type TabInfoProps = {
	id: string | number;
	value: string | number;
};

export interface TabProps {
	infos: Array<TabInfoProps>;
	tabSelectId: TabInfoProps['id'];
	colorTheme: 'blue';
	onClickTab: (selectValue: TabInfoProps['id']) => void;
}

const tabColorTheme = {
	blue: {
		backgroundColor: 'blue500',
		buttonColor: 'blue',
	},
};

const Tab = (props: TabProps) => {
	const { infos, colorTheme, onClickTab, tabSelectId } = props;

	const handleClickButton = (e: React.FormEvent, id: TabInfoProps['id']) => {
		e.preventDefault();
		onClickTab(id);
	};

	const list = infos.map((res: TabInfoProps) => {
		const { id, value } = res;
		return (
			<GlobalStyled.Col key={id} width={100 / infos.length}>
				<Button
					bg={id === tabSelectId ? 'blue700' : ''}
					width="80%"
					fontSize={4}
					p={2}
					onClick={e => handleClickButton(e, id)}
				>
					{value}
				</Button>
			</GlobalStyled.Col>
		);
	});

	return (
		<Styled.Wrapper bg={tabColorTheme[colorTheme].backgroundColor} p={2}>
			{list}
		</Styled.Wrapper>
	);
};
Tab.defaultProps = {
	infos: [],
	tabSelectId: '',
	colorTheme: 'blue',
};

export default Tab;
