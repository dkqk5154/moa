const getAPIUrlFormat = (
	url: string,
	params?: { [key: string]: string | number | undefined },
) => {
	let result = url;
	Object.keys(params ? params : []).map((res: string, i: number) => {
		result += params ? `${i ? '&' : '?'}${res}=${params[res]}` : '';
		return res;
	});
	return result;
};

const APIUrls = {
	getTest: (params: { startDate: string; endDate: string }) =>
		getAPIUrlFormat('/test', params),
};

export interface APIUrlsProps {}

export default APIUrls;
