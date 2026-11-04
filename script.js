
/* 1. Interactive Form Handling and Validation */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (username !== "" && email !== "") {
        document.getElementById("form-response").textContent =
            "Thank you for visiting, " + username +
            "! We will contact you at " + email + ".";

        contactForm.reset();

        document.getElementById("char-count").textContent =
            "100 characters remaining";

        document.getElementById("discount-message").textContent = "";
    }
});


/* 2. Menu Table Row Highlighting */

const menuRows = document.querySelectorAll("#menu-table tbody tr");

menuRows.forEach(function(row) {
    row.addEventListener("mouseover", function() {
        row.style.backgroundColor = "#ded4ff";
    });

    row.addEventListener("mouseout", function() {
        row.style.backgroundColor = "";
    });
});


/* 3. Light/Dark Mode Switcher */

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


/* 4. Interactive Order Total Calculator */

const menuItems = document.querySelectorAll(".menu-item");
const totalDisplay = document.getElementById("total");

function calculateTotal() {
    let total = 0;

    menuItems.forEach(function(item) {
        if (item.checked) {
            total += Number(item.value);
        }
    });

    totalDisplay.textContent = "$" + total.toFixed(2);
}

menuItems.forEach(function(item) {
    item.addEventListener("change", calculateTotal);
});


/* 5. Birth Year Conversion and Age Verification */

const birthYearInput = document.getElementById("birth-year");
const discountMessage = document.getElementById("discount-message");

birthYearInput.addEventListener("change", function() {
    const yearText = birthYearInput.value.trim();
    const birthYear = parseInt(yearText, 10);
    const currentYear = new Date().getFullYear();

    discountMessage.textContent = "";

    if (
        yearText === "" ||
        !/^\d{4}$/.test(yearText) ||
        isNaN(birthYear) ||
        birthYear < 1900 ||
        birthYear > currentYear
    ) {
        discountMessage.textContent =
            "Please enter a valid four-digit birth year.";
        return;
    }

    const age = currentYear - birthYear;

    if (age < 18) {
        discountMessage.textContent =
            "You are under 18. No age-based discount is available.";
    } else if (age <= 25) {
        discountMessage.textContent =
            "You qualify for the student-age discount!";
    } else if (age >= 60) {
        discountMessage.textContent =
            "You qualify for the senior discount!";
    } else {
        discountMessage.textContent =
            "No age-based discount applies to you.";
    }
});


/* 6. Read More / Read Less Toggle */

const readMoreButton = document.getElementById("read-more");
const extraStory = document.getElementById("extra-story");

readMoreButton.addEventListener("click", function() {
    extraStory.hidden = !extraStory.hidden;

    if (extraStory.hidden) {
        readMoreButton.textContent = "Read More";
    } else {
        readMoreButton.textContent = "Read Less";
    }
});


/* 7. Live Category Filter */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selectedCategory = button.dataset.category;

        menuRows.forEach(function(row) {
            if (
                selectedCategory === "all" ||
                row.dataset.category === selectedCategory
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });

        filterButtons.forEach(function(filterButton) {
            filterButton.classList.remove("active");
        });

        button.classList.add("active");
    });
});


/* 8. Dynamic Cafe Opening Status */

const openingStatus = document.getElementById("opening-status");
const currentHour = new Date().getHours();

if (currentHour >= 8 && currentHour < 20) {
    openingStatus.textContent = "We are Open!";
    openingStatus.classList.add("open");
} else {
    openingStatus.textContent = "Closed - Open at 8 AM";
    openingStatus.classList.add("closed");
}


/* 9. Live Character Counter */

const specialNotes = document.getElementById("special-notes");
const charCount = document.getElementById("char-count");

specialNotes.addEventListener("input", function() {
    const remaining = 100 - specialNotes.value.length;

    charCount.textContent = remaining + " characters remaining";
});
