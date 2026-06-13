/**
 * Aria & Ethan — Celestial Luxury Wedding Invitation
 * Clean, modular, client-side dynamic data-driven template with 3D unboxing engine.
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("celestial template DOM Loaded - Processing data...");

  // 1. Process date/time configurations
  processWeddingData();

  // 2. Render all dynamic elements
  renderData();

  // 3. Initialize unboxing scene
  initUnboxingScene();

  // 4. Initialize audio player
  initAudioPlayer();

  // 5. Initialize countdown timer
  initCountdown();

  // 6. Initialize FAQ accordion
  initFaqs();

  // 7. Initialize scroll fade-up animations
  setupScrollAnimations();
});

/* ==========================================
   DATE & TIME PRE-PROCESSOR
   ========================================== */
function processWeddingData() {
  const data = window.weddingData;
  if (!data || !data.event) return;

  const dateVal = data.event.date || "2026-11-28";
  const timeVal = data.event.time || "04:00 PM";

  // Helper to convert 12h time ("04:00 PM") to 24h format ("16:00:00")
  function parseTime24h(t) {
    const match = t.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return "16:00:00";
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
    if (isNaN(dateObj)) return "November 28, 2026";
    return dateObj.toLocaleDateString('en-US', {
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
  if (metaTitle) metaTitle.innerText = `${data.couple.bride} & ${data.couple.groom} — Wedding Invitation`;

  // Header Details
  const preTitle = document.getElementById('preTitle');
  if (preTitle) preTitle.innerText = data.labels.preTitle;

  const mainTitle = document.getElementById('mainTitle');
  if (mainTitle) mainTitle.innerText = `${data.couple.bride} & ${data.couple.groom}`;

  const dateTitle = document.getElementById('dateTitle');
  if (dateTitle) dateTitle.innerText = data.event.dateFormatted;

  // Countdown Labels
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

  // Couple Bios names
  const brideName = document.getElementById('brideName');
  if (brideName) brideName.innerText = data.couple.bride;

  const brideRole = document.getElementById('brideRole');
  if (brideRole) brideRole.innerText = data.labels.brideRole;

  const groomName = document.getElementById('groomName');
  if (groomName) groomName.innerText = data.couple.groom;

  const groomRole = document.getElementById('groomRole');
  if (groomRole) groomRole.innerText = data.labels.groomRole;

  // Itinerary
  const itineraryHeading = document.getElementById('itineraryHeading');
  if (itineraryHeading) itineraryHeading.innerText = data.labels.itineraryHeading;

  const goldCrest = document.getElementById('goldCrest');
  if (goldCrest) goldCrest.innerText = data.couple.crest;

  const venueName = document.getElementById('venueName');
  if (venueName) venueName.innerText = data.event.venueName;

  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.innerText = data.event.venueAddress;

  const btnSaveDate = document.getElementById('btnSaveDate');
  if (btnSaveDate) {
    btnSaveDate.innerText = data.labels.saveDateButton;
    btnSaveDate.addEventListener('click', () => {
      const title = encodeURIComponent(data.event.calendarTitle);
      const details = encodeURIComponent(data.event.calendarDetails);
      const location = encodeURIComponent(`${data.event.venueName}, ${data.event.venueAddress}`);
      const dates = data.event.calendarDates;
      
      const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
      window.open(gCalUrl, '_blank');
    });
  }

  // Render Schedule
  const scheduleContainer = document.getElementById('schedule');
  if (scheduleContainer && data.itinerary) {
    scheduleContainer.innerHTML = data.itinerary.map(item => `
      <div class="schedule-item">
          <div class="time">${item.time}</div>
          <div class="event">
              <h4>${item.title}</h4>
              <p>${item.desc}</p>
          </div>
      </div>
    `).join('');
  }

  // Dress Code
  const dressCodeLabel = document.getElementById('dressCodeLabel');
  if (dressCodeLabel) dressCodeLabel.innerText = data.labels.dressCodeLabel;

  const dressCodeValue = document.getElementById('dressCodeValue');
  if (dressCodeValue) dressCodeValue.innerText = data.labels.dressCodeValue;

  // FAQ Accordion
  const faqHeading = document.getElementById('faqHeading');
  if (faqHeading) faqHeading.innerText = data.labels.faqHeading;

  const faqAccordion = document.getElementById('faqAccordion');
  if (faqAccordion && data.faqs) {
    faqAccordion.innerHTML = data.faqs.map(item => `
      <div class="faq-item">
          <button class="faq-question">
              <span>${item.q}</span>
              <i class="fas fa-chevron-down"></i>
          </button>
          <div class="faq-answer">
              <p>${item.a}</p>
          </div>
      </div>
    `).join('');
  }

  // Footer text
  const footerText = document.getElementById('footerText');
  if (footerText) footerText.innerHTML = `<p>${data.couple.monogram}</p>`;
}

/* ==========================================
   1. THREE.JS 3D ENVELOPE UNBOXING ENGINE
   ========================================== */
let scene, camera, renderer;
let envelopeGroup, topFlapPivot, innerCard, waxSeal, starField;
let isUnboxed = false;

function initUnboxingScene() {
  const unboxingContainer = document.getElementById('unboxing-container');
  const canvas3dDiv = document.getElementById('canvas3d');
  const unboxingUi = document.getElementById('unboxingUi');
  
  if (!unboxingContainer || !canvas3dDiv || !window.THREE || !window.gsap) return;
  
  // Setup Scene
  scene = new THREE.Scene();
  
  // Setup Camera (Adjust default z based on mobile)
  camera = new THREE.PerspectiveCamera(45, canvas3dDiv.clientWidth / canvas3dDiv.clientHeight, 0.1, 100);
  adjustCameraZoom();
  
  // Setup Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas3dDiv.clientWidth, canvas3dDiv.clientHeight);
  canvas3dDiv.appendChild(renderer.domElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);
  
  const dirLight1 = new THREE.DirectionalLight(0xffdfb0, 1.8); // warm gold highlight
  dirLight1.position.set(5, 10, 8);
  scene.add(dirLight1);
  
  const dirLight2 = new THREE.DirectionalLight(0xffb5c5, 0.85); // rose secondary fill
  dirLight2.position.set(-6, -4, 4);
  scene.add(dirLight2);
  
  // 3D Stardust Particle Field (Inside the unboxing scene)
  const starGeom = new THREE.BufferGeometry();
  const starCount = 100;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 12;
    starPositions[i+1] = (Math.random() - 0.5) * 12;
    starPositions[i+2] = (Math.random() - 0.5) * 12;
  }
  starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  
  const starMat = new THREE.PointsMaterial({
    color: 0xdfb07a,
    size: 0.045,
    transparent: true,
    opacity: 0.55
  });
  starField = new THREE.Points(starGeom, starMat);
  scene.add(starField);
  
  // Build Envelope Group
  envelopeGroup = new THREE.Group();
  adjustEnvelopeScale();
  scene.add(envelopeGroup);
  
  const envWidth = 4.2;
  const envHeight = 2.8;
  
  // Materials
  // Rich Midnight Blue/Obsidian cardstock paper for the envelope
  const paperMat = new THREE.MeshStandardMaterial({ 
    color: 0x141624, 
    roughness: 0.85,
    metalness: 0.2,
    side: THREE.DoubleSide
  });
  
  // White/Ivory wedding invite card sliding out
  const cardMat = new THREE.MeshStandardMaterial({
    color: 0xfaf9f6,
    roughness: 0.75,
    metalness: 0.1
  });
  
  // Metallic Gold Seal
  const waxMat = new THREE.MeshStandardMaterial({
    color: 0xdfb07a,
    roughness: 0.2,
    metalness: 0.85
  });
  
  // 1. Envelope Back (Inside)
  const envBack = new THREE.Mesh(new THREE.PlaneGeometry(envWidth, envHeight), paperMat);
  envBack.position.z = -0.02;
  envelopeGroup.add(envBack);
  
  // 2. Inner Card
  innerCard = new THREE.Mesh(new THREE.PlaneGeometry(envWidth - 0.3, envHeight - 0.2), cardMat);
  innerCard.position.z = -0.01;
  envelopeGroup.add(innerCard);
  
  // 3. Front Bottom Flap
  const bottomFlapShape = new THREE.Shape();
  bottomFlapShape.moveTo(-envWidth/2, -envHeight/2);
  bottomFlapShape.lineTo(envWidth/2, -envHeight/2);
  bottomFlapShape.lineTo(0, 0.25);
  bottomFlapShape.lineTo(-envWidth/2, -envHeight/2);
  const bottomFlap = new THREE.Mesh(new THREE.ShapeGeometry(bottomFlapShape), paperMat);
  bottomFlap.position.z = 0.01;
  envelopeGroup.add(bottomFlap);
  
  // 4. Front Side Flaps
  const leftFlapShape = new THREE.Shape();
  leftFlapShape.moveTo(-envWidth/2, -envHeight/2);
  leftFlapShape.lineTo(0, 0.25);
  leftFlapShape.lineTo(-envWidth/2, envHeight/2);
  const leftFlap = new THREE.Mesh(new THREE.ShapeGeometry(leftFlapShape), paperMat);
  leftFlap.position.z = 0.015;
  envelopeGroup.add(leftFlap);
  
  const rightFlapShape = new THREE.Shape();
  rightFlapShape.moveTo(envWidth/2, -envHeight/2);
  rightFlapShape.lineTo(0, 0.25);
  rightFlapShape.lineTo(envWidth/2, envHeight/2);
  const rightFlap = new THREE.Mesh(new THREE.ShapeGeometry(rightFlapShape), paperMat);
  rightFlap.position.z = 0.015;
  envelopeGroup.add(rightFlap);
  
  // 5. Top Flap (Hinged at the top edge)
  topFlapPivot = new THREE.Group();
  topFlapPivot.position.y = envHeight/2;
  topFlapPivot.position.z = 0.02;
  envelopeGroup.add(topFlapPivot);
  
  const topFlapShape = new THREE.Shape();
  topFlapShape.moveTo(-envWidth/2, 0);
  topFlapShape.lineTo(envWidth/2, 0);
  topFlapShape.lineTo(0, -envHeight/1.6);
  const topFlap = new THREE.Mesh(new THREE.ShapeGeometry(topFlapShape), paperMat);
  topFlapPivot.add(topFlap);
  
  // 6. Wax Seal
  waxSeal = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.04, 32), waxMat);
  waxSeal.rotation.x = Math.PI / 2;
  waxSeal.position.y = -0.4;
  waxSeal.position.z = 0.01;
  topFlapPivot.add(waxSeal);
  
  // Initial tilted orientation
  envelopeGroup.rotation.x = 0.12;
  envelopeGroup.rotation.y = -0.18;
  
  envelopeGroup.userData.time = 0;
  
  window.addEventListener('resize', handleResize);
  
  // Click anywhere on the unboxing overlay to trigger unboxing
  unboxingContainer.addEventListener('click', () => { triggerUnbox(); });
  unboxingContainer.addEventListener('touchstart', () => { triggerUnbox(); }, {passive: true});
  
  animateScene();
}

