import Highway from '@dogstudio/highway';
import {changeZIndex} from "../common/scrollContainer/changeZIndex";
import {enableHorizontalScroll} from "../scroll/horizontalScroll";
import {locoScroll} from "../scroll/locoScroll";
import {horizontalScene} from "../scroll/scenes/horizontalScene";
import {resetParallaxMoving} from "../common/content/resetParallaxMoving";
import {switchHeaderFooterLogo} from "../common/content/switchHeaderFooterLogo";
import {switchGrid} from "../common/grid/switchGrid";
import {scrollListener} from "../scroll/scrollListener";
import {showContentOnLoad, showHiddenElements} from "../common/content/showContentOnLoad";
import {setWhiteColorTheme} from "../common/switchColorTheme";
import {toggleVideo} from "../common/about/toggleVideo";
import {switchHeaderNav} from "../common/switchHeaderNav";
import {switchTopShadow} from "../common/switchTopShadow";
import {loadVimeoPlayer} from "../common/loadVimeoPlayer";
import {breakpoints} from "../constants/breakpoints";

class AboutRenderer extends Highway.Renderer {
	onEnter() {
		loadVimeoPlayer();
		setWhiteColorTheme(false);
		enableHorizontalScroll();
		locoScroll.destroy();
		changeZIndex(2);
		switchGrid(true);
		switchTopShadow(window.innerWidth < breakpoints.width.minDesktop);
	}
	onEnterCompleted() {
		setWhiteColorTheme(false);
		toggleVideo();
		locoScroll.init();
		scrollListener();
		switchHeaderFooterLogo(true);
		if (!!document.querySelector('[data-scroll-direction="horizontal"]')) {
			horizontalScene();
			resetParallaxMoving();
			document.body.classList.remove('is-dark');
		}
		/*
			Show content
			 */
		setTimeout(() => {
			showContentOnLoad();
			showHiddenElements();
			switchHeaderNav(1);
			switchGrid(true);
		}, 100);
	}
}

export default AboutRenderer;