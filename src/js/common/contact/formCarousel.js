import Splide from '@splidejs/splide';
import Tween from 'gsap';
import {transitionConstants} from "../../constants/transition";
import { countryCodes } from '../../constants/country-codes';
import { countryStates } from '../../constants/country-states';
import {locoScroll} from "../../scroll/locoScroll";

export const initFormCarousel = () => {
	const formCarousel = document.querySelector('#contact-form-box');
	const steps = [0, 2, 4];
	if (!!formCarousel) {
		const splide = new Splide(formCarousel, {
			type: 'fade',
			drag: false,
			perPage: 1,
			pagination: false,
			arrows: false,
			autoWidth: false,
			speed: 200,
			easing: 'linear',
		});

		splide.mount();

		splide.on( 'move', function (i) {
			Tween.to(document.querySelector('.contact-nav-images img'), {
				x: ( 0 - steps[i] ) + '%',
				duration: 3,
				ease: transitionConstants.move.ease,
			});
		});

		document.querySelector('.contact-nav-pagination .btn-next').addEventListener('click', () => {
			stepIsValidate() ? splide.go('>') : null;
		});

		document.querySelector('.contact-nav-pagination .btn-back').addEventListener('click', () => {
			splide.go('<');
		});

		const countriesSelect = document.querySelector('#country');
		if (!!countryCodes.length) {
			for (let i = 0; i < countryCodes.length; i++) {
				const option = document.createElement('option');
				option.setAttribute('value', countryCodes[i].name);
				countryCodes[i].name === 'United States' ? option.setAttribute('selected', true) : null;
				option.innerText = countryCodes[i].name;
				countriesSelect.appendChild(option);
			}

			setTimeout(() => updateStates(), 500);
		}

		countriesSelect.addEventListener('change', (e) => {
			setTimeout(() => updateStates(), 100);
		});

		/*
		Submit form
		 */
		const form = document.querySelector('#contact-form');
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			successSubmit();
		});
	}
};

const updateStates = () => {
	const statesSelect = document.querySelector('#state');
	const countriesSelect = document.querySelector('#country');
	const selectedOption = countriesSelect.options[countriesSelect.selectedIndex].text;
	const selectedState = countryStates.filter(option => option.country === selectedOption);
	statesSelect.innerHTML = '';
	if (!!selectedState.length) {
		const states = selectedState[0].states;
		for (let i = 0; i < states.length; i++) {
			let option = document.createElement('option');
			option.setAttribute('value', states[i]);
			option.innerText = states[i];
			statesSelect.appendChild(option);
		}
	}
}

const stepIsValidate = () => {
	const activeSlide = document.querySelector('.contact-form-item .splide__slide.is-active');
	const inputs = activeSlide.querySelectorAll('input[required]');
	const a = [];
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].value === '') {
			a.push(inputs[i].value);
			inputs[i].parentNode.classList.add('is-error');
		}
	}
	return !a.length;
};

const successSubmit = () => {
	const nav = document.querySelector('.contact-nav');
	const navTitle = document.querySelector('.contact-nav-title');
	const form = document.querySelector('.contact-form');
	const formMessage = document.querySelector('.contact-nav-message');
	Tween.to(nav, {
		width: window.innerWidth,
		duration: transitionConstants.move.duration,
		ease: transitionConstants.move.ease,
	});
	Tween.to(form, {
		width: 0,
		duration: transitionConstants.move.duration,
		ease: transitionConstants.move.ease,
		onComplete: () => {
			locoScroll.stop();
			Tween.to(navTitle, {
				opacity: 0,
				pointerEvents: 'none',
				duration: transitionConstants.opacity.duration,
				ease: transitionConstants.opacity.ease,
			});
			Tween.to(formMessage, {
				opacity: 1,
				delay: 0.2,
				duration: transitionConstants.opacity.duration,
				ease: transitionConstants.opacity.ease,
			});
		},
	});
};