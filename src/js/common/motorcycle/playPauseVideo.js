export const playPauseVideo = (video, status) => {
	status && !!video ? video.play() : video.pause();
};