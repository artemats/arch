import { TweenLite } from 'gsap';
import {locoScroll} from "../../scroll/locoScroll";
import videojs from 'video.js';
import Player from '@vimeo/player';
import {switchHeaderFooterLogo} from "../content/switchHeaderFooterLogo";
import {hidePlayPauseButtonOnMove, showPlayPauseButtonOnMove} from "../home/playVideos";
import {breakpoints} from "../../constants/breakpoints";

export const toggleVideo = () => {
	const wrap = document.querySelectorAll('.toggle-video');
	const iframes = document.querySelectorAll('.vimeo-player');
	if (!!wrap.length && !!iframes.length) {

		for (let i = 0; i < iframes.length; i++) {

			const box = wrap[i].querySelector('.video-box');

			const player = new Player(iframes[i]);

			box.addEventListener('click', () => {
				if (wrap[i].classList.contains('is-fixed')) {
					wrap[i].classList.remove('is-fixed');
					if (window.innerWidth >= breakpoints.width.minDesktop) {
						pauseVideo(box, player);
					} else {
						player.pause();
						box.classList.remove('is-playing');
					}
				} else {
					wrap[i].classList.add('is-fixed');
					if (window.innerWidth >= breakpoints.width.minDesktop) {
						playVideo(box, player);
					} else {
						console.log('play on mobile');
						player.play();
						box.classList.add('is-starting');
						box.classList.add('is-playing');
					}
				}
			});

			if (window.innerWidth >= breakpoints.width.minDesktop) {
				showPlayPauseButtonOnMove(box);
				hidePlayPauseButtonOnMove(box);
			}
		}
	}
}

const playVideo = (box, player) => {
	locoScroll.stop();
	switchHeaderFooterLogo(false);
	setTimeout(() => {
		let WINDOW = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		let boxXY = {
			x: box.getBoundingClientRect().left,
			y: box.getBoundingClientRect().top,
		};
		TweenLite.to(box, {
			y: 0,
			x: (0 - boxXY.x),
			width: WINDOW.width,
			height: WINDOW.height,
			onComplete: () => {
				player.play();
				box.classList.add('is-starting');
				box.classList.add('is-playing');
			}
		});
	}, 500)
};

const pauseVideo = (box, player) => {
	player.pause();
	box.classList.remove('is-playing');
	TweenLite.to(box, {
		y: 0,
		x: 0,
		width: '84vmin',
		height: '63vmin',
		onComplete: () => {
			locoScroll.start();
			switchHeaderFooterLogo(true);
		}
	});
	TweenLite.set(box.querySelector('.video-btn'), {
		opacity: 0,
	});
};