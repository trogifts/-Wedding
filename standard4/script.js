/**
 * standard4 - Celestial Night Sky Wedding Invitation Template Client Logic
 * Handles reveal cover, personalized guest welcoming, music disc toggles,
 * swipeable polaroid decks, crescent moon blessings, constellation connect canvas game,
 * and shooting star generators.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("standard4 template DOM Loaded - Processing data...");
    
    // 1. Process date/time configurations
    processWeddingData();

    // 2. Render all dynamic elements
    renderData();

    // 3. Initialize Interactive Features
    parseGuestGreeting();
    initInviteOpener();
    initMusicControls();
    initScrollProgress();
    initConstellationTimeline();
    initPolaroidRotator();
    initBlessingMoon();
    initCountdown();
});

/* ==========================================
   DATE & TIME PRE-PROCESSOR
   ========================================== */
function processWeddingData() {
  const data = window.weddingData;
  if (!data || !data.event) return;

  const dateVal = data.event.date || "2026-12-12";
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
    if (isNaN(dateObj)) return "Saturday, December 12, 2026";
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
  if (metaTitle) metaTitle.innerText = `Wedding of ${data.couple.groom} & ${data.couple.bride} - Celestial Night Sky Wedding Invitation`;

  // Cover Envelope
  const coverLettering = document.getElementById('coverLettering');
  if (coverLettering) coverLettering.innerText = data.labels.coverLettering;

  const coverNames = document.getElementById('coverNames');
  if (coverNames) coverNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const coverSubtitle = document.getElementById('coverSubtitle');
  if (coverSubtitle) coverSubtitle.innerText = data.labels.coverSubtitle;

  const coverDear = document.getElementById('coverDear');
  if (coverDear) coverDear.innerText = data.labels.dear;

  const guestWelcomeText = document.getElementById('guest-welcome-text');
  if (guestWelcomeText) guestWelcomeText.innerText = data.labels.welcomePhrase;

  const openInviteButtonText = document.getElementById('openInviteButtonText');
  if (openInviteButtonText) openInviteButtonText.innerText = data.labels.openInviteButton;

  // Background Music URL
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
    const src = bgMusic.querySelector('source');
    if (src) src.src = data.event.bgMusicUrl;
    bgMusic.load();
  }

  // Floating WhatsApp Link
  const floatingWhatsapp = document.getElementById('floating-whatsapp');
  if (floatingWhatsapp) {
    floatingWhatsapp.href = `https://wa.me/${data.event.whatsappNumber}?text=Hi%20${data.couple.groom}%20and%20${data.couple.bride}!%20I%20have%20an%20inquiry%20about%20the%20wedding%20celebrations.`;
  }

  // Header Logo
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) headerLogo.innerText = data.couple.monogram;

  // Hero Section
  const heroIntroScript = document.getElementById('heroIntroScript');
  if (heroIntroScript) heroIntroScript.innerText = data.labels.heroIntroScript;

  const heroNames = document.getElementById('heroNames');
  if (heroNames) heroNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const heroWelcomePhrase = document.getElementById('heroWelcomePhrase');
  if (heroWelcomePhrase) heroWelcomePhrase.innerText = data.labels.heroWelcomePhrase;

  const heroDate = document.getElementById('heroDate');
  if (heroDate) heroDate.innerText = data.event.dateFormatted;

  const heroLunarDate = document.getElementById('heroLunarDate');
  if (heroLunarDate) heroLunarDate.innerText = data.labels.heroLunarDate;

  // Couple Section Headings
  const coupleSubTitle = document.getElementById('coupleSubTitle');
  if (coupleSubTitle) coupleSubTitle.innerText = data.labels.coupleSubTitle;

  const coupleTitle = document.getElementById('coupleTitle');
  if (coupleTitle) coupleTitle.innerText = data.labels.coupleTitle;

  // Groom Card Detail
  const groomRoleTag = document.getElementById('groomRoleTag');
  if (groomRoleTag) groomRoleTag.innerText = data.labels.groomRoleTag;

  const groomName = document.getElementById('groomName');
  if (groomName) groomName.innerText = data.couple.groomFull;

  const groomBio = document.getElementById('groomBio');
  if (groomBio) groomBio.innerText = data.coupleDetails.groomBio;

  const groomParentsLabel = document.getElementById('groomParentsLabel');
  if (groomParentsLabel) groomParentsLabel.innerText = data.labels.groomParentsLabel;

  const groomParentsNames = document.getElementById('groomParentsNames');
  if (groomParentsNames) groomParentsNames.innerHTML = `${data.coupleDetails.groomParentsFather} & ${data.coupleDetails.groomParentsMother}`;

  // Bride Card Detail
  const brideRoleTag = document.getElementById('brideRoleTag');
  if (brideRoleTag) brideRoleTag.innerText = data.labels.brideRoleTag;

  const brideName = document.getElementById('brideName');
  if (brideName) brideName.innerText = data.couple.brideFull;

  const brideBio = document.getElementById('brideBio');
  if (brideBio) brideBio.innerText = data.coupleDetails.brideBio;

  const brideParentsLabel = document.getElementById('brideParentsLabel');
  if (brideParentsLabel) brideParentsLabel.innerText = data.labels.brideParentsLabel;

  const brideParentsNames = document.getElementById('brideParentsNames');
  if (brideParentsNames) brideParentsNames.innerHTML = `${data.coupleDetails.brideParentsFather} & ${data.coupleDetails.brideParentsMother}`;

  // Story Headings
  const storySubTitle = document.getElementById('storySubTitle');
  if (storySubTitle) storySubTitle.innerText = data.labels.storySubTitle;

  const storyTitle = document.getElementById('storyTitle');
  if (storyTitle) storyTitle.innerText = data.labels.storyTitle;

  // Timeline Stories Render
  const timelineContainer = document.getElementById('timelineContainer');
  if (timelineContainer && data.story) {
    timelineContainer.innerHTML = data.story.map((item, idx) => `
      <div class="timeline-constellation-node" id="story-node-${idx + 1}">
          <div class="timeline-card">
              <span class="timeline-date-tag">${item.date}</span>
              <h3 class="timeline-title-text">${item.title}</h3>
              <p class="timeline-desc-text">${item.text}</p>
          </div>
      </div>
    `).join('');
  }

  // Events Headings
  const eventsSubTitle = document.getElementById('eventsSubTitle');
  if (eventsSubTitle) eventsSubTitle.innerText = data.labels.eventsSubTitle;

  const eventsTitle = document.getElementById('eventsTitle');
  if (eventsTitle) eventsTitle.innerText = data.labels.eventsTitle;

  // Events List Render
  const eventsContainer = document.getElementById('eventsContainer');
  if (eventsContainer && data.itinerary) {
    eventsContainer.innerHTML = data.itinerary.map(item => `
      <div class="event-map-card">
          <div class="event-starmap-header"></div>
          <div class="event-card-content">
              <h3 class="event-card-title">${item.title}</h3>
              <div class="event-details-list">
                  <div class="event-info-row">
                      <i class="fa-solid fa-calendar-day"></i>
                      <span class="row-label">Date</span>
                      <span class="row-value">${item.date}</span>
                  </div>
                  <div class="event-info-row">
                      <i class="fa-solid fa-clock"></i>
                      <span class="row-label">Time</span>
                      <span class="row-value">${item.time}</span>
                  </div>
                  <div class="event-info-row">
                      <i class="fa-solid fa-hotel"></i>
                      <span class="row-label">Location</span>
                      <span class="row-value">${item.venue}</span>
                  </div>
              </div>
          </div>
      </div>
    `).join('');
  }

  // Countdown Title
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

  // Venue Headings
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
    btnDirections.href = data.event.mapDirectionsUrl;
  }

  // Google Map embed
  const mapEmbedWrapper = document.getElementById('mapEmbedWrapper');
  if (mapEmbedWrapper) {
    mapEmbedWrapper.innerHTML = `
      <iframe src="${data.event.mapEmbedUrl}" 
              width="100%" height="100%" style="border:0;"
              allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              title="Venue Map"></iframe>
    `;
  }

  // Gallery Headings
  const gallerySubTitle = document.getElementById('gallerySubTitle');
  if (gallerySubTitle) gallerySubTitle.innerText = data.labels.gallerySubTitle;

  const galleryTitle = document.getElementById('galleryTitle');
  if (galleryTitle) galleryTitle.innerText = data.labels.galleryTitle;

  // Gallery Cards render
  const polaroidGallery = document.getElementById('polaroid-gallery');
  if (polaroidGallery && data.gallery) {
    polaroidGallery.innerHTML = data.gallery.map((item, idx) => `
      <div class="star-card-gallery ${idx === 0 ? 'active-stack' : (idx === 1 ? 'stack-2' : 'stack-3')}" data-index="${idx}">
          <div class="gallery-img-frame">
              <img src="${item.src}" alt="${item.title}">
          </div>
          <h4 class="gallery-caption-title">${item.title}</h4>
      </div>
    `).join('');
  }

  // Interactive headings
  const interactiveSubTitle = document.getElementById('interactiveSubTitle');
  if (interactiveSubTitle) interactiveSubTitle.innerText = data.labels.interactiveSubTitle;

  const interactiveTitle = document.getElementById('interactiveTitle');
  if (interactiveTitle) interactiveTitle.innerText = data.labels.interactiveTitle;

  const moonBlessingInstruction = document.getElementById('moonBlessingInstruction');
  if (moonBlessingInstruction) moonBlessingInstruction.innerText = data.labels.interactiveTitle;



  // Family Contacts Headings
  const contactsSubTitle = document.getElementById('contactsSubTitle');
  if (contactsSubTitle) contactsSubTitle.innerText = data.labels.contactsSubTitle;

  const contactsTitle = document.getElementById('contactsTitle');
  if (contactsTitle) contactsTitle.innerText = data.labels.contactsTitle;

  // Family Contacts Render
  const contactsContainer = document.getElementById('contactsContainer');
  if (contactsContainer && data.contacts) {
    contactsContainer.innerHTML = data.contacts.map(contact => `
      <div class="contact-card-box scroll-reveal">
          <h3 class="contact-card-name">${contact.name}</h3>
          <span class="contact-card-relation">${contact.relation}</span>
          <div class="contact-action-flex">
              <a href="tel:${contact.phone.replace(/[\s()-]/g, '')}" class="contact-action-btn call"><i class="fa-solid fa-phone"></i> ${data.labels.contactsCallLabel}</a>
              <a href="https://wa.me/${contact.whatsapp}" class="contact-action-btn chat"><i class="fa-brands fa-whatsapp"></i> ${data.labels.contactsChatLabel}</a>
          </div>
      </div>
    `).join('');
  }

  // Footer Render
  const footerMonogram = document.getElementById('footerMonogram');
  if (footerMonogram) footerMonogram.innerText = data.couple.monogram;

  const footerNames = document.getElementById('footerNames');
  if (footerNames) footerNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

  const footerThankYou = document.getElementById('footerThankYou');
  if (footerThankYou) footerThankYou.innerText = data.couple.tagline;

  const footerCopyright = document.getElementById('footerCopyright');
  if (footerCopyright) footerCopyright.innerText = `© 2026 ${data.couple.groom} & ${data.couple.bride}. Created under a starry sky.`;
}

