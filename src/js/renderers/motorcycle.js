import Highway from '@dogstudio/highway';
import {switchGrid} from '../common/grid/switchGrid';
import {changeZIndex} from '../common/scrollContainer/changeZIndex';
import {switchTopShadow} from '../common/switchTopShadow';
import {initVerticalScroll} from "../scroll/verticalScroll";
import {disableHorizontalScroll} from "../scroll/horizontalScroll";
import {switchHeaderFooterLogo} from "../common/content/switchHeaderFooterLogo";
import {initPhotosGallery} from "../common/motorcycle/photosGallery";
import {motorcycleScene} from "../scroll/scenes/motorcyleScene";
import {setWhiteColorTheme} from "../common/switchColorTheme";
import {verticalAnchorNav} from "../common/motorcycle/verticalAnchorNav";
import {verticalScene} from "../scroll/scenes/verticalScene";
import {showContentOnLoad, showHiddenElements} from "../common/content/showContentOnLoad";
import {splittingText} from "../common/splittingText";
import {switchMotorcycleRouterElements} from "../common/content/switchMotorcycleRouterElements";
import {switchHeaderNav} from "../common/switchHeaderNav";
import {breakpoints} from "../constants/breakpoints";

class MotorcycleRenderer extends Highway.Renderer {
	onEnter() {
		setWhiteColorTheme(false, 'render');
		splittingText();
		disableHorizontalScroll();
		changeZIndex(2);
		switchHeaderFooterLogo(true);
		initPhotosGallery();
		verticalAnchorNav();
	}
	onEnterCompleted() {
		setWhiteColorTheme(false, 'render');
		switchMotorcycleRouterElements(true);
		if (!!document.querySelector('[data-router-view="motorcycle"]')) {
			window.innerWidth >= breakpoints.width.minDesktop ? initVerticalScroll() : null;
			switchGrid(true, false);
			switchTopShadow(true);
			verticalScene();
			motorcycleScene();
			/*
			Show content
			 */
			setTimeout(() => {
				switchGrid(true, false);
				showContentOnLoad();
				showHiddenElements();
				switchHeaderNav(1);
			}, 100);
		}
	}
}

export default MotorcycleRenderer;