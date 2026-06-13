/**
 * standard2 - Traditional Kerala Wedding Template Client Logic
 * Fully client-side, zero frameworks. Handles interactive lamp lighting,
 * flower showers, memory tree, couple quiz, and music controls.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("standard2 template DOM Loaded - Processing data...");

    // 1. Process date/time configurations
    processWeddingData();

    // 2. Render all dynamic elements
    renderData();

    // 3. Initialize Interactive Features
    parseGuestName();
    initInviteOpener();
    initMusicControls();
    initScrollProgress();
    initNilavilakkuCeremony();
    initFlowerShower();
    initMemoryTree();
    initQuizGame();
    initCountdown();
    initLightboxGallery();
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
    if (metaTitle) metaTitle.innerText = `Wedding Invitation of ${data.couple.groom} & ${data.couple.bride} - Traditional Kerala Wedding`;

    // Cover Envelope
    const envelopeLogo = document.getElementById('envelopeLogo');
    if (envelopeLogo) envelopeLogo.innerText = data.couple.monogram;

    const coverTitle = document.getElementById('coverTitle');
    if (coverTitle) coverTitle.innerText = `${data.couple.groom} & ${data.couple.bride}`;

    const coverAnnouncement = document.getElementById('coverAnnouncement');
    if (coverAnnouncement) coverAnnouncement.innerText = data.labels.coverAnnouncement;

    const guestGreetingDear = document.getElementById('guestGreetingDear');
    if (guestGreetingDear) guestGreetingDear.innerText = data.labels.dear;

    const guestInvitePhrase = document.getElementById('guestInvitePhrase');
    if (guestInvitePhrase) guestInvitePhrase.innerText = data.labels.invitePhrase;

    const openInviteButtonText = document.getElementById('openInviteButtonText');
    if (openInviteButtonText) openInviteButtonText.innerText = data.labels.openInviteButton;

    // Background Music URL
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.src = data.event.bgMusicUrl;
        bgMusic.load();
    }

    // Floating WhatsApp Link
    const whatsappFloatingLink = document.getElementById('whatsappFloatingLink');
    if (whatsappFloatingLink) {
        whatsappFloatingLink.href = `https://wa.me/${data.event.whatsappNumber}?text=Assalamu%20Alaikum!%20I%20have%20an%20inquiry%20regarding%20${data.couple.groom}%20and%20${data.couple.bride}'s%20wedding%20celebration.`;
    }

    // Header
    const headerLogo = document.getElementById('headerLogo');
    if (headerLogo) headerLogo.innerText = data.couple.monogram;

    const navLinkHome = document.getElementById('navLinkHome');
    if (navLinkHome) navLinkHome.innerText = data.labels.home;

    const navLinkStory = document.getElementById('navLinkStory');
    if (navLinkStory) navLinkStory.innerText = data.labels.story;

    const navLinkCeremonies = document.getElementById('navLinkCeremonies');
    if (navLinkCeremonies) navLinkCeremonies.innerText = data.labels.ceremonies;

    const navLinkEvents = document.getElementById('navLinkEvents');
    if (navLinkEvents) navLinkEvents.innerText = data.labels.events;

    // Hero Section
    const heroWeddingHeader = document.getElementById('heroWeddingHeader');
    if (heroWeddingHeader) heroWeddingHeader.innerText = data.labels.heroWeddingHeader;

    const heroNames = document.getElementById('heroNames');
    if (heroNames) heroNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

    const heroSlogan = document.getElementById('heroSlogan');
    if (heroSlogan) heroSlogan.innerText = data.labels.heroSlogan;

    const heroDate = document.getElementById('heroDate');
    if (heroDate) heroDate.innerText = data.event.dateFormatted;

    const heroKeralaDate = document.getElementById('heroKeralaDate');
    if (heroKeralaDate) heroKeralaDate.innerText = data.event.keralaDate;

    // Story Section headings
    const storySubTitle = document.getElementById('storySubTitle');
    if (storySubTitle) storySubTitle.innerText = data.labels.storySubTitle;

    const storyTitle = document.getElementById('storyTitle');
    if (storyTitle) storyTitle.innerText = data.labels.storyTitle;

    // Profiles
    const groomRole = document.getElementById('groomRole');
    if (groomRole) groomRole.innerText = data.labels.groomRole;

    const groomName = document.getElementById('groomName');
    if (groomName) groomName.innerText = data.couple.groomFull;

    const groomBio = document.getElementById('groomBio');
    if (groomBio) groomBio.innerText = data.coupleDetails.groomBio;

    const brideRole = document.getElementById('brideRole');
    if (brideRole) brideRole.innerText = data.labels.brideRole;

    const brideName = document.getElementById('brideName');
    if (brideName) brideName.innerText = data.couple.brideFull;

    const brideBio = document.getElementById('brideBio');
    if (brideBio) brideBio.innerText = data.coupleDetails.brideBio;

    // Parents Section headings
    const parentsSubTitle = document.getElementById('parentsSubTitle');
    if (parentsSubTitle) parentsSubTitle.innerText = data.labels.parentsSubTitle;

    const parentsTitle = document.getElementById('parentsTitle');
    if (parentsTitle) parentsTitle.innerText = data.labels.parentsTitle;

    // Parents Details
    const groomFamilyTitle = document.getElementById('groomFamilyTitle');
    if (groomFamilyTitle) groomFamilyTitle.innerText = data.labels.groomFamilyTitle;

    const groomFatherName = document.getElementById('groomFatherName');
    if (groomFatherName) groomFatherName.innerText = data.coupleDetails.groomParentsFather;

    const groomFatherRole = document.getElementById('groomFatherRole');
    if (groomFatherRole) groomFatherRole.innerText = data.coupleDetails.groomParentsFatherRole;

    const groomMotherName = document.getElementById('groomMotherName');
    if (groomMotherName) groomMotherName.innerText = data.coupleDetails.groomParentsMother;

    const groomMotherRole = document.getElementById('groomMotherRole');
    if (groomMotherRole) groomMotherRole.innerText = data.coupleDetails.groomParentsMotherRole;

    const brideFamilyTitle = document.getElementById('brideFamilyTitle');
    if (brideFamilyTitle) brideFamilyTitle.innerText = data.labels.brideFamilyTitle;

    const brideFatherName = document.getElementById('brideFatherName');
    if (brideFatherName) brideFatherName.innerText = data.coupleDetails.brideParentsFather;

    const brideFatherRole = document.getElementById('brideFatherRole');
    if (brideFatherRole) brideFatherRole.innerText = data.coupleDetails.brideParentsFatherRole;

    const brideMotherName = document.getElementById('brideMotherName');
    if (brideMotherName) brideMotherName.innerText = data.coupleDetails.brideParentsMother;

    const brideMotherRole = document.getElementById('brideMotherRole');
    if (brideMotherRole) brideMotherRole.innerText = data.coupleDetails.brideParentsMotherRole;

    // Nilavilakku Section headings
    const lampSubTitle = document.getElementById('lampSubTitle');
    if (lampSubTitle) lampSubTitle.innerText = data.labels.lampSubTitle;

    const lampTitle = document.getElementById('lampTitle');
    if (lampTitle) lampTitle.innerText = data.labels.lampTitle;

    const lampInstruction = document.getElementById('lampInstruction');
    if (lampInstruction) lampInstruction.innerText = data.labels.lampInstruction;

    const lampBlessingTitle = document.getElementById('lampBlessingTitle');
    if (lampBlessingTitle) lampBlessingTitle.innerText = data.interactiveCeremonies.lampBlessingTitle;

    const lampBlessingText = document.getElementById('lampBlessingText');
    if (lampBlessingText) lampBlessingText.innerText = data.interactiveCeremonies.lampBlessingText;

    // Flower Section headings
    const flowerSubTitle = document.getElementById('flowerSubTitle');
    if (flowerSubTitle) flowerSubTitle.innerText = data.labels.flowerSubTitle;

    const flowerTitle = document.getElementById('flowerTitle');
    if (flowerTitle) flowerTitle.innerText = data.labels.flowerTitle;

    const flowerInstruction = document.getElementById('flowerInstruction');
    if (flowerInstruction) flowerInstruction.innerText = data.labels.flowerInstruction;

    const flowerButtonLabel = document.getElementById('flowerButtonLabel');
    if (flowerButtonLabel) flowerButtonLabel.innerText = data.labels.flowerButtonLabel;

    // Memory Tree Section headings
    const treeSubTitle = document.getElementById('treeSubTitle');
    if (treeSubTitle) treeSubTitle.innerText = data.labels.treeSubTitle;

    const treeTitle = document.getElementById('treeTitle');
    if (treeTitle) treeTitle.innerText = data.labels.treeTitle;

    const treeInstruction = document.getElementById('treeInstruction');
    if (treeInstruction) treeInstruction.innerText = data.labels.treeInstruction;

    // Quiz Section headings
    const quizSubTitle = document.getElementById('quizSubTitle');
    if (quizSubTitle) quizSubTitle.innerText = data.labels.quizSubTitle;

    const quizTitle = document.getElementById('quizTitle');
    if (quizTitle) quizTitle.innerText = data.labels.quizTitle;

    // Events Section headings
    const eventsSubTitle = document.getElementById('eventsSubTitle');
    if (eventsSubTitle) eventsSubTitle.innerText = data.labels.eventsSubTitle;

    const eventsTitle = document.getElementById('eventsTitle');
    if (eventsTitle) eventsTitle.innerText = data.labels.eventsTitle;

    // Countdown heading
    const countdownHeading = document.getElementById('countdownHeading');
    if (countdownHeading) countdownHeading.innerText = data.labels.countdownHeading;

    const daysLabel = document.getElementById('daysLabel');
    if (daysLabel) daysLabel.innerText = data.labels.days;

    const hoursLabel = document.getElementById('hoursLabel');
    if (hoursLabel) hoursLabel.innerText = data.labels.hours;

    const minutesLabel = document.getElementById('minutesLabel');
    if (minutesLabel) minutesLabel.innerText = data.labels.minutes;

    const secondsLabel = document.getElementById('secondsLabel');
    if (secondsLabel) secondsLabel.innerText = data.labels.seconds;

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
        if (data.event.teaserVideoPoster) teaserVideo.poster = data.event.teaserVideoPoster;
        videoSource.src = data.event.teaserVideoUrl;
        teaserVideo.load();
    }

    // Contacts Section headings
    const contactsSubTitle = document.getElementById('contactsSubTitle');
    if (contactsSubTitle) contactsSubTitle.innerText = data.labels.contactsSubTitle;

    const contactsTitle = document.getElementById('contactsTitle');
    if (contactsTitle) contactsTitle.innerText = data.labels.contactsTitle;

    // Footer Details
    const footerMonogram = document.getElementById('footerMonogram');
    if (footerMonogram) footerMonogram.innerText = data.couple.monogram;

    const footerNames = document.getElementById('footerNames');
    if (footerNames) footerNames.innerText = `${data.couple.groom} & ${data.couple.bride}`;

    const footerDhanyavadham = document.getElementById('footerDhanyavadham');
    if (footerDhanyavadham) footerDhanyavadham.innerText = data.couple.tagline;

    const footerCopyright = document.getElementById('footerCopyright');
    if (footerCopyright) footerCopyright.innerText = `© 2026 ${data.couple.groom} & ${data.couple.bride}. All Rights Reserved.`;

    // Render Itinerary Events
    const eventsListContainer = document.getElementById('eventsListContainer');
    if (eventsListContainer && data.itinerary) {
        eventsListContainer.innerHTML = data.itinerary.map(item => `
      <div class="event-card reveal">
          <div class="event-top-banner"></div>
          <div class="event-content">
              <h3 class="event-name">${item.title}</h3>
              <div class="event-details-grid">
                  <div class="event-detail-item">
                      <i class="fa-solid fa-calendar-days"></i>
                      <span class="lbl">Date</span>
                      <span class="val">${item.date}</span>
                  </div>
                  <div class="event-detail-item">
                      <i class="fa-solid fa-clock"></i>
                      <span class="lbl">Time</span>
                      <span class="val">${item.time}</span>
                  </div>
                  <div class="event-detail-item">
                      <i class="fa-solid fa-location-dot"></i>
                      <span class="lbl">Venue</span>
                      <span class="val">${item.venue}</span>
                  </div>
              </div>
              <button class="btn-venue-nav" onclick="window.open('${item.mapUrl}', '_blank', 'noopener,noreferrer')">
                  <i class="fa-solid fa-diamond-turn-right"></i> Navigate Venue
              </button>
          </div>
      </div>
    `).join('');
    }

    // Render Gallery items
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid && data.gallery) {
        galleryGrid.innerHTML = data.gallery.map((item, index) => `
      <div class="gallery-card" onclick="openLightbox(${index})">
          <img src="${item.src}" alt="${item.title}">
          <div class="gallery-card-overlay">
              <span class="gallery-card-title">${item.title}</span>
          </div>
      </div>
    `).join('');
    }

    // Render Contacts
    const contactsGrid = document.getElementById('contactsGrid');
    if (contactsGrid && data.contacts) {
        contactsGrid.innerHTML = data.contacts.map(contact => `
      <div class="contact-card-box">
          <h3 class="contact-name">${contact.name}</h3>
          <span class="contact-relation">${contact.relation}</span>
          <div class="contact-action-flex">
              <a href="tel:${contact.phone.replace(/[\s()-]/g, '')}" class="contact-action-btn call"><i class="fa-solid fa-phone"></i> ${data.labels.contactsCallLabel}</a>
              <a href="https://wa.me/${contact.whatsapp}" class="contact-action-btn chat"><i class="fa-brands fa-whatsapp"></i> ${data.labels.contactsChatLabel}</a>
          </div>
      </div>
    `).join('');
    }
}

/* ==========================================
   PERSONALIZED GUEST GREETING
   ========================================== */