/* ==========================================
   PERSONALIZED WELCOME PARSER
   ========================================== */
function parseGuestGreeting() {
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get("guest") || urlParams.get("g");
    
    const guestNameDisplay = document.getElementById("guest-name-display");
    const guestWelcomeText = document.getElementById("guest-welcome-text");
    const heroWelcomePhrase = document.getElementById("hero-welcome-phrase");

    const defaultWelcome = (window.weddingData && window.weddingData.labels.welcomePhrase) || "Destiny has written your name among our stars. Join us as we celebrate our love under the moonlit sky.";

    if (guestName) {
        guestName = sanitizeInput(guestName);
        if (guestNameDisplay) guestNameDisplay.textContent = guestName;
        if (guestWelcomeText) {
            guestWelcomeText.innerHTML = `Dear <strong>${guestName}</strong>, destiny has written your name among our stars. Join us as we celebrate our love under the moonlit sky.`;
        }
        if (heroWelcomePhrase) {
            heroWelcomePhrase.innerHTML = `Welcome <strong>${guestName}</strong>,<br>Join Us Under The Stars`;
        }
    } else {
        if (guestNameDisplay) guestNameDisplay.textContent = (window.weddingData && window.weddingData.labels.defaultGuestName) || "Honored Guest";
        if (guestWelcomeText) guestWelcomeText.textContent = defaultWelcome;
        if (heroWelcomePhrase) heroWelcomePhrase.textContent = (window.weddingData && window.weddingData.labels.heroWelcomePhrase) || "Join Us Under The Stars";
    }
}

