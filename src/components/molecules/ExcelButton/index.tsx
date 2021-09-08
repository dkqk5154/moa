import React from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

import Button from 'components/atoms/Button';
import 'components/molecules/Table/type';
import { formatCellInfosMatchHeaderInfos } from 'components/molecules/Table';

import Svg from 'images/Svg';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
	ImgWrapper: styled(GlobalStyled.Col)`
		margin-right: 0.5rem;
	`,
};

export interface ExcelButtonProps {
	excelInfo: {
		fileName: string;
		sheetName?: string;
		headerInfos: Array<TableHeaderInfoProps>;
		cellInfos: Array<TableCellInfoProps>;
	};
	children: React.ReactNode;
}

const ExcelButton = (props: ExcelButtonProps) => {
	const { excelInfo, children } = props;

	const { fileName, sheetName, headerInfos, cellInfos } = excelInfo;

	const excelHandler = {
		getExcelFileName: function () {
			return fileName + '.xlsx';
		},
		getSheetName: function () {
			return sheetName ? sheetName : 'sheet';
		},
		getExcelData: function () {
			let result = [
				headerInfos.map((res: TableHeaderInfoProps) => res.label),
			];

			let formatInfo = formatCellInfosMatchHeaderInfos({
				headerInfos,
				cellInfos,
			});

			let result2 = formatInfo.map((res: Array<TableCellInfoProps>) => {
				return res.map((res: TableCellInfoProps) => String(res.label));
			});

			result = result.concat(result2);

			return result;
		},
		getWorksheet: function () {
			return XLSX.utils.aoa_to_sheet(this.getExcelData());
		},
	};

	function s2ab(s: any) {
		const buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
		let view = new Uint8Array(buf); //create uint8array as viewer
		for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
		return buf;
	}

	const handleClickExcelButton = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		// step 1. workbook 생성
		let wb = XLSX.utils.book_new();

		// step 2. 시트 만들기
		let newWorksheet = excelHandler.getWorksheet();

		// step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
		XLSX.utils.book_append_sheet(
			wb,
			newWorksheet,
			excelHandler.getSheetName(),
		);

		// step 4. 엑셀 파일 만들기
		let newWb = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

		// step 5. 엑셀 파일 내보내기
		saveAs(
			new Blob([s2ab(newWb)], { type: 'application/octet-stream' }),
			excelHandler.getExcelFileName(),
		);
	};

	console.log('excelInfo : ', excelInfo);

	return (
		<Button {...props} colorTheme="green" onClick={handleClickExcelButton}>
			<Styled.Wrapper>
				<Styled.ImgWrapper>
					<Svg
						name="excel"
						size="1.5rem"
						stroke="white"
						fill="white"
					/>
				</Styled.ImgWrapper>
				<GlobalStyled.Col>{children}</GlobalStyled.Col>
			</Styled.Wrapper>
		</Button>
	);
};

ExcelButton.defaultProps = {
	excelInfo: {
		fileName: 'test_file_1',
		sheetName: 'test_sheet_1',
		headerInfos: [
			{ key: 'header1', label: '헤더1' },
			{ key: 'header2', label: '헤더2' },
			{ key: 'header3', label: '헤더3' },
		],
		cellInfos: [
			{ header1: '내용1', header2: '내용2', header3: '내용3' },
			{ header2: '내용1', header1: '내용2', header3: '내용3' },
			{ header2: '내용1', header3: '내용2', header1: '내용3' },
		],
	},
};

export default ExcelButton;
