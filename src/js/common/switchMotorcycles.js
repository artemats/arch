import { TweenLite } from 'gsap';
import {transitionConstants} from "../constants/transition";
import {switchSlicedText} from "./content/switchSlicedText";
import {switchVerticalAnchorNav} from "./home/switchVerticalNav";

export const switchMotorcycle = (obj, status) => {

	let motorcycleId = obj.querySelector('.section-motorcycle').getAttribute('id');

	if (status) {
		switchMotorcycleBg(obj.querySelectorAll('.motorcycle-bg'), true);
		switchSlicedText(obj.querySelector('.motorcycle-description'), true, 0.1,1);
		switchVerticalAnchorNav(motorcycleId);
	} else {
		switchMotorcycleBg(obj.querySelectorAll('.motorcycle-bg'), false);
		switchSlicedText(obj.querySelector('.motorcycle-description'), false);
	}
};

export const switchMotorcycleBg = (bg, status, filter = true) => {
	TweenLite.fromTo(bg,
		{
			opacity: status ? 0 : 1,
			filter: filter ? `blur(${status ? 10 : 0}px)` : 'none',
		},
		{
			opacity: status ? 1 : 0,
			filter: filter ? `blur(${status ? 0 : 10}px)` : 'none',
			duration: transitionConstants.opacity.duration,
			ease: transitionConstants.opacity.ease,
		});
};