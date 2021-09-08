import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import theme from 'styles/theme';

import Input, { InputProps } from 'components/atoms/Input';
import Spinner from 'components/atoms/Spinner';
import Button from 'components/atoms/Button';
import Svg, { SvgProps } from 'images/Svg';

const Styled = {
	Body: styled(GlobalStyled.Row)`
		flex-direction: column;
	`,
	InputRow: styled(GlobalStyled.Row)`
		text-align: center;
		margin-bottom: ${props => props.theme.space[1]}px;
	`,
	InputLabel: styled.p`
		vertical-align: middle;
		margin: 0;
		text-align: right;
		font-weight: bold;
		font-size: 0.875rem;
	`,
	RegularRow: styled(GlobalStyled.Row)<{ isHide: boolean }>`
		display: ${props => (props.isHide ? 'none' : 'flex')};
		padding: 0 0.5rem;
	`,

	RegularMessage: styled.span`
		text-align: left;
		font-size: ${props => props.theme.fontSizes[1]};
		color: ${props => props.color};
	`,
	ButtonCol: styled(GlobalStyled.Col)`
		align-items: flex-end;
	`,
	ConfirmButton: styled.button<{ isActive?: boolean }>`
		display: flex;
		align-items: center;
		justify-content: center;
		outline: none;
		color: ${props => props.theme.colors.white};
		border: 0px;
		border-radius: 0.25rem;
		padding: 0;
		cursor: pointer;
		padding: 1rem;
		font-weight: bold;
		background-color: ${props => props.theme.colors.primary3};
		width: 100%;
		background-color: ${props =>
			props.isActive
				? props.theme.colors.primary3
				: props.theme.colors.gray500};
		font-size: 0.875rem;
		width: 90%;
		height: 3rem;
	`,
	RelativeWrapper: styled(GlobalStyled.Col)`
		position: relative;
	`,
	ImageWrapper: styled(GlobalStyled.Col)`
		position: absolute;
		left: ${props => props.left};
	`,
};

interface RegularInputInterface extends InputProps {
	confirmValue?: InputProps['value'];
	confirmButtonText?: string;
	isConfirmButton?: boolean;
	onChangeRegularExpression?: any;
	onClickConfirmButton?: any;
	overlapUserIdInfos?: Array<string>;
	regularExpression: {
		expressionName?: string;
		successMessage: string;
		failMessage: string;
		minLength: number;
		expressionType?: string;
		maxLength: number;
		expression: RegExp;
		isRequired?: boolean;
		requiredValue?: any;
	};
	inputTheme: InputProps['inputTheme'];
	isConfirmButtonLoading?: boolean;
	label?: string;
	imageInfo?: SvgProps;

	// type: string;
	// name: string;
	// onChange: any;
	// placeholder: string;

	// value: any;
	// required: boolean;
}