function sanitizeInput(str) {
    return str.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

/* ==========================================
   OPEN COVERS AND REVEAL SYSTEM
   ========================================== */
let huntInterval = null;
function initInviteOpener() {
    const btnOpenCosmic = document.getElementById("btn-open-cosmic");
    const loadingOverlay = document.getElementById("loading-overlay");
    const mainHeader = document.getElementById("main-header");
    const mainContent = document.getElementById("main-content");
    const floatingWidgets = document.getElementById("floating-widgets");
    const bgMusic = document.getElementById("bg-music");
    const musicToggleBtn = document.getElementById("music-toggle-btn");

    // Populate stars cover
    const coverStarfield = document.getElementById("cover-starfield");
    if (coverStarfield) {
        for (let i = 0; i < 40; i++) {
            const star = document.createElement("div");
            star.className = "star-point";
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            star.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            coverStarfield.appendChild(star);
        }
    }

    if (btnOpenCosmic) {
        btnOpenCosmic.addEventListener("click", () => {
            if (bgMusic) {
                bgMusic.play().then(() => {
                    if (musicToggleBtn) {
                        musicToggleBtn.classList.remove("muted");
                        musicToggleBtn.classList.add("playing");
                        musicToggleBtn.innerHTML = '<i class="fa-solid fa-compact-disc"></i>';
                    }
                }).catch((err) => {
                    console.log("Auto-play blocked by browser. Audio will trigger upon interaction.");
                });
            }

            if (loadingOverlay) loadingOverlay.classList.add("fade-out");

            if (mainHeader) mainHeader.classList.remove("content-hidden");
            if (floatingWidgets) floatingWidgets.classList.remove("content-hidden");
            if (mainContent) {
                mainContent.classList.remove("content-hidden");
                setTimeout(() => {
                    mainContent.classList.add("fade-in");
                    triggerInitialMeteorShower();
                    
                    const urlParams = new URLSearchParams(window.location.search);
                    let guestName = urlParams.get("guest") || urlParams.get("g");
                    if (guestName) {
                        projectGuestNameConstellation(sanitizeInput(guestName));
                    }
                }, 50);
            }

            // Starmap story hunt interval
            setTimeout(() => {
                spawnHuntingStarLoop();
                huntInterval = setInterval(spawnHuntingStarLoop, 18000);
            }, 6000);
        });
    }

    // Make starsbg clickable for shooting star wishes
    const starsBg = document.getElementById("stars-bg");
    if (starsBg) {
        starsBg.addEventListener("click", (e) => {
            spawnShootingStar(e.clientX, e.clientY);
            const data = window.weddingData;
            const romanticWishes = (data && data.interactiveCeremonies && data.interactiveCeremonies.shootingStarWishes) || [
                "Your wish has been carried to the stars.",
                "Thank you for sending your blessings.",
                "A shooting star has captured your love.",
                "Love is the gravity of our solar system.",
                "Two stars, one beautiful universe."
            ];
            const msg = romanticWishes[Math.floor(Math.random() * romanticWishes.length)];
            showWishToast(msg);
        });
    }
}

function projectGuestNameConstellation(name) {
    const projection = document.createElement("div");
    projection.style.position = "fixed";
    projection.style.top = "40%";
    projection.style.left = "50%";
    projection.style.transform = "translate(-50%, -50%)";
    projection.style.color = "var(--color-silver)";
    projection.style.fontFamily = "var(--font-serif-decorative)";
    projection.style.fontSize = "clamp(1.5rem, 5vw, 2.5rem)";
    projection.style.textAlign = "center";
    projection.style.zIndex = "9999";
    projection.style.pointerEvents = "none";
    projection.style.textShadow = "0 0 15px rgba(255,255,255,0.7), 0 0 30px var(--color-indigo)";
    projection.style.opacity = "0";
    projection.style.transition = "all 2.5s ease";
    projection.innerHTML = `<span style="font-size:0.7rem; letter-spacing:4px; display:block; color:var(--color-text-gold); margin-bottom:10px;">CONSTELLATION ALIGNED</span>${name.toUpperCase()}`;
    
    document.body.appendChild(projection);

    setTimeout(() => {
        projection.style.opacity = "1";
        projection.style.transform = "translate(-50%, -60%) scale(1.05)";
    }, 800);

    setTimeout(() => {
        projection.style.opacity = "0";
        projection.style.transform = "translate(-50%, -80%) scale(0.9)";
    }, 4000);

    setTimeout(() => {
        projection.remove();
    }, 6500);
}

function triggerInitialMeteorShower() {
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            spawnShootingStar(
                Math.random() * window.innerWidth * 0.8,
                Math.random() * window.innerHeight * 0.4
            );
        }, i * 400);
    }
}

