import { Power2, Power4 } from 'gsap';

export const transitionConstants = {
	opacity: {
		duration: 0.5,
		ease: Power2.easeOut,
	},
	color: {
		duration: 0.5,
		ease: Power2.easeOut,
	},
	move: {
		duration: 1,
		ease: Power2.easeOut,
	},
	draw: {
		duration: 2,
		ease: Power4.easeOut,
	},
	text: {
		duration: 1,
		ease: Power2.easeOut,
	},
	grid: {
		duration: 2,
		ease: Power2.easeOut,
	},
}