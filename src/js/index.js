import Highway from '@dogstudio/highway';
import '../sass/index.scss';

import { TweenMax, TimelineMax } from 'gsap';
import * as ScrollMagic from 'scrollmagic';

import Fade from "./router-transitions/fade";
import MotorcycleHome from "./router-transitions/motorcycle-home";
import NextMotorcycle from "./router-transitions/next-motorcycle";
import MenuTransition from "./router-transitions/menu";
import HomeRenderer from "./renderers/home";
import AboutRenderer from "./renderers/about";
import ContactRenderer from "./renderers/contact";
import BuildsRenderer from "./renderers/builds";
import {loadImages} from "./common/loadImages";
import {splittingText} from "./common/splittingText";
import {toggleAboutTitles} from "./common/home/toggleAboutTitles";
import {followMouseButton} from "./common/followMouseButton";
import {playVideos} from "./common/home/playVideos";
import {preloader} from "./common/preloader";
import {loadHomeHeroContent} from "./common/home/loadHomeHeroContent";
import MotorcycleRenderer from "./renderers/motorcycle";
import {scrollListener} from "./scroll/scrollListener";
import {ScrollMagicPluginGsap, ScrollMagicPluginIndicator} from "scrollmagic-plugins";
import {locoScroll} from "./scroll/locoScroll";
import './common/nav/switchNavOnBurgerClick';
import {updateBodyHeight} from "./common/updateBodyHeight";

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
		contact: ContactRenderer,
		builds: BuildsRenderer,
	},
	transitions: {
		default: Fade,
		contextual: {
			motorcycleHome: MotorcycleHome,
			nextMotorcycle: NextMotorcycle,
			menu: MenuTransition,
		}
	}
});

/*
Toggle active class on navigation
 */
// const links = document.querySelectorAll('.nav-link');
// H.on('NAVIGATE_IN', ({ to, location }) => {
// 	for (let i = 0; i < links.length; i++) {
// 		const link = links[i];
// 		link.classList.remove('is-current');
// 		if (link.href === location.href) {
// 			link.classList.add('is-current');
// 		}
// 	}
// });

/*
Init events listener on scroll
 */
// scrollListener();

H.on('NAVIGATE_IN', () => {
	loadImages();
	splittingText();
	followMouseButton();
});

// H.on('NAVIGATE_END', () => {
// 	document.querySelector('.burger').classList.contains('is-active') ? switchMainNav(false) : null;
// });

document.addEventListener("DOMContentLoaded", function(event) {
	loadImages();
	splittingText();
	followMouseButton();

	// locoScroll.scrollTo('#home-about');

});

ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

window.addEventListener('resize', () => {
	updateBodyHeight();
});