function parseGuestName() {
    const guestNameDisplay = document.getElementById("guest-name-display");
    if (!guestNameDisplay) return;

    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get("guest");
    if (guestName) {
        guestName = guestName.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        guestNameDisplay.innerText = guestName;
    } else {
        guestNameDisplay.innerText = (window.weddingData && window.weddingData.labels.defaultGuestName) || "Beloved Guest";
    }
}

/* ==========================================
   OPEN INVITATION COVER ANIMATION
   ========================================== */
function initInviteOpener() {
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const loaderScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    if (!btnOpenInvite) return;

    btnOpenInvite.addEventListener("click", () => {
        // Play traditional music
        if (bgMusic && musicToggle) {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                musicToggle.classList.remove("muted");
                musicToggle.setAttribute("aria-label", "Mute Background Music");
            }).catch(err => {
                console.log("Autoplay blocked. Waiting for user interaction.", err);
            });
        }

        // Hide cover with fade-out
        if (loaderScreen) loaderScreen.classList.add("fade-out");

        // Show main website wrapper
        if (mainContent) {
            mainContent.classList.remove("content-hidden");
            void mainContent.offsetWidth; // Force Reflow
            mainContent.classList.add("fade-in");
        }

        // Unlock scroll
        document.body.style.overflow = "auto";

        // Initialize active scroll reveal & countdown
        window.dispatchEvent(new Event('scroll'));
    });

    // Prevent scrolling initially when cover is active
    document.body.style.overflow = "hidden";
}

