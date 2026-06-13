/**
 * Matrimonial Passport — Zayn & Aara
 * Custom Client-side JavaScript.
 * Fully client-side, dynamic data-driven template.
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("basic3 template DOM Loaded - Processing data...");
    
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
    getPassengerNameFromUrl();
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
    if (isNaN(dateObj)) return "SEPT 4, 2026";
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
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
  if (metaTitle) metaTitle.innerText = `Matrimonial Passport — ${data.couple.groom} & ${data.couple.bride}`;

  // Welcome page
  const countryEmboss = document.getElementById('countryEmboss');
  if (countryEmboss) countryEmboss.innerText = data.labels.countryEmboss;

  const crestMonogram = document.getElementById('crestMonogram');
  if (crestMonogram) crestMonogram.innerText = data.couple.monogram;

  const passportTitle = document.getElementById('passportTitle');
  if (passportTitle) passportTitle.innerText = data.labels.passportTitle;

  const passportSub = document.getElementById('passportSub');
  if (passportSub) passportSub.innerText = `${data.labels.passportSub} ${data.couple.groom.toUpperCase()} & ${data.couple.bride.toUpperCase()}`;

  const passportDeparture = document.getElementById('passportDeparture');
  if (passportDeparture) {
    // format to dot structure e.g. 04 . 09 . 2026
    const parts = data.event.date.split('-');
    passportDeparture.innerText = `${data.labels.departureLabel.toUpperCase()}: ${parts[2]} . ${parts[1]} . ${parts[0]}`;
  }

  const beginJourneyText = document.getElementById('beginJourneyText');
  if (beginJourneyText) beginJourneyText.innerText = data.labels.beginJourney;

  // Header Logo
  const headerLogo = document.getElementById('headerLogo');
  if (headerLogo) headerLogo.innerText = data.couple.monogram;

  // Ticket Passenger info
  const airlineBrand = document.getElementById('airlineBrand');
  if (airlineBrand) airlineBrand.innerHTML = `<i class="fa-solid fa-plane"></i> ${data.labels.airlineBrand}`;

  const ticketClass = document.getElementById('ticketClass');
  if (ticketClass) ticketClass.innerText = data.labels.ticketClass;

  const originCode = document.getElementById('originCode');
  if (originCode) originCode.innerText = data.event.originCode;

  const originCity = document.getElementById('originCity');
  if (originCity) originCity.innerText = data.event.originCity;

  const flightNo = document.getElementById('flightNo');
  if (flightNo) flightNo.innerText = data.event.flightNo;

  const destCode = document.getElementById('destCode');
  if (destCode) destCode.innerText = data.event.destCode;

  const destCity = document.getElementById('destCity');
  if (destCity) destCity.innerText = data.event.destCity;

  const passengerNameLabel = document.getElementById('passengerNameLabel');
  if (passengerNameLabel) passengerNameLabel.innerText = data.labels.passengerNameLabel;

  const gateLabel = document.getElementById('gateLabel');
  if (gateLabel) gateLabel.innerText = data.labels.gateLabel;

  const gateValue = document.getElementById('gateValue');
  if (gateValue) gateValue.innerText = data.labels.gateValue;

  const boardingTimeLabel = document.getElementById('boardingTimeLabel');
  if (boardingTimeLabel) boardingTimeLabel.innerText = data.labels.boardingTimeLabel;

  const boardingTimeValue = document.getElementById('boardingTimeValue');
  if (boardingTimeValue) boardingTimeValue.innerText = data.event.boardingTime;

  const seatAssignmentLabel = document.getElementById('seatAssignmentLabel');
  if (seatAssignmentLabel) seatAssignmentLabel.innerText = data.labels.seatAssignmentLabel;

  const seatAssignmentValue = document.getElementById('seatAssignmentValue');
  if (seatAssignmentValue) seatAssignmentValue.innerText = data.labels.seatAssignmentValue;

  // Side stub fields
  const passengerReceiptLabel = document.getElementById('passengerReceiptLabel');
  if (passengerReceiptLabel) passengerReceiptLabel.innerText = data.labels.passengerReceiptLabel;

  const stubFlightNo = document.getElementById('stubFlightNo');
  if (stubFlightNo) stubFlightNo.innerText = data.event.flightNo.replace("FLIGHT ", "");

  const stubRoute = document.getElementById('stubRoute');
  if (stubRoute) stubRoute.innerHTML = `${data.event.originCode} &rarr; ${data.event.destCode}`;

  const receiptDateLabel = document.getElementById('receiptDateLabel');
  if (receiptDateLabel) receiptDateLabel.innerText = data.labels.receiptDateLabel;

  const receiptDateValue = document.getElementById('receiptDateValue');
  if (receiptDateValue) receiptDateValue.innerText = data.event.dateFormatted;

  const receiptVenueLabel = document.getElementById('receiptVenueLabel');
  if (receiptVenueLabel) receiptVenueLabel.innerText = data.labels.receiptVenueLabel;

  const receiptVenueValue = document.getElementById('receiptVenueValue');
  if (receiptVenueValue) receiptVenueValue.innerText = data.event.venueName;

  const barcodeNumber = document.getElementById('barcodeNumber');
  if (barcodeNumber) barcodeNumber.innerText = data.labels.barcodeNumber;

  // Couple Info (Crew)
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

  // Venue Coordinates
  const venueName = document.getElementById('venueName');
  if (venueName) venueName.innerText = data.event.venueName;

  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.innerText = data.event.venueAddress;

  const navigateBtn = document.getElementById('navigateBtn');
  if (navigateBtn) navigateBtn.href = data.event.mapDirectionsUrl;

  // Map Embed
  const mapEmbedWrapper = document.getElementById('mapEmbedWrapper');
  if (mapEmbedWrapper) {
    mapEmbedWrapper.innerHTML = `
      <iframe 
          src="${data.event.mapEmbedUrl}" 
          width="100%" 
          height="360" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Wedding Destination Map">
      </iframe>
    `;
  }

  // Render Story timeline postcards
  const storyGrid = document.getElementById('storyGrid');
  if (storyGrid && data.story) {
    storyGrid.innerHTML = data.story.map((item, idx) => `
      <div class="destination-card reveal ${idx % 2 === 0 ? 'reveal-left' : 'reveal-right'}">
          <div class="stamp-overlay ${item.stampClass} reveal-stamp">${item.stampText}</div>
          <div class="postcard-img-box">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="postcard-content">
              <span class="destination-tag">${item.tag}</span>
              <h3>${item.title}</h3>
              <span class="destination-date">${item.date}</span>
              <p>${item.text}</p>
          </div>
      </div>
    `).join('');
  }

  // Render Stops Events Timeline
  const eventsGrid = document.getElementById('eventsGrid');
  if (eventsGrid && data.itinerary) {
    eventsGrid.innerHTML = data.itinerary.map(item => `
      <div class="itinerary-card reveal ${item.highlight ? 'highlight' : ''}">
          <div class="itinerary-header">
              <i class="fa-solid ${item.iconClass}"></i>
              <span>${item.stop}</span>
          </div>
          <div class="itinerary-body">
              <h3>${item.title}</h3>
              <div class="itinerary-details">
                  <p><i class="fa-regular fa-calendar"></i> ${item.date}</p>
                  <p><i class="fa-regular fa-clock"></i> ${item.time}</p>
                  <p><i class="fa-solid fa-location-arrow"></i> ${item.venue}</p>
                  <p><i class="fa-solid fa-user-shield"></i> ${item.dressCode}</p>
              </div>
          </div>
          <div class="itinerary-footer">
              <span>${item.status}</span>
          </div>
      </div>
    `).join('');
  }

  // Render polaroids
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid && data.gallery) {
    galleryGrid.innerHTML = data.gallery.map((item, index) => `
      <div class="polaroid-item reveal" data-index="${index}">
          <div class="polaroid-img-wrapper">
              <img src="${item.src}" alt="${item.caption}" loading="lazy">
          </div>
          <span class="polaroid-label-text">${item.caption}</span>
      </div>
    `).join('');
  }

  // Render contacts
  const contactsGrid = document.getElementById('contactsGrid');
  if (contactsGrid && data.contacts) {
    contactsGrid.innerHTML = data.contacts.map(contact => `
      <div class="consular-card reveal">
          <span class="consular-title">${contact.side}</span>
          <h3 class="consular-name">${contact.name}</h3>
          <span class="consular-relation">${contact.relation}</span>
          <div class="consular-actions">
              <a href="tel:${contact.phone.replace(/[\s()-]/g, '')}" class="btn-passport-outline"><i class="fa-solid fa-phone"></i> ${data.labels.callLabel}</a>
              <a href="https://wa.me/${contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn-passport-outline wa"><i class="fa-brands fa-whatsapp"></i> ${data.labels.whatsappLabel}</a>
          </div>
      </div>
    `).join('');
  }

  // Labels
  if (data.labels) {
    const boardingInvitation = document.getElementById('boardingInvitation');
    if (boardingInvitation) boardingInvitation.innerText = data.labels.boardingInvitation;

    const yourBoardingPass = document.getElementById('yourBoardingPass');
    if (yourBoardingPass) yourBoardingPass.innerText = data.labels.yourBoardingPass;

    const storyLabel = document.getElementById('storyLabel');
    if (storyLabel) storyLabel.innerText = data.labels.storyLabel;

    const storyTitle = document.getElementById('storyTitle');
    if (storyTitle) storyTitle.innerText = data.labels.storyTitle;

    const crewLabel = document.getElementById('crewLabel');
    if (crewLabel) crewLabel.innerText = data.labels.crewLabel;

    const crewTitle = document.getElementById('crewTitle');
    if (crewTitle) crewTitle.innerText = data.labels.crewTitle;

    const pilotTitle = document.getElementById('pilotTitle');
    if (pilotTitle) pilotTitle.innerText = data.labels.pilotTitle;

    const copilotTitle = document.getElementById('copilotTitle');
    if (copilotTitle) copilotTitle.innerText = data.labels.copilotTitle;

    const groomRole = document.getElementById('groomRole');
    if (groomRole) groomRole.innerText = data.labels.pilotRole;

    const brideRole = document.getElementById('brideRole');
    if (brideRole) brideRole.innerText = data.labels.copilotRole;

    document.querySelectorAll('.parents-notes span').forEach(el => {
      el.innerText = data.labels.sponsorLabel;
    });

    const itineraryLabel = document.getElementById('itineraryLabel');
    if (itineraryLabel) itineraryLabel.innerText = data.labels.itineraryLabel;

    const itineraryTitle = document.getElementById('itineraryTitle');
    if (itineraryTitle) itineraryTitle.innerText = data.labels.itineraryTitle;

    const countdownLabel = document.getElementById('countdownLabel');
    if (countdownLabel) countdownLabel.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> ${data.labels.countdownLabel}`;

    const countdownDaysLabel = document.getElementById('countdownDaysLabel');
    if (countdownDaysLabel) countdownDaysLabel.innerText = data.labels.countdownDays;

    const countdownHoursLabel = document.getElementById('countdownHoursLabel');
    if (countdownHoursLabel) countdownHoursLabel.innerText = data.labels.countdownHours;

    const countdownMinutesLabel = document.getElementById('countdownMinutesLabel');
    if (countdownMinutesLabel) countdownMinutesLabel.innerText = data.labels.countdownMinutes;

    const countdownSecondsLabel = document.getElementById('countdownSecondsLabel');
    if (countdownSecondsLabel) countdownSecondsLabel.innerText = data.labels.countdownSeconds;

    const coordinatesLabel = document.getElementById('coordinatesLabel');
    if (coordinatesLabel) coordinatesLabel.innerText = data.labels.coordinatesLabel;

    const coordinatesTitle = document.getElementById('coordinatesTitle');
    if (coordinatesTitle) coordinatesTitle.innerText = data.labels.coordinatesTitle;

    const arrivedStamp = document.getElementById('arrivedStamp');
    if (arrivedStamp) arrivedStamp.innerText = data.labels.arrivedStamp;

    const valetParkingDesc = document.getElementById('valetParkingDesc');
    if (valetParkingDesc) valetParkingDesc.innerText = data.labels.valetParkingDesc;

    const navigateLabel = document.getElementById('navigateLabel');
    if (navigateLabel) navigateLabel.innerText = data.labels.navigateLabel;

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

    const footerSeal = document.getElementById('footerSeal');
    if (footerSeal) footerSeal.innerText = data.couple.monogram;

    const footerAnnouncement = document.getElementById('footerAnnouncement');
    if (footerAnnouncement) footerAnnouncement.innerText = `${data.couple.groom.toUpperCase()} & ${data.couple.bride.toUpperCase()} ${data.labels.footerAnnouncement}`;
  }
}

/* ==========================================
   1. DYNAMIC URL PASSENGER NAME INJECTION
   ========================================== */
function getPassengerNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    const passengerNameTicket = document.getElementById("ticket-passenger-name");
    
    if (passengerNameTicket) {
        if (guestName) {
            passengerNameTicket.innerText = decodeURIComponent(guestName).toUpperCase();
        } else {
            passengerNameTicket.innerText = "HONORED GUEST";
        }
    }
}

/* ==========================================
   2. PASSPORT COVER DOOR OPENER
   ========================================== */
function initWelcomeScreen() {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    const btnBeginJourney = document.getElementById("btn-begin-journey");

    if (!btnBeginJourney) return;

    btnBeginJourney.addEventListener("click", () => {
        if (welcomeScreen) welcomeScreen.classList.add("fade-out");
        if (mainContent) {
            mainContent.classList.remove("content-hidden");
            void mainContent.offsetWidth; // Force Reflow
            mainContent.classList.add("fade-in");
        }
        document.body.style.overflow = "auto";
    });
    
    document.body.style.overflow = "hidden"; // Lock scroll initially
}

/* ==========================================
   3. NAV HEADER & FLOATING NAVIGATION
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
            
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-compass");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-compass");
                }
            }
        });

        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-compass");
                }
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
                const icon = menuToggle ? menuToggle.querySelector("i") : null;
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-compass");
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
   4. DEPARTURE FLIGHT COUNTDOWN BOARD
   ========================================== */
