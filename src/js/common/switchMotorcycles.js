import gsap, { TweenLite } from 'gsap';
import {transitionConstants} from "../constants/transition";
import {switchSlicedText} from "./content/switchSlicedText";

export const switchMotorcycles = (obj) => {

	const motorcycles = document.querySelectorAll('.motorcycle-item-image');
	const motorcycleDescriptions = document.querySelectorAll('.motorcycle-description');
	const motorcycleCircles = document.querySelectorAll('.motorcycle-item-border');
	const motorcycleBgs = document.querySelectorAll('.motorcycles-bg-slide');
	const motorcycleNav = document.querySelectorAll('.section-nav-box');

	if(!!obj.el.id) {

		for(let i = 0; i < motorcycles.length; i++) {
			if(motorcycles[i].getAttribute('data-id') === obj.el.id) {
				showBg(motorcycleBgs[i], motorcycles[i]);
				showMotorcycle(motorcycles[i]);
				drawCircle(motorcycleCircles[i]);
				switchSlicedText(motorcycleDescriptions[i], true, 2,2.5);
				switchMotorcycleNav(motorcycleNav[i], true);
			} else {
				hideBg(motorcycleBgs[i]);
				eraseCircle(motorcycleCircles[i]);
				hideMotorcycle(motorcycles[i]);
				switchSlicedText(motorcycleDescriptions[i], false);
				switchMotorcycleNav(motorcycleNav[i], false);
			}
		}

	} else {
		for(let i = 0; i < motorcycles.length; i++) {
			eraseCircle(motorcycleCircles[i]);
			hideBg(motorcycleBgs[i]);
			hideMotorcycle(motorcycles[i]);
			switchSlicedText(motorcycleDescriptions[i], false);
			switchMotorcycleNav(motorcycleNav[i], false);
		}
	}
};

const showMotorcycle = (motorcycle) => {
	TweenLite.set(motorcycle, {
		x: -100,
	});
	TweenLite.to(motorcycle, {
		delay: 1,
		opacity: 1,
		x: 0,
		duration: transitionConstants.move.duration,
		ease: transitionConstants.move.ease,
	});
};

const hideMotorcycle = (motorcycle) => {
	TweenLite.to(motorcycle, {
		opacity: 0,
		duration: transitionConstants.move.duration,
		ease: transitionConstants.move.ease,
	});
};

const drawCircle = (circle) => {
	if(!!circle) {
		TweenLite.set(circle.querySelector('path'), {
			opacity: 1,
			delay: 1.5,
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

const showBg = (bg) => {
	TweenLite.to(bg, {
		opacity: 1,
		scale: 1,
		delay: 1,
		duration: transitionConstants.draw.duration,
		ease: transitionConstants.draw.ease,
	});
};

const hideBg = (bg) => {
	TweenLite.to(bg, {
		opacity: 0,
		scale: 1.1,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
	});
};

const switchMotorcycleNav = (nav, status) => {
	if(!!nav) {
		TweenLite.to(nav, {
			opacity: status ? 1 : 0,
			delay: 0.5,
			duration: transitionConstants.opacity.duration,
			ease: transitionConstants.opacity.ease,
		});
		gsap.timeline({
			repeat: -1,
		})
			.to(nav, {
				delay: 0.5,
				y: status ? -(nav.clientWidth - window.innerHeight) : 0,
				rotate: -90,
				duration: status ? 100 : 0,
				ease: 'none',
		});
	}
}