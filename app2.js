const subNavSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
	const subNavLinks = document.querySelectorAll('nav ul li ul li')


	navLinks.addEventListener('click',()=> {
		// Toggle Nav
		navLinks.classList.toggle('navLinks-active');

		// Animate Links
		subNavLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 30 + 0.1}s`;
			}
		});
	});
}

subNavSlide();