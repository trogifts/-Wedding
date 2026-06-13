/**
 * The Wedding of Zayn & Aara - Premium Luxury JavaScript
 * Fully client-side, modular, vanilla JS.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("standard1 template DOM Loaded - Processing data...");
    
    // 1. Process date/time configurations
    processWeddingData();

    // 2. Render all dynamic elements
    renderData();

    // 3. Initialize Interactive Features
    initThemeSwitcher();
    initCanvasSparkles();
    initInviteOpener();
    initMusicControls();
    initScrollProgress();
    initCountdown();
    initVideoPlayer();
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
  if (metaTitle) metaTitle.innerText = `The Wedding of ${data.couple.groom} & ${data.couple.bride} - Premium Luxury Invitation`;

  // Cover / Loading Screen
  const arabicBismillahSub = document.getElementById('arabicBismillahSub');
  if (arabicBismillahSub) arabicBismillahSub.innerText = data.labels.loadingSub;

  const coverMonogram = document.getElementById('coverMonogram');
  if (coverMonogram) coverMonogram.innerText = data.couple.monogram;

  const coverCoupleTitle = document.getElementById('coverCoupleTitle');
  if (coverCoupleTitle) coverCoupleTitle.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const coverInviteText = document.getElementById('coverInviteText');
  if (coverInviteText) coverInviteText.innerText = data.labels.inviteText || "We request the honor of your presence to witness the sacred union of our hearts.";

  const openInviteText = document.getElementById('openInviteText');
  if (openInviteText) openInviteText.innerText = data.labels.openInvite;

  // Background Music URL
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
    const src = bgMusic.querySelector('source');
    if (src) src.src = data.event.bgMusicUrl;
    bgMusic.load();
  }

  // Floating WhatsApp Link
  const whatsappFloatingLink = document.getElementById('whatsappFloatingLink');
  if (whatsappFloatingLink) {
    whatsappFloatingLink.href = `https://wa.me/${data.event.whatsappNumber}?text=Assalamu%20Alaikum!%20I%20have%20an%20inquiry%20regarding%20${data.couple.groom}%20and%20${data.couple.bride}'s%20wedding%20celebration.`;
  }

  // Header logo
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) headerLogo.innerText = data.couple.monogram;

  // Nav menu links
  const navLinkHome = document.getElementById('navLinkHome');
  if (navLinkHome) navLinkHome.innerText = data.labels.home;

  const navLinkStory = document.getElementById('navLinkStory');
  if (navLinkStory) navLinkStory.innerText = data.labels.story;

  const navLinkCouple = document.getElementById('navLinkCouple');
  if (navLinkCouple) navLinkCouple.innerText = data.labels.couple;

  const navLinkEvents = document.getElementById('navLinkEvents');
  if (navLinkEvents) navLinkEvents.innerText = data.labels.events;

  const navLinkGallery = document.getElementById('navLinkGallery');
  if (navLinkGallery) navLinkGallery.innerText = data.labels.gallery;

  // Dock Links
  const dockLinkHome = document.getElementById('dockLinkHome');
  if (dockLinkHome) {
    const span = dockLinkHome.querySelector('span');
    if (span) span.innerText = data.labels.home;
  }
  const dockLinkStory = document.getElementById('dockLinkStory');
  if (dockLinkStory) {
    const span = dockLinkStory.querySelector('span');
    if (span) span.innerText = data.labels.story;
  }
  const dockLinkEvents = document.getElementById('dockLinkEvents');
  if (dockLinkEvents) {
    const span = dockLinkEvents.querySelector('span');
    if (span) span.innerText = data.labels.events;
  }
  const dockLinkGallery = document.getElementById('dockLinkGallery');
  if (dockLinkGallery) {
    const span = dockLinkGallery.querySelector('span');
    if (span) span.innerText = data.labels.gallery;
  }

  // Hero Section
  const heroAnnouncement = document.getElementById('heroAnnouncement');
  if (heroAnnouncement) heroAnnouncement.innerText = data.labels.heroAnnouncement;

  const heroCoupleNames = document.getElementById('heroCoupleNames');
  if (heroCoupleNames) heroCoupleNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const heroDateStr = document.getElementById('heroDateStr');
  if (heroDateStr) heroDateStr.innerText = data.event.dateFormatted;

  const heroIslamicDate = document.getElementById('heroIslamicDate');
  if (heroIslamicDate) heroIslamicDate.innerText = data.event.islamicDate;

  const heroVenueSummary = document.getElementById('heroVenueSummary');
  if (heroVenueSummary) heroVenueSummary.innerText = data.event.venueSummary;

  const daysLabel = document.getElementById('daysLabel');
  if (daysLabel) daysLabel.innerText = data.labels.days;

  const hoursLabel = document.getElementById('hoursLabel');
  if (hoursLabel) hoursLabel.innerText = data.labels.hours;

  const minutesLabel = document.getElementById('minutesLabel');
  if (minutesLabel) minutesLabel.innerText = data.labels.minutes;

  const secondsLabel = document.getElementById('secondsLabel');
  if (secondsLabel) secondsLabel.innerText = data.labels.seconds;

  const heroBtnLabel = document.getElementById('heroBtnLabel');
  if (heroBtnLabel) heroBtnLabel.innerText = data.labels.heroBtnLabel;

  const scrollDownLabel = document.getElementById('scrollDownLabel');
  if (scrollDownLabel) scrollDownLabel.innerText = data.labels.scrollDownLabel;

  // Story Section headings
  const storySubTitle = document.getElementById('storySubTitle');
  if (storySubTitle) storySubTitle.innerText = data.labels.storySubTitle;

  const storyTitle = document.getElementById('storyTitle');
  if (storyTitle) storyTitle.innerText = data.labels.storyTitle;

  // Couple Section headings
  const coupleSubTitle = document.getElementById('coupleSubTitle');
  if (coupleSubTitle) coupleSubTitle.innerText = data.labels.coupleSubTitle;

  const coupleTitle = document.getElementById('coupleTitle');
  if (coupleTitle) coupleTitle.innerText = data.labels.coupleTitle;

  const quranQuote = document.getElementById('quranQuote');
  if (quranQuote) {
    quranQuote.innerHTML = `
      ${data.coupleDetails.quranQuote}
      <span class="quote-source" id="quranQuoteSource">${data.coupleDetails.quranQuoteSource}</span>
    `;
  }

  // Groom Biography details
  const groomName = document.getElementById('groomName');
  if (groomName) groomName.innerText = data.couple.groomFull;

  const groomRole = document.getElementById('groomRole');
  if (groomRole) groomRole.innerText = data.labels.groomRole;

  const groomBio = document.getElementById('groomBio');
  if (groomBio) groomBio.innerText = data.coupleDetails.groomBio;

  const groomParentsLabel = document.getElementById('groomParentsLabel');
  if (groomParentsLabel) groomParentsLabel.innerText = data.labels.groomParentsLabel;

  const groomParents = document.getElementById('groomParents');
  if (groomParents) groomParents.innerText = data.coupleDetails.groomParents;

  const groomInstagramLink = document.getElementById('groomInstagramLink');
  if (groomInstagramLink) groomInstagramLink.href = data.coupleDetails.groomInstagram;

  const groomTwitterLink = document.getElementById('groomTwitterLink');
  if (groomTwitterLink) groomTwitterLink.href = data.coupleDetails.groomTwitter;

  // Bride Biography details
  const brideName = document.getElementById('brideName');
  if (brideName) brideName.innerText = data.couple.brideFull;

  const brideRole = document.getElementById('brideRole');
  if (brideRole) brideRole.innerText = data.labels.brideRole;

  const brideBio = document.getElementById('brideBio');
  if (brideBio) brideBio.innerText = data.coupleDetails.brideBio;

  const brideParentsLabel = document.getElementById('brideParentsLabel');
  if (brideParentsLabel) brideParentsLabel.innerText = data.labels.brideParentsLabel;

  const brideParents = document.getElementById('brideParents');
  if (brideParents) brideParents.innerText = data.coupleDetails.brideParents;

  const brideInstagramLink = document.getElementById('brideInstagramLink');
  if (brideInstagramLink) brideInstagramLink.href = data.coupleDetails.brideInstagram;

  const bridePinterestLink = document.getElementById('bridePinterestLink');
  if (bridePinterestLink) bridePinterestLink.href = data.coupleDetails.bridePinterest;

  // Events Section headings
  const eventsSubTitle = document.getElementById('eventsSubTitle');
  if (eventsSubTitle) eventsSubTitle.innerText = data.labels.eventsSubTitle;

  const eventsTitle = document.getElementById('eventsTitle');
  if (eventsTitle) eventsTitle.innerText = data.labels.eventsTitle;

  // Gallery Section headings
  const gallerySubTitle = document.getElementById('gallerySubTitle');
  if (gallerySubTitle) gallerySubTitle.innerText = data.labels.gallerySubTitle;

  const galleryTitle = document.getElementById('galleryTitle');
  if (galleryTitle) galleryTitle.innerText = data.labels.galleryTitle;

  // Video Section headings
  const videoSubTitle = document.getElementById('videoSubTitle');
  if (videoSubTitle) videoSubTitle.innerText = data.labels.videoSubTitle;

  const videoTitle = document.getElementById('videoTitle');
  if (videoTitle) videoTitle.innerText = data.labels.videoTitle;

  // Video source loading
  const teaserVideo = document.getElementById('teaser-video');
  const videoSource = document.getElementById('videoSource');
  if (teaserVideo && videoSource) {
    videoSource.src = data.event.teaserVideoUrl;
    teaserVideo.load();
  }

  // Family Blessings
  const familySubTitle = document.getElementById('familySubTitle');
  if (familySubTitle) familySubTitle.innerText = data.labels.familySubTitle;

  const familyTitle = document.getElementById('familyTitle');
  if (familyTitle) familyTitle.innerText = data.labels.familyTitle;

  const groomFamilyTitle = document.getElementById('groomFamilyTitle');
  if (groomFamilyTitle) groomFamilyTitle.innerText = data.familyBlessings.groomFamilyTitle;

  const groomFamilyHeading = document.getElementById('groomFamilyHeading');
  if (groomFamilyHeading) groomFamilyHeading.innerText = data.familyBlessings.groomFamilyHeading;

  const groomFamilyNames = document.getElementById('groomFamilyNames');
  if (groomFamilyNames) groomFamilyNames.innerHTML = data.familyBlessings.groomFamilyNames;

  const groomFamilyBlessing = document.getElementById('groomFamilyBlessing');
  if (groomFamilyBlessing) groomFamilyBlessing.innerText = data.familyBlessings.groomFamilyBlessing;

  const brideFamilyTitle = document.getElementById('brideFamilyTitle');
  if (brideFamilyTitle) brideFamilyTitle.innerText = data.familyBlessings.brideFamilyTitle;

  const brideFamilyHeading = document.getElementById('brideFamilyHeading');
  if (brideFamilyHeading) brideFamilyHeading.innerText = data.familyBlessings.brideFamilyHeading;

  const brideFamilyNames = document.getElementById('brideFamilyNames');
  if (brideFamilyNames) brideFamilyNames.innerHTML = data.familyBlessings.brideFamilyNames;

  const brideFamilyBlessing = document.getElementById('brideFamilyBlessing');
  if (brideFamilyBlessing) brideFamilyBlessing.innerText = data.familyBlessings.brideFamilyBlessing;

  // Venue Section headings
  const venueSubTitle = document.getElementById('venueSubTitle');
  if (venueSubTitle) venueSubTitle.innerText = data.labels.venueSubTitle;

  const venueTitle = document.getElementById('venueTitle');
  if (venueTitle) venueTitle.innerText = data.labels.venueTitle;

  const venueCardHeading = document.getElementById('venueCardHeading');
  if (venueCardHeading) venueCardHeading.innerHTML = `<i class="fa-solid fa-map-location-dot"></i> ${data.labels.venueCardHeading}`;

  const venueName = document.getElementById('venueName');
  if (venueName) venueName.innerText = data.event.venueName;

  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.innerText = data.event.venueAddress;

  const venueNote = document.getElementById('venueNote');
  if (venueNote) venueNote.innerText = data.labels.venueNote;

  const btnNavigate = document.getElementById('btnNavigate');
  if (btnNavigate) btnNavigate.href = data.event.mapDirectionsUrl;

  const btnNavigateText = document.getElementById('btnNavigateText');
  if (btnNavigateText) btnNavigateText.innerText = data.labels.btnNavigateText;

  const btnCopyAddressText = document.getElementById('btnCopyAddressText');
  if (btnCopyAddressText) btnCopyAddressText.innerText = data.labels.btnCopyAddressText;

  const toastCopiedText = document.getElementById('copy-success-toast');
  if (toastCopiedText) toastCopiedText.innerText = data.labels.toastCopiedText;

  // Map Embed
  const mapEmbedWrapper = document.getElementById('mapEmbedWrapper');
  if (mapEmbedWrapper) {
    mapEmbedWrapper.innerHTML = `
      <iframe 
          src="${data.event.mapEmbedUrl}" 
          width="100%" 
          height="350" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Wedding Venue Map Location">
      </iframe>
    `;
  }

  // Contacts Section headings
  const contactsSubTitle = document.getElementById('contactsSubTitle');
  if (contactsSubTitle) contactsSubTitle.innerText = data.labels.contactsSubTitle;

  const contactsTitle = document.getElementById('contactsTitle');
  if (contactsTitle) contactsTitle.innerText = data.labels.contactsTitle;

  // Footer Details
  const footerMonogram = document.getElementById('footerMonogram');
  if (footerMonogram) footerMonogram.innerText = data.couple.monogram;

  const footerCoupleNames = document.getElementById('footerCoupleNames');
  if (footerCoupleNames) footerCoupleNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const footerBlessing = document.getElementById('footerBlessing');
  if (footerBlessing) footerBlessing.innerText = data.couple.tagline;

  const footerCopyright = document.getElementById('footerCopyright');
  if (footerCopyright) footerCopyright.innerText = `© 2026 ${data.couple.groom} & ${data.couple.bride}. Created with Love. All Rights Reserved.`;

  // Render Story milestones
  const storyTimeline = document.getElementById('storyTimeline');
  if (storyTimeline && data.story) {
    storyTimeline.innerHTML = data.story.map((item, idx) => `
      <div class="timeline-item reveal ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
          <div class="timeline-img">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="timeline-badge"><i class="fa-solid ${item.iconClass}"></i></div>
          <div class="timeline-content glass-card">
              <span class="timeline-date">${item.date}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
          </div>
      </div>
    `).join('');
  }

  // Render Schedule timeline
  const eventsTimeline = document.getElementById('eventsTimeline');
  if (eventsTimeline && data.itinerary) {
    eventsTimeline.innerHTML = data.itinerary.map(item => `
      <div class="event-timeline-item reveal ${item.highlight ? 'highlight' : ''}">
          <div class="event-timeline-marker">
              <div class="marker-circle"><i class="fa-solid ${item.iconClass}"></i></div>
          </div>
          <div class="event-timeline-card glass-card">
              ${item.highlight ? `<div class="badge-gold">Main Banquet</div>` : ''}
              <h3 class="event-name">${item.stop}. ${item.title}</h3>
              <div class="event-time-line">
                  <p><i class="fa-regular fa-calendar-days"></i> ${item.date}</p>
                  <p><i class="fa-regular fa-clock"></i> ${item.time}</p>
              </div>
              <div class="event-venue-details">
                  <p><strong>${item.venue}</strong></p>
                  <p>Dress Code: ${item.dressCode}</p>
              </div>
              <a href="${item.calendarUrl}" 
                 target="_blank" rel="noopener noreferrer" class="btn-outline-gold calendar-btn">
                  <i class="fa-regular fa-calendar-plus"></i> ${data.labels.calendarButtonLabel}
              </a>
          </div>
      </div>
    `).join('');
  }

  // Render Gallery Masonry
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid && data.gallery) {
    galleryGrid.innerHTML = data.gallery.map((item, index) => `
      <div class="gallery-item-masonry" data-index="${index}">
          <img src="${item.src}" alt="${item.caption}" loading="lazy">
          <div class="gallery-hover-effect">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>${item.caption.split(' - ')[0]}</span>
          </div>
      </div>
    `).join('');
  }

  // Render Contacts
  const contactsGrid = document.getElementById('contactsGrid');
  if (contactsGrid && data.contacts) {
    contactsGrid.innerHTML = data.contacts.map((contact, idx) => `
      <div class="contact-card reveal ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'} glass-card">
          <h4>${contact.title}</h4>
          <span class="contact-name">${contact.name}</span>
          <span class="contact-relation">${contact.relation}</span>
          <div class="contact-methods">
              <a href="tel:${contact.phone.replace(/[\s()-]/g, '')}" class="contact-link"><i class="fa-solid fa-phone"></i> ${data.labels.contactsCallLabel} ${contact.phone}</a>
              <a href="https://wa.me/${contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="contact-link wa"><i class="fa-brands fa-whatsapp"></i> ${data.labels.contactsWhatsappLabel}</a>
          </div>
      </div>
    `).join('');
  }
}

/* ==========================================
   1. LIGHT/DARK THEME SWITCHER
   ========================================== */
