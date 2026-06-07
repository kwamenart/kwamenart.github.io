document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.getElementById("hamburger");
	const navLinks = document.getElementById("navLinks");
	const year = document.getElementById("year");

	// Copyright year
	if (year) {
		year.textContent = new Date().getFullYear();
	}

	// Mobile menu toggle
	hamburger?.addEventListener("click", () => {
		navLinks.classList.toggle("active");

		const icon = hamburger.querySelector("i");

		if (navLinks.classList.contains("active")) {
			icon.classList.remove("fa-bars");
			icon.classList.add("fa-times");
		} else {
			icon.classList.remove("fa-times");
			icon.classList.add("fa-bars");
		}
	});

	// Close menu after clicking a link
	document.querySelectorAll(".nav-links a").forEach((link) => {
		link.addEventListener("click", () => {
			navLinks.classList.remove("active");

			const icon = hamburger.querySelector("i");
			icon.classList.remove("fa-times");
			icon.classList.add("fa-bars");
		});
	});

	// Reset menu when returning to desktop view
	window.addEventListener("resize", () => {
		if (window.innerWidth > 900) {
			navLinks.classList.remove("active");

			const icon = hamburger.querySelector("i");
			icon.classList.remove("fa-times");
			icon.classList.add("fa-bars");
		}
	});
});
