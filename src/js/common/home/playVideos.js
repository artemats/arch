import { TweenLite } from 'gsap';
import {locoScroll} from "../../scroll/locoScroll";
import {transitionConstants} from "../../constants/transition";
import Player from '@vimeo/player';
import {breakpoints} from "../../constants/breakpoints";

export const playVideos = () => {
	if(!!document.querySelector('#home-videos')) {
		setVideosStyles();
		const videosList = document.querySelector('.home-videos-list');
		const videos = document.querySelectorAll('.home-video');
		const iframes = document.querySelectorAll('.vimeo-player');

		if (!!iframes.length) {
			for (let i = 0; i < iframes.length; i++) {

				const player = new Player(iframes[i]);

				videos[i].addEventListener('click', () => {

					let video = videos[i].querySelector('.home-video-item');

					if (videosList.classList.contains('is-fixed')) {
						videos[i].classList.remove('is-starting');
						videosList.classList.remove('is-fixed');
						exitPlayer(video, videos[i], player);
					} else {
						videos[i].classList.add('is-starting');
						videos[i].classList.add('is-disabled');
						videosList.classList.add('is-fixed');
						if (window.innerWidth >= breakpoints.width.minDesktop) {
							enterPlayer(video, videos[i], player);
						} else {
							videos[i].classList.add('is-hidden-poster');
							videos[i].classList.add('is-playing');
							player.play();
							// hide play pause button //
							TweenLite.to(videos[i].querySelector('.video-btn'), {
								opacity: 0,
								duration: transitionConstants.opacity.duration,
								ease: transitionConstants.opacity.ease,
							});
						}
					}

				});

				showPlayPauseButtonOnMove(videos[i]);
				hidePlayPauseButtonOnMove(videos[i]);

				player.on('play', () => {
					setTimeout(() => {
						videos[i].classList.remove('is-disabled');
					}, 1000)
				});
			}
		}
	}
}

const enterPlayer = (video, videoItem, player) => {
	setTimeout(() => {
		// hide header //
		switchHeader(0);
		let win = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		let videoXY = {
			x: video.getBoundingClientRect().left,
			y: video.getBoundingClientRect().top,
		};
		// move video to top page //
		TweenLite.to(video, {
			y: ( 0 - videoXY.y ),
			x: ( 0 - videoXY.x ),
			width: win.width,
			height: win.height,
			onComplete: () => {
				videoItem.classList.add('is-hidden-poster');
				videoItem.classList.add('is-playing');
				player.play();
				// hide play pause button //
				TweenLite.to(videoItem.querySelector('.video-btn'), {
					opacity: 0,
					duration: transitionConstants.opacity.duration,
					ease: transitionConstants.opacity.ease,
				});
			},
		});
		// stop page scroll //
		locoScroll.stop();
	}, 700);
};

const exitPlayer = (video, videoItem, player) => {
	player.pause();
	videoItem.classList.remove('is-playing');
	videoItem.classList.remove('is-hidden-poster');
	setTimeout(() => {
		// show header //
		switchHeader(1);
		TweenLite.to(video, {
			y: 0,
			x: 0,
			width: '100%',
			height: window.innerWidth >= breakpoints.width.minDesktop ? '250%' : '100%',
			onComplete: () => {
				videoItem.classList.remove('is-starting');
			},
		});
	}, 700);
	// continue scroll page //
	locoScroll.start();
};

const switchHeader = (status) => {
	const header = document.querySelector('.header');
	TweenLite.to(header, {
		opacity: status,
		duration: transitionConstants.opacity.duration,
		ease: transitionConstants.opacity.ease,
		pointerEvents: status ? 'auto' : 'none',
	});
}

const setVideosStyles = () => {
	const videosWrapTitle = document.querySelector('.home-videos-title');
	const videosWrap = document.querySelector('.home-videos');
	if (!!videosWrapTitle && !!videosWrap) {
		const videosWrapHeight = videosWrap.getBoundingClientRect().height;
		const videosWrapTitleHeight = videosWrapTitle.getBoundingClientRect().height;
		const videosList = document.querySelector('.home-videos-list');

		videosList.style.height = `calc(${(videosWrapHeight - videosWrapTitleHeight)}px - 11vmin)`;
	}
};

export const showPlayPauseButtonOnMove = (box) => {
	box.addEventListener('mousemove', () => {
		TweenLite.set(box.querySelector('.video-btn'), {
			opacity: 1,
			duration: transitionConstants.opacity.duration,
			ease: transitionConstants.opacity.ease,
			onComplete: () => {
				if (box.classList.contains('is-playing')) {
					setTimeout(() => {
						TweenLite.to(box.querySelector('.video-btn'), {
							opacity: 0,
							duration: transitionConstants.opacity.duration,
							ease: transitionConstants.opacity.ease,
						});
					}, 1000);
				}
			}
		});
	});
}

export const hidePlayPauseButtonOnMove = (box) => {
	box.addEventListener('mouseleave', () => {
		TweenLite.set(box.querySelector('.video-btn'), {
			opacity: 0,
			duration: transitionConstants.opacity.duration,
			ease: transitionConstants.opacity.ease,
		});
	});
}