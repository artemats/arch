// import { locoScroll } from "./locoScroll";
import {pauseHomeHeroVideo, playHomeHeroVideo} from "../common/home/togglePlayingHomeVideo";
import {setDarkColorTheme, setWhiteColoTheme} from "../common/switchColorTheme";
import {switchMotorcycles} from "../common/switchMotorcycles";
import {switchHeaderNav} from "../common/switchHeaderNav";
import {switchGrid} from "../common/grid/switchGrid";
import {initHorizontalScroll} from "./horizontalScroll";

export const scrollListener = () => {

	initHorizontalScroll().on('call', (func, dir, obj) => {
		/*
		Detect home hero section
		 */
		if(func === 'homeHero' && dir === 'enter') {
			// switchGrid(true);
			// playHomeHeroVideo();
			// switchMotorcycles(obj);
		}
		/*
		Detect home motorcycle sections
		 */
		if(func === 'homeMotorcycle' && dir === 'enter') {
			switchGrid(false);
			pauseHomeHeroVideo();
			switchMotorcycles(obj);
		}
		/*
		Switch color theme
		 */
		if(func === 'switchToWhiteColorTheme' && dir === 'enter') {
			setWhiteColoTheme();
		}
		if(func === 'switchToWhiteColorTheme' && dir === 'exit') {
			setDarkColorTheme();
		}

		/*
		About banner section on home page
		 */
		if(func === 'homeAboutBanner' && dir === 'enter') {
			switchMotorcycles(obj);
			switchGrid(false);
		}

		if(func === 'homeAbout' && dir === 'enter') {
			switchGrid(true);
		}

		if(func === 'homeVideos' && dir === 'enter') {
			switchGrid(false);
		}
		if(func === 'homeVideos' && dir === 'exit') {
			switchGrid(true);
		}

		/*
		Switch header nav with footer visible on scroll
		 */
		if(func === 'footer' && dir === 'enter') {
			switchHeaderNav(0);
		}
		if(func === 'footer' && dir === 'exit') {
			switchHeaderNav(1)
		}

	});

};