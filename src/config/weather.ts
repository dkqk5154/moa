const formatWeatherName = (data: any) => {
	const { PTY, SKY } = data;

	if (PTY !== undefined) {
		if (PTY === '없음') {
			return SKY;
		} else {
			if (SKY === '맑음') {
				return PTY;
			} else {
				return PTY + ' ' + SKY;
			}
		}
	}
	// PTY === 없음은 제외
};

const formatWeather = (data: any) => {
	//- 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
	//- 강수형태(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
	// 여기서 비/눈은 비와 눈이 섞여 오는 것을 의미 (진눈개비)

	if (data?.PTY || data?.SKY || data?.T1H) {
		const { PTY, SKY, T1H } = data;
		let weatherImgSrc = '';

		switch (PTY) {
			case '비':
				weatherImgSrc += 'rain_';

				break;
			case '눈':
				weatherImgSrc += 'snow_';

				break;
			case '비/눈':
				weatherImgSrc += 'rain_snow_';

				break;
			case '소나기':
				weatherImgSrc += 'shower_';

				break;
			case '빗방울':
				weatherImgSrc += 'raindrop_';

				break;
			case '빗방울/눈날림':
				weatherImgSrc += 'raindrop_snow_drifting_';

				break;
			case '눈날림':
				weatherImgSrc += 'snow_drifting_';

				break;
			default:
				break;
		}

		switch (SKY) {
			case '맑음':
				weatherImgSrc += 'sunny';

				break;
			case '흐림':
				weatherImgSrc += 'cloudy';

				break;
			case '구름많음':
				// 흐림과 비슷하다고 판단
				weatherImgSrc += 'cloudy';

				break;

			default:
				break;
		}
		return {
			name: formatWeatherName(data),
			imgSrc: weatherImgSrc,
			temperature: T1H,
		};
	}

	return {
		name: '날씨 에러',
		imgSrc: 'weather_err',
		temperature: '-',
	};
};

export default formatWeather;
