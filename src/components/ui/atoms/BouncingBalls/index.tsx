import React from 'react';
import styled, { keyframes } from 'styled-components';

const Keyframes = {
	bouncingBalls: keyframes`
    0% {
        transform: translateY(-5px);
    }
    50% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(-5px);
    }
  `,
};

interface StyledBouncingBallsProps {
	size: string;
	animationDelay: number;
	animationDuration: number;
	colorTheme: { backgroundColor: string; borderColor: string };
}

const Styled = {
	Body: styled.div<{ height: string; width: string }>`
		display: flex;
		width: ${props => props.width};
		height: ${props => props.height};
		margin: auto;
	`,
	BouncingBall: styled.div<StyledBouncingBallsProps>`
		width: ${props => props.size};
		height: ${props => props.size};
		border-radius: 3rem;
		margin-left: 0.25rem;
		background-color: ${props =>
			props.theme.colors[props.colorTheme.backgroundColor]};
		border: 1px solid
			${props => props.theme.colors[props.colorTheme.borderColor]};
		animation-delay: ${props => props.animationDelay}s;
		animation-duration: ${props => props.animationDuration}s;
		animation-name: ${Keyframes.bouncingBalls};
		animation-iteration-count: infinite;
	`,
};

interface BouncingBallsProps {
	size: string;
	width: string;
	height: string;
	isLoading: boolean;
	children: any;
	animationDuration: number;
	colorTheme: 'default';
}

const BouncingBallsTheme = {
	default: {
		backgroundColor: 'gray300',
		borderColor: 'gray300',
	},
};

const BouncingBalls = (props: BouncingBallsProps) => {
	const {
		size,
		width,
		height,
		isLoading,
		children,
		animationDuration,
		colorTheme,
	} = props;

	const defaultDelay = 0.6;
	const delay = 0.1;

	const bouncingBallsArray = Array.apply(null, Array(3)).map(
		(res: any, i: number) => i,
	);

	const list = bouncingBallsArray.map((res: any, i: number) => {
		return (
			<Styled.BouncingBall
				key={i}
				size={size}
				animationDuration={animationDuration}
				animationDelay={defaultDelay + delay * i}
				colorTheme={BouncingBallsTheme[colorTheme]}
			/>
		);
	});

	return isLoading ? (
		<Styled.Body width={width} height={height}>
			{list}
		</Styled.Body>
	) : (
		<>{children}</>
	);
};

BouncingBalls.defaultProps = {
	size: '100%',
	width: '',
	height: '',
	isLoading: true,
	children: '',
	animationDuration: 0.6,
	colorTheme: 'default',
};

export default BouncingBalls;
