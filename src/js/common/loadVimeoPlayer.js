export const loadVimeoPlayer = () => {
	const iframes = document.querySelectorAll('.vimeo-player');
	if (!!iframes.length) {
		for (let i = 0; i < iframes.length; i++) {
			const preUrlPath = `https://player.vimeo.com/video/`;
			const urlPath = `?title=0&byline=0&portrait=0&transparent=1&controls=0&loop=1&responsive=1`;
			let src = !!iframes[i] ? iframes[i].getAttribute('data-src') : '';
			if (!!src && !!iframes[i]) {
				let videoUrlArray = src.split('/');
				let videoId = videoUrlArray.length ? videoUrlArray[3] : '';
				if (!!videoId) {
					iframes[i].setAttribute('src', `${preUrlPath}${videoId}${urlPath}`);
					iframes[i].removeAttribute('data-src');
				}
			}
		}
	}
}