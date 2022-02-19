import * as ScrollMagic from 'scrollmagic';
import { TimelineMax } from 'gsap';
import {showImageOnScroll} from "../../common/content/showImageOnScroll";
import {switchSlicedText} from "../../common/content/switchSlicedText";
import {transitionConstants} from "../../constants/transition";

export const verticalScene = () => {

	const controller = new ScrollMagic.Controller();

	/*
	Images
	 */
	const images = document.querySelectorAll('.showThumbOnScroll');
	for (let i = 0; i < images.length; i++) {
		new ScrollMagic.Scene({
			triggerElement: images[i],
			triggerHook: 0.8,
			duration: window.innerHeight,
		})
			.addTo(controller)
			// .addIndicators({
			// 	name: `show image on scroll`
			// })
			.on('enter', () => {
				if (!!document.querySelector('[data-scroll-direction="vertical"]')) {
					images[i].classList.contains('__multiple') ? showImageOnScroll(images[i], true) : showImageOnScroll(images[i]);
				}
			})
	}

	/*
	Content
	 */
	const textContents = document.querySelectorAll('.showContentOnScroll');
	for (let i = 0; i < textContents.length; i++) {
		let contentTml = new TimelineMax()
			.fromTo(textContents[i],
				{
					opacity: 0,
					y: 50,
				},
				{
					opacity: 1,
					y: 0,
					duration: transitionConstants.move.duration,
					ease: transitionConstants.move.ease,
				});
		new ScrollMagic.Scene({
			triggerElement: textContents[i],
			triggerHook: 0.8,
		})
			.setTween(contentTml)
			.addTo(controller)
			// .addIndicators({
			// 	name: `show image on scroll`
			// })
			.on('enter', () => {
				if (!!textContents[i].querySelector('.text-split')) {
					switchSlicedText(textContents[i], true, 0, 0);
				}
			});
	}

	/*
	Parallax
	 */
	const parallaxImages = document.querySelectorAll('.parallaxVerticalOnScroll');
	for (let i = 0; i < parallaxImages.length; i++) {
		let parallaxImageTml = new TimelineMax()
			.fromTo(parallaxImages[i].querySelector('img'),
				{
					scale: 1.3,
					opacity: 0,
				},
				{
					scale: 1,
					opacity: 1,
					duration: transitionConstants.show.duration,
					ease: transitionConstants.show.ease,
				})

		new ScrollMagic.Scene({
			triggerElement: parallaxImages[i],
			triggerHook: 1,
		})
			.setTween(parallaxImageTml)
			.addTo(controller)
			// .addIndicators({
			// 	name: `parallax on scroll`
			// })
	}

}