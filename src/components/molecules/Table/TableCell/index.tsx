import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

const DefaultStyled = {
	Row: styled(GlobalStyled.Row)`
		width: 100%;
		padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[4]}px`};
		border-bottom: 1px solid ${props => props.theme.colors.gray};
		color: ${({ theme }) => theme.colors.gray3};
		background-color: ${({ isSelect, theme }) =>
			isSelect ? theme.colors.red : ''};
	`,
	Column: styled(GlobalStyled.Col)`
		align-items: center;
		justify-content: center;
	`,
};

const TableCell = ({
	Row: TableRow = DefaultStyled.Row,
	Column: TableCell = DefaultStyled.Column,
	formatCellInfos = [[]],
	selectTableRowIndex,
	onClickTableRow = () => {},
}: TableCellProps) => {
	const list = formatCellInfos.map(
		(res: Array<TableHeaderInfoProps>, i: number) => {
			const handleClickTableRow = () => {
				onClickTableRow({ cellInfos: res, index: i });
			};
			const cellInfoComponents = res.map(
				(inRes: TableHeaderInfoProps) => {
					return (
						<TableCell
							key={inRes.key}
							width={
								inRes?.width ? inRes.width : 100 / res.length
							}
						>
							{inRes.label}
						</TableCell>
					);
				},
			);
			return (
				<TableRow
					isSelect={selectTableRowIndex === i}
					onClick={handleClickTableRow}
					key={i}
				>
					{cellInfoComponents}
				</TableRow>
			);
		},
	);

	return <>{list}</>;
};
TableCell.defaultProps = {
	info: '',
};

export default TableCell;
