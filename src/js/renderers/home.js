import Highway from '@dogstudio/highway';
import {loadHomeHeroContent} from '../common/home/loadHomeHeroContent';
import {changeZIndex} from '../common/scrollContainer/changeZIndex';
import {switchTopShadow} from '../common/switchTopShadow';
// import {initHorizontalScroll} from "../scroll/horizontalScroll";
// import {scrollListener} from "../scroll/scrollListener";

class HomeRenderer extends Highway.Renderer {
	onEnter() {
		// document.documentElement.classList.add('has-scroll-smooth');
		if(!document.querySelector('.preloader')) {
			loadHomeHeroContent();
			console.log('enter to home');
		}
		changeZIndex();
		switchTopShadow(false);
		//
		// initHorizontalScroll();
		// scrollListener();
	}
	onEnterCompleted() {

	}
}

export default HomeRenderer;