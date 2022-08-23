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
import {followMouseButton} from "./common/followMouseButton";
import MotorcycleRenderer from "./renderers/motorcycle";
import {ScrollMagicPluginGsap, ScrollMagicPluginIndicator} from "scrollmagic-plugins";
import './common/nav/switchNavOnBurgerClick';
import {updateBodyHeight} from "./common/updateBodyHeight";
import {detectCurrentNavLink} from "./common/nav/detectCurrentNavLink";
import {detectExistPage} from "./common/detectExistPage";

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
Init events listener on scroll
 */
// scrollListener();

H.on('NAVIGATE_IN', () => {
	detectCurrentNavLink();
	loadImages();
	splittingText();
	followMouseButton();
	detectExistPage();
});

// H.on('NAVIGATE_END', () => {
// 	document.querySelector('.burger').classList.contains('is-active') ? switchMainNav(false) : null;
// });

document.addEventListener("DOMContentLoaded", function(event) {
	loadImages();
	splittingText();
	followMouseButton();
	detectCurrentNavLink();

	// locoScroll.scrollTo('#home-about');
});

ScrollMagicPluginIndicator(ScrollMagic);
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

window.addEventListener('resize', () => {
	updateBodyHeight();
});

detectExistPage();