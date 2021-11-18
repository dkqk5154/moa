import React from 'react';
import styled from 'styled-components';

import Button from 'components/ui/atoms/Button';

import {
	selectStatus,
	setStatus,
	selectScale,
	setScale,
} from './globalSidebarSlice';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import BuildMenu from 'components/ui/molecules/BuildMenu';

const Styled = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100px;
		padding: var(--space5);
		background-color: var(--gray6);
		color: var(--white);
		font-size: var(--font-size5);
	`,
	SubMenu: styled.div`
		position: absolute;
		left: 94px;
		z-index: 1000;
		display: flex;
		width: 300px;
		height: 100%;
		background-color: var(--gray6);
		border-left: 2px solid var(--gray5);
	`,
	Column: styled.div`
		width: 100%;
		display: flex;
		flex-direction: column;
	`,
	Row: styled.div`
		width: 100%;
		display: flex;
		margin-bottom: var(--space3);
	`,
};

// export interface GlobalSidebarProps {}

const GlobalSidebar = (): JSX.Element => {
	const status = useAppSelector(selectStatus);
	const scale = useAppSelector(selectScale);
	const dispatch = useAppDispatch();

	const handleClickHomeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(setStatus('home'));
	};

	const handleClickCustomButton = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		dispatch(setStatus('build'));
	};

	const handleClickScaleUpButton = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		dispatch(setScale(scale + 1));
	};

	const handleClickScaleDownButton = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		dispatch(setScale(scale - 1));
	};

	return (
		<>
			<Styled.Wrapper>
				<Styled.Row>
					<Button onClick={handleClickHomeButton}>
						<img
							alt="ic-build"
							src={require('images/ic-home.svg').default}
						/>
					</Button>
				</Styled.Row>
				<Styled.Row>
					<Button onClick={handleClickCustomButton}>
						<img
							alt="ic-build"
							src={require('images/ic-build.svg').default}
						/>
					</Button>
				</Styled.Row>
				<Styled.Row>
					<Button onClick={handleClickScaleUpButton}>+</Button>
				</Styled.Row>
				<Styled.Row>
					<Button onClick={handleClickScaleDownButton}>-</Button>
				</Styled.Row>
			</Styled.Wrapper>
			{status !== 'home' ? (
				<Styled.SubMenu>
					<BuildMenu />
				</Styled.SubMenu>
			) : (
				''
			)}
		</>
	);
};

export default GlobalSidebar;
