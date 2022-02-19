import gsap, { TweenLite, TimelineMax } from 'gsap';
import {transitionConstants} from "../../constants/transition";
import Splide  from "@splidejs/splide";

let row1, row2, row3, row4, row5, row6;

export const switchMainNav = (status) => {

	const nav = document.querySelector('#nav');
	const burger = document.querySelector('.burger');

	if (!!nav && !!burger && status) {
		burger.classList.add('is-active');
		toggleNav(true, burger);
		collapseBurgerArrows();
		initNavLinkMoving();
		console.log('open nav');
	} else if (!!nav && !!burger) {
		burger.classList.remove('is-active');
		toggleNav(false, burger);
		unCollapseBurgerArrows();
		console.log('close nav');
	}

};

const collapseBurgerArrows = () => {
	const arrows = document.querySelectorAll('.burger-box-arrow');
	TweenLite.to(arrows, {
		left: '50%',
		marginLeft: -1,
		duration: 0.3,
		onComplete: () => {
			TweenLite.to(arrows[0], { transform: 'rotate(45deg)', duration: 0.2 });
			TweenLite.set(arrows[1], { opacity: 0 });
			TweenLite.to(arrows[2], { transform: 'rotate(-45deg)', duration: 0.2 });
			setTimeout(() => {
				TweenLite.to(arrows, { color: '#111111' });
			}, 500);
		}
	});
};

const unCollapseBurgerArrows = () => {
	const arrows = document.querySelectorAll('.burger-box-arrow');
	TweenLite.to(arrows, {
		transform: 'none',
		duration: 0.3,
		onComplete: () => {
			TweenLite.to(arrows[0], { left: 0, marginLeft: 0, duration: 0.2 });
			TweenLite.set(arrows[1], { opacity: 1 });
			TweenLite.to(arrows[2], { left: 'calc(100% - 2px)', marginLeft: 0 });
			setTimeout(() => {
				TweenLite.to(arrows, { color: '#FFFFFF' });
			}, 500);
		}
	});
};

const toggleNav = (status, burger) => {
	const navBox = document.querySelector('.header-nav');
	const nav = document.querySelector('.nav');
	const navThumb = document.querySelector('.nav-column-thumb');
	const navLinks = document.querySelectorAll('.nav-link-row');
	burger.style.pointerEvents = 'none';
	if (status) {
		// show nav
		TweenLite.set(navBox, {
			display: 'block',
			onComplete: () => {
				TweenLite.to(nav, {
					opacity: 1,
					duration: 0.2,
					onComplete: () => {
						// show columns bg
						TweenLite.to(nav.querySelectorAll('.nav-column-bg'), {
							height: '100%',
							duration: transitionConstants.move.duration,
							ease: transitionConstants.move.ease,
							onComplete: () => {
								// show nav rows
								nav.classList.add('is-visible');
								burger.style.pointerEvents = 'auto';
							}
						});
						// show nav image
						setTimeout(() => {
							TweenLite.to(navThumb, {
								opacity: 1,
								duration: transitionConstants.move.duration,
								ease: transitionConstants.move.ease,
							});
						}, 200);
					}
				});
			}
		});
	} else {
		// hide nav rows
		nav.classList.remove('is-visible');
		// hide nav image
		setTimeout(() => {
			TweenLite.to(navThumb, {
				opacity: 0,
				duration: transitionConstants.move.duration,
				ease: transitionConstants.move.ease,
				onComplete: () => {
					// hide columns bg
					TweenLite.to(nav.querySelectorAll('.nav-column-bg'), {
						height: 0,
						duration: transitionConstants.move.duration,
						ease: transitionConstants.move.ease,
						onComplete: () => {
							// hide nav
							TweenLite.set(nav, {
								opacity: 0,
								onComplete: () => {
									TweenLite.set(navBox, {
										display: 'none',
									});
									stopNavLinkMoving();
									burger.style.pointerEvents = 'auto';
								}
							});
						}
					});
				}
			});
		}, 200);

	}
};

const initNavLinkMoving = () => {
	const linkRows = document.querySelectorAll('.nav-link.splide');
	const settings = {
		type: 'loop',
		perPage: 1,
		rewind: true,
		arrows: false,
		pagination: false,
		speed: 20000,
		easing: 'linear',
		autoWidth: true,
		autoplay: true,
		interval: 0,
		pauseOnHover: false,
		pauseOnFocus: false,
	}
	if (!linkRows[0].classList.contains('is-active')) {
		row1 = new Splide(linkRows[0], {
			...settings
		}).mount();
		row2 = new Splide(linkRows[1], {
			...settings,
			direction: 'rtl',
			speed: 13000,
		}).mount();
		row3 = new Splide(linkRows[2], {
			...settings,
		}).mount();
		row4 = new Splide(linkRows[3], {
			...settings,
			direction: 'rtl',
			speed: 10000,
		}).mount();
		row5 = new Splide(linkRows[4], {
			...settings,
			speed: 24000,
		}).mount();
		row6 = new Splide(linkRows[5], {
			...settings,
			direction: 'rtl',
			speed: 18000,
		}).mount();
		console.log('init nav');
	} else {
		row1.Components.Autoplay.play();
		row2.Components.Autoplay.play();
		row3.Components.Autoplay.play();
		row4.Components.Autoplay.play();
		row5.Components.Autoplay.play();
		row6.Components.Autoplay.play();
		console.log('move nav');
	}

}

const stopNavLinkMoving = () => {
	row1.destroy();
	row2.destroy();
	row3.destroy();
	row4.destroy();
	row5.destroy();
	row6.destroy();
	console.log('pause nav');
}