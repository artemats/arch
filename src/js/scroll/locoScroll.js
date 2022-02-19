import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import ScrollTrigger from 'gsap/ScrollTrigger';

const scrollContainer = document.querySelector('#horizontal-scroll-container');
gsap.registerPlugin(ScrollTrigger);

export const locoScroll = new LocomotiveScroll({
	el: scrollContainer,
	smooth: true,
	direction: 'horizontal',
	gestureDirection: 'vertical',
	reloadOnContextChange: true,
	resetNativeScroll: false,
	lerp: 0.07,
	// multiplier: 0.8,
	tablet: {
		smooth: true,
		direction: 'horizontal',
	},
	smartphone: {
		smooth: true,
	},
});

locoScroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#horizontal-scroll-container', {
	// scrollTop(value) {
	// 	return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
	// },
	scrollLeft(value) {
		return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.x;
	},
	getBoundingClientRect() {
		return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
	},
	pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
});

ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
ScrollTrigger.refresh();