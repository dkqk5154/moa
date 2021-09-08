import { SweetAlertOptions } from 'sweetalert2';

const globalSwal: { [key: string]: SweetAlertOptions } = {
	confirm: {
		icon: 'success',
		title: '성공',
		confirmButtonText: '확인',
	},
	apiErr: {
		icon: 'error',
		title: '통신 실패',
		confirmButtonText: '확인',
	},
	userErr: {
		icon: 'warning',
		title: '회원만 사용 가능한 기능입니다.',
		confirmButtonText: '확인',
	},
	urlErr: {
		icon: 'error',
		title: '잘못된 URL 접속입니다.',
		confirmButtonText: '확인',
	},
	overlapPhoneNumber: {
		icon: 'error',
		title: '해당 전화번호는 이미 계정이 있는 전화번호입니다!',
		confirmButtonText: '확인',
	},
	notSignUpPhoneNumber: {
		icon: 'error',
		title: '해당 전화번호는 없는 \n 계정입니다!',
		confirmButtonText: '확인',
	},
	limitConfirmErr: {
		icon: 'error',
		title: '너무많은 인증시도를 하였습니다.',
		text: '잠시후에 다시 시도해주세요.',
		confirmButtonText: '확인',
	},
};

export default globalSwal;