function initThemeSwitcher() {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    const cachedTheme = localStorage.getItem("wedding_theme") || "light";
    document.body.setAttribute("data-theme", cachedTheme);
    updateThemeIcon(cachedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        
        document.body.setAttribute("data-theme", newTheme);
        localStorage.setItem("wedding_theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector("i");
        if (!icon) return;
        if (theme === "dark") {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    }
}

/* ==========================================
   2. CANVAS SPARKLES PARTICLE PHYSICS
   ========================================== */
function initCanvasSparkles() {
    const canvas = document.getElementById("sparkles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    const maxParticles = 35;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = Math.random() * 0.6 - 0.3;
            this.speedY = -(Math.random() * 0.8 + 0.3);
            this.opacity = Math.random() * 0.8 + 0.2;
            
            const goldColors = ["#ebd09b", "#c5a880", "#b19263", "#D4AF37", "#FFFFFF"];
            this.color = goldColors[Math.floor(Math.random() * goldColors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
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
}

/* ==========================================
   3. PAGE OPENER & INVITATION TRIGGER
   ========================================== */
function initInviteOpener() {
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const loaderScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    if (!btnOpenInvite) return;

    btnOpenInvite.addEventListener("click", () => {
        if (loaderScreen) loaderScreen.classList.add("fade-out");
        
        if (mainContent) {
            mainContent.classList.remove("content-hidden");
            void mainContent.offsetWidth; // Force reflow
            mainContent.classList.add("fade-in");
        }
        document.body.style.overflow = "auto";
        
        // Auto trigger audio play
        if (bgMusic && musicToggle) {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                musicToggle.classList.remove("muted");
                musicToggle.setAttribute("aria-label", "Mute Background Music");
            }).catch(err => {
                console.log("Autoplay was blocked by browser. Music will wait for user interaction.", err);
            });
        }
        
        // Trigger initial scroll animations
        window.dispatchEvent(new Event('scroll'));
    });
    
    document.body.style.overflow = "hidden"; // Block scrolling initially
}

/* ==========================================
   4. MUSIC CONTROLS
   ========================================== */
function initMusicControls() {
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    if (!bgMusic || !musicToggle) return;

    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!bgMusic.paused) {
            bgMusic.pause();
            musicToggle.classList.remove("playing");
            musicToggle.classList.add("muted");
            musicToggle.setAttribute("aria-label", "Play Background Music");
        } else {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                musicToggle.classList.remove("muted");
                musicToggle.setAttribute("aria-label", "Mute Background Music");
            }).catch(err => {
                console.log("Autoplay blocked", err);
            });
        }
    });
}

