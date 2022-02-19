import { TweenMax, TimelineMax } from 'gsap';
import * as ScrollMagic from 'scrollmagic';
import {transitionConstants} from "../../constants/transition";
import {setWhiteColorTheme} from "../../common/switchColorTheme";
import {switchGrid} from "../../common/grid/switchGrid";
import {playPauseVideo} from "../../common/motorcycle/playPauseVideo";
import {switchSlicedText} from "../../common/content/switchSlicedText";
import {switchTopShadow} from "../../common/switchTopShadow";

export const archKRGT1Scene = () => {

	const controller = new ScrollMagic.Controller();

	/*
	Advantages scene
	 */
	if (!!document.querySelector('#advantages')){
		const advantagesBoxes = document.querySelectorAll('.advantages-box');
		const advantagesNavLinks = document.querySelectorAll('.advantages-nav-link');
		const advantagesBanner = document.querySelector('#krgt-1-advantages-img');

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
					setWhiteColorTheme(true);
					switchTopShadow(false);
				}
			})
			.on('leave', () => {
				// switchAbstract(true);
				if (!!document.querySelector('#motorcycle-video')) {
					switchGrid(true, false);
					setWhiteColorTheme(false);
					switchTopShadow(true);
				}
				!!document.querySelector('#krgt-1-video')
					? playPauseVideo(document.querySelector('#krgt-1-video'), false)
					: null;
			});

		// Advantages boxes //
		for (let i = 0; i < advantagesBoxes.length; i++){
			new ScrollMagic.Scene({
				triggerElement: advantagesBoxes[i],
				triggerHook: 0.5,
			})
				.addTo(controller)
				// .addIndicators({})
				.on('enter', () => {
					if (!!advantagesBoxes[i]?.dataset?.image){
						advantagesBanner.setAttribute('src', advantagesBoxes[i]?.dataset?.image);
						switchAdvantagesImages(advantagesBanner, 1);
					} else {
						switchAdvantagesImages(advantagesBanner, 0);
					}
					if (!!advantagesNavLinks[i-1]){
						showAdvantagesNavLink(advantagesNavLinks[i-1], true);
					}
				})
				.on('leave', () => {
					if (!!advantagesBoxes[i-1]?.dataset?.image){
						advantagesBanner.setAttribute('src', advantagesBoxes[i-1]?.dataset?.image);
						switchAdvantagesImages(advantagesBanner, 1);
					} else {
						switchAdvantagesImages(advantagesBanner, 0);
					}
					if (!!advantagesNavLinks[i-1]){
						showAdvantagesNavLink(advantagesNavLinks[i-1], false);
					}
				})
		}
	}

	/*
	Color theme switcher
	 */
	// new ScrollMagic.Scene({
	// 	triggerElement: '.motorcycle-theme-switcher',
	// })
	// 	.addTo(controller)
	// 	// .addIndicators({
	// 	// 	name: 'theme switcher'
	// 	// })
	// 	.on('leave', () => {
	// 		if (!!document.querySelector('#motorcycle-video')) {
	// 			setWhiteColorTheme(true);
	// 			switchTopShadow(false);
	// 		}
	// 	});


	/*
	Video scene
	 */
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

	/*
	Specifications scene
	 */
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
		offset: 0 - ( window.innerHeight / 3 ),
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

const switchAbstract = (status) => {
	TweenMax.fromTo('#krgt-1-abstract img',
		{
			opacity: status ? 0 : 1,
		},
		{
			opacity: status ? 1 : 0,
			duration: transitionConstants.move.duration,
			ease: transitionConstants.move.ease,
		});
}

const switchAdvantagesImages = (banner, status) => {
	TweenMax.to(banner, {
		opacity: status,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
	});
	// TweenMax.to('.motorcycle-spot img', {
	// 	opacity: 1,
	// 	stagger: 0.2,
	// });
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