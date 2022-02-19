export const resetParallaxMoving = () => {
	const elements = document.querySelectorAll('.parallaxHorizontalScroll');
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.transform = 'none';
	}
};