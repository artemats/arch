import Highway from '@dogstudio/highway';
import {changeZIndex} from "../common/scrollContainer/changeZIndex";
import {locoScroll} from "../scroll/locoScroll";
import {switchHeaderFooterLogo} from "../common/content/switchHeaderFooterLogo";
import {showContentOnLoad, showHiddenElements} from "../common/content/showContentOnLoad";
import {setWhiteColorTheme} from "../common/switchColorTheme";
import {moveBuilds} from "../common/builds/moveGrid";
import {initVerticalNavCarousel} from "../common/home/switchVerticalNav";
import {switchHeaderNav} from "../common/switchHeaderNav";
import {switchTopShadow} from "../common/switchTopShadow";
import {updateBodyHeight} from "../common/updateBodyHeight";

class BuildsRenderer extends Highway.Renderer {
	onEnter() {
		console.log('enter to builds');
		document.body.classList.remove('is-dark');
		setWhiteColorTheme(true);
		locoScroll.destroy();
		changeZIndex(2);
		moveBuilds();
		switchTopShadow(false);
	}
	onEnterCompleted() {
		console.log('enter to builds completed');
		setWhiteColorTheme(true);
		locoScroll.init();
		switchHeaderFooterLogo(true);
		initVerticalNavCarousel();
		/*
			Show content
			 */
		setTimeout(() => {
			showContentOnLoad();
			showHiddenElements();
			switchHeaderNav(1);
			updateBodyHeight();
		}, 100);
	}
}

export default BuildsRenderer;