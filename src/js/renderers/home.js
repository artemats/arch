import Highway from '@dogstudio/highway';
import {loadHomeHeroContent} from "../common/home/loadHomeHeroContent";

class HomeRenderer extends Highway.Renderer {
	onEnter() {
		document.documentElement.classList.add('has-scroll-smooth');
		if(!document.querySelector('.preloader')) {
			loadHomeHeroContent();
			console.log('enter to home');
		}

	}
}

export default HomeRenderer;