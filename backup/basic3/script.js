/**
 * Matrimonial Passport — Zayn & Aara
 * Custom Client-side JavaScript.
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CONFIGURATION & STATE
    // ==========================================
    
    // Set wedding date: September 4, 2026 at 2:00 PM (14:00:00)
    const weddingDate = new Date("September 4, 2026 14:00:00").getTime();
    
    // Gallery index map and typewriter captions
    const galleryItems = [
        { src: "images/gallery1.png", caption: "The Rings. London, 2026." },
        { src: "images/gallery2.png", caption: "The Lights. Paris, 2026." },
        { src: "images/gallery3.png", caption: "The Passport. New York, 2026." },
        { src: "images/gallery4.png", caption: "The Tradition. London, 2026." }
    ];
    let currentGalleryIndex = 0;

    // ==========================================
    // DOM CACHING
    // ==========================================
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const btnBeginJourney = document.getElementById("btn-begin-journey");
    const backToTopBtn = document.getElementById("back-to-top");
    
    const header = document.getElementById("main-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    const passengerNameTicket = document.getElementById("ticket-passenger-name");
    
    const countdownDays = document.getElementById("days");
    const countdownHours = document.getElementById("hours");
    const countdownMinutes = document.getElementById("minutes");
    const countdownSeconds = document.getElementById("seconds");
    
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-toast");
    
    const rsvpForm = document.getElementById("rsvp-form");
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestsSelectWrapper = document.getElementById("guests-select-wrapper");
    const guestsSelect = document.getElementById("guests-count");
    const rsvpSuccessModal = document.getElementById("rsvp-success");
    const btnCloseSuccess = document.getElementById("btn-close-success");
    const successMsgText = document.getElementById("success-message");
    
    const polaroidGalleryItems = document.querySelectorAll(".polaroid-item");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    // ==========================================
    // 1. DYNAMIC URL PASSENGER NAME INJECTION
    // ==========================================
    function getPassengerNameFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const guestName = urlParams.get('guest');
        
        if (guestName) {
            // Personalize boarding ticket passenger name
            passengerNameTicket.innerText = decodeURIComponent(guestName).toUpperCase();
        } else {
            // Default passenger name fallback
            passengerNameTicket.innerText = "HONORED GUEST";
        }
    }
    getPassengerNameFromUrl();

    // ==========================================
    // 2. PASSPORT COVER DOOR OPENER
    // ==========================================
    btnBeginJourney.addEventListener("click", () => {
        // Slide left/right door cover panels away
        welcomeScreen.classList.add("fade-out");
        
        // Show boarding pass website wrapper
        mainContent.classList.remove("content-hidden");
        void mainContent.offsetWidth; // Force Reflow
        mainContent.classList.add("fade-in");
        
        document.body.style.overflow = "auto";
        revealOnScroll();
    });
    
    document.body.style.overflow = "hidden"; // Lock scroll initially

    // ==========================================
    // 3. NAV HEADER & FLOATING NAVIGATION
    // ==========================================
    window.addEventListener("scroll", () => {
        // Sticky Header shadow
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Back to top floating arrow
        if (window.scrollY > 350) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Mobile Navigation Drawer Toggle
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
        
        // Toggle mobile drawer icons
        const icon = menuToggle.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-compass");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-compass");
        }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
            menuToggle.querySelector("i").classList.remove("fa-xmark");
            menuToggle.querySelector("i").classList.add("fa-compass");
        }
    });

    // Smooth navigation anchor shifts
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                menuToggle.querySelector("i").classList.remove("fa-xmark");
                menuToggle.querySelector("i").classList.add("fa-compass");
                
                const headerHeight = header.offsetHeight;
                const targetPos = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight links on scroll positions
    function highlightNavMenu() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        document.querySelectorAll("section").forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    window.addEventListener("scroll", highlightNavMenu);

    // ==========================================
    // 4. DEPARTURE FLIGHT COUNTDOWN BOARD
    // ==========================================
    function calculateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;
        
        if (difference <= 0) {
            countdownDays.innerText = "00";
            countdownHours.innerText = "00";
            countdownMinutes.innerText = "00";
            countdownSeconds.innerText = "00";
            return;
        }
        
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        
        countdownDays.innerText = d < 10 ? "0" + d : d;
        countdownHours.innerText = h < 10 ? "0" + h : h;
        countdownMinutes.innerText = m < 10 ? "0" + m : m;
        countdownSeconds.innerText = s < 10 ? "0" + s : s;
    }
    
    calculateCountdown();
    setInterval(calculateCountdown, 1000);

    // ==========================================
    // 5. COPY COORDINATES ADDRESS WIDGET
    // ==========================================
    if (btnCopyAddress) {
        btnCopyAddress.addEventListener("click", () => {
            const address = "The Palace Ballroom, 789 Golden Gate Blvd, Astoria Garden, New York, NY 11102";
            
            navigator.clipboard.writeText(address).then(() => {
                showToastNotification();
            }).catch(() => {
                // Clipboard fallback for legacy browsers
                const area = document.createElement("textarea");
                area.value = address;
                area.style.position = "fixed";
                document.body.appendChild(area);
                area.focus();
                area.select();
                try {
                    document.execCommand('copy');
                    showToastNotification();
                } catch (e) {
                    console.error('Fallback copy fails', e);
                }
                document.body.removeChild(area);
            });
        });
    }

    function showToastNotification() {
        copyToast.classList.add("toast-visible");
        copyToast.classList.remove("toast-hidden");
        
        setTimeout(() => {
            copyToast.classList.remove("toast-visible");
            copyToast.classList.add("toast-hidden");
        }, 2500);
    }

    // ==========================================
    // 6. RSVP VISA FORM VALIDATIONS
    // ==========================================
    
    // Toggle guests dropdown depending on attendance checked
    attendanceRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            if (e.target.value === "declined") {
                guestsSelectWrapper.classList.add("input-hidden");
                guestsSelect.disabled = true;
            } else {
                guestsSelectWrapper.classList.remove("input-hidden");
                guestsSelect.disabled = false;
            }
        });
    });

    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameBlock = document.getElementById("guest-name").parentElement;
        const phoneBlock = document.getElementById("guest-phone").parentElement;
        
        const name = document.getElementById("guest-name").value.trim();
        const phone = document.getElementById("guest-phone").value.trim();
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const totalGuests = attendance === "attending" ? parseInt(guestsSelect.value) : 0;
        
        let isValid = true;
        
        // Validation Check 1: Name must not be blank
        if (!name) {
            nameBlock.classList.add("error");
            isValid = false;
        } else {
            nameBlock.classList.remove("error");
        }
        
        // Validation Check 2: Phone number regex check
        const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
        if (!phone || !phoneRegex.test(phone)) {
            phoneBlock.classList.add("error");
            isValid = false;
        } else {
            phoneBlock.classList.remove("error");
        }
        
        if (!isValid) return; // Exit if validation fails
        
        // Save coordinates details to LocalStorage
        const rsvpPassportResponse = {
            name,
            phone,
            attendance,
            additionalPassengers: totalGuests,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem("rsvp_passport_" + phone, JSON.stringify(rsvpPassportResponse));
        
        // Configure Success Visa Approved Modal message
        if (attendance === "attending") {
            successMsgText.innerText = `APPROVED. Zayn & Aara have reserved best seats for you and ${totalGuests} passenger(s). Welcome aboard the Matrimonial Flight!`;
        } else {
            successMsgText.innerText = `DECLARED. Your visa application has been archived. We are sorry you cannot fly with us, and we appreciate your warm prayers!`;
        }
        
        // Show success modal
        rsvpSuccessModal.classList.remove("modal-hidden");
        
        // Reset Inputs
        rsvpForm.reset();
        guestsSelectWrapper.classList.remove("input-hidden");
        guestsSelect.disabled = false;
    });

    // Clear error blocks dynamically
    document.getElementById("guest-name").addEventListener("keyup", (e) => {
        if (e.target.value.trim()) {
            document.getElementById("guest-name").parentElement.classList.remove("error");
        }
    });

    document.getElementById("guest-phone").addEventListener("keyup", (e) => {
        const val = e.target.value.trim();
        const regex = /^[+]?[0-9\s-]{7,15}$/;
        if (val && regex.test(val)) {
            document.getElementById("guest-phone").parentElement.classList.remove("error");
        }
    });

    btnCloseSuccess.addEventListener("click", () => {
        rsvpSuccessModal.classList.add("modal-hidden");
    });

    rsvpSuccessModal.addEventListener("click", (e) => {
        if (e.target === rsvpSuccessModal) {
            rsvpSuccessModal.classList.add("modal-hidden");
        }
    });

    // ==========================================
    // 7. POLAROID EXPANDABLE LIGHTBOX
    // ==========================================
    let touchStartX = 0;
    let touchEndX = 0;

    function openLightbox(index) {
        currentGalleryIndex = parseInt(index);
        const item = galleryItems[currentGalleryIndex];
        
        lightboxImg.src = item.src;
        lightboxCaption.innerText = item.caption;
        
        lightboxModal.classList.remove("modal-hidden");
        lightboxModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // lock scroll
    }

    function closeLightbox() {
        lightboxModal.classList.add("modal-hidden");
        lightboxModal.setAttribute("aria-hidden", "true");
        if (welcomeScreen.classList.contains("fade-out")) {
            document.body.style.overflow = "auto";
        }
    }

    function showNextImage() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        updateLightboxContent();
    }

    function showPrevImage() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const item = galleryItems[currentGalleryIndex];
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = item.src;
            lightboxCaption.innerText = item.caption;
            lightboxImg.style.opacity = 1;
        }, 150);
    }

    // Bind click handlers to polaroids
    polaroidGalleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const index = item.getAttribute("data-index");
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", showNextImage);
    lightboxPrev.addEventListener("click", showPrevImage);

    // Close lightbox on clicking backdrop
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal || e.target.classList.contains("lightbox-content-wrapper")) {
            closeLightbox();
        }
    });

    // Esc and arrow key controllers
    document.addEventListener("keydown", (e) => {
        if (!lightboxModal.classList.contains("modal-hidden")) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });

    // Touch swiping controllers
    lightboxModal.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    lightboxModal.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, {passive: true});

    function handleSwipeGesture() {
        const swipeThreshold = 55;
        if (touchEndX < touchStartX - swipeThreshold) {
            showNextImage(); // swipe left -> next
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            showPrevImage(); // swipe right -> prev
        }
    }

    // ==========================================
    // 8. SCROLL STAMP & REVEAL OBSERVER
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");
    
    function revealOnScroll() {
        const triggerDepth = (window.innerHeight / 10) * 8.5; // Trigger at 85% depth
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerDepth) {
                el.classList.add("revealed");
            }
        });
    }

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    // Note: We don't unobserve, so the stamp overlay animation can restamp on re-entry or stay stamped
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            root: null,
            rootMargin: "0px 0px -80px 0px",
            threshold: 0.1
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        window.addEventListener("scroll", revealOnScroll);
    }
});
