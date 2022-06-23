import {switchGrid} from "../grid/switchGrid";
import {switchSlicedText} from "../content/switchSlicedText";
import {playHomeHeroVideo} from "./togglePlayingHomeVideo";
import {switchHeaderFooterLogo} from "../content/switchHeaderFooterLogo";
import {initVerticalNavCarousel, switchVerticalNav} from "./switchVerticalNav";
import {scrollListener} from "../../scroll/scrollListener";

export const loadHomeHeroContent = () => {
	const preloaderDOM = document.querySelector('#preloader');
	const hero = document.querySelector('.hero-content.box-split');
	if(!!preloaderDOM) {
		preloaderDOM.remove();
	}
	switchGrid(true);
	setTimeout(() => {
		switchHeaderFooterLogo(true);
		playHomeHeroVideo();
	}, 500);
	setTimeout(() => {
		switchSlicedText(hero, true);
		switchVerticalNav(true);
		scrollListener();
		initVerticalNavCarousel();
	}, 1000);

}