import {switchGrid} from "../grid/switchGrid";
import {switchSlicedText} from "../content/switchSlicedText";
import {playHomeHeroVideo} from "./togglePlayingHomeVideo";
import {switchHeaderFooterLogo} from "../content/switchHeaderFooterLogo";

export const loadHomeHeroContent = () => {
	const preloaderDOM = document.querySelector('#preloader');
	const hero = document.querySelector('.hero-content.box-split');
	if(!!preloaderDOM) {
		preloaderDOM.remove();
	}
	switchGrid(true);
	setTimeout(() => switchSlicedText(hero, true), 1000);
	setTimeout(() => playHomeHeroVideo(), 1500);
	setTimeout(() => switchHeaderFooterLogo(true), 2000);

	// switchGrid(true);
	console.log('load home content');

}