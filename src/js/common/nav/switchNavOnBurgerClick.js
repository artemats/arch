import {switchMainNav} from "./switchMainNav";

const burger = document.querySelector('.burger');

if (!!burger) {
	burger.addEventListener('click', (e) => {
		burger.classList.contains('is-active') ? switchMainNav(false) : switchMainNav(true);
	});
}