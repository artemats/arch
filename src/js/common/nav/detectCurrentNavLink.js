export const detectCurrentNavLink = () => {
	const links = document.querySelectorAll('.nav-link');
	for (let i = 0; i < links.length; i++) {
		const link = links[i];
		link.classList.remove('is-current');
		const loc = window.location.pathname.replace(/^\/|\/$/g, '');
		const href = link.getAttribute('href');
		if (href === loc) {
			link.classList.add('is-current');
		}
	}
}