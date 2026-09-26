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

const gigsPerPage = 5;
let currentPage = 1;
let allGigs = [];

async function loadGigs() {
    const gigGrid = document.getElementById("gig-grid");

    try {
        const response = await fetch(gigsUrl);

        if (!response.ok) {
            throw new Error("Could not load gigs");
        }

        allGigs = await response.json();

        currentPage = 1;

        displayGigs();

    } catch (error) {
        console.error("Error loading gigs:", error);

        gigGrid.innerHTML = `
            <p>Unable to load upcoming gigs.</p>
        `;
    }
}


function displayGigs() {
    const gigGrid = document.getElementById("gig-grid");

    const startIndex = (currentPage - 1) * gigsPerPage;
    const endIndex = startIndex + gigsPerPage;

    const gigsToShow = allGigs.slice(startIndex, endIndex);

    // Clear the current cards
    gigGrid.innerHTML = "";

    // Create the gig cards
    gigsToShow.forEach(gig => {

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

    displayPagination();
}


function displayPagination() {

    const gigGrid = document.getElementById("gig-grid");

    // Remove existing pagination
    const existingPagination = document.getElementById("gig-pagination");

    if (existingPagination) {
        existingPagination.remove();
    }

    const totalPages = Math.ceil(allGigs.length / gigsPerPage);

    // Don't show pagination if everything fits on one page
    if (totalPages <= 1) {
        return;
    }

    const pagination = document.createElement("div");

    pagination.id = "gig-pagination";
    pagination.className = "gig-pagination";

    pagination.innerHTML = `
        <button 
            class="pagination-button"
            onclick="changeGigPage(${currentPage - 1})"
            ${currentPage === 1 ? "disabled" : ""}
        >
            ← Previous
        </button>

        <span class="pagination-info">
            Page ${currentPage} of ${totalPages}
        </span>

        <button 
            class="pagination-button"
            onclick="changeGigPage(${currentPage + 1})"
            ${currentPage === totalPages ? "disabled" : ""}
        >
            Next →
        </button>
    `;

    // Put pagination directly underneath the gig cards
    gigGrid.after(pagination);
}


function changeGigPage(page) {

    const totalPages = Math.ceil(allGigs.length / gigsPerPage);

    if (page < 1 || page > totalPages) {
        return;
    }

    currentPage = page;

    displayGigs();

    // Scroll back to the gigs section
    document.getElementById("gigs").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function escapeHTML(value) {
    const div = document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;
}


loadGigs();

});