const RegularInput = (props: RegularInputInterface) => {
	const {
		type,
		name,
		height,
		onChange,
		placeholder,
		confirmValue,
		confirmButtonText,
		isConfirmButton,
		onChangeRegularExpression,
		onClickConfirmButton,
		value,
		overlapUserIdInfos,
		label,
		disabled,
		regularExpression,
		inputTheme,
		required,
		isConfirmButtonLoading,
		readOnly,
		imageInfo,
	} = props;

	const {
		successMessage,
		failMessage,
		minLength,
		expressionType,
		maxLength,
		expression,
		isRequired,
		requiredValue,
	} = regularExpression;

	const requiredValueFormat =
		requiredValue === undefined ? [expression] : requiredValue;

	const [regularMessage, setRegularMessage] = useState('');
	const [isHide, setIsHide] = useState(true);
	const [regularMessageColor, setRegularMessageColor] = useState('');
	const [colorTheme, setColorTheme] = useState('gray');
	const [image, setImage] = useState(imageInfo);

	useEffect(() => {
		setImage({
			name: image.name,
			size: '18px',
			fill: colorTheme,
		});
	}, [colorTheme, image.name]);

	const successColor = theme.colors.success1;
	const failColor = theme.colors.danger1;

	const checkOverlapUserId = (
		infos: RegularInputInterface['overlapUserIdInfos'],
		checkValue: RegularInputInterface['value'],
	) => {
		let isOverlapUserId = false;
		infos?.map((res: string) => {
			if (checkValue === res) {
				isOverlapUserId = true;
			}
			return res;
		});
		return isOverlapUserId;
	};

	useEffect(() => {
		if (name === 'userId') {
			const isOverlapUserId = checkOverlapUserId(
				overlapUserIdInfos,
				value,
			);
			if (isOverlapUserId) {
				setRegularMessage('중복된 아이디 입니다.');
				setRegularMessageColor(failColor);
			}
		}
	}, [name, failColor, value, overlapUserIdInfos]);

	const valueRegularExpression = () => {
		if (typeof value === 'string') {
			let result = {
				message: '',
				messageColor: '#ffffff',
				isConfirm: false,
				inputColorTheme: 'gray',
				/* 	imageName: '', */
			};

			if (value === '') {
				//값이 비었을때
				if (isRequired) {
					result = {
						message: '필수 항목입니다!',
						messageColor: failColor,
						isConfirm: false,
						inputColorTheme: 'red',
					};
				} else {
					result = {
						message: '',
						messageColor: successColor,
						isConfirm: true,
						inputColorTheme: 'green',
					};
				}
			} else {
				if (expressionType === 'confirm') {
					//값이 재확인 값일때
					if (confirmValue === value) {
						result = {
							message: successMessage,
							messageColor: successColor,
							isConfirm: true,
							inputColorTheme: 'green',
						};
					} else {
						result = {
							message: failMessage,
							messageColor: failColor,
							isConfirm: false,
							inputColorTheme: 'red',
						};
					}
				} else if (value.length < minLength) {
					result = {
						message: failMessage,
						messageColor: failColor,
						isConfirm: false,
						inputColorTheme: 'red',
					};
				} else if (expression.exec(value)) {
					let isRequiredCheckArray = true;

					const requiredCheckArray = requiredValueFormat.map(
						(res: any) => {
							let isRequiredValue = false;
							value.split('').map((valueRes: any) => {
								if (res.exec(valueRes)) {
									isRequiredValue = true;
								}
								return valueRes;
							});
							return isRequiredValue;
						},
					);

					requiredCheckArray.map((res: any) => {
						if (!res) {
							isRequiredCheckArray = false;
						}
						return res;
					});

					if (isRequiredCheckArray) {
						if (name === 'userId') {
							const isOverlapUserId = checkOverlapUserId(
								overlapUserIdInfos,
								value,
							);
							if (isOverlapUserId) {
								result = {
									message: '중복된 아이디 입니다.',
									messageColor: failColor,
									isConfirm: false,
									inputColorTheme: 'red',
								};
							} else {
								result = {
									message: successMessage,
									messageColor: successColor,
									isConfirm: true,
									inputColorTheme: 'green',
								};
							}
						} else {
							result = {
								message: successMessage,
								messageColor: successColor,
								isConfirm: true,
								inputColorTheme: 'green',
							};
						}
					} else {
						result = {
							message: failMessage,
							messageColor: failColor,
							isConfirm: false,
							inputColorTheme: 'red',
						};
					}
				} else {
					result = {
						message: failMessage,
						messageColor: failColor,
						isConfirm: false,
						inputColorTheme: 'red',
					};
				}
			}
			return result;
		}
	};

	const handleOnBlur = () => {
		const result: any = valueRegularExpression();

		setRegularMessage(result.message || '');
		setRegularMessageColor(result.messageColor || '');
		setColorTheme(result.inputColorTheme || 'gray');
		onChangeRegularExpression(name, result.isConfirm);
		if (result.message === '') {
			setIsHide(true);
		} else {
			setIsHide(false);
		}
	};

	const handleOnChangeInput = (e: any) => {
		setRegularMessage('');
		if (onChange) {
			onChange(e);
		}
	};

	// const hidePassword = () => {
	//     if (type === 'password') {
	//         let result = ''
	//         for (let i = 0; i < value.length; i++) {
	//             result += '*'
	//         }
	//         return result
	//     } else {
	//         return value
	//     }
	// }

	return (
		<Styled.Body>
			<Styled.InputRow>
				<Styled.RelativeWrapper width={isConfirmButton ? 60 : 100}>
					<Input
						label={label}
						type={type}
						autoComplete={name}
						placeholder={placeholder}
						name={name}
						value={value}
						maxLength={maxLength}
						onChange={handleOnChangeInput}
						onBlur={handleOnBlur}
						required={required}
						readOnly={readOnly}
						inputTheme={inputTheme}
						colorTheme={colorTheme}
						imageInfo={image}
						disabled={disabled}
						height={height}
					/>
					{inputTheme === 'line' ? (
						<Styled.ImageWrapper left="95%">
							<Svg
								name={
									colorTheme === 'red'
										? 'cancel'
										: 'checkBoxMarker'
								}
								fill={
									colorTheme === 'red' ? colorTheme : 'white'
								}
								stroke={colorTheme === 'red' ? '' : colorTheme}
								size="18px"
								strokeWidth="2px"
							/>
						</Styled.ImageWrapper>
					) : (
						''
					)}
				</Styled.RelativeWrapper>
				{isConfirmButton ? (
					<Styled.ButtonCol width={40}>
						<Button
							onClick={(e: any) => {
								e.preventDefault();
								onClickConfirmButton();
							}}
							disabled={
								isConfirmButtonLoading
									? false
									: valueRegularExpression()?.isConfirm!
							}
						>
							<Spinner
								isLoading={isConfirmButtonLoading}
								size={'1.25rem'}
							>
								{confirmButtonText}
							</Spinner>
						</Button>
					</Styled.ButtonCol>
				) : (
					''
				)}
			</Styled.InputRow>

			<Styled.RegularRow isHide={isHide}>
				<GlobalStyled.Col width={100}>
					{inputTheme === 'default' ? (
						<>
							{regularMessage ? (
								<GlobalStyled.Col pr={1} height="100%">
									<Svg
										name={
											colorTheme === 'red'
												? 'cancel'
												: 'checkBoxMarker'
										}
										fill={
											colorTheme === 'red'
												? colorTheme
												: 'white'
										}
										stroke={
											colorTheme === 'red'
												? ''
												: colorTheme
										}
										size="8px"
										strokeWidth="2px"
									/>
								</GlobalStyled.Col>
							) : (
								''
							)}
							<Styled.RegularMessage color={regularMessageColor}>
								{regularMessage}
							</Styled.RegularMessage>
						</>
					) : (
						''
					)}
				</GlobalStyled.Col>
			</Styled.RegularRow>
		</Styled.Body>
	);
};

RegularInput.defaultProps = {
	type: 'text',
	name: '',
	value: '',
	isPassword: true,
	required: true,
	onChange: () => {},
	placeholder: '',
	confirmValue: '-',
	label: '',
	regularExpression: {
		expressionName: 'userId',
		expression: /^[0-9a-zA-Z]+$/,
		isRequired: true,
		maxLength: 8,
		minLength: 6,
		failMessage: '6~8자 이내의 영문 소문자, 숫자를 사용하세요',
		successMessage: '사용가능한 아이디입니다.',
	},
	inputTheme: 'default',
	confirmButtonText: '인증번호 전송',
	onChangeRegularExpression: () => {},
	onClickConfirmButton: () => {},
	isActive: true,
	isConfirmButtonLoading: false,
	overlapUserIdInfos: [],
	imageInfo: {
		name: '',
	},
};

export default RegularInput;
