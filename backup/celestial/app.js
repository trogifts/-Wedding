document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. THREE.JS 3D ENVELOPE UNBOXING ENGINE
     ========================================== */
  const unboxingContainer = document.getElementById('unboxing-container');
  const canvas3dDiv = document.getElementById('canvas3d');
  const unboxingUi = document.getElementById('unboxingUi');
  const mainContent = document.getElementById('main-content');
  
  let scene, camera, renderer;
  let envelopeGroup, topFlapPivot, innerCard, waxSeal, starField;
  let raycaster, mouse;
  let isUnboxed = false;
  
  function initUnboxingScene() {
    if (!window.THREE || !window.gsap) return;
    
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
    
    // Interaction Setup
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    window.addEventListener('resize', handleResize);
    
    // Click anywhere on the unboxing overlay to trigger unboxing
    unboxingContainer.addEventListener('click', () => { triggerUnbox(); });
    unboxingContainer.addEventListener('touchstart', () => { triggerUnbox(); }, {passive: true});
    
    animateScene();
  }
  
  function adjustCameraZoom() {
    if (!camera) return;
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
    if (!camera || !renderer) return;
    camera.aspect = canvas3dDiv.clientWidth / canvas3dDiv.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas3dDiv.clientWidth, canvas3dDiv.clientHeight);
    adjustCameraZoom();
    adjustEnvelopeScale();
  }
  
  function triggerUnbox() {
    if (isUnboxed) return;
    
    isUnboxed = true;
    unboxingUi.style.opacity = '0';
    
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
    unboxingContainer.classList.add('unboxed');
    mainContent.classList.remove('content-hidden');
    mainContent.classList.add('visible');
    
    if (!isPlaying) toggleAudio();
    
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
    
    renderer.render(scene, camera);
  }
  
  initUnboxingScene();


  /* ==========================================
     2. AUDIO PLAYER
     ========================================== */
  const audioToggle = document.getElementById('audioToggle');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;
  
  audioToggle.addEventListener('click', toggleAudio);

  function toggleAudio() {
    if (isPlaying) {
      bgMusic.pause();
      audioToggle.classList.remove('playing');
      audioToggle.innerHTML = '<i class="fas fa-play"></i>';
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        audioToggle.classList.add('playing');
        audioToggle.innerHTML = '<i class="fas fa-compact-disc"></i>';
        isPlaying = true;
      }).catch(err => {
        console.log("Audio play blocked by browser.");
      });
    }
  }


  /* ==========================================
     3. SCROLL FADE-UP OBSERVER
     ========================================== */
  const animatedElements = document.querySelectorAll('.fade-up');
  
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


  /* ==========================================
     4. SAVE THE DATE & RSVP LOGIC
     ========================================== */
  const btnSaveDate = document.getElementById('btnSaveDate');
  btnSaveDate.addEventListener('click', () => {
    const title = encodeURIComponent("Aria & Ethan's Wedding");
    const details = encodeURIComponent("You are cordially invited to celebrate our wedding.");
    const location = encodeURIComponent("Grand Palace Garden, 100 Luxury Estates Dr, San Francisco, CA");
    const dates = "20261128T160000/20261129T000000";
    
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&sf=true&output=xml`;
    window.open(gCalUrl, '_blank');
  });

  // RSVP Form
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');
  const successMessage = document.getElementById('successMessage');
  const btnEditRsvp = document.getElementById('btnEditRsvp');
  const mealGroup = document.getElementById('mealGroup');
  
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'yes') {
        mealGroup.style.display = 'block';
      } else {
        mealGroup.style.display = 'none';
      }
    });
  });

  function checkExistingRsvp() {
    const savedRsvp = localStorage.getItem('weddingRsvp_V2');
    if (savedRsvp) {
      const data = JSON.parse(savedRsvp);
      
      document.getElementById('guestName').value = data.name;
      document.getElementById('guestEmail').value = data.email;
      
      const attendanceRadio = document.querySelector(`input[name="attendance"][value="${data.attendance}"]`);
      if (attendanceRadio) {
        attendanceRadio.checked = true;
        if (data.attendance === 'yes') {
          mealGroup.style.display = 'block';
          document.getElementById('mealPreference').value = data.meal || 'beef';
        } else {
          mealGroup.style.display = 'none';
        }
      }
      
      if (data.attendance === 'yes') {
        successMessage.innerHTML = `${data.name}, your presence is gratefully confirmed for November 28th.`;
      } else {
        successMessage.innerHTML = `${data.name}, we have received your regrets. You will be missed.`;
      }
      
      rsvpForm.style.display = 'none';
      rsvpSuccess.style.display = 'block';
    }
  }

  checkExistingRsvp();
  
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const meal = attendance === 'yes' ? document.getElementById('mealPreference').value : '';
    
    const rsvpData = { name, email, attendance, meal, timestamp: new Date().getTime() };
    
    localStorage.setItem('weddingRsvp_V2', JSON.stringify(rsvpData));
    checkExistingRsvp();
  });
  
  btnEditRsvp.addEventListener('click', () => {
    rsvpSuccess.style.display = 'none';
    rsvpForm.style.display = 'block';
  });

  /* ==========================================
     5. NEW UPGRADED COMPONENTS LOGIC
     ========================================== */
  
  // COUNTDOWN TIMER
  function initCountdown() {
    const weddingDate = new Date('November 28, 2026 16:00:00').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      
      if (distance < 0) {
        clearInterval(intervalId);
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
    const intervalId = setInterval(updateCountdown, 1000);
  }

  // FAQ ACCORDION
  function initFaqs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        const answer = question.nextElementSibling;
        const isActive = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
          faqItem.classList.remove('active');
          faqItem.querySelector('.faq-answer').style.maxHeight = null;
        });
        
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // GIFT REGISTRY TOAST NOTIFICATION
  function initRegistry() {
    const registryButtons = document.querySelectorAll('.registry-btn');
    registryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const fundName = e.target.getAttribute('data-fund');
        showToast(`Thank you so much for contributing to our ${fundName}!`);
      });
    });
  }
  
  function showToast(message) {
    // Remove existing toast if present
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '40px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.background = 'rgba(14, 16, 24, 0.95)';
    toast.style.border = '1px solid var(--accent-gold)';
    toast.style.padding = '15px 30px';
    toast.style.borderRadius = '30px';
    toast.style.color = 'var(--text-main)';
    toast.style.fontFamily = 'var(--font-sans)';
    toast.style.fontSize = '0.75rem';
    toast.style.letterSpacing = '1px';
    toast.style.textTransform = 'uppercase';
    toast.style.boxShadow = '0 10px 30px rgba(223, 176, 122, 0.2)';
    toast.style.zIndex = '1000';
    toast.style.transition = 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease';
    toast.style.opacity = '0';
    toast.innerText = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    }, 50);
    
    // Animate out
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(() => {
        toast.remove();
      }, 600);
    }, 3500);
  }

  // Initialize
  initCountdown();
  initFaqs();
  initRegistry();

});
