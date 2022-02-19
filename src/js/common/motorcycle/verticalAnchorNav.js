import Tween, { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const verticalAnchorNav = () => {

	const links = document.querySelectorAll('.vertical-anchor-link');

	for (let i = 0; i < links.length; i++){

		links[i].addEventListener('click', (e) => {
			e.preventDefault();
			let anchorTarget = links[i].getAttribute('data-anchor-link');
			let anchorTargetElement = document.querySelector('[data-anchor-target="'+anchorTarget+'"]');
			let y = Math.abs(Tween.getProperty(document.querySelector('#vertical-scroll-container'), 'y'));

			Tween.to(window, {
				scrollTo: ( y + anchorTargetElement.getBoundingClientRect().y )
			});

		});

	}

}