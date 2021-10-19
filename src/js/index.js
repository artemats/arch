import Highway from '@dogstudio/highway';
import '../sass/index.scss';
import Fade from "./router-transitions/fade";
import HomeRenderer from "./renderers/home";
import AboutRenderer from "./renderers/about";
import {scrollListener} from "./scroll/scrollListener";
import {loadImages} from "./common/loadImages";
import {splittingText} from "./common/splittingText";
import {locoScroll} from "./scroll/locoScroll";
import {toggleAboutTitles} from "./common/home/toggleAboutTitles";
import {followMouseButton} from "./common/followMouseButton";
import {playVideos} from "./common/home/playVideos";

/*
Init core router transition
 */
const H = new Highway.Core({
	renderers: {
		home: HomeRenderer,
		about: AboutRenderer,
	},
	transitions: {
		default: Fade
	}
});

/*
Init events listener on scroll
 */
scrollListener();

/*
Load images
 */
H.on('NAVIGATE_END', () => {
	loadImages();
	splittingText();
	toggleAboutTitles();
	followMouseButton();
	playVideos();
});

// H.on('NAVIGATE_IN', () => {
// 	loadImages();
// });


document.addEventListener("DOMContentLoaded", function(event) {
	loadImages();
	splittingText();
	toggleAboutTitles();
	followMouseButton();
	playVideos();`01`
});

// locoScroll.scrollTo(document.querySelector('#home-videos'), {
// 	// duration: 5,
// 	// disableLerp: true,
// 	callback: () => {
// 		locoScroll.update();
// 		console.log('scrolled');
// 	}
// });