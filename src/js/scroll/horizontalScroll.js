import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initHorizontalScroll = () => {

	const scrollContainer = document.querySelector('#horizontal-scroll-container');

	const horizontalLocoScroll = new LocomotiveScroll({
		el: scrollContainer,
		smooth: true,
		direction: 'horizontal',
		gestureDirection: 'vertical',
		reloadOnContextChange: true,
		resetNativeScroll: false,
		lerp: 0.07,
		tablet: {
			smooth: true,
			direction: 'horizontal',
		},
		smartphone: {
			smooth: true,
		},
	});

	console.log('horizontal');

	return horizontalLocoScroll;

}

gsap.registerPlugin(ScrollTrigger);

initHorizontalScroll().on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#horizontal-scroll-container', {
	// scrollTop(value) {
	// 	return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	// },
	scrollLeft(value) {
		return arguments.length ? initHorizontalScroll().scrollTo(value, 0, 0) : initHorizontalScroll().scroll.instance.scroll.x;
	},
	getBoundingClientRect() {
		return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
	},
	pinType: document.querySelector('#horizontal-scroll-container').style.transform ? 'transform' : 'fixed'
});

ScrollTrigger.addEventListener('refresh', () => initHorizontalScroll().update());
ScrollTrigger.refresh();