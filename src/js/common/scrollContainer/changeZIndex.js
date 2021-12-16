import { TweenLite } from 'gsap';

export const changeZIndex = (position = 0) => {

	const scrollContainer = document.querySelector('#scroll-container');

	TweenLite.set(scrollContainer, {
		zIndex: position,
	});

}