/**
 * Ryan & Sophia — Modern Minimalist Invitation JavaScript
 * Clean, modular, client-side dynamic data-driven template.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("basic2 template DOM Loaded - Processing data...");
    
    // 1. Process date/time configurations
    processWeddingData();

    // 2. Render all dynamic elements
    renderData();

    // 3. Initialize interactive widgets
    initWelcomeScreen();
    initStickyHeader();
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

  const dateVal = data.event.date || "2026-10-10";
  const timeVal = data.event.time || "04:30 PM";

  // Helper to convert 12h time ("04:30 PM") to 24h format ("16:30:00")
  function parseTime24h(t) {
    const match = t.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return "16:30:00";
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
    if (isNaN(dateObj)) return "Saturday, October 10, 2026";
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

  // Welcome page
  const welcomeSubtitle = document.getElementById('welcomeSubtitle');
  if (welcomeSubtitle) welcomeSubtitle.innerText = data.labels.subtitle;

  const welcomeTitle = document.getElementById('welcomeTitle');
  if (welcomeTitle) welcomeTitle.innerHTML = `${data.couple.groom} &amp; ${data.couple.bride}`;

  const welcomeDate = document.getElementById('welcomeDate');
  if (welcomeDate) {
    // format to dot structure e.g. 10 . 10 . 2026
    const parts = data.event.date.split('-');
    welcomeDate.innerText = `${parts[2]} . ${parts[1]} . ${parts[0]}`;
  }

  // Header Logo
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) headerLogo.innerText = data.couple.monogram;

  // Couple titles
  const unionTitle = document.getElementById('unionTitle');
  if (unionTitle) unionTitle.innerHTML = `${data.couple.groom} &amp; ${data.couple.bride}`;

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

  // Venue details
  const venueName = document.getElementById('venueName');
  if (venueName) venueName.innerText = data.event.venueName;

  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.innerText = data.event.venueAddress;

  const navigateBtn = document.getElementById('navigateBtn');
  if (navigateBtn) navigateBtn.href = data.event.mapDirectionsUrl;

  // Map Iframe Embed
  const mapEmbedWrapper = document.getElementById('mapEmbedWrapper');
  if (mapEmbedWrapper) {
    mapEmbedWrapper.innerHTML = `
      <iframe 
          src="${data.event.mapEmbedUrl}" 
          width="100%" 
          height="380" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Wedding Location Map">
      </iframe>
    `;
  }

  // Itinerary Grid
  const eventsGrid = document.getElementById('eventsGrid');
  if (eventsGrid && data.itinerary) {
    eventsGrid.innerHTML = data.itinerary.map(item => `
      <div class="event-card reveal">
          <div class="event-header">
              <span class="event-num">${item.num}</span>
              <h3>${item.title}</h3>
          </div>
          <div class="event-body">
              <div class="meta-row">
                  <span class="meta-label">DATE</span>
                  <span class="meta-value">${item.dateFormatted}</span>
              </div>
              <div class="meta-row">
                  <span class="meta-label">TIME</span>
                  <span class="meta-value">${item.time}</span>
              </div>
              <div class="meta-row">
                  <span class="meta-label">VENUE</span>
                  <span class="meta-value">${item.venue}</span>
              </div>
              <div class="meta-row">
                  <span class="meta-label">DRESS CODE</span>
                  <span class="meta-value">${item.dressCode}</span>
              </div>
          </div>
      </div>
    `).join('');
  }

  // Gallery Minimal Grid
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid && data.gallery) {
    galleryGrid.innerHTML = data.gallery.map((item, index) => `
      <div class="gallery-item reveal" data-index="${index}">
          <img src="${item.src}" alt="${item.caption}" loading="lazy">
          <div class="img-overlay">
              <span class="img-caption">${item.caption.split(' — ')[0].toUpperCase()}</span>
          </div>
      </div>
    `).join('');
  }

  // Contacts
  const contactsGrid = document.getElementById('contactsGrid');
  if (contactsGrid && data.contacts) {
    contactsGrid.innerHTML = data.contacts.map(contact => `
      <div class="contact-card reveal">
          <span class="contact-title">${contact.side}</span>
          <h3 class="contact-name">${contact.name}</h3>
          <div class="contact-actions">
              <a href="tel:${contact.phone.replace(/[\s()-]/g, '')}" class="btn-minimal-outline"><i class="fa-solid fa-phone"></i> ${data.labels.telButtonLabel}</a>
              <a href="https://wa.me/${contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn-minimal-outline"><i class="fa-brands fa-whatsapp"></i> ${data.labels.whatsappButtonLabel}</a>
          </div>
      </div>
    `).join('');
  }

  // Labels
  if (data.labels) {
    const unionLabel = document.getElementById('unionLabel');
    if (unionLabel) unionLabel.innerText = data.labels.unionLabel;

    const unionIntro = document.getElementById('unionIntro');
    if (unionIntro) unionIntro.innerText = data.labels.unionIntro;

    const scheduleLabel = document.getElementById('scheduleLabel');
    if (scheduleLabel) scheduleLabel.innerText = data.labels.scheduleLabel;

    const scheduleTitle = document.getElementById('scheduleTitle');
    if (scheduleTitle) scheduleTitle.innerText = data.labels.scheduleTitle;

    const countdownTitle = document.getElementById('countdownTitle');
    if (countdownTitle) countdownTitle.innerText = data.labels.countdownTitle;

    const locationLabel = document.getElementById('locationLabel');
    if (locationLabel) locationLabel.innerText = data.labels.locationLabel;

    const locationTitle = document.getElementById('locationTitle');
    if (locationTitle) locationTitle.innerText = data.labels.locationTitle;

    const directionsText = document.getElementById('directionsText');
    if (directionsText) directionsText.innerText = data.labels.directionsText;

    const getDirectionsLabel = document.getElementById('getDirectionsLabel');
    if (getDirectionsLabel) getDirectionsLabel.innerText = data.labels.getDirectionsLabel;

    const copyAddressLabel = document.getElementById('copyAddressLabel');
    if (copyAddressLabel) copyAddressLabel.innerText = data.labels.copyAddressLabel;

    const toastCopiedText = document.getElementById('copy-toast');
    if (toastCopiedText) toastCopiedText.innerText = data.labels.toastCopiedText;

    const galleryLabel = document.getElementById('galleryLabel');
    if (galleryLabel) galleryLabel.innerText = data.labels.galleryLabel;

    const galleryTitle = document.getElementById('galleryTitle');
    if (galleryTitle) galleryTitle.innerText = data.labels.galleryTitle;

    const contactsLabel = document.getElementById('contactsLabel');
    if (contactsLabel) contactsLabel.innerText = data.labels.contactsLabel;

    const contactsTitle = document.getElementById('contactsTitle');
    if (contactsTitle) contactsTitle.innerText = data.labels.contactsTitle;

    const groomRole = document.getElementById('groomRole');
    if (groomRole) groomRole.innerText = data.labels.groomRole;

    const brideRole = document.getElementById('brideRole');
    if (brideRole) brideRole.innerText = data.labels.brideRole;

    const footerLogo = document.getElementById('footerLogo');
    if (footerLogo) footerLogo.innerText = data.couple.monogram;

    const footerAnnouncement = document.getElementById('footerAnnouncement');
    if (footerAnnouncement) footerAnnouncement.innerText = data.labels.footerAnnouncement;
  }
}

/* ==========================================
   1. WELCOME SCREEN TRANSITION
   ========================================== */
