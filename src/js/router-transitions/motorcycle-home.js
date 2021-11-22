import Highway from '@dogstudio/highway';
import Tween from 'gsap';
import {locoScroll} from "../scroll/locoScroll";

class MotorcycleHome extends Highway.Transition {
	out({ from, done }) {
		Tween.fromTo(from,
			{
				opacity: 1,
			},
			{
				duration: 0,
				opacity: 0,
				onComplete: done,
			});
	}
	in({ from, to, done }) {

		locoScroll.update();
		locoScroll.scrollTo(0, {
			duration: 5,
			disableLerp: true,
			callback: () => locoScroll.update()
		});

		from.remove();
		Tween.fromTo(to,
			{
				opacity: 0,
			},
			{
				duration: 0,
				opacity: 1,
				onComplete: done,
			});
	}
}

export default MotorcycleHome;