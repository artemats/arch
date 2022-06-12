export const updateBodyHeight = () => {
	if (!!document.querySelector('#vertical-scroll-container')) {
		document.body.style.height = document.querySelector('#vertical-scroll-container').clientHeight + 'px';
	}
	if (!!document.querySelector('#horizontal-scroll-container')) {
		document.body.style.height = document.querySelector('#horizontal-scroll-container').clientHeight + 'px';
	}
}