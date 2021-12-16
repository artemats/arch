import Highway from '@dogstudio/highway';
import {switchGrid} from "../common/grid/switchGrid";
import {changeZIndex} from "../common/scrollContainer/changeZIndex";
import {switchTopShadow} from "../common/switchTopShadow";
import {initVerticalScroll} from "../scroll/verticalScroll";

class MotorcycleRenderer extends Highway.Renderer {
	onEnter() {
		// document.documentElement.classList.remove('has-scroll-smooth');
		changeZIndex(2);
		// initVerticalScroll();
	}
	onEnterCompleted() {
		switchGrid(true, false);
		switchTopShadow(true);
	}
}

export default MotorcycleRenderer;