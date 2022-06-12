export const focusInput = () => {
	const inputs = document.querySelectorAll('.input');
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('keypress', () => {
			setTimeout(() => detectFocusInput(), 100);
		});
		inputs[i].addEventListener('blur', () => {
			detectFocusInput();
		});
	}
}

export const detectFocusInput = () => {
	const inputs = document.querySelectorAll('.input');
	for (let i = 0; i < inputs.length; i++) {
		if (!!inputs[i].value.length) {
			inputs[i].parentNode.classList.add('is-focused');
			inputs[i].parentNode.classList.remove('is-error');
		} else {
			inputs[i].parentNode.classList.remove('is-focused');
		}
	}
}