import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteChildrenProps } from 'react-router-dom';

import GlobalStyled from 'styles/GlobalStyled';

import Button from 'components/atoms/Button';
import Card from 'components/atoms/Card';
import Input from 'components/atoms/Input';
import Spinner from 'components/atoms/Spinner';

import { mainRouter } from 'config/routerUrl';
import useAPI from 'hooks/useAPI';
import useInput from 'hooks/useInput';

const Styled = {
	Wrapper: styled(Card)`
		max-width: 520px;
		margin: 0 auto;
		height: 100%;
		padding: 0px ${props => props.theme.space[8]}px;
		border-radius: 1rem; ;
	`,
	Form: styled.form`
		display: flex;
		flex-direction: column;
		font-size: 1rem;
		height: 100%;
	`,
	Logo: styled(GlobalStyled.Link)`
		flex-direction: column;
		font-size: 82px;
		height: 100%;
		margin: 0 auto;
		justify-content: center;
	`,
	Row: styled(GlobalStyled.Row)`
		align-items: center;
		flex-direction: column;
	`,
	InputWrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		font-size: 14px;
		padding-top: 0;
	`,
	ButtonWrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		font-size: 1rem;
	`,
	Text: styled(GlobalStyled.Row)`
		height: 23px;
	`,
	Footer: styled(GlobalStyled.Row)`
		flex-direction: column;
		padding-bottom: ${props => props.theme.space[1]}px;
	`,
	LoginFailMessage: styled(GlobalStyled.Row)`
		display: ${props => (props.isLoginFail ? 'flex' : 'none')};
		height: 3rem;
		justify-content: center;
		align-items: center;
	`,
	CustomHref: styled.a`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	`,
	ImageWrapper: styled(GlobalStyled.Col)`
		flex-direction: column;
		height: 23px;
	`,
	Label: styled(GlobalStyled.Col)`
		align-items: flex-end;
		height: 23px;
	`,
};

const LoginPage = (props: RouteChildrenProps): JSX.Element => {
	const [API] = useAPI();

	const [isLoginFail, setIsLoginFail] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [{ userId, password }, onChange] = useInput({
		userId: '',
		password: '',
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			await API.session.insert({
				userId: userId,
				password: password,
			});
			window.location.href = mainRouter.root.value;
		} catch (err) {
			setIsLoginFail(true);
			setIsLoading(false);
		}
	};

	return (
		<Styled.Wrapper>
			<Styled.Logo to={mainRouter.root.value}>{`{LOGO}`}</Styled.Logo>
			<Styled.Form>
				<Styled.InputWrapper mb={3}>
					<Input
						name="userId"
						value={userId}
						onChange={onChange}
						placeholder="아이디"
						inputTheme="default"
						fontSize="18px"
						height="48px"
						colorTheme={isLoginFail ? 'red' : 'gray'}
						required
					/>
				</Styled.InputWrapper>
				<Styled.InputWrapper>
					<Input
						name="password"
						value={password}
						onChange={onChange}
						placeholder="비밀번호"
						inputTheme="default"
						fontSize="18px"
						height="48px"
						colorTheme={isLoginFail ? 'red' : 'gray'}
						type="password"
						required
					/>
					<Styled.LoginFailMessage
						isLoginFail={isLoginFail}
						color="red"
					>
						계정을 찾을 수 없습니다.
					</Styled.LoginFailMessage>
				</Styled.InputWrapper>
				<Styled.ButtonWrapper mt={9} mb={3}>
					<Spinner isLoading={isLoading} size="35px">
						<Button
							type="submit"
							fontSize="16px"
							level={2}
							onClick={handleSubmit}
						>
							로그인
						</Button>
					</Spinner>
				</Styled.ButtonWrapper>
			</Styled.Form>
			<Styled.Footer color="gray500" fontSize={0} mb={5}>
				<GlobalStyled.Row></GlobalStyled.Row>
			</Styled.Footer>
		</Styled.Wrapper>
	);
};

export default LoginPage;
