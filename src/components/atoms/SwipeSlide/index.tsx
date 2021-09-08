import React from 'react';
import SwiperCore, {
	SwiperOptions,
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';

import GlobalStyled from 'styles/GlobalStyled';

export interface SwipeSlideProps extends SwiperOptions, Swiper {
	SlideComponents: Array<React.FC>;
}

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]); // *

const SwipeSlide = (props: SwipeSlideProps) => {
	const { SlideComponents } = props;

	let formatSwipeSlideProps = { ...props };
	delete formatSwipeSlideProps.SlideComponents;

	const list = SlideComponents.map((res: React.FC, index) => {
		return <SwiperSlide key={index}>{res}</SwiperSlide>;
	});

	return <Swiper {...formatSwipeSlideProps}>{list}</Swiper>;
};
SwipeSlide.defaultProps = {
	SlideComponents: [
		<GlobalStyled.Row>Slide 1</GlobalStyled.Row>,
		<GlobalStyled.Row>Slide 2</GlobalStyled.Row>,
		<GlobalStyled.Row>Slide 3</GlobalStyled.Row>,
	],
};

export default SwipeSlide;