/* ==========================================
   BACKGROUND MUSIC CONTROL
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
   SCROLL PROGRESS INDICATOR & REVEALS
   ========================================== */
function initScrollProgress() {
    const scrollBar = document.getElementById("scroll-bar");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.getElementById("main-header");

    window.addEventListener("scroll", () => {
        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) scrollBar.style.width = scrolled + "%";

        // Active scroll reveal elements
        revealOnScroll();
    });

    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add("active");
            }
        });
    }

    // Anchor smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection && header) {
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
   VIRTUAL NILAVILAKKU CEREMONY (AUTOMATED)
   ========================================== */
function initNilavilakkuCeremony() {
    const wickSpots = document.querySelectorAll(".wick-spot");
    const lampBlessingCard = document.getElementById("lamp-blessing-card");
    const lampBox = document.querySelector(".lamp-ceremony-box");

    if (!lampBox || wickSpots.length === 0) return;

    let hasStartedLighting = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStartedLighting) {
                hasStartedLighting = true;
                lightWicksSequentially();
            }
        });
    }, { threshold: 0.25 });

    observer.observe(lampBox);

    function lightWicksSequentially() {
        let currentWickIdx = 0;

        function lightNext() {
            if (currentWickIdx < wickSpots.length) {
                const wick = wickSpots[currentWickIdx];
                wick.classList.add("lit");
                showFlowerToast("Auspicious flame lit! 🕯️");
                currentWickIdx++;

                if (currentWickIdx === wickSpots.length) {
                    setTimeout(() => {
                        if (lampBlessingCard) lampBlessingCard.style.display = "block";
                        triggerFlowerShower(40); // Large celebration shower
                        showFlowerToast("Ponmangalashamsakal! Lamp fully lit! 🌟");
                    }, 800);
                } else {
                    setTimeout(lightNext, 700);
                }
            }
        }

        setTimeout(lightNext, 500);
    }
}

