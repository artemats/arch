import Highway from '@dogstudio/highway';
import Tween, {Power4} from 'gsap';
import {switchMainNav} from "../common/nav/switchMainNav";
import {initVerticalScroll} from "../scroll/verticalScroll";
import {transitionConstants} from "../constants/transition";

class NextMotorcycle extends Highway.Transition {
	out({ from, done }) {
		done();
	}
	in({ from, to, done }) {

		from.remove();
		Tween.fromTo(to,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: transitionConstants.opacity.duration,
				ease: transitionConstants.opacity.ease,
				onComplete: () => {
					initVerticalScroll();
					done();
					setTimeout(() => {
						document.querySelector('.burger').classList.contains('is-active') ? switchMainNav(false) : null;
					}, 1000);
				},
			});
	}
}

export default NextMotorcycle;