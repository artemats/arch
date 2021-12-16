import { TweenLite } from 'gsap';
import {transitionConstants} from "../../constants/transition";

export const switchHorizontalGrid = () => {
	const horizontalLine = document.querySelector('.grid-line-horizontal');
	TweenLite.to(horizontalLine, {
		width: status ? '100%' : 0,
		duration: transitionConstants.grid.duration,
		ease: transitionConstants.grid.ease,
	});
}