/* ==========================================
   FLOWER SHOWER BLESSING ENGINE (AUTOMATED)
   ========================================== */
let toastTimeout;
let flowerInterval = null;
function initFlowerShower() {
    // Start continuous gentle falling flowers automatically
    if (!flowerInterval) {
        setTimeout(() => {
            triggerFlowerShower(6);
        }, 3000);

        flowerInterval = setInterval(() => {
            triggerFlowerShower(4);
        }, 5000);
    }

    // Trigger a slightly larger shower when the flower section comes into view
    const flowerWidget = document.querySelector(".flower-shower-widget");
    if (flowerWidget) {
        let hasTriggeredScrollShower = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasTriggeredScrollShower) {
                    hasTriggeredScrollShower = true;
                    triggerFlowerShower(20);

                    const data = window.weddingData;
                    const blessingSayings = (data && data.interactiveCeremonies && data.interactiveCeremonies.flowerBlessingSayings) || [
                        "May their life be as fragrant as jasmine! 🌸",
                        "Wishing Zayn & Aara a golden future! 🌟",
                        "Ponmangalashamsakal! May love flourish forever! ❤️",
                        "Blessings of happiness, peace, and abundance! 🌿",
                        "May joy shower upon their union! 🌺"
                    ];
                    const randomSaying = blessingSayings[Math.floor(Math.random() * blessingSayings.length)];
                    showFlowerToast(randomSaying);
                }
            });
        }, { threshold: 0.25 });
        observer.observe(flowerWidget);
    }
}