function spawnShootingStar(x, y) {
    const overlay = document.getElementById("shooting-star-canvas-overlay");
    if (!overlay) return;

    const star = document.createElement("div");
    star.className = "triggered-shooting-star";
    
    const angle = 25 + Math.random() * 20; 
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.setProperty("--angle", `${angle}deg`);
    
    overlay.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1100);
}

function showWishToast(message) {
    const toast = document.getElementById("star-wish-toast");
    if (toast) {
        toast.textContent = message;
        toast.classList.add("show");
        
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
}

/* ==========================================
   STORY HUNT LOOP
   ========================================== */
function spawnHuntingStarLoop() {
    const overlay = document.getElementById("shooting-star-canvas-overlay");
    if (!overlay) return;

    const star = document.createElement("div");
    star.className = "hunting-shooting-star";

    const startX = -100; 
    const startY = Math.random() * window.innerHeight * 0.5; 
    const angle = 20 + Math.random() * 20; 
    const duration = 2 + Math.random() * 1.5; 

    const distanceX = window.innerWidth + 200;
    const distanceY = distanceX * Math.tan(angle * Math.PI / 180);

    const endX = startX + distanceX;
    const endY = startY + distanceY;

    star.style.setProperty("--start-x", `${startX}px`);
    star.style.setProperty("--start-y", `${startY}px`);
    star.style.setProperty("--end-x", `${endX}px`);
    star.style.setProperty("--end-y", `${endY}px`);
    star.style.setProperty("--angle", `${angle}deg`);
    star.style.setProperty("--duration", `${duration}s`);

    overlay.appendChild(star);

    const handleCatch = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const rect = star.getBoundingClientRect();
        const clientX = rect.left + rect.width / 2;
        const clientY = rect.top + rect.height / 2;

        createSparkleBurst(clientX, clientY);
        star.remove();

        const data = window.weddingData;
        const romanticStories = (data && data.interactiveCeremonies && data.interactiveCeremonies.romanticStories) || [
            "Zayn designed a custom starry constellation map showing how the night sky looked when they first met.",
            "Aara loves how Zayn always listens patiently to her endless explanations about black holes and nebulas.",
            "Their favorite stargazing spot is a quiet mountain ridge where the city lights fade completely.",
            "Zayn claims that Aara's bright eyes possess more luminosity than a young supernova.",
            "Aara believes they are bound by the gravity of love, destined to orbit each other for infinity."
        ];
        const randomStory = romanticStories[Math.floor(Math.random() * romanticStories.length)];
        showWishToast(`✨ Zayn & Aara's Star Story: "${randomStory}"`);
    };

    star.addEventListener("mousedown", handleCatch);
    star.addEventListener("touchstart", handleCatch, { passive: false });

    setTimeout(() => {
        if (star.parentNode) star.remove();
    }, duration * 1000);
}

