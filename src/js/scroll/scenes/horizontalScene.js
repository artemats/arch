import * as ScrollMagic from 'scrollmagic';
import {switchMotorcycle} from "../../common/switchMotorcycles";

export const horizontalScene = () => {

	const controller = new ScrollMagic.Controller({
		vertical: false,
	});

	/*
	Motorcycles
	 */
	const motorcycles = document.querySelectorAll('.section.__motorcycle');
	for (let i = 0; i < motorcycles.length; i++) {

		new ScrollMagic.Scene({
			triggerElement: motorcycles[i],
			triggerHook: 0.5,
			duration: motorcycles[i].clientWidth,
		})
			.addTo(controller)
			// .addIndicators({
			// 	name: `motorcycle`
			// })
			.on('enter', (e) => {
				switchMotorcycle(e.target.triggerElement(), true);
			})
			.on('leave', (e) => {
				switchMotorcycle(e.target.triggerElement(), false);
			})

	}

}