function showFlowerToast(message) {
    const flowerToast = document.getElementById("flower-toast");
    if (!flowerToast) return;

    clearTimeout(toastTimeout);
    flowerToast.innerText = message;
    flowerToast.classList.add("show");

    toastTimeout = setTimeout(() => {
        flowerToast.classList.remove("show");
    }, 3500);
}

function triggerFlowerShower(count) {
    const flowerShowerOverlay = document.getElementById("flower-shower-overlay");
    if (!flowerShowerOverlay) return;

    const petalTypes = ["jasmine", "marigold", "rose"];

    for (let i = 0; i < count; i++) {
        const petal = document.createElement("div");
        const type = petalTypes[Math.floor(Math.random() * petalTypes.length)];

        petal.className = `falling-petal ${type}`;

        const startX = Math.random() * 100;
        const scale = 0.5 + Math.random() * 0.8;
        const duration = 2.5 + Math.random() * 3;
        const delay = Math.random() * 0.8;

        petal.style.left = `${startX}vw`;
        petal.style.transform = `scale(${scale})`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;

        flowerShowerOverlay.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }
}

/* ==========================================
   WEDDING MEMORY TREE REVEALS (AUTOMATED SLIDESHOW)
   ========================================== */
function initMemoryTree() {
    const treeLeaves = document.querySelectorAll(".tree-leaf-node");
    const memoryRevealBox = document.getElementById("memory-reveal-box");
    const memoryRevealTitle = document.getElementById("memory-reveal-title");
    const memoryRevealDesc = document.getElementById("memory-reveal-desc");

    if (treeLeaves.length === 0) return;

    let activeLeafIdx = 0;
    let treeInterval = null;

    function showLeafFact(index) {
        const leaf = treeLeaves[index];
        if (!leaf) return;

        const leafId = leaf.id.replace("leaf-", "");
        const data = window.weddingData;
        const fact = data && data.memoryTreeFacts && data.memoryTreeFacts[leafId];

        if (fact) {
            treeLeaves.forEach(l => {
                const circle = l.querySelector("circle");
                if (circle) circle.style.fill = "#FFF";
            });
            const leafCircle = leaf.querySelector("circle");
            if (leafCircle) leafCircle.style.fill = "#FAF5B7";

            if (memoryRevealBox) {
                memoryRevealBox.style.opacity = "0";
                setTimeout(() => {
                    if (memoryRevealTitle) memoryRevealTitle.innerText = fact.title;
                    if (memoryRevealDesc) memoryRevealDesc.innerText = fact.desc;
                    memoryRevealBox.style.display = "block";
                    memoryRevealBox.style.opacity = "1";
                }, 300);
            }
        }
    }

    // Start slideshow when Memory Tree comes into view
    const treeContainer = document.querySelector(".memory-tree-box");
    if (treeContainer) {
        let hasStartedSlideshow = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasStartedSlideshow) {
                    hasStartedSlideshow = true;
                    showLeafFact(0);

                    treeInterval = setInterval(() => {
                        activeLeafIdx = (activeLeafIdx + 1) % treeLeaves.length;
                        showLeafFact(activeLeafIdx);
                    }, 4000);
                }
            });
        }, { threshold: 0.25 });
        observer.observe(treeContainer);
    }
}

