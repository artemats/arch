import Highway from '@dogstudio/highway';
import {switchGrid} from '../common/grid/switchGrid';
import {changeZIndex} from '../common/scrollContainer/changeZIndex';
import {switchTopShadow} from '../common/switchTopShadow';
import {toggleHomeScenes} from "../scroll/scenes/toggleScenes";
import {initVerticalScroll} from "../scroll/verticalScroll";
import {disableHorizontalScroll} from "../scroll/horizontalScroll";
import {switchHeaderFooterLogo} from "../common/content/switchHeaderFooterLogo";
import {initPhotosGallery} from "../common/motorcycle/photosGallery";
import {archKRGT1Scene} from "../scroll/scenes/arch-krgt-1-scene";
import {setWhiteColorTheme} from "../common/switchColorTheme";
import {verticalAnchorNav} from "../common/motorcycle/verticalAnchorNav";
import {verticalScene} from "../scroll/scenes/verticalScene";
import {showContentOnLoad, showHiddenElements} from "../common/content/showContentOnLoad";

class MotorcycleRenderer extends Highway.Renderer {
	onEnter() {
		setWhiteColorTheme(false);
		disableHorizontalScroll();
		initVerticalScroll();
		changeZIndex(2);
		toggleHomeScenes(false);
		switchHeaderFooterLogo(true);
		initPhotosGallery();
		verticalAnchorNav();
	}
	onEnterCompleted() {
		if (!!document.querySelector('[data-router-view="motorcycle"]')) {
			switchGrid(true, false);
			switchTopShadow(true);
			verticalScene();
			archKRGT1Scene();
			/*
			Show content
			 */
			setTimeout(() => {
				showContentOnLoad();
				showHiddenElements();
			}, 100);
		}
	}
}

export default MotorcycleRenderer;