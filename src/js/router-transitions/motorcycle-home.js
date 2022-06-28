import Highway from '@dogstudio/highway';
import Tween, {Power4, TweenLite} from 'gsap';
import {locoScroll} from "../scroll/locoScroll";
import {switchSlicedText} from "../common/content/switchSlicedText";
import {switchMotorcycleBg} from "../common/switchMotorcycles";
import {switchVerticalNav} from "../common/home/switchVerticalNav";
import {breakpoints} from "../constants/breakpoints";
import {transitionConstants} from "../constants/transition";

class MotorcycleHome extends Highway.Transition {
	out({ from, trigger, done }) {

		if (window.innerWidth >= breakpoints.width.minDesktop) {

			const currentMotorcycleSection = document.querySelector('.section-motorcycle.is-inview');

			TweenLite.set(currentMotorcycleSection, {
				width: window.innerWidth,
			});

			locoScroll.scrollTo(currentMotorcycleSection, {
				duration: 1,
				easing: [0.25, 0.00, 0.35, 0.1],
				// disableLerp: true,
				callback: () => {

				}
			});

			const activeMotorcycleSection = document.querySelector('.section-motorcycle.is-inview');
			const activeMotorcycleDescription = activeMotorcycleSection.querySelector('.motorcycle-description');
			const activeMotorcycleBg = activeMotorcycleSection.querySelectorAll('.motorcycle-bg');

			switchSlicedText(activeMotorcycleDescription, false);
			switchMotorcycleBg(activeMotorcycleBg, false, false);
			switchVerticalNav(false);

			setTimeout(() => {
				Tween.fromTo(from,
					{
						opacity: 1,
					},
					{
						opacity: 0,
						duration: 2,
					});
				done();
			}, 1600);

		} else {
			Tween.fromTo(from,
				{
					opacity: 1,
				},
				{
					opacity: 0,
					duration: transitionConstants.opacity.duration,
					ease: transitionConstants.opacity.ease,
					onComplete: done,
				});
		}

	}
	in({ from, to, done }) {

		if (window.innerWidth >= breakpoints.width.minDesktop) {

			locoScroll.update();
			locoScroll.scrollTo(0, {
				duration: 5,
				disableLerp: true,
				callback: () => {
					locoScroll.update();
				}
			});

			// from.remove();
			Tween.fromTo(to,
				{
					opacity: 0,
					position: 'absolute',
					left: window.innerWidth,
					top: 0,
				},
				{
					duration: 0,
					opacity: 1,
					onComplete: () => {

						from.remove();
						done();

						to.style.left = `0`;

						Tween.set(to, {
							position: 'relative',
						});
					},
				});

		} else {
			from.remove();

			window.scrollTo(0,0);

			Tween.fromTo(to,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: transitionConstants.opacity.duration,
					ease: transitionConstants.opacity.ease,
					onComplete: done,
				});
		}

	}
}

export default MotorcycleHome;