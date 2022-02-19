import { TweenLite } from 'gsap';
import {transitionConstants} from "../constants/transition";

export const setWhiteColorTheme = (status = false) => {
	TweenLite.to(document.body, {
		color: status ? '#111111' : '#FFFFFF',
		backgroundColor: status ? '#FFFFFF' : '#111111',
		duration: transitionConstants.color.duration,
		ease: transitionConstants.color.ease,
	});
	switchThemeElements(status);
}

const switchThemeElements = (status) => {
	const themeDarkElements = document.querySelectorAll('.theme-dark');
	const themeWhiteElements = document.querySelectorAll('.theme-white');
	//dark
	for (let i = 0; i < themeDarkElements.length; i++) {
		TweenLite.to(themeDarkElements[i], {
			opacity: status ? 0 : 1,
			pointerEvents: status ? 'none' : 'auto',
			duration: 0.2,
			ease: transitionConstants.color.ease,
		});
	}
	// white
	for (let i = 0; i < themeWhiteElements.length; i++) {
		TweenLite.to(themeWhiteElements[i], {
			opacity: status ? 1 : 0,
			pointerEvents: status ? 'auto' : 'none',
			duration: 0.2,
			ease: transitionConstants.color.ease,
		});
	}
}