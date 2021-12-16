import Highway from '@dogstudio/highway';
import '../sass/index.scss';
import Fade from "./router-transitions/fade";
import HomeRenderer from "./renderers/home";
import AboutRenderer from "./renderers/about";
// import {scrollListener} from "./scroll/scrollListener";
import {loadImages} from "./common/loadImages";
import {splittingText} from "./common/splittingText";
import {toggleAboutTitles} from "./common/home/toggleAboutTitles";
import {followMouseButton} from "./common/followMouseButton";
import {playVideos} from "./common/home/playVideos";
import {preloader} from "./common/preloader";
import {loadHomeHeroContent} from "./common/home/loadHomeHeroContent";
import MotorcycleRenderer from "./renderers/motorcycle";
import MotorcycleHome from "./router-transitions/motorcycle-home";
import {initHorizontalScroll} from "./scroll/horizontalScroll";
// import {locoScroll} from "./scroll/locoScroll";

/*
Preload page
 */
// preloader();
loadHomeHeroContent();

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
Init events listener on scroll
 */
// scrollListener();

/*
Load images
 */
// H.on('NAVIGATE_END', () => {
//
// });

H.on('NAVIGATE_IN', () => {
	loadImages();
	splittingText();
	// toggleAboutTitles();
	followMouseButton();
	playVideos();

	initHorizontalScroll();
});


document.addEventListener("DOMContentLoaded", function(event) {
	loadImages();
	splittingText();
	// toggleAboutTitles();
	followMouseButton();
	playVideos();
});

// setTimeout(() => {
//
// 	locoScroll.scrollTo(document.querySelector('#arch-krgt-1'), {
// 		duration: 5,
// 		disableLerp: true,
// 		callback: () => {
// 			locoScroll.update();
// 			console.log('scrolled');
// 		}
// 	});
//
// }, 5000);