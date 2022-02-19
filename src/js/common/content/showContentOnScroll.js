import { TweenLite } from 'gsap';
import {transitionConstants} from '../../constants/transition';

export const showContentOnScroll = (content, direction) => {

	const paragraphs = content.querySelectorAll('p');

	if (paragraphs.length) {
		TweenLite.fromTo(paragraphs,
			{
				opacity: 0,
				y: 10,
			},
			{
				delay: 0.5,
				opacity: 1,
				y: 0,
				duration: transitionConstants.move.duration,
				ease: transitionConstants.move.ease,
				stagger: 0.2,
			});
	} else {
		TweenLite.fromTo(content,
			{
				opacity: 0,
				y: 10,
			},
			{
				delay: 0.5,
				opacity: 1,
				y: 0,
				duration: transitionConstants.move.duration,
				ease: transitionConstants.move.ease,
			});
	}

};