function adjustCameraZoom() {
  if (!camera || !canvas3dDiv) return;
  // Zoom out on mobile/vertical screens to fit envelope without clipping
  if (window.innerWidth < 500) {
    camera.position.z = 8.5; // wider camera field
  } else if (window.innerWidth < 800) {
    camera.position.z = 7.0;
  } else {
    camera.position.z = 5.5; // closer on desktop
  }
}

function adjustEnvelopeScale() {
  if (!envelopeGroup) return;
  // Scale envelope down slightly on mobile to guarantee it shows up beautifully
  if (window.innerWidth < 500) {
    envelopeGroup.scale.setScalar(0.82);
  } else {
    envelopeGroup.scale.setScalar(1.0);
  }
}

function handleResize() {
  const canvas3dDiv = document.getElementById('canvas3d');
  if (!camera || !renderer || !canvas3dDiv) return;
  camera.aspect = canvas3dDiv.clientWidth / canvas3dDiv.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas3dDiv.clientWidth, canvas3dDiv.clientHeight);
  adjustCameraZoom();
  adjustEnvelopeScale();
}

function triggerUnbox() {
  if (isUnboxed) return;
  
  isUnboxed = true;
  const unboxingUi = document.getElementById('unboxingUi');
  if (unboxingUi) unboxingUi.style.opacity = '0';
  
  const tl = gsap.timeline({
    onComplete: showMainContent
  });
  
  // 1. Straighten envelope
  tl.to(envelopeGroup.rotation, {
    x: 0,
    y: 0,
    z: 0,
    duration: 0.7,
    ease: "power2.inOut"
  }, 0);
  
  // 2. Shrink/break wax seal
  tl.to(waxSeal.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 0.4,
    ease: "back.in(2.5)"
  }, 0.4);
  
  // 3. Open top flap hinge
  tl.to(topFlapPivot.rotation, {
    x: Math.PI * 0.88,
    duration: 0.9,
    ease: "power2.inOut"
  }, 0.8);
  
  // 4. Slide card out
  tl.to(innerCard.position, {
    y: 1.8,
    z: 0.05,
    duration: 1.1,
    ease: "power2.out"
  }, 1.4);
  
  // 5. Dive camera in
  tl.to(envelopeGroup.position, {
    y: -3.5,
    z: 4.5,
    duration: 1.4,
    ease: "power2.inOut"
  }, 2.0);
}

