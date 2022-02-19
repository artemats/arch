import { TweenLite } from 'gsap';
import {switchSlicedText} from "./switchSlicedText";
import {transitionConstants} from "../../constants/transition";

export const showContentOnLoad = () => {
	const images = document.querySelectorAll('.showThumbOnLoad');
	const textContents = document.querySelectorAll('.showContentOnLoad');

	/*
	Images
	 */
	for (let i = 0; i < images.length; i++) {
		TweenLite.set(images[i], {
			opacity: 1,
			onComplete: () => {
				TweenLite.to(images[i].querySelector('img'), {
					opacity: 1,
					scale: 1,
					y: 0,
					duration: transitionConstants.show.duration,
					ease: transitionConstants.show.ease,
				});
			}
		});
	}
	/*
	Text
	 */
	for (let j = 0; j < textContents.length; j++) {
		TweenLite.set(textContents[j], {
			opacity: 1,
			onComplete: () => {
				switchSlicedText(textContents[j], true, 0, 0);
			}
		});
	}
}

export const showHiddenElements = () => {
	const elements = document.querySelectorAll('.hiddenOnLoading');
	for (let i = 0; i < elements.length; i++) {
		elements[i].classList.remove('hiddenOnLoading');
	}
}