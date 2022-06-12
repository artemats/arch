import { TweenLite } from 'gsap';
import {locoScroll} from "../../scroll/locoScroll";
import videojs from 'video.js';
import Player from '@vimeo/player';
import {switchHeaderFooterLogo} from "../content/switchHeaderFooterLogo";
import {hidePlayPauseButtonOnMove, showPlayPauseButtonOnMove} from "../home/playVideos";

export const toggleVideo = () => {
	const wrap = document.querySelectorAll('.toggle-video');
	const iframes = document.querySelectorAll('.vimeo-player');
	if (!!wrap.length && !!iframes.length) {

		for (let i = 0; i < iframes.length; i++) {

			const box = wrap[i].querySelector('.video-box');

			const player = new Player(iframes[i]);

			// const options = {
			// 	responsive: true,
			// 	muted: false,
			// 	controls: false,
			// 	loop: false,
			// 	preload: 'auto',
			// };
			//
			// const player = videojs(wrap[i].querySelector('video'), options, function onPlayerReady() {
			// 	this.on('ended', function () {
			// 		alert('Awww...over so soon?!');
			// 	});
			// });

			box.addEventListener('click', () => {
				if (wrap[i].classList.contains('is-fixed')) {
					wrap[i].classList.remove('is-fixed');
					pauseVideo(box, player);
				} else {
					wrap[i].classList.add('is-fixed');
					playVideo(box, player);
				}
			});

			showPlayPauseButtonOnMove(box);
			hidePlayPauseButtonOnMove(box);

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