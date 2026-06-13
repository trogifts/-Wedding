/**
 * standard3 - Watercolor Art Wedding Invitation Template Client Logic
 * Handles reveal cover, personalized guest welcoming, music player toggles,
 * swipeable polaroid decks, canvas paint palette splats,
 * and a canvas/HTML butterfly flutter generator.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("standard3 template DOM Loaded - Processing data...");
    
    // 1. Process date/time configurations
    processWeddingData();

    // 2. Render all dynamic elements
    renderData();

    // 3. Initialize Interactive Features
    parseGuestGreeting();
    initInviteOpener();
    initMusicControls();
    initScrollProgress();
    initPolaroidRotator();
    initCountdown();
});

/* ==========================================
   DATE & TIME PRE-PROCESSOR
   ========================================== */
function processWeddingData() {
  const data = window.weddingData;
  if (!data || !data.event) return;

  const dateVal = data.event.date || "2026-09-10";
  const timeVal = data.event.time || "10:30 AM";

  // Helper to convert 12h time ("10:30 AM") to 24h format ("10:30:00")
  function parseTime24h(t) {
    const match = t.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return "10:30:00";
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
    if (isNaN(dateObj)) return "Thursday, September 10, 2026";
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const time24h = parseTime24h(timeVal);

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
  if (metaTitle) metaTitle.innerText = `Wedding of ${data.couple.groom} & ${data.couple.bride} - Romantic Watercolor Art Invitation`;

  // Cover Envelope
  const coverLetteringTop = document.getElementById('coverLetteringTop');
  if (coverLetteringTop) coverLetteringTop.innerText = data.labels.coverLetteringTop;

  const coverTitle = document.getElementById('coverTitle');
  if (coverTitle) coverTitle.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const coverSubtitle = document.getElementById('coverSubtitle');
  if (coverSubtitle) coverSubtitle.innerText = data.labels.coverSubtitle;

  const coverDear = document.getElementById('coverDear');
  if (coverDear) coverDear.innerText = data.labels.dear;

  const coverWelcomePhrase = document.getElementById('coverWelcomePhrase');
  if (coverWelcomePhrase) coverWelcomePhrase.innerText = data.labels.welcomePhrase;

  const enterInviteButtonText = document.getElementById('enterInviteButtonText');
  if (enterInviteButtonText) enterInviteButtonText.innerText = data.labels.enterInviteButton;

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
    whatsappFloatingLink.href = `https://wa.me/${data.event.whatsappNumber}?text=Hi%20${data.couple.groom}%20and%20${data.couple.bride}!%20I%20have%20an%20inquiry%20about%20the%20wedding%20celebrations.`;
  }

  // Header
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) headerLogo.innerText = data.couple.monogram;

  // Hero Section
  const heroIntroScript = document.getElementById('heroIntroScript');
  if (heroIntroScript) heroIntroScript.innerText = data.labels.heroIntroScript;

  const heroNames = document.getElementById('heroNames');
  if (heroNames) heroNames.innerHTML = `${data.couple.groomFull}<br>& ${data.couple.brideFull}`;

  const heroInviteLine = document.getElementById('heroInviteLine');
  if (heroInviteLine) heroInviteLine.innerText = data.labels.heroInviteLine;

  const heroDate = document.getElementById('heroDate');
  if (heroDate) heroDate.innerText = data.event.dateFormatted;

  const heroVenue = document.getElementById('heroVenue');
  if (heroVenue) heroVenue.innerText = data.event.venueName;

  // Couple Section headings
  const coupleSubTitle = document.getElementById('coupleSubTitle');
  if (coupleSubTitle) coupleSubTitle.innerText = data.labels.coupleSubTitle;

  const coupleTitle = document.getElementById('coupleTitle');
  if (coupleTitle) coupleTitle.innerText = data.labels.coupleTitle;

  // Groom Biography details
  const groomRoleTag = document.getElementById('groomRoleTag');
  if (groomRoleTag) groomRoleTag.innerText = data.labels.groomRoleTag;

  const groomName = document.getElementById('groomName');
  if (groomName) groomName.innerText = data.couple.groomFull;

  const groomBio = document.getElementById('groomBio');
  if (groomBio) groomBio.innerText = data.coupleDetails.groomBio;

  const groomParentsLabel = document.getElementById('groomParentsLabel');
  if (groomParentsLabel) groomParentsLabel.innerText = data.labels.groomParentsLabel;

  const groomParentsNames = document.getElementById('groomParentsNames');
  if (groomParentsNames) groomParentsNames.innerHTML = data.coupleDetails.groomParentsFather + "<br>& " + data.coupleDetails.groomParentsMother;

  // Bride Biography details
  const brideRoleTag = document.getElementById('brideRoleTag');
  if (brideRoleTag) brideRoleTag.innerText = data.labels.brideRoleTag;

  const brideName = document.getElementById('brideName');
  if (brideName) brideName.innerText = data.couple.brideFull;

  const brideBio = document.getElementById('brideBio');
  if (brideBio) brideBio.innerText = data.coupleDetails.brideBio;

  const brideParentsLabel = document.getElementById('brideParentsLabel');
  if (brideParentsLabel) brideParentsLabel.innerText = data.labels.brideParentsLabel;

  const brideParentsNames = document.getElementById('brideParentsNames');
  if (brideParentsNames) brideParentsNames.innerHTML = data.coupleDetails.brideParentsFather + "<br>& " + data.coupleDetails.brideParentsMother;

  // Story Section headings
  const storySubTitle = document.getElementById('storySubTitle');
  if (storySubTitle) storySubTitle.innerText = data.labels.storySubTitle;

  const storyTitle = document.getElementById('storyTitle');
  if (storyTitle) storyTitle.innerText = data.labels.storyTitle;

  // Timeline Stories
  const timelineContainer = document.getElementById('timelineContainer');
  if (timelineContainer && data.story) {
    timelineContainer.innerHTML = data.story.map(item => `
      <div class="timeline-scrap-item">
          <div class="washi-tape-deco"></div>
          <div class="timeline-scrap-card">
              <span class="timeline-date-label">${item.date}</span>
              <h4 class="timeline-title-text">${item.title}</h4>
              <p class="timeline-desc-text">${item.text}</p>
          </div>
      </div>
    `).join('');
  }

  // Events Section headings
  const eventsSubTitle = document.getElementById('eventsSubTitle');
  if (eventsSubTitle) eventsSubTitle.innerText = data.labels.eventsSubTitle;

  const eventsTitle = document.getElementById('eventsTitle');
  if (eventsTitle) eventsTitle.innerText = data.labels.eventsTitle;

  // Events List
  const eventsContainer = document.getElementById('eventsContainer');
  if (eventsContainer && data.itinerary) {
    eventsContainer.innerHTML = data.itinerary.map(item => `
      <div class="event-schedule-card">
          <div class="event-header-backdrop"></div>
          <div class="event-card-content">
              <h3 class="event-card-title">${item.title}</h3>
              <div class="event-details-vertical-list">
                  <div class="event-info-row">
                      <i class="fa-solid fa-calendar"></i>
                      <span class="row-label">Date</span>
                      <span class="row-value">${item.date}</span>
                  </div>
                  <div class="event-info-row">
                      <i class="fa-solid fa-clock"></i>
                      <span class="row-label">Time</span>
                      <span class="row-value">${item.time}</span>
                  </div>
                  <div class="event-info-row">
                      <i class="fa-solid fa-map-location-dot"></i>
                      <span class="row-label">Venue</span>
                      <span class="row-value">${item.venue}</span>
                  </div>
              </div>
          </div>
      </div>
    `).join('');
  }

  // Countdown Heading
  const countdownTitle = document.getElementById('countdownTitle');
  if (countdownTitle) countdownTitle.innerText = data.labels.countdownTitle;

  const daysLabel = document.getElementById('daysLabel');
  if (daysLabel) daysLabel.innerText = data.labels.days;

  const hoursLabel = document.getElementById('hoursLabel');
  if (hoursLabel) hoursLabel.innerText = data.labels.hours;

  const minutesLabel = document.getElementById('minutesLabel');
  if (minutesLabel) minutesLabel.innerText = data.labels.minutes;

  const secondsLabel = document.getElementById('secondsLabel');
  if (secondsLabel) secondsLabel.innerText = data.labels.seconds;

  // Venue Section headings
  const venueSubTitle = document.getElementById('venueSubTitle');
  if (venueSubTitle) venueSubTitle.innerText = data.labels.venueSubTitle;

  const venueTitle = document.getElementById('venueTitle');
  if (venueTitle) venueTitle.innerText = data.labels.venueTitle;

  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.innerHTML = `<strong>${data.event.venueName}</strong><br>${data.event.venueAddress}`;

  const directionsButtonText = document.getElementById('directionsButtonText');
  if (directionsButtonText) directionsButtonText.innerText = data.labels.directionsButtonText;

  const btnDirections = document.getElementById('btnDirections');
  if (btnDirections) {
    btnDirections.onclick = () => window.open(data.event.mapDirectionsUrl, '_blank');
  }

  // Map Embed Frame
  const mapEmbedWrapper = document.getElementById('mapEmbedWrapper');
  if (mapEmbedWrapper) {
    mapEmbedWrapper.innerHTML = `
      <iframe src="${data.event.mapEmbedUrl}" 
              width="100%" height="100%" style="border:0;"
              allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              title="Wedding Venue Map Location"></iframe>
    `;
  }

  // Gallery Section headings
  const gallerySubTitle = document.getElementById('gallerySubTitle');
  if (gallerySubTitle) gallerySubTitle.innerText = data.labels.gallerySubTitle;

  const galleryTitle = document.getElementById('galleryTitle');
  if (galleryTitle) galleryTitle.innerText = data.labels.galleryTitle;

  const galleryInstructions = document.getElementById('galleryInstructions');
  if (galleryInstructions) galleryInstructions.innerText = data.labels.galleryInstructions;

  // Polaroid Gallery images render
  const polaroidDeck = document.getElementById('polaroid-deck');
  if (polaroidDeck && data.gallery) {
    polaroidDeck.innerHTML = data.gallery.map((item, idx) => `
      <div class="polaroid-slide-card ${idx === 0 ? 'active-stack' : (idx === 1 ? 'stack-2' : 'stack-3')}" data-index="${idx}" onclick="openLightbox(${idx})">
          <div class="polaroid-img-frame">
              <img src="${item.src}" alt="${item.title}">
          </div>
          <div class="polaroid-caption-title">${item.title}</div>
      </div>
    `).join('');
  }



  // Family Contacts Section headings
  const contactsSubTitle = document.getElementById('contactsSubTitle');
  if (contactsSubTitle) contactsSubTitle.innerText = data.labels.contactsSubTitle;

  const contactsTitle = document.getElementById('contactsTitle');
  if (contactsTitle) contactsTitle.innerText = data.labels.contactsTitle;

  // Contacts
  const contactsContainer = document.getElementById('contactsContainer');
  if (contactsContainer && data.contacts) {
    contactsContainer.innerHTML = data.contacts.map(contact => `
      <div class="contact-card-box">
          <h3 class="contact-card-name">${contact.name}</h3>
          <span class="contact-card-role">${contact.relation}</span>
          <div class="contact-action-flex">
              <a href="tel:${contact.phone.replace(/[\s()-]/g, '')}" class="contact-action-btn call"><i class="fa-solid fa-phone"></i> ${data.labels.contactsCallLabel}</a>
              <a href="https://wa.me/${contact.whatsapp}" class="contact-action-btn chat"><i class="fa-brands fa-whatsapp"></i> ${data.labels.contactsChatLabel}</a>
          </div>
      </div>
    `).join('');
  }

  // Footer Details
  const footerMonogram = document.getElementById('footerMonogram');
  if (footerMonogram) footerMonogram.innerText = data.couple.monogram;

  const footerNames = document.getElementById('footerNames');
  if (footerNames) footerNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const footerThankYou = document.getElementById('footerThankYou');
  if (footerThankYou) footerThankYou.innerText = data.couple.tagline;

  const footerCopyright = document.getElementById('footerCopyright');
  if (footerCopyright) footerCopyright.innerText = `© 2026 ${data.couple.groom} & ${data.couple.bride}. All Rights Reserved.`;
}

