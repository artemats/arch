import { TweenLite } from 'gsap';
import {transitionConstants} from "../constants/transition";
import {loadHomeHeroContent} from "./home/loadHomeHeroContent";

export const preloader = () => {
	if(document.querySelector('#preloader')) {
		const boomParts = [
			'preloader-item-5',
			'preloader-item-6',
			'preloader-item-7',
			'preloader-item-1',
			'preloader-item-2',
			'preloader-item-3'];
		const topRow = document.querySelector('#preloader-row-0');
		const bottomRow = document.querySelector('#preloader-row-2');
		// hide some parts //
		setTimeout(() => {
			for (let i = 0; i < boomParts.length; i++) {
				let part = document.querySelector(`#${boomParts[i]}`);
				setTimeout(() => {
					if (explosionPart(part)._targets[0].getAttribute('id') === 'preloader-item-3') {
						connectTitle(topRow, 100);
						connectTitle(bottomRow, -100);
						switchBackground(0.5);
					}
				}, i * 200);
			}
		}, 500);
	}
}

const explosionPart = (part) => {
	return TweenLite.to(part, {
		opacity: 0,
		duration: 0.5,
		ease: transitionConstants.opacity.ease,
	});
}

const connectTitle = (row, position) => {
	TweenLite.to(row, {
		yPercent: position,
		duration: 1.6,
		ease: transitionConstants.move.ease,
	});
}

const switchBackground = (status) => {
	const bg = document.querySelector('#preloader-bg');
	TweenLite.to(bg, {
		opacity: status,
		duration: 3,
		ease: transitionConstants.opacity.ease,
		// load content //
		onComplete: status !== 0 ? hideTitle : loadHomeHeroContent,
	});
}

const hideTitle = () => {
	const titleParts = document.querySelectorAll('.preloader-box-item svg');
	for(let i = 0; i < titleParts.length; i++) {
		TweenLite.to(titleParts[i], {
			strokeDashoffset: 330,
			duration: 2,
		});
	}
	setTimeout(() => switchBackground(0), 1000);
}