import { TweenLite } from 'gsap';
import {transitionConstants} from "../../constants/transition";

export const switchGrid = (status) => {

	const verticalLines = document.querySelectorAll('.grid-line-vertical');
	const horizontalLine = document.querySelector('.grid-line-horizontal');

	for(let i = 0; i < verticalLines.length; i++) {
		TweenLite.to(verticalLines[i], {
			height: status ? '100%' : 0,
			duration: transitionConstants.grid.duration,
			ease: transitionConstants.grid.ease,
		});
	}

	TweenLite.to(horizontalLine, {
		width: status ? '100%' : 0,
		duration: transitionConstants.grid.duration,
		ease: transitionConstants.grid.ease,
	});

}