/* ==========================================
   PERSONALIZED WELCOME PARSER
   ========================================== */
function parseGuestGreeting() {
    const guestNameDisplay = document.getElementById("guest-name-display");
    if (!guestNameDisplay) return;

    const urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get("guest");
    if (name) {
        name = name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        guestNameDisplay.innerText = name;
    } else {
        guestNameDisplay.innerText = (window.weddingData && window.weddingData.labels.defaultGuestName) || "Beloved Guest";
    }
}

/* ==========================================
   OPEN COVERS AND REVEAL SYSTEM
   ========================================== */
function initInviteOpener() {
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const loaderOverlay = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    if (!btnOpenInvite) return;

    btnOpenInvite.addEventListener("click", () => {
        // Play soft piano track
        if (bgMusic && musicToggle) {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                musicToggle.classList.remove("muted");
                musicToggle.setAttribute("aria-label", "Mute Piano Track");
            }).catch(err => {
                console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
            });
        }
        
        // Hide cover with scale reveal
        if (loaderOverlay) loaderOverlay.classList.add("fade-out");
        
        // Unhide main page content
        if (mainContent) {
            mainContent.classList.remove("content-hidden");
            void mainContent.offsetWidth; // Force reflow
            mainContent.classList.add("fade-in");
        }
        
        // Unlock browser scroll
        document.body.style.overflow = "auto";
        
        // Initialize timer countdown
        window.dispatchEvent(new Event('scroll'));
        
        // Start butterfly fluttering scheduler
        startButterflyScheduler();
    });

    // Lock page scroll initially while cover is up
    document.body.style.overflow = "hidden";
}