/* ==========================================
   5. SCROLL PROGRESS & ACTIVE NAV LINKS
   ========================================== */
function initScrollProgress() {
    const header = document.getElementById("main-header");
    const progressBar = document.getElementById("scroll-progress-bar");
    const navLinks = document.querySelectorAll(".nav-link");
    const dockLinks = document.querySelectorAll(".dock-link");

    if (!header) return;

    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPercent = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolledPercent + "%";
        
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Highlight links as user scrolls
    function highlightSectionsOnScroll() {
        const scrollPosition = window.scrollY + header.offsetHeight + 120;
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
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

    // Anchor smooth scrolling
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
}

/* ==========================================
   6. LIVE WEDDING COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
    const countdownDays = document.getElementById("days");
    const countdownHours = document.getElementById("hours");
    const countdownMinutes = document.getElementById("minutes");
    const countdownSeconds = document.getElementById("seconds");

    const dateStr = (window.weddingData && window.weddingData.event && window.weddingData.event.dateTimeString) || "2026-09-04T14:00:00";
    let weddingDate = new Date(dateStr).getTime();

    // Fallback for older browsers
    if (isNaN(weddingDate)) {
        const cleaned = dateStr.replace(/-/g, '/').replace('T', ' ');
        weddingDate = new Date(cleaned).getTime();
    }
    if (isNaN(weddingDate)) {
        weddingDate = new Date(2026, 8, 4, 14, 0, 0).getTime();
    }

    function calculateCountdown() {
        const now = new Date().getTime();
        const gap = weddingDate - now;
        
        if (gap <= 0) {
            if (countdownDays) countdownDays.innerText = "00";
            if (countdownHours) countdownHours.innerText = "00";
            if (countdownMinutes) countdownMinutes.innerText = "00";
            if (countdownSeconds) countdownSeconds.innerText = "00";
            return;
        }
        
        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);
        
        if (countdownDays) countdownDays.innerText = String(d).padStart(2, '0');
        if (countdownHours) countdownHours.innerText = String(h).padStart(2, '0');
        if (countdownMinutes) countdownMinutes.innerText = String(m).padStart(2, '0');
        if (countdownSeconds) countdownSeconds.innerText = String(s).padStart(2, '0');
    }
    
    calculateCountdown();
    setInterval(calculateCountdown, 1000);
}

/* ==========================================
   7. CUSTOM VIDEO PLAYER SYSTEM
   ========================================== */
function initVideoPlayer() {
    const teaserVideo = document.getElementById("teaser-video");
    const videoPlayBtn = document.getElementById("video-play-btn");
    const videoOverlay = document.getElementById("video-overlay");
    const videoWrapper = document.querySelector(".video-player-wrapper");
    const videoMuteBtn = document.getElementById("video-mute-btn");
    const videoProgressContainer = document.getElementById("video-progress-container");
    const videoProgressBar = document.getElementById("video-progress-bar");

    if (!teaserVideo || !videoPlayBtn || !videoOverlay) return;

    videoPlayBtn.addEventListener("click", toggleVideoPlayback);
    videoOverlay.addEventListener("click", toggleVideoPlayback);
    
    teaserVideo.addEventListener("play", () => {
        if (videoWrapper) videoWrapper.classList.add("playing");
    });
    
    teaserVideo.addEventListener("pause", () => {
        if (videoWrapper) videoWrapper.classList.remove("playing");
    });
    
    function toggleVideoPlayback() {
        if (teaserVideo.paused) {
            teaserVideo.play();
        } else {
            teaserVideo.pause();
        }
    }
    
    if (videoMuteBtn) {
        videoMuteBtn.addEventListener("click", () => {
            const icon = videoMuteBtn.querySelector("i");
            if (teaserVideo.muted) {
                teaserVideo.muted = false;
                if (icon) {
                    icon.classList.remove("fa-volume-xmark");
                    icon.classList.add("fa-volume-high");
                }
            } else {
                teaserVideo.muted = true;
                if (icon) {
                    icon.classList.remove("fa-volume-high");
                    icon.classList.add("fa-volume-xmark");
                }
            }
        });
    }
    
    teaserVideo.addEventListener("timeupdate", () => {
        const percent = (teaserVideo.currentTime / teaserVideo.duration) * 100;
        if (videoProgressBar) videoProgressBar.style.width = percent + "%";
    });
    
    if (videoProgressContainer) {
        videoProgressContainer.addEventListener("click", (e) => {
            const rect = videoProgressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            teaserVideo.currentTime = (clickX / width) * teaserVideo.duration;
        });
    }
}

/* ==========================================
   8. CLIPBOARD VENUE ADDRESS COPY
   ========================================== */
function initAddressCopyButton() {
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-success-toast");
    if (!btnCopyAddress) return;

    btnCopyAddress.addEventListener("click", () => {
        const address = (window.weddingData && window.weddingData.event && window.weddingData.event.venueAddress) || "The Palace Ballroom, 789 Golden Gate Blvd, Astoria Garden, New York, NY 11102";
        
        navigator.clipboard.writeText(address).then(() => {
            triggerToast();
        }).catch(() => {
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

    function triggerToast() {
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
   9. PHOTO GALLERY LIGHTBOX SYSTEM
   ========================================== */
function initLightboxGallery() {
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentGalleryIndex = 0;
    let touchstartX = 0;
    let touchendX = 0;

    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item-masonry');
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
        
        if (lightboxImg) lightboxImg.src = item.src;
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
        const loaderScreen = document.getElementById("loading-screen");
        if (loaderScreen && loaderScreen.classList.contains("fade-out")) {
            document.body.style.overflow = "auto";
        }
    }

    function showNextImage() {
        const data = window.weddingData;
        if (!data || !data.gallery) return;

        currentGalleryIndex = (currentGalleryIndex + 1) % data.gallery.length;
        updateLightboxContent();
    }

    function showPrevImage() {
        const data = window.weddingData;
        if (!data || !data.gallery) return;

        currentGalleryIndex = (currentGalleryIndex - 1 + data.gallery.length) % data.gallery.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        const data = window.weddingData;
        if (!data || !data.gallery) return;

        const item = data.gallery[currentGalleryIndex];
        if (lightboxImg) {
            lightboxImg.style.opacity = 0;
            setTimeout(() => {
                lightboxImg.src = item.src;
                if (lightboxCaption) lightboxCaption.innerText = item.caption;
                lightboxImg.style.opacity = 1;
            }, 150);
        }
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

        // Swipe triggers
        lightboxModal.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, {passive: true});

        lightboxModal.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, {passive: true});
    }

    function handleSwipeGesture() {
        const swipeThreshold = 55;
        if (touchendX < touchstartX - swipeThreshold) {
            showNextImage();
        }
        if (touchendX > touchstartX + swipeThreshold) {
            showPrevImage();
        }
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
   10. SCROLL REVEAL OBSERVER
   ========================================== */
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal");
    
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
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
        function revealOnScroll() {
            const triggerBottom = (window.innerHeight / 10) * 8.5;
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
