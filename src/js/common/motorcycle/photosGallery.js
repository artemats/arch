import Splide from '@splidejs/splide';

export const initPhotosGallery = () => {

	const photoGalleries = document.querySelectorAll('.photos');

	for(let i = 0; i < photoGalleries.length; i++) {

		if(!!photoGalleries[i]) {

			const splide = new Splide(photoGalleries[i], {
				type: 'loop',
				drag: 'free',
				perPage: 3,
				pagination: false,
				arrows: false,
				autoWidth: true,
				speed: 10000,
				easing: 'linear',
			});

			splide.mount();

		}

	}

};