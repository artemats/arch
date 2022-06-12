import { TweenLite } from 'gsap';
import {transitionConstants} from "../constants/transition";

export const switchHeaderNav = (status) => {
	const nav = document.querySelector('.header-panel-social');
	TweenLite.to(nav, {
		opacity: status,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
		pointerEvents: status ? 'auto' : 'none',
	});
}