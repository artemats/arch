import Highway from '@dogstudio/highway';
import Tween, { Power4 } from 'gsap';
import {locoScroll} from "../scroll/locoScroll";
import {pauseHomeHeroVideo} from "../common/home/togglePlayingHomeVideo";

class Fade extends Highway.Transition {
	out({ from, done }) {

		pauseHomeHeroVideo();

		Tween.fromTo(from,
			{
				opacity: 1,
			},
			{
				duration: 0.5,
				opacity: 0,
				ease: Power4.easeOut,
				onComplete: done,
			});
	}
	in({ from, to, done }) {

		console.log('fade, in');

		from.remove();
		Tween.fromTo(to,
			{
				opacity: 0,
				onComplete: () => {
					locoScroll.update();
					locoScroll.scrollTo(0, {
						duration: 0,
						disableLerp: true,
						callback: () => {
							locoScroll.update();
							console.log('scroll home to start');
						}
					});
				}
			},
			{
				duration: 0.5,
				opacity: 1,
				ease: Power4.easeOut,
				onComplete: done,
			});
	}
}

export default Fade;