import Tween from "gsap";
import {transitionConstants} from "../../constants/transition";
import {breakpoints} from "../../constants/breakpoints";

export const moveBuilds = () => {
	const wrap = document.querySelector('.builds-wrap');
	const wrapItem = document.querySelector('.builds-wrap-item');
	let enableMove = true;
	wrap.addEventListener('mousemove', ({ x, y }) => {
		if (enableMove && window.innerWidth >= breakpoints.width.minDesktop) {
			Tween.to(wrapItem, {
				x: (0 - x + window.innerWidth / 2) / (window.innerWidth / window.innerHeight),
				y: (0 - y + window.innerHeight / 2) / (window.innerWidth / window.innerHeight - 0.5),
				duration: transitionConstants.draw.duration,
				ease: transitionConstants.draw.ease,
			});
		}
	});

	/*
	Open single build
	 */
	const builds = document.querySelectorAll('.build');
	for (let i = 0; i < builds.length; i++) {
		builds[i].querySelector('.build-thumb').addEventListener('click', () => {
			enableMove = false;
			wrap.classList.add('is-focused');
			builds[i].parentNode.classList.add('is-active');
			if (window.innerWidth < breakpoints.width.minDesktop) {
				Tween.to(window, {
					scrollTo: builds[i],
				});
				document.body.classList.add('no-scroll');
				document.getElementsByTagName('html')[0].classList.add('no-scroll');
			}
			setTimeout(() => {
				const {x, y} = builds[i].getBoundingClientRect();
				Tween.to(builds[i], {
					x: 0 - x,
					y: 0 - y,
					width: window.innerWidth,
					height: window.innerHeight,
					duration: transitionConstants.move.duration,
					ease: transitionConstants.move.ease,
					onComplete: () => {
						builds[i].parentNode.classList.add('is-present');
					}
				});
			}, 500);
		});
	}
	/*
	Close single build
	 */
	const closeElem = document.querySelector('.close-build');
	closeElem.addEventListener('click', () => {
		document.querySelector('.builds-row-item.is-active.is-present').classList.remove('is-present');
		if (window.innerWidth < breakpoints.width.minDesktop) {
			document.body.classList.remove('no-scroll');
			document.getElementsByTagName('html')[0].classList.remove('no-scroll');
		}
		setTimeout(() => {
			Tween.to(document.querySelector('.builds-row-item.is-active .build'), {
				x: 0,
				y: 0,
				width: '100%',
				height: '100%',
				duration: transitionConstants.move.duration,
				ease: transitionConstants.move.ease,
				onComplete: () => {
					wrap.classList.remove('is-focused');
					document.querySelector('.builds-row-item.is-active').classList.remove('is-active');
					enableMove = true;
				}
			});
		}, 1000);
	});
};