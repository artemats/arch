import { TweenLite } from 'gsap';
import {transitionConstants} from "../../constants/transition";

export const switchHeaderFooterLogo = (status) => {
	const header = document.querySelector('.header');
	const logo = document.querySelector('.hero-footer');

	TweenLite.to(header, {
		opacity: status ? 1 : 0,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
	});

	TweenLite.to(logo, {
		opacity: status ? 1 : 0,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
	});
}