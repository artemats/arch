import {breakpoints} from "../constants/breakpoints";

export const updateBodyHeight = () => {
	if (!!document.querySelector('#vertical-scroll-container') && window.innerWidth >= breakpoints.width.minDesktop) {
		document.body.style.height = document.querySelector('#vertical-scroll-container').clientHeight + 'px';
	}
	if (!!document.querySelector('#horizontal-scroll-container') && window.innerWidth >= breakpoints.width.minDesktop) {
		document.body.style.height = document.querySelector('#horizontal-scroll-container').clientHeight + 'px';
	}
}