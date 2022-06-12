import Tween, { TweenLite } from 'gsap';
import {transitionConstants} from "../../constants/transition";
import {locoScroll} from "../../scroll/locoScroll";

export const switchVerticalNav = (status) => {
	const nav = document.querySelector('#motorcycles-vertical-nav');
	TweenLite.to(nav, {
		pointerEvents: status ? 'auto' : 'none',
		opacity: status ? 1 : 0,
		duration: transitionConstants.move.duration,
		ease: transitionConstants.move.ease,
	});
};

export const switchVerticalAnchorNav = (id) => {
	const prev = document.querySelector('.section-nav-box.is-active');
	if (!!prev) {
		TweenLite.fromTo(prev,
			{
				opacity: 1,
				pointerEvents: 'auto',
			},
			{
				opacity: 0,
				pointerEvents: 'none',
				duration: transitionConstants.move.duration,
				ease: transitionConstants.move.ease,
			});
		prev.classList.remove('is-active');
	}
	if (!!id) {
		let current = document.querySelector(`.section-nav-box[data-anchor-motorcycle="${id}"]`);
		if (!!current) {
			TweenLite.set(current, {
				opacity: 0,
			});
			TweenLite.fromTo(current,
				{
					opacity: 0,
					pointerEvents: 'none',
				},
				{
					opacity: 1,
					pointerEvents: 'auto',
					duration: transitionConstants.move.duration,
					ease: transitionConstants.move.ease,
				});
			current.classList.add('is-active');
		}
	}
};

export const initVerticalNavCarousel = () => {
	const titles = document.querySelectorAll('.section-nav-title');
	const width = ( titles[0].getBoundingClientRect().height + 30) * 4;
	for (let i = 0; i < titles.length; i++) {
		Tween.to(titles[i], {
			x: width,
			duration: 50,
			ease: 'none',
			repeat: -1,
		})
	}

	const verticalAnchorCarousels = document.querySelectorAll('.section-nav-carousel');
	for (let i = 0; i < verticalAnchorCarousels.length; i++) {
		verticalAnchorCarousels[i].addEventListener('click', () => {
			locoScroll.scrollTo(verticalAnchorCarousels[i].dataset.scrollTo, {
				duration: 1000,
			});
		});
	}
};