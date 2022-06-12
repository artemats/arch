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

class ContactRenderer extends Highway.Renderer {
	onEnter() {
		console.log('enter to contact');
		setWhiteColorTheme(false);
		enableHorizontalScroll();
		locoScroll.destroy();
		changeZIndex(2);
		switchGrid(false);
		focusInput();
		detectFocusInput();
		initFormCarousel();
		switchTopShadow(false);
	}
	onEnterCompleted() {
		console.log('enter to contact completed');
		setWhiteColorTheme(false);
		locoScroll.init();
		scrollListener();
		switchHeaderFooterLogo(true);
		if (!!document.querySelector('[data-scroll-direction="horizontal"]')) {
			document.body.classList.remove('is-dark');
			switchHeaderNav(1);
		}
		/*
			Show content
			 */
		setTimeout(() => {
			showContentOnLoad();
			showHiddenElements();
		}, 100);
	}
}

export default ContactRenderer;