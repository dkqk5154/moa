import { useRef, useEffect } from 'react';

function useInterval(callback: Function, delay: number) {
	const savedCallback = useRef(null) as any;

	useEffect(() => {
		savedCallback.current = callback;
	});

	useEffect(() => {
		function tick() {
			savedCallback.current();
		}

		let id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
}

export default useInterval;