/* ==========================================
   PIANO INSTRUMENTAL CONTROLLER
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
            musicToggle.setAttribute("aria-label", "Play Piano Track");
        } else {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                musicToggle.classList.remove("muted");
                musicToggle.setAttribute("aria-label", "Mute Piano Track");
            }).catch(err => {
                console.log("Autoplay blocked", err);
            });
        }
    });
}

/* ==========================================
   SCROLL PROGRESS
   ========================================== */
function initScrollProgress() {
    const scrollBar = document.getElementById("scroll-bar");
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) scrollBar.style.width = scrolled + "%";
    });
}

/* ==========================================
   WATERCOLOR BUTTERFLY GENERATOR
   ========================================== */
let butterflyTimer;
function startButterflyScheduler() {
    butterflyTimer = setInterval(spawnButterfly, 12000);
    setTimeout(spawnButterfly, 3000);
}

function spawnButterfly() {
    const flyer = document.createElement("div");
    flyer.className = "butterfly-flyer";
    
    const colors = ["", "color-alt1", "color-alt2"];
    const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
    if (randomColorClass) {
        flyer.classList.add(randomColorClass);
    }
    
    const wingPair = document.createElement("div");
    wingPair.className = "butterfly-wing-pair";
    
    const leftWing = document.createElement("div");
    leftWing.className = "wing-half left";
    
    const rightWing = document.createElement("div");
    rightWing.className = "wing-half right";
    
    wingPair.appendChild(leftWing);
    wingPair.appendChild(rightWing);
    flyer.appendChild(wingPair);
    
    const randomY = 30 + Math.random() * 50; 
    const scale = 0.6 + Math.random() * 0.5;
    const duration = 14 + Math.random() * 6;
    
    flyer.style.top = `${randomY}vh`;
    flyer.style.transform = `scale(${scale})`;
    flyer.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(flyer);
    
    setTimeout(() => {
        flyer.remove();
    }, duration * 1000);
}

