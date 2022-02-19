import { TweenMax } from 'gsap';
import {transitionConstants} from '../../constants/transition';

export const showImageOnScroll = (image, multiple = false) => {

	if (multiple) {
		let imageElements = image.querySelectorAll('.section-content-image');
		TweenMax.to(imageElements, {
			opacity: 1,
			duration: transitionConstants.show.duration,
			ease: transitionConstants.show.ease,
			stagger: 0,
		});

	} else {
		let imageElem = image.querySelector('.section-content-image');
		TweenMax.to(imageElem, {
			opacity: 1,
			duration: transitionConstants.show.duration,
			ease: transitionConstants.show.ease,
		})
	}

}