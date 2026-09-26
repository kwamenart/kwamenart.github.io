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


	const gigsUrl = "https://script.google.com/macros/s/AKfycbyRCg-g5_astWAWQkKz4Gx1Rw1Z22Uwo04Sn-_U_fBIb3v9Y9056rjY-3EeNjZlWzRLkQ/exec";

async function loadGigs() {
    const gigGrid = document.getElementById("gig-grid");

    try {
        const response = await fetch(gigsUrl);

        if (!response.ok) {
            throw new Error("Could not load gigs");
        }

        const gigs = await response.json();

        gigGrid.innerHTML = "";

        gigs.forEach(gig => {
            const article = document.createElement("article");

            article.className = "gig-card";

            article.innerHTML = `
                <time class="gig-date">${escapeHTML(gig.date)}</time>
                <h3>${escapeHTML(gig.venue)}</h3>
                <p>${escapeHTML(gig.location)}</p>
                <p>${escapeHTML(gig.time)}</p>
            `;

            gigGrid.appendChild(article);
        });

    } catch (error) {
        console.error("Error loading gigs:", error);

        gigGrid.innerHTML = `
            <p>Unable to load upcoming gigs.</p>
        `;
    }
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

loadGigs();
});
