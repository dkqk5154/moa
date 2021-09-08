const nameUpSort = (a: string | number, b: string | number) => {
	let aS = a!.toString(10).toUpperCase();
	let bS = b!.toString(10).toUpperCase();
	if (aS === bS) return 0;

	while (aS || bS) {
		aS = aS.replace(/^((\d*)[^\d]*)/, '');
		let aT = RegExp.$1;
		let aN = RegExp.$2;

		bS = bS.replace(/^((\d*)[^\d]*)/, '');
		let bT = RegExp.$1;
		let bN = RegExp.$2;

		if (aN && bN && aN !== bN) return Number(aN) > Number(bN) ? -1 : 1;
		else if (aT !== bT) {
			let sort = [aT, bT];
			sort.sort();
			return sort[0] === aT ? 1 : -1;
		}
	}
};

const nameDownSort = (a: string | number, b: string | number) => {
	let aS = a!.toString(10).toUpperCase();
	let bS = b!.toString(10).toUpperCase();
	if (aS === bS) return 0;

	while (aS || bS) {
		aS = aS.replace(/^((\d*)[^\d]*)/, '');
		let aT = RegExp.$1;
		let aN = RegExp.$2;

		bS = bS.replace(/^((\d*)[^\d]*)/, '');
		let bT = RegExp.$1;
		let bN = RegExp.$2;

		if (aN && bN && aN !== bN) return Number(aN) > Number(bN) ? 1 : -1;
		else if (aT !== bT) {
			let sort = [aT, bT];
			sort.sort();
			return sort[0] === aT ? -1 : 1;
		}
	}
};

export { nameUpSort, nameDownSort };
