/**
 * Wedding of Zayn & Aara - Modern Client-Side JavaScript
 * Fully client-side, zero external libraries except FontAwesome (CSS-only).
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // CONFIGURATION & STATE
    // ==========================================
    
    // Set wedding date to September 4, 2026 at 2:00 PM EST (Islamic date: 11 Rabi' al-Awwal 1448 AH)
    const weddingDate = new Date("September 4, 2026 14:00:00").getTime();
    
    // Gallery data for the Lightbox
    const galleryItems = [
        { src: "images/gallery1.png", caption: "The Promise - Wedding Rings" },
        { src: "images/gallery2.png", caption: "The Sanctuary - Reception Stage" },
        { src: "images/gallery3.png", caption: "The Invitation - Bismillah Calligraphy" },
        { src: "images/gallery4.png", caption: "The Tradition - Bridal Mehndi" }
    ];
    let currentGalleryIndex = 0;
    
    // ==========================================
    // DOM ELEMENTS
    // ==========================================
    const loaderScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const header = document.getElementById("main-header");
    const navLinks = document.querySelectorAll(".nav-link");
    
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-success-toast");
    
    const rsvpForm = document.getElementById("rsvp-form");
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestsContainer = document.getElementById("guests-count-container");
    const guestsSelect = document.getElementById("guests-count");
    const rsvpSuccessModal = document.getElementById("rsvp-success");
    const btnCloseSuccess = document.getElementById("btn-close-success");
    const successMsgText = document.getElementById("success-msg-text");
    
    const galleryItemElements = document.querySelectorAll(".gallery-item");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    // ==========================================
    // 1. COVER / OPEN INVITATION FLOW
    // ==========================================
    btnOpenInvite.addEventListener("click", () => {
        // Fade out cover/loading screen
        loaderScreen.classList.add("fade-out");
        
        // Show main website content wrapper
        mainContent.classList.remove("content-hidden");
        // Force reflow for opacity transition
        void mainContent.offsetWidth;
        mainContent.classList.add("fade-in");
        
        // Enable body scrolling (was prevented while loading)
        document.body.style.overflow = "auto";
        
        // Play audio & set classes
        playAudio();
        
        // Initial call to reveal elements that are already in view
        revealOnScroll();
    });
    
    // Prevent scrolling while cover screen is active
    document.body.style.overflow = "hidden";

    // ==========================================
    // 2. BACKGROUND MUSIC AUDIO CONTROLLER
    // ==========================================
    let isPlaying = false;
    
    function playAudio() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add("playing");
            musicToggle.classList.remove("muted");
            musicToggle.setAttribute("aria-label", "Mute Background Music");
        }).catch(err => {
            console.log("Autoplay was blocked by browser. Music will wait for user interaction.", err);
            isPlaying = false;
            musicToggle.classList.remove("playing");
            musicToggle.classList.add("muted");
        });
    }
    
    function pauseAudio() {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("muted");
        musicToggle.setAttribute("aria-label", "Play Background Music");
    }
    
    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // ==========================================
    // 3. NAVIGATION MENU (STICKY & RESPONSIVE)
    // ==========================================
    
    // Sticky Header Scroll effect
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
    
    // Toggle mobile menu slide-down
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.classList.toggle("active");
        
        // Toggle menu bar icon
        const icon = menuToggle.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove("active");
            menuToggle.querySelector("i").classList.remove("fa-xmark");
            menuToggle.querySelector("i").classList.add("fa-bars");
        }
    });
    
    // Smooth scrolling nav links
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close menu if mobile view
                navMenu.classList.remove("active");
                menuToggle.querySelector("i").classList.remove("fa-xmark");
                menuToggle.querySelector("i").classList.add("fa-bars");
                
                // Header offset spacing
                const headerHeight = header.offsetHeight;
                const targetPos = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight menu items on scroll
    function updateActiveNavOnScroll() {
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
    window.addEventListener("scroll", updateActiveNavOnScroll);

    // ==========================================
    // 4. COUNTDOWN TIMER
    // ==========================================
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    
    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;
        
        if (difference <= 0) {
            // Time is up
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }
        
        // Calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Output formatting (adds leading zero)
        daysEl.innerText = days < 10 ? "0" + days : days;
        hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }
    
    // Initial run and repeat every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================
    // 5. VENUE ADDRESS COPY
    // ==========================================
    if (btnCopyAddress) {
        btnCopyAddress.addEventListener("click", () => {
            const addressText = "The Palace Ballroom, 789 Golden Gate Blvd, Astoria Garden, New York, NY 11102";
            
            // Clipboard API
            navigator.clipboard.writeText(addressText).then(() => {
                showToast();
            }).catch(err => {
                // Fallback for older/unsupported devices
                const textArea = document.createElement("textarea");
                textArea.value = addressText;
                textArea.style.position = "fixed"; // prevent scrolling
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast();
                } catch (err) {
                    console.error('Fallback copy failed', err);
                }
                document.body.removeChild(textArea);
            });
        });
    }
    
    function showToast() {
        copyToast.classList.add("toast-visible");
        copyToast.classList.remove("toast-hidden");
        
        // Hide after 2.5s
        setTimeout(() => {
            copyToast.classList.remove("toast-visible");
            copyToast.classList.add("toast-hidden");
        }, 2500);
    }

    // ==========================================
    // 6. PHOTO GALLERY LIGHTBOX VIEW
    // ==========================================
    
    function openLightbox(index) {
        currentGalleryIndex = parseInt(index);
        const item = galleryItems[currentGalleryIndex];
        
        lightboxImg.src = item.src;
        lightboxCaption.innerText = item.caption;
        
        lightboxModal.classList.remove("modal-hidden");
        lightboxModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Lock scroll
    }
    
    function closeLightbox() {
        lightboxModal.classList.add("modal-hidden");
        lightboxModal.setAttribute("aria-hidden", "true");
        // Re-enable scrolling only if cover is already opened
        if (loaderScreen.classList.contains("fade-out")) {
            document.body.style.overflow = "auto";
        }
    }
    
    function showNextImage() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        const item = galleryItems[currentGalleryIndex];
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = item.src;
            lightboxCaption.innerText = item.caption;
            lightboxImg.style.opacity = 1;
        }, 150);
    }
    
    function showPrevImage() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentGalleryIndex];
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = item.src;
            lightboxCaption.innerText = item.caption;
            lightboxImg.style.opacity = 1;
        }, 150);
    }
    
    // Bind click events on grid images
    galleryItemElements.forEach(item => {
        item.addEventListener("click", () => {
            const index = item.getAttribute("data-index");
            openLightbox(index);
        });
    });
    
    // Close / Next / Prev click handlers
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", showNextImage);
    lightboxPrev.addEventListener("click", showPrevImage);
    
    // Close lightbox on click outside the image
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal || e.target.classList.contains("lightbox-content-wrapper")) {
            closeLightbox();
        }
    });
    
    // Key bindings (ESC, Arrow Left, Arrow Right)
    document.addEventListener("keydown", (e) => {
        if (!lightboxModal.classList.contains("modal-hidden")) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });

    // ==========================================
    // 7. RSVP FORM SUBMISSION (LOCAL STORAGE)
    // ==========================================
    
    // Toggle guest count dropdown based on RSVP selection
    if (attendanceRadios && attendanceRadios.length > 0 && guestsContainer && guestsSelect) {
        attendanceRadios.forEach(radio => {
            radio.addEventListener("change", (e) => {
                if (e.target.value === "declined") {
                    guestsContainer.classList.add("input-hidden");
                    guestsSelect.disabled = true;
                } else {
                    guestsContainer.classList.remove("input-hidden");
                    guestsSelect.disabled = false;
                }
            });
        });
    }
    
    // RSVP submit
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("guest-name").value.trim();
            const phone = document.getElementById("guest-phone").value.trim();
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            const additionalGuests = attendance === "attending" ? parseInt(guestsSelect.value) : 0;
            const message = document.getElementById("guest-msg").value.trim();
            
            // Save details to LocalStorage to simulate a working db/server submission
            const rsvpResponse = {
                name,
                phone,
                attendance,
                guestsCount: additionalGuests + 1, // Include guest themselves
                message,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem("wedding_rsvp_" + phone, JSON.stringify(rsvpResponse));
            
            // Customize success message
            if (attendance === "attending" && successMsgText) {
                successMsgText.innerText = `Jazakallah Khair, ${name}! We have registered you and ${additionalGuests} guest(s). Looking forward to celebrating this blessed occasion together!`;
            } else if (successMsgText) {
                successMsgText.innerText = `Jazakallah Khair, ${name}! Your response has been received. We are sorry you won't be able to join us, and we appreciate your warm prayers and wishes.`;
            }
            
            // Show success modal
            if (rsvpSuccessModal) {
                rsvpSuccessModal.classList.remove("modal-hidden");
            }
            
            // Reset Form
            rsvpForm.reset();
            if (guestsContainer) guestsContainer.classList.remove("input-hidden");
            if (guestsSelect) guestsSelect.disabled = false;
        });
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
    // 8. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");
    
    function revealOnScroll() {
        const triggerBottom = (window.innerHeight / 10) * 8.5; // Reveal when 85% in viewport
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add("revealed");
            }
        });
    }
    
    // Using IntersectionObserver if supported (fallback to scroll event)
    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null, // use viewport
            rootMargin: "0px 0px -100px 0px", // triggers slightly before entering
            threshold: 0.1 // 10% visible
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        window.addEventListener("scroll", revealOnScroll);
    }
});
