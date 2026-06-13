/**
 * Ryan & Sophia — Modern Minimalist Invitation JavaScript
 * Clean, modular, client-side only.
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CONFIGURATION & TARGET DATE
    // ==========================================
    
    // Set wedding date: October 10, 2026 at 4:30 PM (16:30:00)
    const weddingDate = new Date("October 10, 2026 16:30:00").getTime();
    
    // Minimalist Gallery details
    const galleryItems = [
        { src: "images/gallery1.png", caption: "The Promise — Minimalist Platinum Rings" },
        { src: "images/gallery2.png", caption: "The Structure — Glass & Concrete Chapel" },
        { src: "images/gallery3.png", caption: "The Design — Minimalist Stationery Layout" },
        { src: "images/gallery4.png", caption: "The Touch — Intertwined Hands detail" }
    ];
    let currentGalleryIndex = 0;

    // ==========================================
    // DOM ELEMENTS CACHING
    // ==========================================
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const btnViewInvite = document.getElementById("btn-view-invite");
    const backToTopBtn = document.getElementById("back-to-top");
    
    const header = document.getElementById("main-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    
    const countdownDays = document.getElementById("days");
    const countdownHours = document.getElementById("hours");
    const countdownMinutes = document.getElementById("minutes");
    const countdownSeconds = document.getElementById("seconds");
    
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-toast");
    
    const rsvpForm = document.getElementById("rsvp-form");
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestsWrapper = document.getElementById("guests-count-wrapper");
    const guestsSelect = document.getElementById("guests-count");
    const rsvpSuccessModal = document.getElementById("rsvp-success");
    const btnCloseSuccess = document.getElementById("btn-close-success");
    const successMessageText = document.getElementById("success-message");
    
    const galleryItemElements = document.querySelectorAll(".gallery-item");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    // ==========================================
    // 1. WELCOME SCREEN TRANSITION
    // ==========================================
    btnViewInvite.addEventListener("click", () => {
        welcomeScreen.classList.add("fade-out");
        
        mainContent.classList.remove("content-hidden");
        void mainContent.offsetWidth; // Force Reflow
        mainContent.classList.add("fade-in");
        
        document.body.style.overflow = "auto";
        revealOnScroll();
    });
    
    // Disable scrolling while cover is showing
    document.body.style.overflow = "hidden";

    // ==========================================
    // 2. HEADER & STICKY STYLES
    // ==========================================
    window.addEventListener("scroll", () => {
        // Sticky Header shadow
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        // Show/Hide back to top button
        if (window.scrollY > 350) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });
    
    // Back to top scroll execution
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Mobile Hamburger Toggle
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu on clicking anywhere outside
    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

    // Smooth scroll navigation anchors
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile header menu if active
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                
                const headerHeight = header.offsetHeight;
                const targetPos = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight active nav links on scroll
    function updateActiveNavHighlights() {
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
    window.addEventListener("scroll", updateActiveNavHighlights);

    // ==========================================
    // 3. COUNTDOWN TIMER
    // ==========================================
    function updateCountdown() {
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
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // 4. COPY VENUE ADDRESS WIDGET
    // ==========================================
    if (btnCopyAddress) {
        btnCopyAddress.addEventListener("click", () => {
            const address = "12 Park Avenue, Crescent Heights, New York, NY 10016";
            
            navigator.clipboard.writeText(address).then(() => {
                showCopyNotification();
            }).catch(() => {
                // Clipboard API fallback for legacy environments
                const area = document.createElement("textarea");
                area.value = address;
                area.style.position = "fixed";
                document.body.appendChild(area);
                area.focus();
                area.select();
                try {
                    document.execCommand('copy');
                    showCopyNotification();
                } catch (e) {
                    console.error('Fallback copy fails', e);
                }
                document.body.removeChild(area);
            });
        });
    }

    function showCopyNotification() {
        copyToast.classList.add("toast-visible");
        copyToast.classList.remove("toast-hidden");
        
        setTimeout(() => {
            copyToast.classList.remove("toast-visible");
            copyToast.classList.add("toast-hidden");
        }, 2500);
    }

    // ==========================================
    // 5. RSVP FRONTEND FORM VALIDATION
    // ==========================================
    
    // Show/hide guest count based on attendance selection
    if (attendanceRadios && attendanceRadios.length > 0 && guestsWrapper && guestsSelect) {
        attendanceRadios.forEach(radio => {
            radio.addEventListener("change", (e) => {
                if (e.target.value === "declined") {
                    guestsWrapper.classList.add("input-hidden");
                    guestsSelect.disabled = true;
                } else {
                    guestsWrapper.classList.remove("input-hidden");
                    guestsSelect.disabled = false;
                }
            });
        });
    }

    // Submitting and validating the form
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameInputBlock = document.getElementById("guest-name").parentElement;
            const phoneInputBlock = document.getElementById("guest-phone").parentElement;
            
            const name = document.getElementById("guest-name").value.trim();
            const phone = document.getElementById("guest-phone").value.trim();
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            const guestCount = attendance === "attending" && guestsSelect ? parseInt(guestsSelect.value) : 0;
            
            let isValid = true;
            
            // Validation Check 1: Name field must not be empty
            if (!name) {
                nameInputBlock.classList.add("error");
                isValid = false;
            } else {
                nameInputBlock.classList.remove("error");
            }
            
            // Validation Check 2: Phone number check
            const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
            if (!phone || !phoneRegex.test(phone)) {
                phoneInputBlock.classList.add("error");
                isValid = false;
            } else {
                phoneInputBlock.classList.remove("error");
            }
            
            if (!isValid) return; // Exit if invalid inputs
            
            // Submit response data to LocalStorage
            const rsvpMinimalResponse = {
                name,
                phone,
                attendance,
                guestCountTotal: guestCount,
                submittedAt: new Date().toISOString()
            };
            localStorage.setItem("rsvp_minimal_" + phone, JSON.stringify(rsvpMinimalResponse));
            
            // Configure Success Modal Message
            if (attendance === "attending" && successMessageText) {
                successMessageText.innerText = `Thank you, ${name}. We look forward to celebrating with you and your guests.`;
            } else if (successMessageText) {
                successMessageText.innerText = `Thank you, ${name}. Your response has been received. We appreciate your warm wishes.`;
            }
            
            // Open Modal
            if (rsvpSuccessModal) {
                rsvpSuccessModal.classList.remove("modal-hidden");
            }
            
            // Reset inputs
            rsvpForm.reset();
            if (guestsWrapper) guestsWrapper.classList.remove("input-hidden");
            if (guestsSelect) guestsSelect.disabled = false;
        });

        // Clear validation errors instantly on keystrokes
        const guestNameEl = document.getElementById("guest-name");
        if (guestNameEl) {
            guestNameEl.addEventListener("keyup", (e) => {
                if (e.target.value.trim()) {
                    guestNameEl.parentElement.classList.remove("error");
                }
            });
        }

        const guestPhoneEl = document.getElementById("guest-phone");
        if (guestPhoneEl) {
            guestPhoneEl.addEventListener("keyup", (e) => {
                const val = e.target.value.trim();
                const regex = /^[+]?[0-9\s-]{7,15}$/;
                if (val && regex.test(val)) {
                    guestPhoneEl.parentElement.classList.remove("error");
                }
            });
        }
    }

    // Close success state modal
    if (btnCloseSuccess && rsvpSuccessModal) {
        btnCloseSuccess.addEventListener("click", () => {
            rsvpSuccessModal.classList.add("modal-hidden");
        });

        rsvpSuccessModal.addEventListener("click", (e) => {
            if (e.target === rsvpSuccessModal) {
                rsvpSuccessModal.classList.add("modal-hidden");
            }
        });
    }

    // ==========================================
    // 6. PHOTO GALLERY EXPANDABLE LIGHTBOX
    // ==========================================
    function openLightbox(index) {
        currentGalleryIndex = parseInt(index);
        const item = galleryItems[currentGalleryIndex];
        
        lightboxImg.src = item.src;
        lightboxCaption.innerText = item.caption;
        
        lightboxModal.classList.remove("modal-hidden");
        lightboxModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // lock scrolling
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

    // Bind click events on all grid photos
    galleryItemElements.forEach(item => {
        item.addEventListener("click", () => {
            const index = item.getAttribute("data-index");
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", showNextImage);
    lightboxPrev.addEventListener("click", showPrevImage);

    // Close lightbox on clicking outside the image
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal || e.target.classList.contains("lightbox-content-wrapper")) {
            closeLightbox();
        }
    });

    // Keyboard bindings (ESC, Left, Right Arrow)
    document.addEventListener("keydown", (e) => {
        if (!lightboxModal.classList.contains("modal-hidden")) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });

    // ==========================================
    // 7. SCROLL REVEAL OBSERVER
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
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -60px 0px",
            threshold: 0.1
        };
        
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => scrollObserver.observe(el));
    } else {
        // Fallback for older browsers
        window.addEventListener("scroll", revealOnScroll);
    }
});