/* ==========================================
   POLAROID JOURNAL GALLERY ROTATOR
   ========================================== */
let activeIndex = 0;
let isAnimating = false;

function initPolaroidRotator() {
    const btnPrev = document.getElementById("gallery-prev");
    const btnNext = document.getElementById("gallery-next");
    const polaroidDeck = document.getElementById("polaroid-deck");

    if (!btnPrev || !btnNext || !polaroidDeck) return;

    btnNext.addEventListener("click", rotateNext);
    btnPrev.addEventListener("click", rotatePrev);

    // Swipe Gestures
    let startX = 0;
    let endX = 0;
    
    polaroidDeck.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    polaroidDeck.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipeGesture();
    }, { passive: true });
    
    function handleSwipeGesture() {
        const threshold = 55;
        const deltaX = endX - startX;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX < 0) {
                rotateNext();
            } else {
                rotatePrev();
            }
        }
    }

    updatePolaroidStack();
}

function updatePolaroidStack() {
    const cards = Array.from(document.querySelectorAll(".polaroid-slide-card"));
    cards.forEach((card, idx) => {
        card.className = "polaroid-slide-card";
        let relativeIdx = (idx - activeIndex + cards.length) % cards.length;
        
        if (relativeIdx === 0) {
            card.classList.add("active-stack");
        } else if (relativeIdx === 1) {
            card.classList.add("stack-2");
        } else {
            card.classList.add("stack-3");
        }
    });
}

