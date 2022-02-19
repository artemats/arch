import { TweenLite } from 'gsap';
import {locoScroll} from "../../scroll/locoScroll";
import {transitionConstants} from "../../constants/transition";
import videojs from 'video.js';

export const playVideos = () => {
	if(!!document.querySelector('#home-videos')) {
		setVideosStyles();
		const videosList = document.querySelector('.home-videos-list');
		const videos = document.querySelectorAll('.home-video');

		if (videos.length) {
			for (let i = 0; i < videos.length; i++) {

				videos[i].addEventListener('click', () => {

					let video = videos[i].querySelector('.home-video-item');
					let videoElem = video.querySelector('video');

					const options = {
						responsive: true,
						muted: false,
						controls: false,
						loop: false,
						preload: 'auto',
					};

					const player = videojs(videoElem.getAttribute('id'), options, function onPlayerReady() {
						this.on('ended', function () {
							alert('Awww...over so soon?!');
						});
					});

					if (videosList.classList.contains('is-fixed')) {
						videos[i].classList.remove('is-starting');
						videosList.classList.remove('is-fixed');
						exitPlayer(video, videos[i], player);
					} else {
						videos[i].classList.add('is-starting');
						videosList.classList.add('is-fixed');
						enterPlayer(video, videos[i], player);
					}

				});

				videos[i].addEventListener('mousemove', () => {
					TweenLite.set(videos[i].querySelector('.video-btn'), {
						opacity: 1,
						duration: transitionConstants.opacity.duration,
						ease: transitionConstants.opacity.ease,
						onComplete: () => {
							if (videos[i].classList.contains('is-playing')) {
								setTimeout(() => {
									TweenLite.to(videos[i].querySelector('.video-btn'), {
										opacity: 0,
										duration: transitionConstants.opacity.duration,
										ease: transitionConstants.opacity.ease,
									});
								}, 1000);
							}
						}
					});
				});

				videos[i].addEventListener('mouseleave', () => {
					TweenLite.set(videos[i].querySelector('.video-btn'), {
						opacity: 0,
						duration: transitionConstants.opacity.duration,
						ease: transitionConstants.opacity.ease,
					});
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
	setTimeout(() => {
		// show header //
		switchHeader(1);
		TweenLite.to(video, {
			y: 0,
			x: 0,
			width: '100%',
			height: '250%',
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
	const videosWrapHeight = document.querySelector('.home-videos').getBoundingClientRect().height;
	const videosWrapTitleHeight = document.querySelector('.home-videos-title').getBoundingClientRect().height;
	const videosList = document.querySelector('.home-videos-list');

	videosList.style.height = `calc(${(videosWrapHeight - videosWrapTitleHeight)}px - 11vmin)`;
};