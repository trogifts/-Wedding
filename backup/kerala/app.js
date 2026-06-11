/**
 * ANJALI & MADHAV - SECULAR KERALA STYLE COCONUT CURTAIN WEDDING WEBSITE JS
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Loaded - Initializing modules...");
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
   AUDIO CONTROLLER (Melodic Flute)
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
   SCROLL REVEAL CURTAIN ENGINE
   ========================================== */
function initCoconutReveal() {
  const overlay = document.getElementById('coconut-overlay');
  const leftLeaf = document.querySelector('.leaf-left');
  const rightLeaf = document.querySelector('.leaf-right');
  const overlayText = document.querySelector('.overlay-text');

  if (!overlay || !leftLeaf || !rightLeaf) return;

  function onScroll() {
    const scrollY = window.scrollY;
    const winHeight = window.innerHeight;
    
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
   COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
  // Target date: January 18, 2027 at 9:00 AM
  const targetDate = new Date("January 18, 2027 09:00:00").getTime();

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
   SAVE THE DATE CALENDAR (.ICS GENERATION)
   ========================================== */
function initSaveDate() {
  const btn = document.getElementById('btnSaveDate');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const calendarEvent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:' + window.location.href,
      'DTSTART:20270118T033000Z', // UTC start: 9:00 AM IST (Jan 18, 2027)
      'DTEND:20270118T103000Z',   // UTC end: 4:00 PM IST (Jan 18, 2027)
      'SUMMARY:Anjali & Madhav Wedding Celebration',
      'DESCRIPTION:Wedding Celebration of Anjali & Madhav at Bhaskareeyam Lake View.',
      'LOCATION:Bhaskareeyam Lake View, Elamakkara, Kochi, Kerala, India',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Anjali_Madhav_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

/* ==========================================
   GIFT REGISTRY CONTRIBUTION ACTION
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
   FAQ ACCORDIONS
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
   RSVP STATE MANAGEMENT (LOCAL STORAGE)
   ========================================== */
function initRsvp() {
  const form = document.getElementById('rsvpForm');
  const successBlock = document.getElementById('rsvpSuccess');
  const successMsg = document.getElementById('successMessage');
  const editBtn = document.getElementById('btnEditRsvp');

  // Check if RSVP is already saved in LocalStorage
  const savedRsvp = localStorage.getItem('keralaWeddingRsvp');
  if (savedRsvp) {
    const data = JSON.parse(savedRsvp);
    showSuccessState(data.name, data.attendance);
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName').value;
      const email = document.getElementById('guestEmail').value;
      const attendance = form.elements['attendance'].value;
      const meal = document.getElementById('mealPreference').value;

      const rsvpData = { name, email, attendance, meal };
      localStorage.setItem('keralaWeddingRsvp', JSON.stringify(rsvpData));

      showSuccessState(name, attendance);
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      if (form && successBlock) {
        successBlock.style.display = 'none';
        form.style.display = 'block';
      }
    });
  }

  function showSuccessState(name, attendance) {
    if (!form || !successBlock || !successMsg) return;

    form.style.display = 'none';
    successBlock.style.display = 'block';

    if (attendance === 'yes') {
      successMsg.innerText = `Thank you, ${name}! We are honored and joyed to have you join us at our celebration. See you in Kochi!`;
    } else {
      successMsg.innerText = `Thank you, ${name}. We are sorry that you cannot attend the celebration, but we appreciate your warm thoughts from afar.`;
    }
  }
}

/* ==========================================
   SCROLL TRIGGERS (FADE-UP ANIMATIONS)
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
