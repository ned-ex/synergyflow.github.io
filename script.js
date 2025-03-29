document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header Change on Scroll ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add class when scrolled more than 50px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position considering the fixed header height
                const headerOffset = header ? header.offsetHeight : 70; // Get header height or use default
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing once visible to improve performance
                    // observer.unobserve(entry.target);
                }
                // Optional: If you want elements to fade out when scrolling up
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
            // rootMargin: "0px 0px -50px 0px" // Optional: Adjust trigger point (e.g., trigger 50px before it enters viewport)
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });

    } else {
        // Fallback for browsers that don't support Intersection Observer
        // Make elements visible immediately (or use a simpler scroll listener)
        animatedElements.forEach(el => {
            el.classList.add('is-visible'); // Just show them
        });
        console.log("Intersection Observer not supported, animations fallback applied.");
    }

}); // End DOMContentLoaded