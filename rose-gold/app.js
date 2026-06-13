/**
 * Sophia & Alexander - Rose Gold Minimalist Wedding Website Script
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Rose Gold template initialized.");
  
  initAudio();
  initCountdown();
  initSaveDate();
  initFaqs();
  setupScrollAnimations();
});

/* ==========================================
   1. AUDIO CONTROLLER
   ========================================== */
function initAudio() {
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  let isPlaying = false;
  let hasInteracted = false;

  if (!musicToggle || !bgMusic) return;

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  const triggerAutoPlay = () => {
    if (!hasInteracted) {
      hasInteracted = true;
      playMusic();
      removeListeners();
    }
  };

  // Autoplay on scroll/touch if allowed by browser
  window.addEventListener('scroll', triggerAutoPlay, { passive: true });
  window.addEventListener('touchstart', triggerAutoPlay, { passive: true });

  function removeListeners() {
    window.removeEventListener('scroll', triggerAutoPlay);
    window.removeEventListener('touchstart', triggerAutoPlay);
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  function playMusic() {
    bgMusic.play()
      .then(() => {
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.classList.add('playing');
        isPlaying = true;
      })
      .catch((err) => {
        console.warn("Audio play blocked by browser policy.", err);
      });
  }

  function pauseMusic() {
    bgMusic.pause();
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    musicToggle.classList.remove('playing');
    isPlaying = false;
  }
}

/* ==========================================
   2. COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
  // Target: January 23, 2027 at 4:00 PM PST (UTC-8)
  // Let's set it in a standardized parser-friendly format
  const targetDate = new Date("January 23, 2027 16:00:00 PST").getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      const grid = document.querySelector('.countdown-grid');
      if (grid) {
        grid.innerHTML = "<p style='font-family:var(--font-serif); font-size:1.8rem; color:var(--rose-gold-base);'>The Celebration Has Begun!</p>";
      }
      clearInterval(timerInterval);
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

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

/* ==========================================
   3. SAVE THE DATE (.ICS DOWNLOADER)
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
      'DTSTART:20270124T000000Z', // 4:00 PM PST is 12:00 AM UTC (Jan 24)
      'DTEND:20270124T060000Z',   // 6 hours duration
      'SUMMARY:Sophia & Alexander Wedding Celebration',
      'DESCRIPTION:Join us for the wedding celebration of Sophia & Alexander at Auberge du Soleil.',
      'LOCATION:Auberge du Soleil Estate, 180 Rutherford Hill Rd, Rutherford, CA',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Sophia_Alexander_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

/* ==========================================
   4. FAQ ACCORDIONS
   ========================================== */
function initFaqs() {
  const questions = document.querySelectorAll('.faq-question');
  
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Collapse all FAQ items first
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = '0px';
      });

      // Expand clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================
   5. SCROLL TRIGGERS (FADE-UP)
   ========================================== */
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    observer.observe(el);
  });
}
