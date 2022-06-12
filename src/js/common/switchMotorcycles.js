import { TweenLite } from 'gsap';
import {transitionConstants} from "../constants/transition";
import {switchSlicedText} from "./content/switchSlicedText";
import {switchVerticalAnchorNav} from "./home/switchVerticalNav";

export const switchMotorcycle = (obj, status) => {

	let motorcycleId = obj.querySelector('.section-motorcycle').getAttribute('id');

	if (status) {
		// showMotorcycle(obj.querySelector('.motorcycle-item-image'));
		// showBg(document.querySelector(`[data-motorcycle="${motorcycleId}"]`));
		switchMotorcycleBg(obj.querySelectorAll('.motorcycle-bg'), true);
		drawCircle(obj.querySelector('.motorcycle-item-border'));
		switchSlicedText(obj.querySelector('.motorcycle-description'), true, 0.1,1);
		switchVerticalAnchorNav(motorcycleId);
	} else {
		// hideMotorcycle(obj.querySelector('.motorcycle-item-image'));
		// hideBg(document.querySelector(`[data-motorcycle="${motorcycleId}"]`));
		switchMotorcycleBg(obj.querySelectorAll('.motorcycle-bg'), false);
		eraseCircle(obj.querySelector('.motorcycle-item-border'));
		switchSlicedText(obj.querySelector('.motorcycle-description'), false);
	}
};

const showMotorcycle = (motorcycle) => {
	TweenLite.set(motorcycle, {
		x: -100,
	});
	TweenLite.to(motorcycle, {
		// delay: 1,
		opacity: 1,
		x: 0,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.move.ease,
	});
};

const hideMotorcycle = (motorcycle) => {
	TweenLite.to(motorcycle, {
		opacity: 0,
		duration: 0.5,
		ease: transitionConstants.move.ease,
	});
};

const drawCircle = (circle) => {
	if(!!circle) {
		TweenLite.set(circle.querySelector('path'), {
			opacity: 1,
			// delay: 1.5,
			delay: 0.5,
			onComplete: () => {
				TweenLite.to(circle.querySelector('path'), {
					strokeDashoffset: 0,
					duration: transitionConstants.draw.duration,
					ease: transitionConstants.draw.ease,
				});
			}
		});
	}
};

const eraseCircle = (circle) => {
	if(!!circle) {
		TweenLite.to(circle.querySelector('path'), {
			opacity: 0,
			duration: 0.1,
			onComplete: () => {
				TweenLite.set(circle.querySelector('path'), {
					strokeDashoffset: 1670,
				});
			}
		});
	}
};

export const switchMotorcycleBg = (bg, status) => {
	TweenLite.fromTo(bg,
		{
			opacity: status ? 0 : 1,
			filter: `blur(${status ? 10 : 0}px)`,
		},
		{
			opacity: status ? 1 : 0,
			filter: `blur(${status ? 0 : 10}px)`,
			duration: transitionConstants.opacity.duration,
			ease: transitionConstants.opacity.ease,
		});
};