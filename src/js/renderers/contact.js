import Highway from '@dogstudio/highway';
import {changeZIndex} from "../common/scrollContainer/changeZIndex";
import {enableHorizontalScroll} from "../scroll/horizontalScroll";
import {locoScroll} from "../scroll/locoScroll";
import {switchHeaderFooterLogo} from "../common/content/switchHeaderFooterLogo";
import {switchGrid} from "../common/grid/switchGrid";
import {scrollListener} from "../scroll/scrollListener";
import {showContentOnLoad, showHiddenElements} from "../common/content/showContentOnLoad";
import {setWhiteColorTheme} from "../common/switchColorTheme";
import {detectFocusInput, focusInput} from "../common/contact/focusInput";
import {initFormCarousel} from "../common/contact/formCarousel";
import {switchTopShadow} from "../common/switchTopShadow";
import {switchHeaderNav} from "../common/switchHeaderNav";
import {horizontalScene} from "../scroll/scenes/horizontalScene";

class ContactRenderer extends Highway.Renderer {
	onEnter() {
		setWhiteColorTheme(false);
		enableHorizontalScroll();
		locoScroll.destroy();
		changeZIndex(1);
		switchGrid(true);
		// focusInput();
		// detectFocusInput();
		// initFormCarousel();
		switchTopShadow(false);
	}
	onEnterCompleted() {
		setWhiteColorTheme(false);
		locoScroll.init();
		scrollListener();
		switchHeaderFooterLogo(true);
		if (!!document.querySelector('[data-scroll-direction="horizontal"]')) {
			document.body.classList.remove('is-dark');
			horizontalScene();
		}
		/*
			Show content
			 */
		setTimeout(() => {
			showContentOnLoad();
			showHiddenElements();
			switchHeaderNav(1);
			switchGrid(true);
			changeZIndex(1);
		}, 100);
	}
}

export default ContactRenderer;