function initWelcomeScreen() {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const btnViewInvite = document.getElementById("btn-view-invite");

    if (!btnViewInvite) return;

    btnViewInvite.addEventListener("click", () => {
        if (welcomeScreen) welcomeScreen.classList.add("fade-out");
        if (mainContent) {
            mainContent.classList.remove("content-hidden");
            void mainContent.offsetWidth; // Force Reflow
            mainContent.classList.add("fade-in");
        }
        document.body.style.overflow = "auto";
    });
    
    document.body.style.overflow = "hidden"; // lock initially
}

/* ==========================================
   2. HEADER & STICKY STYLES
   ========================================== */
function initStickyHeader() {
    const header = document.getElementById("main-header");
    const backToTopBtn = document.getElementById("back-to-top");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        if (backToTopBtn) {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                if (menuToggle) menuToggle.classList.remove("active");
                if (navMenu) navMenu.classList.remove("active");
                
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
    const countdownDays = document.getElementById("days");
    const countdownHours = document.getElementById("hours");
    const countdownMinutes = document.getElementById("minutes");
    const countdownSeconds = document.getElementById("seconds");

    const dateStr = (window.weddingData && window.weddingData.event && window.weddingData.event.dateTimeString) || "2026-10-10T16:30:00";
    let targetDate = new Date(dateStr).getTime();

    // Fallback for older browsers
    if (isNaN(targetDate)) {
        const cleaned = dateStr.replace(/-/g, '/').replace('T', ' ');
        targetDate = new Date(cleaned).getTime();
    }
    if (isNaN(targetDate)) {
        targetDate = new Date(2026, 9, 10, 16, 30, 0).getTime();
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            if (countdownDays) countdownDays.innerText = "00";
            if (countdownHours) countdownHours.innerText = "00";
            if (countdownMinutes) countdownMinutes.innerText = "00";
            if (countdownSeconds) countdownSeconds.innerText = "00";
            return;
        }
        
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        
        if (countdownDays) countdownDays.innerText = String(d).padStart(2, '0');
        if (countdownHours) countdownHours.innerText = String(h).padStart(2, '0');
        if (countdownMinutes) countdownMinutes.innerText = String(m).padStart(2, '0');
        if (countdownSeconds) countdownSeconds.innerText = String(s).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ==========================================
   4. COPY ADDRESS WIDGET
   ========================================== */
function initAddressCopyButton() {
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-toast");

    if (!btnCopyAddress) return;

    btnCopyAddress.addEventListener("click", () => {
        const address = (window.weddingData && window.weddingData.event && window.weddingData.event.venueAddress) || "12 Park Avenue, Crescent Heights, New York, NY 10016";
        
        navigator.clipboard.writeText(address).then(() => {
            showCopyNotification();
        }).catch(() => {
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
                console.error('Copy fallback fails', e);
            }
            document.body.removeChild(area);
        });
    });

    function showCopyNotification() {
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
   5. PHOTO GALLERY LIGHTBOX
   ========================================== */
function initLightboxGallery() {
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentGalleryIndex = 0;

    // Use event delegation on galleryGrid
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
        if (lightboxCaption) lightboxCaption.innerText = item.caption.toUpperCase();
        
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
        if (lightboxCaption) lightboxCaption.innerText = item.caption.toUpperCase();
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
        if (lightboxCaption) lightboxCaption.innerText = item.caption.toUpperCase();
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
   6. SCROLL REVEAL OBSERVER
   ========================================== */
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal");
    
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
        const triggerDepth = (window.innerHeight / 10) * 8.5;
        function revealOnScroll() {
            revealElements.forEach(el => {
                const elTop = el.getBoundingClientRect().top;
                if (elTop < triggerDepth) {
                    el.classList.add("revealed");
                }
            });
        }
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll();
    }
}
