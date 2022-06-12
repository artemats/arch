import Tween from "gsap";
import {transitionConstants} from "../../constants/transition";

export const moveToNextMotorcycle = () => {
	const words = document.querySelectorAll('.next-motorcycle-item');
	const order = [0, 5, 2, 3];
	for (let i = 0; i < order.length; i++) {
		setTimeout(() => {
			Tween.to(words[order[i]], {
				opacity: 0,
				duration: transitionConstants.opacity.duration,
				ease: transitionConstants.opacity.ease,
				onComplete: () => {
					setTimeout(() => {
						Tween.to(document.querySelector('.next-motorcycle-box'), {
							top: '65%',
							duration: transitionConstants.move.duration,
							ease: transitionConstants.move.ease,
						});
						
						Tween.to(words[1], {
							yPercent: 100,
							duration: transitionConstants.move.duration,
							ease: transitionConstants.move.ease,
						});
						Tween.to(words[4], {
							yPercent: -100,
							duration: transitionConstants.move.duration,
							ease: transitionConstants.move.ease,
							onComplete: () => {
								Tween.to(document.querySelector('.next-motorcycle-bg'), {
									opacity: 0.5,
									duration: transitionConstants.opacity.duration,
									ease: transitionConstants.opacity.ease,
									onComplete: () => {
										const nextBox = document.querySelector('.next-motorcycle-box');
										!!nextBox ? nextBox.classList.add('is-animate') : null;
									}
								});
							}
						});
					}, 1000);
				}
			});
		}, i * 300);
	}
}