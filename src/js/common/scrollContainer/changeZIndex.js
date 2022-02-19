import { TweenLite } from 'gsap';

export const changeZIndex = (position = 0) => {

	const scrollContainer = document.querySelector('#horizontal-scroll-container');

	TweenLite.set(scrollContainer, {
		zIndex: position,
	});

}