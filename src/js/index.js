import Highway from '@dogstudio/highway';
import '../sass/index.scss';

import { TweenMax, TimelineMax } from 'gsap';
import * as ScrollMagic from 'scrollmagic';

import Fade from "./router-transitions/fade";
import HomeRenderer from "./renderers/home";
import AboutRenderer from "./renderers/about";
import {loadImages} from "./common/loadImages";
import {splittingText} from "./common/splittingText";
import {toggleAboutTitles} from "./common/home/toggleAboutTitles";
import {followMouseButton} from "./common/followMouseButton";
import {playVideos} from "./common/home/playVideos";
import {preloader} from "./common/preloader";
import {loadHomeHeroContent} from "./common/home/loadHomeHeroContent";
import MotorcycleRenderer from "./renderers/motorcycle";
import MotorcycleHome from "./router-transitions/motorcycle-home";
import {scrollListener} from "./scroll/scrollListener";
import {ScrollMagicPluginGsap, ScrollMagicPluginIndicator} from "scrollmagic-plugins";
import {locoScroll} from "./scroll/locoScroll";
import './common/nav/switchNavOnBurgerClick';

/*
Preload page
 */
// preloader();
// loadHomeHeroContent();

/*
Init core router transition
 */
const H = new Highway.Core({
	renderers: {
		home: HomeRenderer,
		about: AboutRenderer,
		motorcycle: MotorcycleRenderer,
	},
	transitions: {
		default: Fade,
		contextual: {
			motorcycleHome: MotorcycleHome,
		}
	}
});

/*
Toggle active class on navigation
 */
const links = document.querySelectorAll('.nav-link');
H.on('NAVIGATE_IN', ({ to, location }) => {
	for (let i = 0; i < links.length; i++) {
		const link = links[i];
		link.classList.remove('is-current');
		if (link.href === location.href) {
			link.classList.add('is-current');
		}
	}
});

/*
Init events listener on scroll
 */
// scrollListener();

H.on('NAVIGATE_IN', () => {
	loadImages();
	splittingText();
	followMouseButton();
});

document.addEventListener("DOMContentLoaded", function(event) {
	loadImages();
	splittingText();
	followMouseButton();
});

ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);


// setTimeout(() => {
//
// 	locoScroll.scrollTo(document.querySelector('#arch-method-143'), {
// 		duration: 5,
// 		disableLerp: true,
// 		callback: () => {
// 			locoScroll.update();
// 			console.log('scrolled');
// 		}
// 	});
//
// }, 1000);

// document.querySelector('.advantages-box-title').addEventListener('click', () => {
// 	const cloneSpots = document.querySelectorAll('.spot img');
// 	for(let i = 0; i < cloneSpots.length; i++) {
// 		setTimeout(() => {
// 			cloneSpots[i].style.opacity = 1;
// 		}, i*100);
// 	}
// });