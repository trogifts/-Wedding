/**
 * Wedding of Zayn & Aara - Modern Client-Side JavaScript
 * Fully client-side, dynamic data-driven template.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("basic1 template DOM Loaded - Processing data...");

    // 1. Process date/time simple configurations
    processWeddingData();

    // 2. Render all texts, schedules, and maps dynamically
    renderData();

    // 3. Initialize audio, menus, lightbox, and animations
    initAudio();
    initNavigationMenu();
    initCountdown();
    initAddressCopyButton();
    initLightboxGallery();
    setupScrollAnimations();
});

/* ==========================================
   DATE & TIME PRE-PROCESSOR
   ========================================== */
function processWeddingData() {
    const data = window.weddingData;
    if (!data || !data.event) return;

    const dateVal = data.event.date || "2026-09-04";
    const timeVal = data.event.time || "02:00 PM";

    // Helper to convert 12h time ("02:00 PM") to 24h format ("14:00:00")
    function parseTime24h(t) {
        const match = t.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
        if (!match) return "14:00:00";
        let hr = parseInt(match[1]);
        const min = match[2];
        const ampm = match[3].toUpperCase();
        if (ampm === "PM" && hr < 12) hr += 12;
        if (ampm === "AM" && hr === 12) hr = 0;
        return `${String(hr).padStart(2, '0')}:${min}:00`;
    }

    // Helper to format date to human readable form
    function formatLocalDate(dStr) {
        const dateObj = new Date(dStr + "T00:00:00");
        if (isNaN(dateObj)) return "Friday, September 4, 2026";
        return dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const time24h = parseTime24h(timeVal);

    // Auto-fill calculated fields for countdown and calendar invites
    data.event.dateTimeString = `${dateVal}T${time24h}`;
    data.event.dateFormatted = formatLocalDate(dateVal);
}

/* ==========================================
   DYNAMIC DATA RENDERING
   ========================================== */
function renderData() {
    const data = window.weddingData;
    if (!data) return;

    // Title
    const metaTitle = document.getElementById('metaTitle');
    if (metaTitle) metaTitle.innerText = `Wedding of ${data.couple.groom} & ${data.couple.bride}`;

    // Monograms
    ['loadingMonogram', 'headerMonogram', 'footerMonogram'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = data.couple.monogram;
    });

    // Names
    const coverNames = document.getElementById('coverNames');
    if (coverNames) coverNames.innerHTML = `${data.couple.groom} &amp; ${data.couple.bride}`;

    const heroNames = document.getElementById('heroNames');
    if (heroNames) heroNames.innerHTML = `${data.couple.groom} &amp; ${data.couple.bride}`;

    const footerNames = document.getElementById('footerNames');
    if (footerNames) footerNames.innerHTML = `${data.couple.groom} &amp; ${data.couple.bride}`;

    // Bios
    const groomName = document.getElementById('groomName');
    if (groomName) groomName.innerText = data.couple.groomFull;

    const groomBio = document.getElementById('groomBio');
    if (groomBio) groomBio.innerText = data.couple.groomBio;

    const groomParents = document.getElementById('groomParents');
    if (groomParents) groomParents.innerText = data.couple.groomParents;

    const brideName = document.getElementById('brideName');
    if (brideName) brideName.innerText = data.couple.brideFull;

    const brideBio = document.getElementById('brideBio');
    if (brideBio) brideBio.innerText = data.couple.brideBio;

    const brideParents = document.getElementById('brideParents');
    if (brideParents) brideParents.innerText = data.couple.brideParents;

    // Event Venue details
    const venueName = document.getElementById('venueName');
    if (venueName) venueName.innerText = data.event.venueName;

    const venueAddress = document.getElementById('venueAddress');
    if (venueAddress) venueAddress.innerText = data.event.venueAddress;

    // WhatsApp Floating Button Link
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${data.event.whatsappNumber}?text=Salam!%20I%20have%20a%20question%20regarding%20${data.couple.groom}%20and%20${data.couple.bride}'s%20wedding.`;
    }

    // Navigation Links
    const navigateBtn = document.getElementById('navigateBtn');
    if (navigateBtn) navigateBtn.href = data.event.mapDirectionsUrl;

    // Map Iframe Embed
    const mapEmbedWrapper = document.getElementById('mapEmbedWrapper');
    if (mapEmbedWrapper) {
        mapEmbedWrapper.innerHTML = `
      <iframe 
          src="${data.event.mapEmbedUrl}" 
          width="100%" 
          height="450" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Wedding Venue Map">
      </iframe>
    `;
    }

    // Render Itinerary Grid
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid && data.itinerary) {
        eventsGrid.innerHTML = data.itinerary.map(item => `
      <div class="event-card reveal ${item.highlight ? 'highlight' : ''}">
          <div class="event-card-inner">
              <div class="event-icon">
                  <i class="fa-solid ${item.title.toLowerCase().includes('nikah') ? 'fa-feather-pointed' : item.title.toLowerCase().includes('walima') ? 'fa-handshake-angle' : 'fa-chess-king'}"></i>
              </div>
              ${item.highlight ? '<div class="badge-gold">Main Event</div>' : ''}
              <h3 class="event-name">${item.title}</h3>
              <div class="event-time-line">
                  <p><i class="fa-regular fa-calendar-days"></i> ${item.dateFormatted}</p>
                  <p><i class="fa-regular fa-clock"></i> ${item.time}</p>
              </div>
              <div class="event-venue">
                  <strong>${item.venue}</strong>
                  <p>${item.address}</p>
              </div>
              <div class="event-actions">
                  <a href="#venue" class="btn-outline-gold"><i class="fa-solid fa-location-dot"></i> View Venue</a>
              </div>
          </div>
      </div>
    `).join('');
    }

    // Render Gallery
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid && data.gallery) {
        galleryGrid.innerHTML = data.gallery.map((item, index) => `
      <div class="gallery-item reveal" data-index="${index}">
          <div class="gallery-item-inner">
              <img src="${item.src}" alt="${item.caption}" loading="lazy">
              <div class="gallery-overlay">
                  <div class="overlay-icon"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
                  <span>${item.caption.split(' - ')[0]}</span>
              </div>
          </div>
      </div>
    `).join('');
    }

    // Render Contacts
    const contactsGrid = document.getElementById('contactsGrid');
    if (contactsGrid && data.contacts) {
        contactsGrid.innerHTML = data.contacts.map((contact, idx) => `
      <div class="contact-card reveal ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
          <h4>${contact.side}</h4>
          <span class="contact-name">${contact.name}</span>
          <span class="contact-relation">${contact.relation}</span>
          <div class="contact-methods">
              <a href="tel:${contact.phone.replace(/[\s()-]/g, '')}" class="contact-link"><i class="fa-solid fa-phone"></i> ${contact.phone}</a>
              <a href="https://wa.me/${contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="contact-link wa"><i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp</a>
          </div>
      </div>
    `).join('');
    }

    // Render labels
    if (data.labels) {
        const announcement = document.getElementById('announcement');
        if (announcement) announcement.innerText = data.labels.announcement;

        const heroDate = document.getElementById('heroDate');
        if (heroDate) heroDate.innerText = data.event.dateFormatted;

        const islamicDate = document.getElementById('islamicDate');
        if (islamicDate) islamicDate.innerText = data.event.islamicDate;

        const scrollHint = document.getElementById('scrollHint');
        if (scrollHint) scrollHint.innerText = data.labels.scrollHint;

        const introducingSub = document.getElementById('introducingSub');
        if (introducingSub) introducingSub.innerText = data.labels.introducingSub;

        const introducingTitle = document.getElementById('introducingTitle');
        if (introducingTitle) introducingTitle.innerText = data.labels.introducingTitle;

        const quranQuote = document.getElementById('quranQuote');
        if (quranQuote) quranQuote.innerText = data.labels.quranQuote;

        const quranSource = document.getElementById('quranSource');
        if (quranSource) quranSource.innerText = data.labels.quranSource;

        const scheduleSub = document.getElementById('scheduleSub');
        if (scheduleSub) scheduleSub.innerText = data.labels.scheduleSub;

        const scheduleTitle = document.getElementById('scheduleTitle');
        if (scheduleTitle) scheduleTitle.innerText = data.labels.scheduleTitle;

        const locationSub = document.getElementById('locationSub');
        if (locationSub) locationSub.innerText = data.labels.locationSub;

        const locationTitle = document.getElementById('locationTitle');
        if (locationTitle) locationTitle.innerText = data.labels.locationTitle;

        const primaryVenueHeading = document.getElementById('primaryVenueHeading');
        if (primaryVenueHeading) primaryVenueHeading.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${data.labels.primaryVenueHeading}`;

        const valetParkingText = document.getElementById('valetParkingText');
        if (valetParkingText) valetParkingText.innerText = data.labels.valetParkingText;

        const navigateButtonLabel = document.getElementById('navigateButtonLabel');
        if (navigateButtonLabel) navigateButtonLabel.innerText = data.labels.navigateButton;

        const copyAddressButtonLabel = document.getElementById('copyAddressButtonLabel');
        if (copyAddressButtonLabel) copyAddressButtonLabel.innerText = data.labels.copyAddressButton;

        const toastCopiedText = document.getElementById('copy-success-toast');
        if (toastCopiedText) toastCopiedText.innerText = data.labels.toastCopiedText;

        const gallerySub = document.getElementById('gallerySub');
        if (gallerySub) gallerySub.innerText = data.labels.gallerySub;

        const galleryTitle = document.getElementById('galleryTitle');
        if (galleryTitle) galleryTitle.innerText = data.labels.galleryTitle;

        const helpSub = document.getElementById('helpSub');
        if (helpSub) helpSub.innerText = data.labels.helpSub;

        const helpTitle = document.getElementById('helpTitle');
        if (helpTitle) helpTitle.innerText = data.labels.helpTitle;

        const helpIntro = document.getElementById('helpIntro');
        if (helpIntro) helpIntro.innerText = data.labels.helpIntro;

        const footerBlessing = document.getElementById('footerBlessing');
        if (footerBlessing) footerBlessing.innerText = data.labels.footerBlessing;
    }
}

/* ==========================================
   1. COVER / OPEN INVITATION FLOW & AUDIO
   ========================================== */
let isPlaying = false;

function initAudio() {
    const loaderScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    if (!btnOpenInvite) return;

    btnOpenInvite.addEventListener("click", () => {
        if (loaderScreen) loaderScreen.classList.add("fade-out");
        if (mainContent) {
            mainContent.classList.remove("content-hidden");
            void mainContent.offsetWidth; // force reflow
            mainContent.classList.add("fade-in");
        }
        document.body.style.overflow = "auto";
        playAudio();
    });

    document.body.style.overflow = "hidden"; // block scroll initially

    if (musicToggle) {
        musicToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }

    function playAudio() {
        if (!bgMusic || !musicToggle) return;
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add("playing");
            musicToggle.classList.remove("muted");
        }).catch(err => {
            console.log("Autoplay blocked. Waiting for interaction.", err);
            isPlaying = false;
            musicToggle.classList.remove("playing");
            musicToggle.classList.add("muted");
        });
    }

    function pauseAudio() {
        if (!bgMusic || !musicToggle) return;
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("muted");
    }
}

/* ==========================================
   2. STICKY NAV MENU
   ========================================== */
function initNavigationMenu() {
    const header = document.getElementById("main-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                if (navMenu) navMenu.classList.remove("active");
                const icon = menuToggle ? menuToggle.querySelector("i") : null;
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }

                const headerHeight = header.offsetHeight;
                const targetPos = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* ==========================================
   3. COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const dateStr = (window.weddingData && window.weddingData.event && window.weddingData.event.dateTimeString) || "2026-09-04T14:00:00";
    let targetDate = new Date(dateStr).getTime();

    // Fallback for older browsers
    if (isNaN(targetDate)) {
        const cleaned = dateStr.replace(/-/g, '/').replace('T', ' ');
        targetDate = new Date(cleaned).getTime();
    }
    if (isNaN(targetDate)) {
        targetDate = new Date(2026, 8, 4, 14, 0, 0).getTime();
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ==========================================
   4. COPY ADDRESS BUTTON
   ========================================== */
function initAddressCopyButton() {
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-success-toast");

    if (!btnCopyAddress) return;

    btnCopyAddress.addEventListener("click", () => {
        const addressText = (window.weddingData && window.weddingData.event && window.weddingData.event.venueAddress) || "789 Golden Gate Blvd, Astoria Garden, New York, NY 11102";

        navigator.clipboard.writeText(addressText).then(() => {
            showToast();
        }).catch(err => {
            const textArea = document.createElement("textarea");
            textArea.value = addressText;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showToast();
            } catch (copyErr) {
                console.error('Copy fallback failed', copyErr);
            }
            document.body.removeChild(textArea);
        });
    });

    function showToast() {
        if (!copyToast) return;
        copyToast.classList.add("toast-visible");
        copyToast.classList.remove("toast-hidden");

        setTimeout(() => {
            copyToast.classList.remove("toast-visible");
            copyToast.classList.add("toast-hidden");
        }, 2500);
    }
}

/* ==========================================
   5. LIGHTBOX GALLERY
   ========================================== */
function initLightboxGallery() {
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentGalleryIndex = 0;

    // Use event delegation on the grid container
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = item.getAttribute('data-index');
            openLightbox(index);
        }
    });

    function openLightbox(index) {
        const data = window.weddingData;
        if (!data || !data.gallery) return;

        currentGalleryIndex = parseInt(index);
        const item = data.gallery[currentGalleryIndex];

        if (lightboxImg) {
            lightboxImg.src = item.src;
            lightboxImg.style.opacity = 1;
        }
        if (lightboxCaption) lightboxCaption.innerText = item.caption;

        if (lightboxModal) {
            lightboxModal.classList.remove("modal-hidden");
            lightboxModal.setAttribute("aria-hidden", "false");
        }
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.add("modal-hidden");
            lightboxModal.setAttribute("aria-hidden", "true");
        }
        document.body.style.overflow = "auto";
    }

    function showNextImage() {
        const data = window.weddingData;
        if (!data || !data.gallery) return;

        currentGalleryIndex = (currentGalleryIndex + 1) % data.gallery.length;
        const item = data.gallery[currentGalleryIndex];
        if (lightboxImg) {
            lightboxImg.style.opacity = 0;
            setTimeout(() => {
                lightboxImg.src = item.src;
                lightboxImg.style.opacity = 1;
            }, 150);
        }
        if (lightboxCaption) lightboxCaption.innerText = item.caption;
    }

    function showPrevImage() {
        const data = window.weddingData;
        if (!data || !data.gallery) return;

        currentGalleryIndex = (currentGalleryIndex - 1 + data.gallery.length) % data.gallery.length;
        const item = data.gallery[currentGalleryIndex];
        if (lightboxImg) {
            lightboxImg.style.opacity = 0;
            setTimeout(() => {
                lightboxImg.src = item.src;
                lightboxImg.style.opacity = 1;
            }, 150);
        }
        if (lightboxCaption) lightboxCaption.innerText = item.caption;
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener("click", showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener("click", showPrevImage);

    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal || e.target.classList.contains("lightbox-content-wrapper")) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (lightboxModal && !lightboxModal.classList.contains("modal-hidden")) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNextImage();
            if (e.key === "ArrowLeft") showPrevImage();
        }
    });
}

/* ==========================================
   6. SCROLL REVEAL TRIGGERS
   ========================================== */
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -100px 0px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        const triggerBottom = (window.innerHeight / 10) * 8.5;
        function revealOnScroll() {
            revealElements.forEach(el => {
                const elTop = el.getBoundingClientRect().top;
                if (elTop < triggerBottom) {
                    el.classList.add("revealed");
                }
            });
        }
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();
    }
}
