import {TweenLite} from "gsap";
import {transitionConstants} from "../../constants/transition";

export const switchSlicedText = (content, status, delay = 0,btnDelay = 0) => {
	status && !!content ? showText(content, delay, btnDelay) : hideText(content);
}

const showText = (description, delay, btnDelay) => {
	let btn = description.querySelector('.btn');
	TweenLite.set(description, {
		opacity: 1,
	});
	let letters = description.querySelectorAll('.word');
	TweenLite.to(letters, {
		delay,
		opacity: 1,
		y: 0,
		duration: transitionConstants.text.duration,
		ease: transitionConstants.text.ease,
		stagger: 0.01,
	});
	// show button //
	if(!!btn) {
		TweenLite.to(btn, {
			opacity: 1,
			delay: btnDelay,
			y: 0,
			duration: transitionConstants.text.duration,
			ease: transitionConstants.text.ease,
		});
	}
};

const hideText = (description) => {
	if(!!description) {
		let btn = description.querySelector('.btn');
		let letters = description.querySelectorAll('.word');
		TweenLite.to(letters, {
			opacity: 0,
			y: 10,
			duration: transitionConstants.text.duration,
			ease: transitionConstants.text.ease,
			stagger: 0.01,
			onComplete: () => {
				TweenLite.set(description, {
					opacity: 0,
					duration: 0,
				})
			}
		});
		// hide button //
		if (!!btn) {
			TweenLite.to(btn, {
				opacity: 0,
				y: 10,
				duration: transitionConstants.text.duration,
				ease: transitionConstants.text.ease,
			});
		}
	}
};