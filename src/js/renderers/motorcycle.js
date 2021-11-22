import Highway from '@dogstudio/highway';
import LocomotiveScroll from 'locomotive-scroll';

class MotorcycleRenderer extends Highway.Renderer {
	onEnter() {
		console.log('enter to motorcycle');
		document.documentElement.classList.remove('has-scroll-smooth');

	}
}

export default MotorcycleRenderer;