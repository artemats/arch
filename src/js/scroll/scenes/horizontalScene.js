import * as ScrollMagic from 'scrollmagic';
import {switchMotorcycle} from "../../common/switchMotorcycles";
import Tween from "gsap";
import {switchHeaderNav} from "../../common/switchHeaderNav";
import {changeZIndex} from "../../common/scrollContainer/changeZIndex";
import {pauseHomeHeroVideo} from "../../common/home/togglePlayingHomeVideo";
import {breakpoints} from "../../constants/breakpoints";
import {switchGrid} from "../../common/grid/switchGrid";

export const horizontalScene = () => {

	const controller = new ScrollMagic.Controller({
		vertical: window.innerWidth < breakpoints.width.minDesktop,
	});

	/*
	Motorcycles
	 */
	const motorcycles = document.querySelectorAll('.section.__motorcycle');
	for (let i = 0; i < motorcycles.length; i++) {
		new ScrollMagic.Scene({
			triggerElement: motorcycles[i],
			triggerHook: 0.5,
			duration: window.innerWidth >= breakpoints.width.minDesktop ? motorcycles[i].clientWidth : window.innerHeight * 1.5,
		})
			.addTo(controller)
			// .addIndicators({
			// 	name: `motorcycle`
			// })
			.on('enter', (e) => {
				switchMotorcycle(e.target.triggerElement(), true);
				changeZIndex(2);
				pauseHomeHeroVideo();
			})
			.on('leave', (e) => {
				switchMotorcycle(e.target.triggerElement(), false);
				changeZIndex(0);
			})
	}

	/*
	Video scale
	 */
	const videoBox = document.querySelector('.scale-on-scroll');
	if (!!videoBox) {
		const thumb = videoBox.querySelector('.video-thumbnail');
		new ScrollMagic.Scene({
			triggerElement: videoBox,
			duration: thumb.getBoundingClientRect().width,
			triggerHook: 0,
		})
			.setTween(
				Tween.to(thumb, {
					width: window.innerWidth,
					height: window.innerHeight,
				})
			)
			.addTo(controller);
	}

	/*
	Footer
	 */
	const footer = document.querySelector('.footer');
	if (!!footer) {
		new ScrollMagic.Scene({
			triggerElement: footer,
			triggerHook: 0.5,
			// duration: window.innerWidth,
		})
			.on('enter', () => {
				switchHeaderNav(0);
			})
			.on('leave', () => {
				switchHeaderNav(1);
			})
			.addTo(controller);
	}

	/*
	Build motorcycle
	 */
	const parts = document.querySelector('.parts');
	const partsItems = document.querySelectorAll('.parts-item');
	if (!!parts && !!partsItems.length) {
		for (let i = 0; i < partsItems.length; i++) {
			const options = {};
			!!partsItems[i].dataset.top ? options.top = partsItems[i].dataset.top + '%' : null;
			!!partsItems[i].dataset.left ? options.left = partsItems[i].dataset.left + '%' : null;
			!!partsItems[i].dataset.rotate ? options.rotate = partsItems[i].dataset.rotate + 'deg' : null;
			new ScrollMagic.Scene({
				triggerElement: document.querySelector('.about-parts-section'),
				triggerHook: 0,
				duration: window.innerWidth,
			})
				.setTween(
					Tween.to(partsItems[i], options),
				)
				.addTo(controller);
		}
	}

	/*
	Videos
	 */
	const videos = document.querySelector('#home-videos');
	if (!!videos) {
		new ScrollMagic.Scene({
			triggerElement: videos,
			triggerHook: 0.5,
		})
			.on('enter', () => {
				switchGrid(false);
			})
			.on('leave', () => {
				switchGrid(true);
			})
			.addTo(controller);
	}

}