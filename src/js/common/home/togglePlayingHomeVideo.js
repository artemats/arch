import { TweenMax, TweenLite, TimelineMax } from 'gsap';
import {transitionConstants} from '../../constants/transition';
// import * as ScrollMagic from 'scrollmagic';
// import { ScrollMagicPluginIndicator, ScrollMagicPluginGsap } from 'scrollmagic-plugins';
//
//
// ScrollMagicPluginIndicator(ScrollMagic);
// ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
//
// const controller = new ScrollMagic.Controller({
// 	vertical: false,
// });
//
// new ScrollMagic.Scene({
// 		triggerElement: "#arch-krgt-1"
// 	})
// 	.addIndicators({ name: "My Indicator" })
// 	.setTween("#arch-krgt-1", 0.5, { opacity: 0.5 })
// 	.addTo(controller);

export const playHomeHeroVideo = () => {

	const homeHeroVideo = document.querySelector('#hero-video');
	const homeHeroVideoBox = document.querySelector('#home-hero-video');

	if (!!homeHeroVideo) {
		homeHeroVideo.play();
	}
	TweenLite.to(homeHeroVideoBox, {
		opacity: 1,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
	});

};

export const pauseHomeHeroVideo = () => {

	const homeHeroVideo = document.querySelector('#hero-video');
	const homeHeroVideoBox = document.querySelector('#home-hero-video');

	if (!!homeHeroVideo) {
		homeHeroVideo.pause();
	}
	TweenLite.to(homeHeroVideoBox, {
		opacity: 0,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
	});

};