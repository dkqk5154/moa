import React, { useState } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import TextBrFormat from 'components/atoms/TextBrFormat';

import { ReactComponent as FilterSvg } from '../filter.svg';

import CheckBox from 'components/atoms/CheckBox';

export const formatCellFilterInfos = ({
	formatCellInfos,
	key,
}: {
	formatCellInfos: TableHeaderProps['formatCellInfos'];
	key: string;
}): [string] => {
	let result = [] as any;
	formatCellInfos.map((formatCellInfoRes: Array<TableHeaderInfoProps>) => {
		formatCellInfoRes.map((formatCellRes: TableHeaderInfoProps) => {
			if (formatCellRes.key === key) {
				result.push(formatCellRes.label);
			}
			return formatCellInfoRes;
		});
		return formatCellInfoRes;
	});

	return result.filter((res: string, i: number) => result.indexOf(res) === i);
};

const Styled = {
	Modal: styled.div<{ isModal?: boolean }>`
		display: ${({ isModal }) => (isModal ? 'flex' : 'none')};
		top: 52px;
		position: absolute;
	`,
	Overlay: styled.div<{ isModal?: boolean }>`
		display: ${({ isModal }) => (isModal ? 'flex' : 'none')};
		color: #ffffff;
		position: fixed;
		z-index: 0;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;
	`,
};

const DefaultStyled = {
	Row: styled(GlobalStyled.Row)`
		padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[4]}px`};
		color: ${props => props.theme.colors.white};
		font-weight: bold;
		flex-direction: row;
	`,
	Column: styled(GlobalStyled.Col)`
		color: ${props => props.theme.colors.white};
		font-weight: bold;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	`,

	Filter: styled(FilterSvg)`
		width: 12px;
		height: 12px;
		margin-left: ${props => props.theme.space[1]}px;
		fill: ${props => props.theme.colors.white};
		opacity: 0.7;
	`,
	FilterModal: styled(GlobalStyled.HeightRow)`
		padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[1]}px`};
		background-color: ${({ theme }) => theme.colors.white};
		border-radius: ${({ theme }) => theme.radius[1]}px;
		color: ${({ theme }) => theme.colors.gray2};
		box-shadow: 0px 2px 6px 0px hsl(0deg 0% 0% / 16%);
	`,
};

const TableHeader = ({
	Row = DefaultStyled.Row,
	Column = DefaultStyled.Column,
	Filter = DefaultStyled.Filter,
	FilterModal = DefaultStyled.FilterModal,
	infos: headerInfos = [
		{ key: 'header1', label: '헤더1' },
		{ key: 'header2', label: '헤더2' },
		{ key: 'header3', label: '헤더3' },
	],
	filterInfos = {},
	onChangeFilter,
}: TableHeaderProps) => {
	const [modalInfos, setModalInfos] = useState(
		headerInfos.map(res => {
			return { ...res, isModal: false };
		}),
	);

	const handleChangeModal = (key?: string) => {
		setModalInfos(prevState =>
			prevState.map(res => {
				if (res.key === key) {
					return {
						...res,
						isModal: true,
					};
				}
				return {
					...res,
					isModal: false,
				};
			}),
		);
	};

	const list = headerInfos.map((res: TableHeaderInfoProps) => {
		const { key, width, label, filter } = res;

		const isModal = modalInfos.some(
			(res: { key: string; isModal?: boolean }) =>
				res.key === key && res.isModal,
		);

		return (
			<Column key={key} width={width ? width : 100 / headerInfos.length}>
				<TextBrFormat value={label} />
				<Styled.Overlay
					isModal={isModal}
					onClick={() => handleChangeModal()}
				/>
				{filter?.type ? (
					<GlobalStyled.Col>
						<Filter onClick={() => handleChangeModal(key)} />

						<Styled.Modal isModal={isModal}>
							<FilterModal>
								{filterInfos[key]
									? Object.keys(filterInfos[key])?.map(
											(filterRes: string) => {
												return (
													<GlobalStyled.Row
														key={filterRes}
														mb={2}
													>
														<CheckBox
															name={filterRes}
															label={filterRes}
															checked={
																filterInfos[
																	key
																][filterRes]
															}
															onChange={e =>
																onChangeFilter({
																	key,
																	e,
																})
															}
														/>
													</GlobalStyled.Row>
												);
											},
									  )
									: ''}
							</FilterModal>
						</Styled.Modal>
					</GlobalStyled.Col>
				) : (
					''
				)}
			</Column>
		);
	});

	return <Row>{list}</Row>;
};

export default TableHeader;