function showMainContent() {
  const unboxingContainer = document.getElementById('unboxing-container');
  const mainContent = document.getElementById('main-content');
  if (unboxingContainer) unboxingContainer.classList.add('unboxed');
  if (mainContent) {
    mainContent.classList.remove('content-hidden');
    mainContent.classList.add('visible');
  }
  
  // Auto trigger audio play on unboxing
  const bgMusic = document.getElementById('bgMusic');
  const audioToggle = document.getElementById('audioToggle');
  if (bgMusic && audioToggle && bgMusic.paused) {
    bgMusic.play().then(() => {
      audioToggle.classList.add('playing');
      audioToggle.innerHTML = '<i class="fas fa-compact-disc"></i>';
    }).catch(err => {
      console.log("Audio play blocked by browser.");
    });
  }
  
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
}

function animateScene() {
  requestAnimationFrame(animateScene);
  
  // Gentle floating loop
  if (!isUnboxed && envelopeGroup) {
    envelopeGroup.userData.time += 0.015;
    envelopeGroup.position.y = Math.sin(envelopeGroup.userData.time) * 0.12;
  }
  
  // Rotate stardust particles
  if (starField) {
    starField.rotation.y += 0.0007;
    starField.rotation.x += 0.0002;
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

/* ==========================================
   2. AUDIO PLAYER
   ========================================== */
function initAudioPlayer() {
  const audioToggle = document.getElementById('audioToggle');
  const bgMusic = document.getElementById('bgMusic');
  if (!audioToggle || !bgMusic) return;

  audioToggle.addEventListener('click', () => {
    if (!bgMusic.paused) {
      bgMusic.pause();
      audioToggle.classList.remove('playing');
      audioToggle.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      bgMusic.play().then(() => {
        audioToggle.classList.add('playing');
        audioToggle.innerHTML = '<i class="fas fa-compact-disc"></i>';
      }).catch(err => {
        console.log("Audio play blocked by browser.");
      });
    }
  });
}

/* ==========================================
   3. SCROLL REVEAL OBSERVER
   ========================================== */
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up');
  
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(el => {
      scrollObserver.observe(el);
    });
  } else {
    // Fallback
    function revealOnScroll() {
      const triggerDepth = (window.innerHeight / 10) * 8.5;
      animatedElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerDepth) {
          el.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
  }
}

/* ==========================================
   4. COUNTDOWN TIMER
   ========================================== */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  const dateStr = (window.weddingData && window.weddingData.event && window.weddingData.event.dateTimeString) || '2026-11-28T16:00:00';
  let weddingDate = new Date(dateStr).getTime();

  // Fallback for older browsers
  if (isNaN(weddingDate)) {
      const cleaned = dateStr.replace(/-/g, '/').replace('T', ' ');
      weddingDate = new Date(cleaned).getTime();
  }
  if (isNaN(weddingDate)) {
      weddingDate = new Date(2026, 10, 28, 16, 0, 0).getTime();
  }
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
      if (daysEl) daysEl.innerHTML = "00";
      if (hoursEl) hoursEl.innerHTML = "00";
      if (minsEl) minsEl.innerHTML = "00";
      if (secsEl) secsEl.innerHTML = "00";
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
    if (minsEl) minsEl.innerHTML = minutes.toString().padStart(2, '0');
    if (secsEl) secsEl.innerHTML = seconds.toString().padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==========================================
   5. FAQ ACCORDION
   ========================================== */
function initFaqs() {
  // Use event delegation on faqAccordion
  const faqAccordion = document.getElementById('faqAccordion');
  if (!faqAccordion) return;

  faqAccordion.addEventListener('click', (e) => {
    const question = e.target.closest('.faq-question');
    if (question) {
      const item = question.parentElement;
      const answer = question.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
        const ans = faqItem.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });
      
      if (!isActive && item && answer) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    }
  });
}
