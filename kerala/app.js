/**
 * ANJALI & MADHAV - SECULAR KERALA STYLE COCONUT CURTAIN WEDDING WEBSITE JS
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Loaded - Rendering data & initializing modules...");
  renderData();
  initAudio();
  initCoconutReveal();
  initCountdown();
  initFaqs();
  initRegistry();
  initRsvp();
  initSaveDate();
  setupScrollAnimations();
});

/* ==========================================
   0. DYNAMIC DATA RENDERING
   ========================================== */
function renderData() {
  const data = window.weddingData;
  if (!data) return;

  // Render couple names & subtitle
  const revealSubtitle = document.getElementById('revealSubtitle');
  if (revealSubtitle) revealSubtitle.innerText = data.couple.unionText;

  const revealTitle = document.getElementById('revealTitle');
  if (revealTitle) revealTitle.innerHTML = `${data.couple.bride} &amp; ${data.couple.groom}`;

  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroSubtitle) heroSubtitle.innerText = `Welcome to the Wedding of`;

  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = `${data.couple.bride} &amp; ${data.couple.groom}`;

  const heroDate = document.getElementById('heroDate');
  if (heroDate) heroDate.innerHTML = `${data.event.dateFormatted} &bull; Kochi, Kerala`;

  // Render event details
  const sectionTitle = document.getElementById('sectionTitle');
  if (sectionTitle) sectionTitle.innerText = data.event.title;

  const venueName = document.getElementById('venueName');
  if (venueName) venueName.innerText = data.event.venueName;

  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.innerText = data.event.venueAddress;

  const venueDate = document.getElementById('venueDate');
  if (venueDate) venueDate.innerText = data.event.dateFormatted;

  // Render itinerary
  const timelineContainer = document.getElementById('timelineContainer');
  if (timelineContainer && data.itinerary) {
    timelineContainer.innerHTML = data.itinerary.map(item => `
      <div class="timeline-stop">
        <div class="stop-marker"></div>
        <div class="stop-time">${item.time}</div>
        <div class="stop-info">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Render attire suggestions
  const attireTitle = document.getElementById('attireTitle');
  if (attireTitle) attireTitle.innerText = data.event.attireTitle || "Dress Code";

  const attireDetails = document.getElementById('attireDetails');
  if (attireDetails) attireDetails.innerText = data.event.attireDetails;

  // Render FAQs
  const faqsContainer = document.getElementById('faqsContainer');
  if (faqsContainer && data.faqs) {
    faqsContainer.innerHTML = data.faqs.map(faq => `
      <div class="faq-card">
        <button class="faq-question">
          <span>${faq.question}</span>
          <i class="fas fa-plus"></i>
        </button>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join('');
  }

  // Render footer
  const footerText = document.getElementById('footerText');
  if (footerText) footerText.innerHTML = `${data.couple.bride} &amp; ${data.couple.groom} — Kochi, 2027`;

  // Render labels
  if (data.labels) {
    const scrollPrompt = document.getElementById('scrollPrompt');
    if (scrollPrompt) scrollPrompt.innerText = data.labels.scrollPrompt;

    const keepScrolling = document.getElementById('keepScrolling');
    if (keepScrolling) keepScrolling.innerText = data.labels.keepScrolling;

    const countdownTag = document.getElementById('countdownTag');
    if (countdownTag) countdownTag.innerText = data.labels.countdownTag;

    const countdownHeading = document.getElementById('countdownHeading');
    if (countdownHeading) countdownHeading.innerText = data.labels.countdownHeading;

    const sectionTag = document.getElementById('sectionTag');
    if (sectionTag) sectionTag.innerText = data.labels.eventTag;

    const itineraryTitle = document.getElementById('itineraryTitle');
    if (itineraryTitle) itineraryTitle.innerText = data.labels.itineraryTitle;

    const faqTag = document.getElementById('faqTag');
    if (faqTag) faqTag.innerText = data.labels.faqTag;

    const faqTitle = document.getElementById('faqTitle');
    if (faqTitle) faqTitle.innerText = data.labels.faqTitle;
  }
}

/* ==========================================
   1. AUDIO CONTROLLER (Melodic Flute)
   ========================================== */
const bgMusic = document.getElementById('bgMusic');
const audioToggle = document.getElementById('audioToggle');
let isPlaying = false;
let userInteracted = false;

function initAudio() {
  if (!audioToggle || !bgMusic) return;

  audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  audioToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMusic();
    }
  });

  // Automatically start music on first scroll or touch
  const triggerAutoPlay = () => {
    if (!userInteracted) {
      userInteracted = true;
      playMusic();
      removeListeners();
    }
  };

  window.addEventListener('scroll', triggerAutoPlay, { passive: true });
  window.addEventListener('touchstart', triggerAutoPlay, { passive: true });

  function removeListeners() {
    window.removeEventListener('scroll', triggerAutoPlay);
    window.removeEventListener('touchstart', triggerAutoPlay);
  }
}

function toggleMusic() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  if (!bgMusic) return;
  bgMusic.play()
    .then(() => {
      audioToggle.innerHTML = '<i class="fas fa-pause"></i>';
      audioToggle.classList.add('playing');
      isPlaying = true;
    })
    .catch((err) => {
      console.warn("Audio play blocked by browser policy. Waiting for scroll.", err);
    });
}

function pauseMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  audioToggle.innerHTML = '<i class="fas fa-play"></i>';
  audioToggle.classList.remove('playing');
  isPlaying = false;
}

/* ==========================================
   2. SCROLL REVEAL CURTAIN ENGINE
   ========================================== */
function initCoconutReveal() {
  const overlay = document.getElementById('coconut-overlay');
  const leftLeaf = document.querySelector('.leaf-left');
  const rightLeaf = document.querySelector('.leaf-right');
  const overlayText = document.querySelector('.overlay-text');

  if (!overlay || !leftLeaf || !rightLeaf) return;

  function onScroll() {
    const scrollY = window.scrollY;
    
    // Calculate scroll progress (0 to 1) over a small scroll distance
    const revealDistance = window.innerWidth < 600 ? 180 : 320;
    const progress = Math.min(scrollY / revealDistance, 1);

    // Slide left panel to the left, right panel to the right
    leftLeaf.style.transform = `translateX(-${progress * 100}%)`;
    rightLeaf.style.transform = `translateX(${progress * 100}%)`;

    // Fade out overlay text
    if (overlayText) {
      overlayText.style.opacity = String(1 - progress * 1.5);
      overlayText.style.transform = `translate(-50%, -50%) scale(${1 - progress * 0.1})`;
    }

    // Disable interaction with overlay once fully parted
    if (progress >= 1) {
      overlay.style.pointerEvents = 'none';
      overlay.style.visibility = 'hidden';
    } else {
      overlay.style.pointerEvents = 'auto';
      overlay.style.visibility = 'visible';
    }
  }

  // Bind scroll event
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Run once initially
  onScroll();
}

/* ==========================================
   3. COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
  const dateStr = (window.weddingData && window.weddingData.event && window.weddingData.event.dateTimeString) || "2027-01-18T10:00:00";
  
  let targetDate = new Date(dateStr).getTime();
  
  // Fallback for older browsers or Safari parsing differences
  if (isNaN(targetDate)) {
    const cleaned = dateStr.replace(/-/g, '/').replace('T', ' ');
    targetDate = new Date(cleaned).getTime();
  }
  
  // Hard fallback to Jan 18, 2027
  if (isNaN(targetDate)) {
    targetDate = new Date(2027, 0, 18, 10, 0, 0).getTime();
  }

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      const container = document.querySelector('.countdown-row');
      if (container) {
        container.innerHTML = "<p class='box-tag' style='color:var(--palm-green); font-weight:600;'>The Celebration has Begun!</p>";
      }
      clearInterval(interval);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.innerText = String(d).padStart(2, '0');
    if (hEl) hEl.innerText = String(h).padStart(2, '0');
    if (mEl) mEl.innerText = String(m).padStart(2, '0');
    if (sEl) sEl.innerText = String(s).padStart(2, '0');
  }

  update();
  const interval = setInterval(update, 1000);
}

/* ==========================================
   4. SAVE THE DATE CALENDAR (.ICS GENERATION)
   ========================================== */
function initSaveDate() {
  const btn = document.getElementById('btnSaveDate');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const data = window.weddingData || {
      couple: { bride: "Anjali", groom: "Madhav" },
      event: {
        venueName: "Bhaskareeyam Lake View",
        venueAddress: "Elamakkara, Kochi, Kerala, India",
        calendarStart: "20270118T100000",
        calendarEnd: "20270118T180000"
      }
    };
    const calendarEvent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:' + window.location.href,
      `DTSTART:${data.event.calendarStart}`,
      `DTEND:${data.event.calendarEnd}`,
      `SUMMARY:${data.couple.bride} & ${data.couple.groom} Wedding Celebration`,
      `DESCRIPTION:Wedding Celebration of ${data.couple.bride} & ${data.couple.groom} at ${data.event.venueName}.`,
      `LOCATION:${data.event.venueName}, ${data.event.venueAddress}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${data.couple.bride}_${data.couple.groom}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

/* ==========================================
   5. GIFT REGISTRY CONTRIBUTION ACTION (Defensive placeholder)
   ========================================== */
function initRegistry() {
  const buttons = document.querySelectorAll('.registry-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const fundName = e.target.getAttribute('data-fund');
      showToastNotification(`Nandi! Thank you so much for contributing to our ${fundName}!`);
    });
  });
}

function showToastNotification(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 600);
  }, 4000);
}

/* ==========================================
   6. FAQ ACCORDIONS
   ========================================== */
function initFaqs() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const card = q.parentElement;
      const answer = card.querySelector('.faq-answer');
      const isActive = card.classList.contains('active');

      // Collapse all FAQ items
      document.querySelectorAll('.faq-card').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = '0px';
      });

      if (!isActive) {
        card.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================
   7. RSVP STATE MANAGEMENT (Defensive fallback if needed)
   ========================================== */
function initRsvp() {
  // Purged to keep template static
}

/* ==========================================
   8. SCROLL TRIGGERS (FADE-UP ANIMATIONS)
   ========================================== */
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.journal-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(35px)';
    el.style.transition = 'opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1), transform 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
    observer.observe(el);
  });
}
