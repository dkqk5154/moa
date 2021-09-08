declare type TableHeaderInfoProps = {
	key: string;
	label: any;
	width?: number;
	filter?: { type: string | 'checkbox' | 'search'; options: {} };
};
declare type TableFilterInfosProps = {
	key: string;
	isModal: boolean;
	filterInfos: string[];
}[];
declare type TableCellInfoProps = {
	[key: string]: string | number | React.ReactNode;
};
declare type TableComponentProps = StyledProps<any> | JSX.Element;
declare type FormatCellProps = Array<TableHeaderInfoProps[]>;
declare type OnChangeFilterInfosParams = {
	key: string;
	e: any;
	action?: string;
};

declare interface TableProps {
	TableHeaderContainer?: TableComponentProps;
	TableHeaderRow?: TableComponentProps;
	TableHeader?: TableComponentProps;
	Filter?: TableComponentProps;
	FilterModal?: TableComponentProps;
	headerInfos?: TableHeaderInfoProps[];
	cellInfos?: TableCellInfoProps[];
	filterInfos?: { [key: string]: { [key: string]: boolean }[] };
	onChangeFilterInfos?: (val: OnChangeFilterInfosParams) => void;
	TableCellContainer?: TableComponentProps;
	TableCellRow?: TableComponentProps;
	TableCell?: TableComponentProps;
	onClickTableRow?: ({
		cellInfos,
		index,
	}: {
		cellInfos: Array<TableCellInfoProps>;
		index: number;
	}) => void;
	selectTableRowIndex?: number;
	width?: string;
	isShowHeader?: boolean;
}

declare interface TableHeaderProps {
	Column?: TableProps['TableHeader'];
	Row?: TableProps['TableHeaderRow'];
	Filter?: TableProps['Filter'];
	FilterModal?: TableProps['FilterModal'];
	infos?: TableProps['headerInfos'];
	filterInfos?: { [key: string]: { [key: string]: boolean }[] };
	formatCellInfos?: FormatCellProps;
	onChangeFilter?: TableProps['onChangeFilterInfos'];
}

declare interface TableCellProps {
	Column?: TableProps['TableCell'];
	Row?: TableProps['TableCellRow'];
	onClickTableRow?: ({
		cellInfos,
		index,
	}: {
		cellInfos: Array<TableCellInfoProps>;
		index: number;
	}) => void;

	selectTableRowIndex?: TableProps['selectTableRowIndex'];
	formatCellInfos?: FormatCellProps;
	headerInfos?: TableProps['headerInfos'];
}
