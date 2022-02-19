import {pauseHomeHeroVideo, playHomeHeroVideo} from "../common/home/togglePlayingHomeVideo";
import {setWhiteColorTheme} from "../common/switchColorTheme";
import {switchHeaderNav} from "../common/switchHeaderNav";
import {switchGrid} from "../common/grid/switchGrid";
import {locoScroll} from "./locoScroll";
import {changeZIndex} from "../common/scrollContainer/changeZIndex";
import {showContentOnScroll} from "../common/content/showContentOnScroll";
import {parallaxImagesOnScroll} from "../common/content/parallaxImagesOnScroll";

export const scrollListener = () => {

	locoScroll.on('call', (func, dir, obj) => {
		/*
		Detect home hero section
		 */
		if (func === 'homeHero' && dir === 'enter') {
			// playHomeHeroVideo();
			// switchMotorcycles(obj);
			switchGrid(true);
			changeZIndex(0);
			playHomeHeroVideo();
		}
		if (func === 'homeHero' && dir === 'exit') {
			changeZIndex(2);
			pauseHomeHeroVideo();
		}
		/*
		Detect home motorcycle sections
		 */
		// if (func === 'homeMotorcycle' && dir === 'enter') {
		// 	switchGrid(false);
		// 	pauseHomeHeroVideo();
		// 	switchMotorcycles(obj);
		// }
		/*
		Switch color theme
		 */
		if (func === 'switchToWhiteColorTheme' && dir === 'enter') {
			setWhiteColorTheme(true);
		}
		if (func === 'switchToWhiteColorTheme' && dir === 'exit') {
			setWhiteColorTheme(false);
		}

		/*
		About banner section on home page
		 */
		if (func === 'homeAboutBanner' && dir === 'enter') {
			switchGrid(false);
		}

		if (func === 'homeAbout' && dir === 'enter') {
			switchGrid(true);
		}

		if (func === 'homeVideos' && dir === 'enter') {
			switchGrid(false);
		}
		if (func === 'homeVideos' && dir === 'exit') {
			switchGrid(true);
		}

		/*
		Switch header nav with footer visible on scroll
		 */
		if (func === 'footer' && dir === 'enter') {
			switchHeaderNav(0);
		}
		if(func === 'footer' && dir === 'exit') {
			switchHeaderNav(1)
		}

		/*
		Show content on horizontal scroll
		 */
		if (func === 'showContentOnHorizontalScroll' && dir === 'enter') {
			showContentOnScroll(obj.el);
		}

		/*
		Parallax images on horizontal scroll
		 */
		if (func === 'parallaxImagesOnHorizontalScroll' && dir === 'enter') {
			parallaxImagesOnScroll(obj.el);
		}

	});

};