// export const initHorizontalScroll = () => {
//
// 	const scrollContainer = document.querySelector('#horizontal-scroll-container');
//
// 	scrollContainer.addEventListener('wheel', (evt) => {
// 		evt.preventDefault();
// 		scrollContainer.scrollLeft += evt.deltaY;
// 	});
//
// 	console.log('init horizontal scroll');
//
// };

export const disableHorizontalScroll = () => {
	document.documentElement.classList.add('__reset-loco');
	document.querySelector('#horizontal-scroll-container').classList.add('__reset-loco');
}

export const enableHorizontalScroll = () => {
	document.documentElement.classList.remove('__reset-loco');
	document.querySelector('#horizontal-scroll-container').classList.remove('__reset-loco');
	document.body.style.height = document.querySelector('#horizontal-scroll-container').clientHeight + 'px';
}