function createSparkleBurst(x, y) {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "star-burst-particle";
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 20 + Math.random() * 60; 
        const mx = Math.cos(angle) * speed;
        const my = Math.sin(angle) * speed;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty("--mx", `${mx}px`);
        particle.style.setProperty("--my", `${my}px`);

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 700);
    }
}

/* ==========================================
   MUSIC & SCROLL PROGRESS CONTROLLERS
   ========================================== */
function initMusicControls() {
    const bgMusic = document.getElementById("bg-music");
    const musicToggleBtn = document.getElementById("music-toggle-btn");
    if (!bgMusic || !musicToggleBtn) return;

    musicToggleBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggleBtn.classList.remove("muted");
            musicToggleBtn.classList.add("playing");
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-compact-disc"></i>';
        } else {
            bgMusic.pause();
            musicToggleBtn.classList.remove("playing");
            musicToggleBtn.classList.add("muted");
            musicToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });
}

function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress-bar");
    const mainHeader = document.getElementById("main-header");
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (mainHeader) {
            if (scrollTop > 50) {
                mainHeader.style.backgroundColor = "rgba(10, 14, 26, 0.95)";
                mainHeader.style.borderBottom = "1px solid rgba(245, 158, 11, 0.15)";
                mainHeader.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)";
            } else {
                mainHeader.style.backgroundColor = "transparent";
                mainHeader.style.borderBottom = "none";
                mainHeader.style.boxShadow = "none";
            }
        }
    });
}