function rotateNext() {
    if (isAnimating) return;
    const cards = Array.from(document.querySelectorAll(".polaroid-slide-card"));
    if (cards.length === 0) return;

    isAnimating = true;
    const activeCard = cards[activeIndex];
    activeCard.classList.add("swipe-left");
    
    setTimeout(() => {
        activeIndex = (activeIndex + 1) % cards.length;
        updatePolaroidStack();
        isAnimating = false;
    }, 500);
}

function rotatePrev() {
    if (isAnimating) return;
    const cards = Array.from(document.querySelectorAll(".polaroid-slide-card"));
    if (cards.length === 0) return;

    isAnimating = true;
    const nextActiveIdx = (activeIndex - 1 + cards.length) % cards.length;
    const nextActiveCard = cards[nextActiveIdx];
    
    nextActiveCard.style.zIndex = "10";
    nextActiveCard.classList.add("swipe-right");
    
    setTimeout(() => {
        activeIndex = nextActiveIdx;
        updatePolaroidStack();
        nextActiveCard.style.zIndex = "";
        isAnimating = false;
    }, 500);
}

// Lightbox Modal triggers
window.openLightbox = function(index) {
    if (index !== activeIndex) return;
    
    const lightboxModal = document.getElementById("gallery-lightbox");
    const lightboxImgSource = document.getElementById("lightbox-img-source");
    const lightboxCaptionText = document.getElementById("lightbox-caption-text");
    if (!lightboxModal || !lightboxImgSource || !lightboxCaptionText) return;

    const data = window.weddingData;
    const item = data && data.gallery && data.gallery[index];
    if (!item) return;

    lightboxImgSource.src = item.src;
    lightboxCaptionText.innerText = item.desc;
    
    lightboxModal.style.display = "flex";
    document.body.style.overflow = "hidden";
};

window.closeLightbox = function() {
    const lightboxModal = document.getElementById("gallery-lightbox");
    if (lightboxModal) lightboxModal.style.display = "none";
    document.body.style.overflow = "auto";
};



/* ==========================================
   WEDDING TIMER COUNTDOWN Muhurtham
   ========================================== */
let timerInterval;
function initCountdown() {
    clearInterval(timerInterval);
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    
    const data = window.weddingData;
    const dateStr = (data && data.event && data.event.dateTimeString) || "2026-09-10T10:30:00";
    let weddingDate = new Date(dateStr).getTime();

    if (isNaN(weddingDate)) {
        const cleaned = dateStr.replace(/-/g, '/').replace('T', ' ');
        weddingDate = new Date(cleaned).getTime();
    }
    if (isNaN(weddingDate)) {
        weddingDate = new Date(2026, 8, 10, 10, 30, 0).getTime();
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            clearInterval(timerInterval);
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}
