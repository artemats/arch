import Highway from '@dogstudio/highway';
import {loadHomeHeroContent} from '../common/home/loadHomeHeroContent';
import {changeZIndex} from '../common/scrollContainer/changeZIndex';
import {switchTopShadow} from '../common/switchTopShadow';
import {locoScroll} from "../scroll/locoScroll";
import {enableHorizontalScroll} from "../scroll/horizontalScroll";
import {preloader} from "../common/preloader";
import {toggleAboutTitles} from "../common/home/toggleAboutTitles";
import {playVideos} from "../common/home/playVideos";
import {setWhiteColorTheme} from "../common/switchColorTheme";
import {horizontalScene} from "../scroll/scenes/horizontalScene";
import {resetParallaxMoving} from "../common/content/resetParallaxMoving";
import {switchHeaderNav} from "../common/switchHeaderNav";
import {loadVimeoPlayer} from "../common/loadVimeoPlayer";

class HomeRenderer extends Highway.Renderer {
	onEnter() {
		/* prod */
		preloader();
		if(!document.querySelector('.preloader')) {
			loadHomeHeroContent();
		}
		/* end prod */
		loadVimeoPlayer();
		enableHorizontalScroll();
		locoScroll.destroy();
		changeZIndex();
		switchTopShadow(false);
		toggleAboutTitles();
		playVideos();
		setWhiteColorTheme(false);
	}
	onEnterCompleted() {
		/* dev */
		// loadHomeHeroContent();
		/* end dev */
		locoScroll.init();
		if (!!document.querySelector('[data-scroll-direction="horizontal"]')) {
			horizontalScene();
			resetParallaxMoving();
			switchHeaderNav(1);
		}
	}
	onLeave() {

	}
}

export default HomeRenderer;