/* ==========================================
   CONSTELLATION TIMELINE ACTIVE OBSERVER
   ========================================== */
function initConstellationTimeline() {
    const timelineNodes = document.querySelectorAll(".timeline-constellation-node");
    if (timelineNodes.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.15
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    timelineNodes.forEach(node => {
        timelineObserver.observe(node);
    });
}

/* ==========================================
   POLAROID STACKED ROTATOR
   ========================================== */
function initPolaroidRotator() {
    const polaroidGallery = document.getElementById("polaroid-gallery");
    const prevBtn = document.getElementById("gallery-prev");
    const nextBtn = document.getElementById("gallery-next");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

    if (!polaroidGallery || !prevBtn || !nextBtn) return;

    let cards = Array.from(polaroidGallery.querySelectorAll(".star-card-gallery"));

    function rotateGallery(direction) {
        if (cards.length === 0) return;

        let activeIdx = cards.findIndex(c => c.classList.contains("active-stack"));
        let cardToSwipe = cards[activeIdx];

        if (direction === "next") {
            cardToSwipe.classList.add("swipe-left");
            setTimeout(() => {
                cardToSwipe.classList.remove("active-stack", "swipe-left");
                cardToSwipe.classList.add("stack-3");
                
                let nextActive = cards[(activeIdx + 1) % cards.length];
                let nextStack2 = cards[(activeIdx + 2) % cards.length];
                
                nextActive.className = "star-card-gallery active-stack";
                nextStack2.className = "star-card-gallery stack-2";
            }, 300);
        } else {
            let prevActiveIdx = (activeIdx - 1 + cards.length) % cards.length;
            let cardToRecover = cards[prevActiveIdx];
            
            cardToRecover.className = "star-card-gallery active-stack swipe-right";
            setTimeout(() => {
                cardToRecover.classList.remove("swipe-right");
                
                let currentActive = cards[activeIdx];
                let currentStack2 = cards[(activeIdx + 1) % cards.length];
                
                currentActive.className = "star-card-gallery stack-2";
                currentStack2.className = "star-card-gallery stack-3";
            }, 50);
        }
    }

    nextBtn.addEventListener("click", () => rotateGallery("next"));
    prevBtn.addEventListener("click", () => rotateGallery("prev"));

    // Mobile swipe gestures
    let startX = 0;
    polaroidGallery.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    polaroidGallery.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let deltaX = endX - startX;

        if (Math.abs(deltaX) > 60) {
            if (deltaX < 0) {
                rotateGallery("next");
            } else {
                rotateGallery("prev");
            }
        }
    }, { passive: true });

    // Lightbox modal trigger
    polaroidGallery.addEventListener("click", (e) => {
        const card = e.target.closest(".star-card-gallery");
        if (card && card.classList.contains("active-stack")) {
            const data = window.weddingData;
            const index = parseInt(card.getAttribute("data-index"));
            const item = data && data.gallery && data.gallery[index];
            if (lightboxModal && item && lightboxImg) {
                lightboxImg.src = item.src;
                if (lightboxCaption) lightboxCaption.textContent = item.desc;
                lightboxModal.style.display = "flex";
            }
        }
    });

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener("click", () => {
            if (lightboxModal) lightboxModal.style.display = "none";
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = "none";
            }
        });
    }
}

