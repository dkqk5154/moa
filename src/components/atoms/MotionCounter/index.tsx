import { Motion, spring } from 'react-motion';

interface MotionCounterInterface {
	min: number;
	max: number;
	delay: number;
	children: any;
}

const numberWithCommas = (value: string | number) => {
		const stringVal = value + '';
		const stringComma = stringVal.split('.');
		let valCharArrReverse = stringVal.split('').reverse();
		let result = '';
		let commaValue = '';
	
		if (stringComma.length > 1) {
			valCharArrReverse = stringComma[0].split('').reverse();
			commaValue = '.' + stringComma[1];
		}
	
		valCharArrReverse.map((res, i) => {
			i += 1;
			if (i % 3 === 0 && valCharArrReverse.length !== i) {
				result += res + ',';
				return res;
			}
			result += res;
			return res;
		});
		result = result.split('').reverse().join('');
		if (commaValue !== '') result = result + commaValue;
		result = result.split(',')[0] === '-' ? '-' + result.split(',')[1] : result;
	
		return result;
	
}

const MotionCounter = (props: MotionCounterInterface) => {
	const { min, max, delay, children } = props;

	return (
		<>
			<Motion
				defaultStyle={{ x: min }}
				style={{ x: spring(max, { stiffness: delay, damping: 18.5 }) }}
			>
				{val => {
					const isValueFloor = +max.toFixed(1).split('.')[1] !== 0;
					let result = val.x;
					if (isValueFloor) {
						if (isNaN(max)) {
							result = 0;
						} else {
							let decimalCounter = (max + '').split('.')[1]
								.length;
							result = +val.x.toFixed(+decimalCounter);
						}
					} else {
						//0.1 0.01
						if (result >= max - 1) {
							result = max;
						} else {
							// 1, 10
							result = Math.floor(val.x);
						}
					}
					return (
						<span>
							{numberWithCommas(result)}
							{children}
						</span>
					);
				}}
			</Motion>
		</>
	);
};
MotionCounter.defaultProps = {
	min: 0,
	max: 0,
	delay: 120,
	children: '',
};
export default MotionCounter;
