import Tween, { TweenMax, TimelineMax } from 'gsap';
import * as ScrollMagic from 'scrollmagic';
import {transitionConstants} from "../../constants/transition";
import {setWhiteColorTheme} from "../../common/switchColorTheme";
import {switchGrid} from "../../common/grid/switchGrid";
import {playPauseVideo} from "../../common/motorcycle/playPauseVideo";
import {switchSlicedText} from "../../common/content/switchSlicedText";
import {switchTopShadow} from "../../common/switchTopShadow";
// import {moveToNextMotorcycle} from "../../common/motorcycle/moveToNextMotorcycle";

export const motorcycleScene = () => {

	const controller = new ScrollMagic.Controller();

	/*
	Advantages scene
	 */
	if (!!document.querySelector('#advantages')){
		const advantagesBoxes = document.querySelectorAll('.advantages-box');
		const advantagesNavLinks = document.querySelectorAll('.advantages-nav-link');
		const advantagesBanners = document.querySelectorAll('.advantages-banner');

		new ScrollMagic.Scene({
			triggerElement: '#advantages',
			duration: document.querySelector('#advantages').clientHeight,
		})
			.addTo(controller)
			// .addIndicators({
			// 	name: 'advantages'
			// })
			.on('enter', () => {
				// switchAbstract(false);
				if (!!document.querySelector('#advantages')) {
					switchGrid(false);
					window.scrollY > 0 ? setWhiteColorTheme(true, 'scene') : null;
					switchTopShadow(false);
				}
				switchAdvantagesImages(true);
			})
			.on('leave', () => {
				// switchAbstract(true);
				if (!!document.querySelector('#motorcycle-video')) {
					switchGrid(true, false);
					window.scrollY > 0 ? setWhiteColorTheme(false, 'scene') : null;
					switchTopShadow(true);
				}
				!!document.querySelector('#krgt-1-video')
					? playPauseVideo(document.querySelector('#krgt-1-video'), false)
					: null;
				switchAdvantagesImages(false);
			});

		// Advantages boxes //
		for (let i = 0; i < advantagesBoxes.length; i++){
			new ScrollMagic.Scene({
				triggerElement: advantagesBoxes[i],
				triggerHook: 0.5,
				// duration: 300,
			})
				.addTo(controller)
				// .addIndicators({
				// 	name: 'advantage'
				// })
				.on('progress', (e) => {
					if (!!advantagesBanners[i]) {
						Tween.to(advantagesBanners[i], {
							opacity: e.progress,
							filter: `blur(${10 - ( e.progress * 10 )}px)`
						});
					}
				})
				.on('enter', () => {
					if (!!advantagesNavLinks[i-1]){
						showAdvantagesNavLink(advantagesNavLinks[i-1], true);
					}
				})
				.on('leave', () => {
					if (!!advantagesNavLinks[i-1]){
						showAdvantagesNavLink(advantagesNavLinks[i-1], false);
					}
				})
		}
	}

	/*
	Video scene
	 */
	if (!!document.querySelector('#motorcycle-video')) {
		const tmlVideo = new TimelineMax()
			.fromTo('.motorcycle-video-banner .video-box', {
				yPercent: 100,
			},{
				yPercent: 0,
				onComplete: () => {
					!!document.querySelector('#krgt-1-video')
						? playPauseVideo(document.querySelector('#krgt-1-video'), true)
						: null;
				},
			})
			.to('.motorcycle-video-banner', {
				width: window.innerWidth,
				height: window.innerHeight,
			});

		new ScrollMagic.Scene({
			triggerElement: '#motorcycle-video',
			duration: window.innerHeight,
		})
			.setTween(tmlVideo)
			.addTo(controller)
			// .addIndicators({
			// 	name: 'video'
			// })
			.on('enter', () => {
				!!document.querySelector('#motorcycle-video') ? switchGrid(false) : null;
				// switchAbstract(false);
			});
	}

	/*
	Specifications scene
	 */
	if (!!document.querySelector('#specifications')) {
		const tmlSpecificationsForVideo = new TimelineMax()
			.fromTo('.motorcycle-video-banner', {
				y: 0
			},{
				y: '-30vh',
				opacity: 0,
			});

		new ScrollMagic.Scene({
			triggerElement: '#specifications',
			duration: window.innerHeight,
			offset: 0 - (window.innerHeight / 3),
		})
			.setTween(tmlSpecificationsForVideo)
			.addTo(controller)
			// .addIndicators({
			// 	name: 'specifications'
			// })
			.on('enter', () => {
				!!document.querySelector('#krgt-1-video')
					? playPauseVideo(document.querySelector('#krgt-1-video'), false)
					: null;
			})
			.on('leave', () => {
				!!document.querySelector('#krgt-1-video')
					? playPauseVideo(document.querySelector('#krgt-1-video'), true)
					: null;
			});
	}
	// Specifications items scene //
	const specificationsItems = document.querySelectorAll('.specifications-list-item');
	for (let i = 0; i < specificationsItems.length; i++) {
		const specItemTml = new TimelineMax()
			.fromTo(specificationsItems[i].querySelector('.specifications-label-border'),
				{
					width: 0,
					opacity: 1,
				},
				{
					opacity: 0.1,
					width: '100%',
					duration: 1,
				});
		new ScrollMagic.Scene({
			triggerElement: specificationsItems[i],
			triggerHook: 0.9,
		})
			.setTween(specItemTml)
			.addTo(controller)
			// .addIndicators({
			// 	name: 'specification item'
			// })
			.on('enter', () => {
				switchSlicedText(specificationsItems[i].querySelector('.specifications-label'), true, 0, 0, 0.03);
			});
	}

	/*
	Tailor for you scene
	 */
	if (!!document.querySelector('#tailor')) {
		new ScrollMagic.Scene({
			triggerElement: '#tailor',
			triggerHook: 'onEnter',
		})
			.addTo(controller)
			.on('enter', () => {
				!!document.querySelector('#tailor') ? switchGrid(true, false) : null;
			})
			.on('leave', () => {
				!!document.querySelector('#tailor') ? switchGrid(false) : null;
			})
	}

	/*
	Large photos parallax
	 */
	const largePhotos = document.querySelectorAll('.photos-parallax .photos-parallax-item');
	if (largePhotos.length) {
		for (let i = 0; i < largePhotos.length; i++) {
			new ScrollMagic.Scene({
				triggerElement: largePhotos[i],
				triggerHook: 0,
				duration: window.innerHeight,
			})
				.setTween(TweenMax.to(largePhotos[i].querySelector('img'), {
					y: window.innerHeight / 2,
					opacity: 0.5,
				}))
				.addTo(controller);
		}
	}

	/*
	Next motorcycle
	 */
	// if (!!document.querySelector('#next-motorcycle')) {
	// 	new ScrollMagic.Scene({
	// 		triggerElement: '#next-motorcycle',
	// 		triggerHook: 0.2,
	// 	})
	// 		.addTo(controller)
	// 		.on('enter', () => {
	// 			switchGrid(false);
	// 			Tween.fromTo(document.querySelector('.next-motorcycle'),
	// 				{
	// 					opacity: 0,
	// 				},
	// 				{
	// 					opacity: 1,
	// 					duration: transitionConstants.opacity.duration,
	// 					ease: transitionConstants.opacity.ease,
	// 					onComplete: () => moveToNextMotorcycle(),
	// 				});
	// 		})
	// 		.on('leave', () => {
	// 			switchGrid(true, false);
	// 			Tween.to(document.querySelector('.next-motorcycle'), {
	// 				opacity: 0,
	// 				duration: transitionConstants.opacity.duration,
	// 				ease: transitionConstants.opacity.ease,
	// 			});
	// 		});
	// }

	/*
	Motor scene
	 */
	const motor = document.querySelector('.customComponents .motor');
	if (!!motor) {
		new ScrollMagic.Scene({
			triggerElement: motor,
			triggerHook: 0.5,
			duration: window.innerHeight,
		})
			.setTween(
				Tween.to(motor, {
					opacity: 0,
					y: -100,
					duration: transitionConstants.move.duration,
					ease: transitionConstants.move.ease,
				})
			)
			.addTo(controller);
	}


}

const showAdvantagesNavLink = (link, status) => {
	TweenMax.set(link, {
		opacity: status ? 0 : 1,
		translateY: status ? 100 : 0,
	});
	TweenMax.fromTo(link,
		{
			opacity: status ? 0 : 1,
			translateY: status ? 100 : 0,
		},
		{
			opacity: status ? 1 : 0,
			translateY: status ? 0 : 100,
			duration: transitionConstants.transform.duration,
			ease: transitionConstants.transform.ease,
		});
}

const switchAdvantagesImages = (status) => {
	const box = document.querySelector('.section-content-abstract.__advantages');
	if (!!box) {
		status ? box.classList.remove('is-hidden') : box.classList.add('is-hidden');
	}
}