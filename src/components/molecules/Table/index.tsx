import React, { useMemo } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

import Header from './TableHeader';
import Cell from './TableCell';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		width: 100%;
		font-size: ${props => props.theme.fontSizes[2]}px;
		overflow-x: auto;
	`,
	HeaderWrapper: styled(GlobalStyled.Row)<{ width: string }>`
		width: ${props => props.width};
	`,
	CellWrapper: styled(GlobalStyled.HeightRow)<{ width: string }>`
		width: ${props => props.width};
	`,

	ModalWrapper: styled.div<{ isModal?: boolean }>`
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
	Modal: styled.div<{ isModal?: boolean }>`
		display: ${({ isModal }) => (isModal ? 'flex' : 'none')};
		top: 52px;
		position: absolute;
	`,
};

const DefaultStyled = {
	TableHeaderContainer: styled(GlobalStyled.Row)`
		background-color: ${props => props.theme.colors.gray5};
	`,
	TableCellContainer: styled(GlobalStyled.HeightRow)`
		color: ${props => props.theme.colors.gray1};
	`,
};

export const formatCellInfosMatchHeaderInfos = ({
	headerInfos,
	cellInfos,
}: {
	headerInfos: TableProps['headerInfos'];
	cellInfos: TableProps['cellInfos'];
}): Array<Array<TableHeaderInfoProps>> => {
	return cellInfos.map((res: TableCellInfoProps) => {
		return headerInfos.map((headerRes: TableHeaderInfoProps) => {
			let headerResult = { key: '', label: '' } as {
				key: string;
				label: any;
				width?: number;
			};
			Object.keys(res).some((keyRes: string) => {
				if (keyRes === headerRes.key) {
					headerResult.key = keyRes;
					headerResult.label = res[keyRes];
					headerResult.width = headerRes.width;
				}
				return keyRes === headerRes.key;
			});

			return headerResult;
		});
	});
};

export const formatCellFilterInfos = ({
	formatCellInfos,
	key,
}: {
	formatCellInfos: Array<Array<TableHeaderInfoProps>>;
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

const Table = ({
	TableHeaderContainer = DefaultStyled.TableHeaderContainer,
	TableHeaderRow,
	TableHeader,
	Filter,
	FilterModal,
	headerInfos = [
		{ key: 'header1', label: '헤더1' },
		{ key: 'header2', label: '헤더2' },
		{ key: 'header3', label: '헤더3' },
	],
	cellInfos = [
		{ header1: '내용1', header2: '내용2', header3: '내용3' },
		{ header2: '내용1', header1: '내용2', header3: '내용3' },
		{ header2: '내용1', header3: '내용2', header1: '내용3' },
	],
	filterInfos = {},
	onChangeFilterInfos,
	TableCellContainer = DefaultStyled.TableCellContainer,
	TableCell,
	TableCellRow,
	selectTableRowIndex,
	onClickTableRow = () => {},
	width = '100%',
	isShowHeader = true,
}: TableProps) => {
	const formatCellInfos = useMemo(
		() =>
			formatCellInfosMatchHeaderInfos({
				headerInfos,
				cellInfos,
			}),
		[headerInfos, cellInfos],
	);

	const formatCellFilterInfos = useMemo(() => {
		let result = [...formatCellInfos];
		Object.keys(filterInfos).map((filterKey: string) => {
			result = result.filter((cellArray: []) => {
				const isFilterCutInfo = !cellArray.some(
					(cellInfo: { key: string; label: string }) => {
						if (cellInfo.key === filterKey) {
							return (
								filterInfos[filterKey][cellInfo.label] === false
							);
						}
						return false;
					},
				);
				return isFilterCutInfo;
			});
			return filterKey;
		});
		return result;
	}, [filterInfos, formatCellInfos]);

	return (
		<Styled.Wrapper>
			{isShowHeader ? (
				<Styled.HeaderWrapper width={width}>
					<TableHeaderContainer>
						<Header
							Column={TableHeader}
							Row={TableHeaderRow}
							Filter={Filter}
							FilterModal={FilterModal}
							infos={headerInfos}
							filterInfos={filterInfos}
							formatCellInfos={formatCellInfos}
							onChangeFilter={onChangeFilterInfos}
						/>
					</TableHeaderContainer>
				</Styled.HeaderWrapper>
			) : (
				''
			)}

			<Styled.CellWrapper width={width}>
				<TableCellContainer>
					<Cell
						Column={TableCell}
						Row={TableCellRow}
						selectTableRowIndex={selectTableRowIndex}
						onClickTableRow={onClickTableRow}
						formatCellInfos={formatCellFilterInfos}
					/>
				</TableCellContainer>
			</Styled.CellWrapper>
		</Styled.Wrapper>
	);
};

export default Table;
