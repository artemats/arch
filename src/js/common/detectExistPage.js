export const detectExistPage = () => {
	if (!UrlExists(window.location.href)) {
		window.location.href = '404.html';
	}
}

function UrlExists(url) {
	const http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();

	return http.status !== 404;
}