function initCountdown() {
    const countdownDays = document.getElementById("days");
    const countdownHours = document.getElementById("hours");
    const countdownMinutes = document.getElementById("minutes");
    const countdownSeconds = document.getElementById("seconds");

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

    function calculateCountdown() {
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
    
    calculateCountdown();
    setInterval(calculateCountdown, 1000);
}

/* ==========================================
   5. COPY COORDINATES ADDRESS WIDGET
   ========================================== */
function initAddressCopyButton() {
    const btnCopyAddress = document.getElementById("btn-copy-address");
    const copyToast = document.getElementById("copy-toast");

    if (!btnCopyAddress) return;

    btnCopyAddress.addEventListener("click", () => {
        const address = (window.weddingData && window.weddingData.event && window.weddingData.event.venueAddress) || "The Palace Ballroom, 789 Golden Gate Blvd, Astoria Garden, New York, NY 11102";
        
        navigator.clipboard.writeText(address).then(() => {
            showToastNotification();
        }).catch(() => {
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
                console.error('Copy fallback fails', e);
            }
            document.body.removeChild(area);
        });
    });

    function showToastNotification() {
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
   6. POLAROID LIGHTBOX
   ========================================== */
function initLightboxGallery() {
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentGalleryIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Use event delegation on galleryGrid
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    galleryGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.polaroid-item');
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
        const welcomeScreen = document.getElementById("welcome-screen");
        if (welcomeScreen && welcomeScreen.classList.contains("fade-out")) {
            document.body.style.overflow = "auto";
        }
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

        // Swipe support
        lightboxModal.addEventListener("touchstart", e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        lightboxModal.addEventListener("touchend", e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, {passive: true});
    }

    function handleSwipeGesture() {
        const swipeThreshold = 55;
        if (touchEndX < touchStartX - swipeThreshold) {
            showNextImage();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
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
   7. SCROLL STAMP & REVEAL OBSERVER
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
