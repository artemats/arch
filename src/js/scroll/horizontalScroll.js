import {breakpoints} from "../constants/breakpoints";

export const disableHorizontalScroll = () => {
	document.documentElement.classList.add('__reset-loco');
	document.querySelector('#horizontal-scroll-container').classList.add('__reset-loco');
}

export const enableHorizontalScroll = () => {
	document.documentElement.classList.remove('__reset-loco');
	document.querySelector('#horizontal-scroll-container').classList.remove('__reset-loco');
	if (window.innerWidth >= breakpoints.width.minDesktop) {
		document.body.style.height = document.querySelector('#horizontal-scroll-container').clientHeight + 'px';
	}
}