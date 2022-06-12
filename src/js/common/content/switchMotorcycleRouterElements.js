export const switchMotorcycleRouterElements = (status) => {

	const nextMotorcycle = document.querySelector('.next-motorcycle');

	if (status) {
		document.body.classList.remove('is-dark');
		!!nextMotorcycle ? nextMotorcycle.classList.remove('is-visible') : null;
		document.querySelector('.grid').classList.remove('is-hidden');
		document.querySelector('.section-background').classList.remove('is-hidden');
	} else {
		document.body.classList.add('is-dark');
		!!nextMotorcycle ? nextMotorcycle.classList.add('is-visible') : null;
		document.querySelector('.section-background').classList.add('is-hidden');
	}
}