/* ==========================================
   COUPLE QUIZ - AUTOMATED / STATIC FACTS DISPLAY
   ========================================== */
function initQuizGame() {
    const quizContainer = document.getElementById('quizContainer');
    const data = window.weddingData;
    if (!quizContainer || !data || !data.quiz) return;

    // Render as a beautiful static Q&A list with checkmark indicators
    quizContainer.innerHTML = data.quiz.map((item, idx) => {
        const correctAnswer = item.options.find(opt => opt.correct).text;
        return `
            <div class="quiz-qa-card" style="margin-bottom: 25px; padding: 20px; background-color: var(--color-bg-primary); border-left: 4px solid var(--color-gold); border-radius: var(--border-radius-sm); box-shadow: var(--shadow-soft); text-align: left;">
                <div class="quiz-q-num" style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-gold); font-weight: 600; margin-bottom: 8px;">Fact ${idx + 1}</div>
                <h4 class="quiz-q-text" style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-maroon); margin-bottom: 12px; font-weight: 600; line-height: 1.4;">${item.qText}</h4>
                <div class="quiz-answer-text" style="font-size: 0.95rem; color: var(--color-emerald); font-weight: 600; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${correctAnswer}</span>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================
   LIVE COUNTDOWN Muhurtham
   ========================================== */
let countdownInterval;
function initCountdown() {
    clearInterval(countdownInterval);

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
            clearInterval(countdownInterval);
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
    countdownInterval = setInterval(updateTimer, 1000);
}

/* ==========================================
   PHOTO GALLERY LIGHTBOX SYSTEM
   ========================================== */
const galleryItems = [
    { title: "The Promise", desc: "Engagement rings surrounded by golden Kasavu styling.", color: "#E5C396" },
    { title: "The Mundu Ceremony", desc: "Traditional Kerala Kasavu handlooms woven for the auspicious day.", color: "#F2EDE4" },
    { title: "Sneha Walk", desc: "Walking together along the historic Fort Kochi sea walkway.", color: "#E5C396" }
];
let currentGalleryIndex = 0;

function initLightboxGallery() {
    // Event actions attached in HTML / Rendered cards
}

window.openLightbox = function (index) {
    const lightboxModal = document.getElementById("gallery-lightbox");
    if (!lightboxModal) return;

    const data = window.weddingData;
    const items = (data && data.gallery) || galleryItems;

    currentGalleryIndex = index;
    lightboxModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    updateLightboxContent(items);
};

window.closeLightbox = function () {
    const lightboxModal = document.getElementById("gallery-lightbox");
    if (lightboxModal) lightboxModal.style.display = "none";
    document.body.style.overflow = "auto";
};

window.navigateLightbox = function (direction) {
    const data = window.weddingData;
    const items = (data && data.gallery) || galleryItems;

    currentGalleryIndex += direction;
    if (currentGalleryIndex >= items.length) {
        currentGalleryIndex = 0;
    } else if (currentGalleryIndex < 0) {
        currentGalleryIndex = items.length - 1;
    }
    updateLightboxContent(items);
};

function updateLightboxContent(items) {
    const lightboxMediaContainer = document.getElementById("lightbox-media-container");
    const lightboxCaptionText = document.getElementById("lightbox-caption-text");
    if (!lightboxMediaContainer || !lightboxCaptionText) return;

    const item = items[currentGalleryIndex];

    lightboxMediaContainer.innerHTML = `
        <img src="${item.src}" class="lightbox-img" alt="${item.title}">
    `;
    lightboxCaptionText.innerText = item.desc;
}
