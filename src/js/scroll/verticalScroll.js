import { TweenLite } from 'gsap';
import {breakpoints} from "../constants/breakpoints";

const html = document.documentElement;
const body = document.body;
let scene = null;

const scroller = {
	target: document.querySelector('#vertical-scroll-container'),
	ease: 0.05, // <= scroll speed
	endY: 0,
	y: 0,
	resizeRequest: 1,
	scrollRequest: 0,
};

let requestId = null;

TweenLite.set(scroller.target, {
	rotation: 0.01,
	force3D: true
});

export function initVerticalScroll() {
	// back to start position //
	if (window.innerWidth >= breakpoints.width.minDesktop) {
		scroller.ease = 0;
		window.scrollTo(0, 0);
		TweenLite.set(document.querySelector('#vertical-scroll-container'), {
			y: 0,
			onComplete: () => {
				body.style.height = document.querySelector('#vertical-scroll-container').clientHeight + 'px';
				updateScroller();
			}
		});

		window.focus();
		window.addEventListener('resize', onResize);
		document.addEventListener('scroll', onScroll);
	}
}

function updateScroller() {

	scroller.ease = 0.05;
	const resized = scroller.resizeRequest > 0;
	scroller.target = document.querySelector('#vertical-scroll-container');

	if(resized && !!scroller.target) {
		const height = scroller.target.clientHeight;
		body.style.height = height + 'px';
		scroller.resizeRequest = 0;
	}

	const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

	scroller.endY = scrollY;
	scroller.y += (scrollY - scroller.y) * scroller.ease;

	if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
		scroller.y = scrollY;
		scroller.scrollRequest = 0;
	}

	TweenLite.set(scroller.target, {
		y: -scroller.y
	});

	if (scene) {
		scene.refresh();
	}

	requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
	scroller.scrollRequest++;
	if (!requestId) {
		requestId = requestAnimationFrame(updateScroller);
	}
}

function onResize() {
	scroller.resizeRequest++;
	if (!requestId) {
		requestId = requestAnimationFrame(updateScroller);
	}
}