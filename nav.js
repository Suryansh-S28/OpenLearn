// Hamburger menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
	const navToggle = document.getElementById('navToggle');
	const mainNav = document.getElementById('mainNav');

	if (navToggle && mainNav) {
		navToggle.addEventListener('click', function() {
			navToggle.classList.toggle('active');
			mainNav.classList.toggle('active');
		});

		// Close menu when a link is clicked
		const navLinks = mainNav.querySelectorAll('a');
		navLinks.forEach(link => {
			link.addEventListener('click', function() {
				navToggle.classList.remove('active');
				mainNav.classList.remove('active');
			});
		});

		// Close menu when clicking outside
		document.addEventListener('click', function(event) {
			const isClickInside = mainNav.contains(event.target) || navToggle.contains(event.target);
			if (!isClickInside && mainNav.classList.contains('active')) {
				navToggle.classList.remove('active');
				mainNav.classList.remove('active');
			}
		});
	}
});
