/**
 * The Wedding of Zayn & Aara - Premium Luxury JavaScript
 * Fully client-side, modular, vanilla JS.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // CONFIGURATION & STATE
    // ==========================================
    
    // Set wedding date: September 4, 2026 at 2:00 PM (14:00:00)
    const weddingDate = new Date("September 4, 2026 14:00:00").getTime();
    
    // Gallery index map and captions
    const galleryItems = [
        { src: "images/gallery1.png", caption: "The Promise - Wedding Rings" },
        { src: "images/gallery2.png", caption: "The Stage - Grand Hall Arches" },
        { src: "images/gallery3.png", caption: "The Invitation - Bismillah Calligraphy" },
        { src: "images/gallery4.png", caption: "The Henna - Bridal Mehndi Hands" },
        { src: "images/gallery5.png", caption: "The Feast Setup - Royal Banquet Decor" },
        { src: "images/gallery6.png", caption: "The Light - Traditional Gold Lanterns" }
    ];
    let currentGalleryIndex = 0;
    
    // ==========================================
    // DOM CACHING
    // ==========================================
    const body = document.body;
    const loaderScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const bgMusic = document.getElementById("bg-music");
    
    const musicToggle = document.getElementById("music-toggle");
    const themeToggle = document.getElementById("theme-toggle");
    const progressBar = document.getElementById("scroll-progress-bar");
    
    const countdownDays = document.getElementById("days");
    const countdownHours = document.getElementById("hours");
    const countdownMinutes = document.getElementById("minutes");
    const countdownSeconds = document.getElementById("seconds");
    
    const header = document.getElementById("main-header");
    const navLinks = document.querySelectorAll(".nav-link");
    const dockLinks = document.querySelectorAll(".dock-link");
    
    const teaserVideo = document.getElementById("teaser-video");
    const videoPlayBtn = document.getElementById("video-play-btn");
    const videoOverlay = document.getElementById("video-overlay");
    const videoWrapper = document.querySelector(".video-player-wrapper");
    const videoMuteBtn = document.getElementById("video-mute-btn");
    const videoProgressContainer = document.getElementById("video-progress-container");
    const videoProgressBar = document.getElementById("video-progress-bar");
    
    const rsvpForm = document.getElementById("rsvp-form");
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestsContainer = document.getElementById("guests-count-container");
    const guestsSelect = document.getElementById("guests-count");
    const rsvpSuccessModal = document.getElementById("rsvp-success");
    const btnCloseSuccess = document.getElementById("btn-close-success");
    const successMsgText = document.getElementById("success-msg-text");
    
    const wishesForm = document.getElementById("wishes-post-form");
    const wishesBoard = document.getElementById("wishes-board");
    
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-success-toast");
    
    const galleryItemsMasonry = document.querySelectorAll(".gallery-item-masonry");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    // ==========================================
    // 1. LIGHT/DARK THEME TOGGLE WITH CACHING
    // ==========================================
    const cachedTheme = localStorage.getItem("wedding_theme") || "light";
    body.setAttribute("data-theme", cachedTheme);
    updateThemeIcon(cachedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("wedding_theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector("i");
        if (theme === "dark") {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    }

    // ==========================================
    // 2. CANVAS SPARKLES PARTICLE PHYSICS
    // ==========================================
    const canvas = document.getElementById("sparkles-canvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    const maxParticles = 35; // Kept low to optimize mobile CPU/GPU usage

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + canvas.height; // Spawn slightly below screen
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = Math.random() * 0.6 - 0.3; // Gentle wind drift
            this.speedY = -(Math.random() * 0.8 + 0.3); // Drift upwards
            this.opacity = Math.random() * 0.8 + 0.2;
            
            // Warm gold particle colors
            const goldColors = ["#ebd09b", "#c5a880", "#b19263", "#D4AF37", "#FFFFFF"];
            this.color = goldColors[Math.floor(Math.random() * goldColors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Recycle particles once they float off-screen
            if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
                this.opacity = Math.random() * 0.8 + 0.2;
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#C5A880";
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();

    // ==========================================
    // 3. PAGE OPENER & AUDIO TRIGGER
    // ==========================================
    btnOpenInvite.addEventListener("click", () => {
        loaderScreen.classList.add("fade-out");
        
        mainContent.classList.remove("content-hidden");
        void mainContent.offsetWidth; // Force reflow
        mainContent.classList.add("fade-in");
        
        document.body.style.overflow = "auto";
        
        playAudio();
        revealOnScroll();
    });
    
    document.body.style.overflow = "hidden"; // Block scrolling initially

    // ==========================================
    // 4. MUSIC CONTROLS
    // ==========================================
    let isMusicPlaying = false;
    
    function playAudio() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add("playing");
            musicToggle.classList.remove("muted");
            musicToggle.setAttribute("aria-label", "Mute Background Music");
        }).catch(err => {
            console.log("Autoplay was blocked by browser. Music will wait for user interaction.", err);
            isMusicPlaying = false;
            musicToggle.classList.remove("playing");
            musicToggle.classList.add("muted");
        });
    }
    
    function pauseAudio() {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("muted");
        musicToggle.setAttribute("aria-label", "Play Background Music");
    }
    
    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isMusicPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // ==========================================
    // 5. SCROLL PROGRESS & ACTIVE NAV LINKS
    // ==========================================
    window.addEventListener("scroll", () => {
        // Calculate scroll progress percentage
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercent = (winScroll / height) * 100;
        progressBar.style.width = scrolledPercent + "%";
        
        // Sticky Header scroll styling shadow
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Highlight links (in desktop header and mobile dock) as user scrolls
    function highlightSectionsOnScroll() {
        const scrollPosition = window.scrollY + header.offsetHeight + 120;
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            
            if (scrollPosition >= top && scrollPosition < top + height) {
                // Header Nav sync
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
                
                // Mobile Dock sync
                dockLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    window.addEventListener("scroll", highlightSectionsOnScroll);

    // Anchor smooth scrolling for both Nav Header & Dock Menu links
    const scrollLinks = [...navLinks, ...dockLinks];
    scrollLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPos = targetSection.offsetTop - headerHeight + 5;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // 6. LIVE WEDDING COUNTDOWN TIMER
    // ==========================================
    function calculateCountdown() {
        const now = new Date().getTime();
        const gap = weddingDate - now;
        
        if (gap <= 0) {
            countdownDays.innerText = "00";
            countdownHours.innerText = "00";
            countdownMinutes.innerText = "00";
            countdownSeconds.innerText = "00";
            return;
        }
        
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);
        
        countdownDays.innerText = d < 10 ? "0" + d : d;
        countdownHours.innerText = h < 10 ? "0" + h : h;
        countdownMinutes.innerText = m < 10 ? "0" + m : m;
        countdownSeconds.innerText = s < 10 ? "0" + s : s;
    }
    
    calculateCountdown();
    setInterval(calculateCountdown, 1000);

    // ==========================================
    // 7. CUSTOM VIDEO PLAYER SYSTEM
    // ==========================================
    videoPlayBtn.addEventListener("click", toggleVideoPlayback);
    videoOverlay.addEventListener("click", toggleVideoPlayback);
    
    teaserVideo.addEventListener("play", () => {
        videoWrapper.classList.add("playing");
    });
    
    teaserVideo.addEventListener("pause", () => {
        videoWrapper.classList.remove("playing");
    });
    
    function toggleVideoPlayback() {
        if (teaserVideo.paused) {
            teaserVideo.play();
        } else {
            teaserVideo.pause();
        }
    }
    
    // Video Mute toggling
    videoMuteBtn.addEventListener("click", () => {
        const icon = videoMuteBtn.querySelector("i");
        if (teaserVideo.muted) {
            teaserVideo.muted = false;
            icon.classList.remove("fa-volume-xmark");
            icon.classList.add("fa-volume-high");
        } else {
            teaserVideo.muted = true;
            icon.classList.remove("fa-volume-high");
            icon.classList.add("fa-volume-xmark");
        }
    });
    
    // Progress Bar Slider sync
    teaserVideo.addEventListener("timeupdate", () => {
        const percent = (teaserVideo.currentTime / teaserVideo.duration) * 100;
        videoProgressBar.style.width = percent + "%";
    });
    
    // Click on progress bar to seek video
    videoProgressContainer.addEventListener("click", (e) => {
        const rect = videoProgressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        teaserVideo.currentTime = (clickX / width) * teaserVideo.duration;
    });

    // ==========================================
    // 8. CLIPBOARD VENUE ADDRESS COPY
    // ==========================================
    if (btnCopyAddress) {
        btnCopyAddress.addEventListener("click", () => {
            const address = "The Palace Ballroom, 789 Golden Gate Blvd, Astoria Garden, New York, NY 11102";
            
            navigator.clipboard.writeText(address).then(() => {
                triggerToast();
            }).catch(err => {
                // Fallback for older devices/HTTP connections
                const dummyTextarea = document.createElement("textarea");
                dummyTextarea.value = address;
                dummyTextarea.style.position = "fixed";
                document.body.appendChild(dummyTextarea);
                dummyTextarea.focus();
                dummyTextarea.select();
                try {
                    document.execCommand('copy');
                    triggerToast();
                } catch (e) {
                    console.error('Fallback copy fail', e);
                }
                document.body.removeChild(dummyTextarea);
            });
        });
    }

    function triggerToast() {
        copyToast.classList.add("toast-visible");
        copyToast.classList.remove("toast-hidden");
        setTimeout(() => {
            copyToast.classList.remove("toast-visible");
            copyToast.classList.add("toast-hidden");
        }, 2500);
    }

    // ==========================================
    // 9. RSVP REGISTRATION SYSTEM
    // ==========================================
    
    // Toggle guests dropdown depending on accept/decline attendance
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

    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("guest-name").value.trim();
        const phone = document.getElementById("guest-phone").value.trim();
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const extraGuests = attendance === "attending" ? parseInt(guestsSelect.value) : 0;
        const msg = document.getElementById("guest-msg").value.trim();
        
        const responseData = {
            name,
            phone,
            attendance,
            guestCountTotal: extraGuests + 1,
            wishes: msg,
            time: new Date().toISOString()
        };
        
        // Save locally to local storage
        localStorage.setItem("rsvp_" + phone, JSON.stringify(responseData));
        
        // Append user to guestbook board automatically if they wrote wishes
        if (msg) {
            postNewWish(name, msg);
        }
        
        // Render success modal message
        if (attendance === "attending") {
            successMsgText.innerText = `Jazakallah Khair, ${name}! We have registered you and ${extraGuests} guest(s). Looking forward to welcoming you on this blessed occasion!`;
        } else {
            successMsgText.innerText = `Jazakallah Khair, ${name}! Your response has been received. We are sorry you won't be joining, but we appreciate your warm prayers and wishes!`;
        }
        
        rsvpSuccessModal.classList.remove("modal-hidden");
        rsvpForm.reset();
        guestsContainer.classList.remove("input-hidden");
        guestsSelect.disabled = false;
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
    // 10. GUEST WISHES BOARD BOARD (LOCAL STORAGE)
    // ==========================================
    
    // Default pre-populated comments to show in Guestbook
    const defaultWishes = [
        { name: "Uncle Salim & Family", text: "May Allah bless your union with endless happiness, understanding, and love. Mubarak!", date: "Jun 5, 2026" },
        { name: "Hana & Imran", text: "Wishing you both a beautiful wedding and an even more beautiful marriage ahead. Congratulations!", date: "Jun 4, 2026" },
        { name: "Faraz Ahmed", text: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fee khair. Ameen!", date: "Jun 3, 2026" }
    ];

    function loadWishesBoard() {
        wishesBoard.innerHTML = "";
        let savedWishes = JSON.parse(localStorage.getItem("wedding_wishes_board")) || [];
        
        // If empty, prime board with beautiful default reviews
        if (savedWishes.length === 0) {
            savedWishes = [...defaultWishes];
            localStorage.setItem("wedding_wishes_board", JSON.stringify(savedWishes));
        }
        
        // Render cards
        savedWishes.forEach(wish => {
            const card = document.createElement("div");
            card.className = "wish-card glass-card";
            card.innerHTML = `
                <div class="wish-card-inner">
                    <i class="fa-solid fa-quote-left wish-quote-icon"></i>
                    <p class="wish-text">"${escapeHtml(wish.text)}"</p>
                    <span class="wish-author">${escapeHtml(wish.name)}</span>
                    <span class="wish-date">${wish.date}</span>
                </div>
            `;
            wishesBoard.appendChild(card);
        });
    }

    function postNewWish(authorName, wishMessage) {
        let savedWishes = JSON.parse(localStorage.getItem("wedding_wishes_board")) || [];
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date().toLocaleDateString("en-US", options);
        
        const newWish = {
            name: authorName,
            text: wishMessage,
            date: formattedDate
        };
        
        savedWishes.unshift(newWish); // Prepend new wish at top
        localStorage.setItem("wedding_wishes_board", JSON.stringify(savedWishes));
        loadWishesBoard(); // Refresh board
    }

    // Direct submit on wishes board form
    wishesForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const author = document.getElementById("wish-author").value.trim();
        const text = document.getElementById("wish-text").value.trim();
        
        postNewWish(author, text);
        
        wishesForm.reset();
    });

    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    loadWishesBoard(); // Initial Guestbook render

    // ==========================================
    // 11. PHOTO GALLERY LIGHTBOX SYSTEM
    // ==========================================
    let touchstartX = 0;
    let touchendX = 0;

    function openLightbox(index) {
        currentGalleryIndex = parseInt(index);
        const item = galleryItems[currentGalleryIndex];
        
        lightboxImg.src = item.src;
        lightboxCaption.innerText = item.caption;
        
        lightboxModal.classList.remove("modal-hidden");
        lightboxModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // lock page scroll
    }

    function closeLightbox() {
        lightboxModal.classList.add("modal-hidden");
        lightboxModal.setAttribute("aria-hidden", "true");
        if (loaderScreen.classList.contains("fade-out")) {
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

    // Bind click events on all gallery photos
    galleryItemsMasonry.forEach(item => {
        item.addEventListener("click", () => {
            const index = item.getAttribute("data-index");
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", showNextImage);
    lightboxPrev.addEventListener("click", showPrevImage);

    // Close lightbox on clicking background area
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal || e.target.classList.contains("lightbox-content-wrapper")) {
            closeLightbox();
        }
    });

    // Keyboard controls (Esc, Left/Right arrow keys)
    document.addEventListener("keydown", (e) => {
        if (!lightboxModal.classList.contains("modal-hidden")) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });

    // Touch Swipe triggers for mobile devices
    lightboxModal.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, {passive: true});

    lightboxModal.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }, {passive: true});

    function handleSwipeGesture() {
        const swipeThreshold = 55;
        if (touchendX < touchstartX - swipeThreshold) {
            showNextImage(); // Swipe left -> next image
        }
        if (touchendX > touchstartX + swipeThreshold) {
            showPrevImage(); // Swipe right -> previous image
        }
    }

    // ==========================================
    // 12. SCROLL REVEAL OBSERVER
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");
    
    function revealOnScroll() {
        const triggerBottom = (window.innerHeight / 10) * 8.5; // Trigger at 85% depth
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("revealed");
            }
        });
    }

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target); // Stop tracking once shown
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