/* ==========================================
   CRESCENT BLESSING MOON
   ========================================== */
function initBlessingMoon() {
    const blessingMoonWidget = document.getElementById("blessing-moon-widget");
    const blessingsMoonBubble = document.getElementById("blessings-moon-bubble");
    const moonBlessingHeading = document.getElementById("moon-blessing-heading");
    const moonBlessingQuote = document.getElementById("moon-blessing-quote");

    if (!blessingMoonWidget) return;

    blessingMoonWidget.addEventListener("click", () => {
        blessingMoonWidget.classList.add("glow-intense");
        
        const data = window.weddingData;
        const moonBlessingsList = (data && data.interactiveCeremonies && data.interactiveCeremonies.moonBlessingsList) || [
            { title: "Infinite Love", quote: "May your lives be bound in stardust and celestial joy, sharing standard orbits forever." },
            { title: "Harmony & Peace", quote: "As the crescent moon glows, may your marriage grow into a full moon of brightness." },
            { title: "Cosmic Bond", quote: "True love matches souls. May yours reflect the serenity and grandeur of the night sky." },
            { title: "Unending Wonders", quote: "Wishing you a lifetime of stargazing, hand-holding, and deep galactic laughter." },
            { title: "Divine Guidance", quote: "May the light of a thousand stars always illuminate your paths during darker phases." }
        ];

        const randomBlessing = moonBlessingsList[Math.floor(Math.random() * moonBlessingsList.length)];
        if (moonBlessingHeading && moonBlessingQuote) {
            moonBlessingHeading.textContent = randomBlessing.title;
            moonBlessingQuote.textContent = `"${randomBlessing.quote}"`;
        }

        if (blessingsMoonBubble) {
            blessingsMoonBubble.style.display = "block";
        }

        triggerInitialMeteorShower();
        showWishToast("The Moon has blessed Zayn & Aara!");

        setTimeout(() => {
            blessingMoonWidget.classList.remove("glow-intense");
        }, 1500);
    });
}



/* ==========================================
   CELESTIAL COUNTDOWN TIMER
   ========================================== */
let countdownInterval;
function initCountdown() {
    clearInterval(countdownInterval);
    
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    
    const data = window.weddingData;
    const dateStr = (data && data.event && data.event.dateTimeString) || "2026-12-12T16:30:00";
    let weddingDate = new Date(dateStr).getTime();

    if (isNaN(weddingDate)) {
        const cleaned = dateStr.replace(/-/g, '/').replace('T', ' ');
        weddingDate = new Date(cleaned).getTime();
    }
    if (isNaN(weddingDate)) {
        weddingDate = new Date(2026, 11, 12, 16, 30, 0).getTime();
    }

    function updateTimer() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            const countdownTimer = document.getElementById("countdown-timer");
            if (countdownTimer) {
                const partnerName = (data && data.couple) ? `${data.couple.groom} & ${data.couple.bride}` : "Zayn & Aara";
                countdownTimer.innerHTML = `<h3 style='color: var(--color-text-gold); font-family: var(--font-serif); font-size: 1.4rem;'>The Stars Have Aligned - ${partnerName} are Married!</h3>`;
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
}
