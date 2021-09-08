import React from 'react';

interface TextBrFormatInterface {
	value: string;
}

const TextBrFormat = (props: TextBrFormatInterface) => {
	const { value } = props;
	return (
		<>
			{value.split('\n').map((res: string, i: number) => {
				return <div key={i}>{res}</div>;
			})}
		</>
	);
};
TextBrFormat.defaultProps = {
	value: '',
};

export default TextBrFormat;
