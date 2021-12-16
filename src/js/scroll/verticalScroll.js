import { gsap } from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initVerticalScroll = () => {

	const scrollContainer = document.querySelector('#vertical-scroll-container');

	if(scrollContainer) {

		const verticalLocoScroll = new LocomotiveScroll({
			el: scrollContainer,
			smooth: true,
			// direction: 'horizontal',
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

		console.log('vertical');

		return verticalLocoScroll;

	}

}

if(!!document.querySelector('#vertical-scroll-container')) {

	gsap.registerPlugin(ScrollTrigger);

	initVerticalScroll().on('scroll', ScrollTrigger.update);

	ScrollTrigger.scrollerProxy('#horizontal-scroll-container', {
		scrollTop(value) {
			return arguments.length ? initVerticalScroll().scrollTo(value, 0, 0) : initVerticalScroll().scroll.instance.scroll.y;
		},
		// scrollLeft(value) {
		// 	return arguments.length ? verticalLocoScroll.scrollTo(value, 0, 0) : verticalLocoScroll.scroll.instance.scroll.x;
		// },
		getBoundingClientRect() {
			return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
		},
		pinType: document.querySelector('#vertical-scroll-container').style.transform ? 'transform' : 'fixed'
	});

	ScrollTrigger.addEventListener('refresh', () => initVerticalScroll().update());
	ScrollTrigger.refresh();

}