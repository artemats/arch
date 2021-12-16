import Highway from '@dogstudio/highway';
import Tween, { TweenLite } from 'gsap';
import {locoScroll} from "../scroll/locoScroll";

class MotorcycleHome extends Highway.Transition {
	out({ from, trigger, done }) {

		const currentMotorcycleSection = document.querySelector('.section-motorcycle.is-inview');

		TweenLite.set(currentMotorcycleSection, {
			width: window.innerWidth,
		});

		// locoScroll.scrollTo(currentMotorcycleSection, {
			// duration: 3,
			// disableLerp: true,
			// callback: () => {

				setTimeout(() => {
					Tween.fromTo(from,
						{
							opacity: 1,
						},
						{
							duration: 0,
							// opacity: 0,
							onComplete: () => {
								done();
							},
						});
				}, 500);

			// }
		// });
	}
	in({ from, to, done }) {

		// locoScroll.update();
		// locoScroll.scrollTo(0, {
		// 	duration: 5,
		// 	disableLerp: true,
		// 	callback: () => locoScroll.update()
		// });

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

					Tween.to(to, {
						position: 'relative',
						onComplete: () => {

						}
					});
				},
			});
	}
}

export default MotorcycleHome;