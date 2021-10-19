import gsap from 'gsap';

export const toggleAboutTitles = () => {
	if(document.querySelector('#home-about')) {
		setTitleStyles();
		const titles = document.querySelectorAll('.home-about-title-item');
		const labels = document.querySelectorAll('.home-about-label-item');
		const labelFs = getComputedStyle(labels[0]).fontSize;

		for (let i = 0; i < titles.length; i++) {
			const titleTl = createTimeline(titles[i]);
			const labelTl = createTimeline(titles[i]);

			titleTl.to(titles[i], {
				yPercent: -100,
				fontSize: labelFs,
			});

			labelTl.to(labels[i], {
				y: 0,
				delay: 0.5,
			});
		}
	}
};

const createTimeline = (elem) => {
	return gsap.timeline({
		scrollTrigger: {
			trigger: elem,
			scroller: '#scroll-container',
			horizontal: true,
			scrub: true,
			start: 'center 350px',
			end: 'center 0',
		}
	});
};

const setTitleStyles = () => {
	const labels = document.querySelector('.home-about-label');
	const titles = document.querySelector('.home-about-title');
	const label1Width = document.querySelector('.home-about-label-item[data-id="home-about-title-1"]').clientWidth;
	const label2Width = document.querySelector('.home-about-label-item[data-id="home-about-title-2"]').clientWidth;
	const title2 = document.querySelector('#home-about-title-1 .home-about-title-item');
	const title3 = document.querySelector('#home-about-title-2 .home-about-title-item');
	title2.style.paddingLeft = ( label1Width - 20 ) + 'px';
	title3.style.paddingLeft = ( label1Width + label2Width - 20 ) + 'px';
	titles.style.paddingRight = (labels.clientWidth - parseInt(getComputedStyle(labels).paddingLeft)) + 'px';
	titles.style.marginRight =  '-' + (labels.clientWidth - parseInt(getComputedStyle(labels).paddingLeft)) + 'px';
};