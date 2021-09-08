import { useReducer } from 'react';
import 'components/molecules/Table/type.d.ts';

const formatCheckBox = ({
	cellInfos,
	headerInfos,
}: {
	cellInfos: TableProps['cellInfos'];
	headerInfos: TableProps['headerInfos'];
}) => {
	let result = {};
	headerInfos.map(({ key }: TableHeaderInfoProps) => {
		result = { ...result, [key]: { 전체: true } };
		return key;
	});
	cellInfos.map((res: TableCellInfoProps) => {
		Object.keys(res).map((inRes: string) => {
			if (
				typeof res[inRes] === 'string' ||
				typeof res[inRes] === 'number'
			) {
				result[inRes] = {
					...result[inRes],
					[res[inRes] as string]: true,
				};
			}
			return inRes;
		});
		return res;
	});
	return result;
};

const checkboxAllChange = ({
	checkboxInfo,
	isTrue,
}: {
	checkboxInfo: Object;
	isTrue: boolean;
}) => {
	Object.keys(checkboxInfo).map((res: string) => {
		checkboxInfo[res] = isTrue;
		return res;
	});

	return checkboxInfo;
};

const reducer = (state: any, { key, e, action }: OnChangeFilterInfosParams) => {
	if (action === 'add') {
		return formatCheckBox(e);
	}

	let isAll = e?.target?.name === '전체';
	let result = isAll
		? state[key]
		: { ...state[key], [e?.target?.name]: !state[key][e?.target?.name] };

	if (isAll) {
		result =
			e?.target?.checked === true
				? checkboxAllChange({ checkboxInfo: result, isTrue: true })
				: checkboxAllChange({
						checkboxInfo: result,
						isTrue: false,
				  });
	}
	return {
		...state,
		[key]: {
			...result,
		},
	};
};

export default function useTable(defaultValue: {
	cellInfos: TableProps['cellInfos'];
	headerInfos: TableProps['headerInfos'];
}) {
	const result = formatCheckBox(defaultValue);
	const [state, dispatch] = useReducer(reducer, result);
	const onChange = (value: OnChangeFilterInfosParams) => {
		dispatch({ ...value });
	};
	return [state, onChange];
}
