import { TweenLite } from 'gsap';
import {transitionConstants} from '../constants/transition';

export const switchTopShadow = (status) => {

	const shadow = document.querySelector('.page-shadow');

	TweenLite.to(shadow, {
		opacity: status ? 1 : 0,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
	});

}