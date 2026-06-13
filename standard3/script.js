/**
 * standard3 - Watercolor Art Wedding Invitation Template Client Logic
 * Handles reveal cover, personalized guest welcoming, music player toggles,
 * swipeable polaroid decks, canvas paint palette splats, local wishes,
 * and a canvas/HTML butterfly flutter generator.
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. CONFIGURATION & CORE STATE
    // ==========================================
    
    // Target Wedding Date: September 10, 2026 at 10:30 AM IST
    const weddingDate = new Date("September 10, 2026 10:30:00").getTime();
    
    // Polaroid Gallery Metadata
    const galleryItems = [
        { title: "The Promise", desc: "Two hearts bound by a promise of a lifetime." },
        { title: "Our Story", desc: "A journey of shared dreams, laughter, and sunsets." },
        { title: "Sneha Walk", desc: "Walking side-by-side along the peaceful waters." }
    ];
    
    // Wishes Sticky Notes Default Seeds
    const defaultWishes = [
        { sender: "Anjali & Rohit", text: "May your lives be painted with the most vibrant colors of love and happiness! Congratulations!" },
        { sender: "Siddharth", text: "Wishing Zayn and Aara a beautiful scrapbook of lifetime memories. Can't wait to celebrate!" },
        { sender: "Meera Nair", text: "Such a beautiful handcrafted invitation. Wishing the lovely couple a golden future together! 🌸" }
    ];

    // Paint Splat Color Palette Mapping
    const colorSplats = {
        "well-blush": "#FFD1DC",
        "well-lavender": "#E8DFF5",
        "well-blue": "#E2ECEF",
        "well-green": "#D7E7DE",
        "well-peach": "#FCE1D4",
        "well-gold": "#D4AF37"
    };

    const paletteQuotes = [
        "Thank you for painting our world with love! 🎨",
        "May our wedding day be as vibrant as this splash! 🌸",
        "Blessings of joy, color, and laughter received! ✨",
        "A canvas of shared memories is what we build! 🖌",
        "Wishing you a beautiful path painted in gold! 💛",
        "Your color blessing makes our day more artistic! 🎨"
    ];

    // ==========================================
    // 2. DOM ELEMENT SELECTORS
    // ==========================================
    const loaderOverlay = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const musicIcon = document.getElementById("music-icon");
    
    const guestNameDisplay = document.getElementById("guest-name-display");
    
    const scrollBar = document.getElementById("scroll-bar");
    
    const rsvpForm = document.getElementById("rsvp-form");
    const rsvpSuccessModal = document.getElementById("rsvp-success");
    const rsvpSuccessTitle = document.getElementById("rsvp-success-title");
    const rsvpSuccessDesc = document.getElementById("rsvp-success-desc");
    
    const wishesForm = document.getElementById("wishes-form");
    const wishesBoard = document.getElementById("wishes-board");
    const wishText = document.getElementById("wish-text");
    const wishSender = document.getElementById("wish-sender");

    // ==========================================
    // 3. PERSONALIZED WELCOME PARSER
    // ==========================================
    function parseGuestGreeting() {
        const urlParams = new URLSearchParams(window.location.search);
        let name = urlParams.get("guest");
        if (name) {
            // Sanitize input
            name = name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
            guestNameDisplay.innerText = name;
        } else {
            guestNameDisplay.innerText = "Beloved Guest";
        }
    }
    parseGuestGreeting();

    // ==========================================
    // 4. OPEN COVERS AND REVEAL SYSTEM
    // ==========================================
    btnOpenInvite.addEventListener("click", () => {
        // Play soft piano track
        playAudioTrack();
        
        // Hide cover with scale reveal
        loaderOverlay.classList.add("fade-out");
        
        // Unhide main page content
        mainContent.classList.remove("content-hidden");
        // Force reflow
        void mainContent.offsetWidth;
        mainContent.classList.add("fade-in");
        
        // Unlock browser scroll
        document.body.style.overflow = "auto";
        
        // Initialize timer countdown
        initializeCountdown();
        
        // Start butterfly fluttering scheduler
        startButterflyScheduler();
    });

    // Lock page scroll initially while cover is up
    document.body.style.overflow = "hidden";

    // ==========================================
    // 5. PIANO INSTRUMENTAL CONTROLLER
    // ==========================================
    let isPlaying = false;

    function playAudioTrack() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add("playing");
            musicToggle.classList.remove("muted");
            musicToggle.setAttribute("aria-label", "Mute Piano Track");
        }).catch(err => {
            console.log("Autoplay blocked by browser. Awaiting user interaction.", err);
            isPlaying = false;
            musicToggle.classList.remove("playing");
            musicToggle.classList.add("muted");
        });
    }

    function pauseAudioTrack() {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("muted");
        musicToggle.setAttribute("aria-label", "Play Piano Track");
    }

    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseAudioTrack();
        } else {
            playAudioTrack();
        }
    });

    // ==========================================
    // 6. SCROLL PROGRESS
    // ==========================================
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + "%";
    });

    // ==========================================
    // 7. WATERCOLOR BUTTERFLY GENERATOR
    // ==========================================
    let butterflyTimer;
    
    function startButterflyScheduler() {
        // Trigger a butterfly occasionally (every 10-14 seconds)
        butterflyTimer = setInterval(spawnButterfly, 12000);
        // Spawn first butterfly after 3 seconds
        setTimeout(spawnButterfly, 3000);
    }
    
    function spawnButterfly() {
        const flyer = document.createElement("div");
        flyer.className = "butterfly-flyer";
        
        // Color variation seeds
        const colors = ["", "color-alt1", "color-alt2"];
        const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
        if (randomColorClass) {
            flyer.classList.add(randomColorClass);
        }
        
        // Assemble wings
        const wingPair = document.createElement("div");
        wingPair.className = "butterfly-wing-pair";
        
        const leftWing = document.createElement("div");
        leftWing.className = "wing-half left";
        
        const rightWing = document.createElement("div");
        rightWing.className = "wing-half right";
        
        wingPair.appendChild(leftWing);
        wingPair.appendChild(rightWing);
        flyer.appendChild(wingPair);
        
        // Randomized vertical flight start (viewport height percentage)
        const randomY = 30 + Math.random() * 50; 
        // Randomized sizing scale
        const scale = 0.6 + Math.random() * 0.5;
        // Randomized animation speed
        const duration = 14 + Math.random() * 6;
        
        flyer.style.top = `${randomY}vh`;
        flyer.style.transform = `scale(${scale})`;
        flyer.style.animationDuration = `${duration}s`;
        
        document.body.appendChild(flyer);
        
        // Clean up node when animation finishes
        setTimeout(() => {
            flyer.remove();
        }, duration * 1000);
    }

    // ==========================================
    // 8. POLAROID JOURNAL GALLERY ROTATOR
    // ==========================================
    let activeIndex = 0;
    let isAnimating = false;
    const cards = Array.from(document.querySelectorAll(".polaroid-slide-card"));
    
    const btnPrev = document.getElementById("gallery-prev");
    const btnNext = document.getElementById("gallery-next");
    const polaroidDeck = document.getElementById("polaroid-deck");
    
    function updatePolaroidStack() {
        cards.forEach((card, idx) => {
            // Remove previous stack and swipe classes
            card.className = "polaroid-slide-card";
            
            // Calculate index relative to the active card
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
        isAnimating = true;
        
        const nextActiveIdx = (activeIndex - 1 + cards.length) % cards.length;
        const nextActiveCard = cards[nextActiveIdx];
        
        // Move target card to the front visually but swiped right
        nextActiveCard.style.zIndex = "10";
        nextActiveCard.classList.add("swipe-right");
        
        setTimeout(() => {
            activeIndex = nextActiveIdx;
            updatePolaroidStack();
            nextActiveCard.style.zIndex = "";
            isAnimating = false;
        }, 500);
    }
    
    btnNext.addEventListener("click", rotateNext);
    btnPrev.addEventListener("click", rotatePrev);
    
    // Swipe Gestures Support (Touch handlers)
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
                rotateNext(); // Swipe Left
            } else {
                rotatePrev(); // Swipe Right
            }
        }
    }
    
    // Lightbox Modal functions
    const lightboxModal = document.getElementById("gallery-lightbox");
    const lightboxImgSource = document.getElementById("lightbox-img-source");
    const lightboxCaptionText = document.getElementById("lightbox-caption-text");
    
    window.openLightbox = function(index) {
        // Only open if the clicked card is currently the active one at the top of the stack
        if (index !== activeIndex) return;
        
        const item = galleryItems[index];
        lightboxImgSource.src = `images/gallery${index + 1}.png`;
        lightboxCaptionText.innerText = item.desc;
        
        lightboxModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Lock scroll
    };
    
    window.closeLightbox = function() {
        lightboxModal.style.display = "none";
        document.body.style.overflow = "auto"; // Unlock scroll
    };
    
    // Close lightbox on click outside the image card container
    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // ==========================================
    // 9. INTERACTIVE WATERCOLOR PAINT PALETTE
    // ==========================================
    const paletteBlobs = document.querySelectorAll(".color-well-blob");
    const splatContainer = document.getElementById("splat-container");
    const paintToast = document.getElementById("paint-toast");
    let toastTimer;
    
    paletteBlobs.forEach(blob => {
        blob.addEventListener("click", (e) => {
            e.stopPropagation();
            const wellId = blob.id;
            const color = colorSplats[wellId] || "#FFD1DC";
            
            // Calculate screen splatter position (random viewport coordinates)
            const randomX = 10 + Math.random() * 80; // percent width
            const randomY = 10 + Math.random() * 80; // percent height
            
            // Spawn splash particle
            spawnPaintSplat(randomX, randomY, color);
            
            // Highlight color well blob scale trigger
            blob.style.transform = "scale(1.2)";
            setTimeout(() => { blob.style.transform = ""; }, 300);
            
            // Show randomly selected thank you quote
            showPaintToast();
        });
    });
    
    function spawnPaintSplat(x, y, color) {
        const splat = document.createElement("div");
        splat.className = "screen-paint-splat";
        
        // Random organic liquid borders
        const r1 = 30 + Math.random() * 30;
        const r2 = 30 + Math.random() * 30;
        const r3 = 30 + Math.random() * 30;
        const r4 = 30 + Math.random() * 30;
        splat.style.borderRadius = `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${r4}% ${100-r4}% ${100-r3}%`;
        
        splat.style.left = `${x}vw`;
        splat.style.top = `${y}vh`;
        splat.style.backgroundColor = color;
        splat.style.boxShadow = `inset 0 0 20px rgba(0,0,0,0.05), 0 5px 15px ${color}44`;
        
        splatContainer.appendChild(splat);
        
        // Auto remove splat node after animation finishes
        setTimeout(() => {
            splat.remove();
        }, 1500);
    }
    
    function showPaintToast() {
        clearTimeout(toastTimer);
        const quote = paletteQuotes[Math.floor(Math.random() * paletteQuotes.length)];
        paintToast.innerText = quote;
        paintToast.classList.add("show");
        
        toastTimer = setTimeout(() => {
            paintToast.classList.remove("show");
        }, 3000);
    }

    // ==========================================
    // 10. RSVP SUBMISSION & FRONTEND CHECKS
    // ==========================================
    window.handleRSVPSubmit = function(event) {
        event.preventDefault();
        
        if (!rsvpForm) return;

        const nameEl = document.getElementById("rsvp-name");
        const phoneEl = document.getElementById("rsvp-phone");
        const attendeesEl = document.getElementById("rsvp-attendees");
        const statusEl = document.querySelector('input[name="attendance-status"]:checked');

        const name = nameEl ? nameEl.value.trim() : "";
        const phone = phoneEl ? phoneEl.value.trim() : "";
        const attendees = attendeesEl ? attendeesEl.value : "1";
        const status = statusEl ? statusEl.value : "yes";
        
        if (name === "" || phone === "") {
            alert("Please fill out all required fields.");
            return;
        }
        
        // Update modal success displays
        if (status === "yes") {
            if (rsvpSuccessTitle) rsvpSuccessTitle.innerText = "Honored to Welcome You! 🌸";
            if (rsvpSuccessDesc) rsvpSuccessDesc.innerText = `Dear ${name}, your attendance (total ${attendees} guest/s) has been successfully confirmed. We look forward to celebrating with you!`;
            // Trigger color splashes celebration
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    const colors = Object.values(colorSplats);
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    spawnPaintSplat(15 + Math.random() * 70, 15 + Math.random() * 70, randomColor);
                }, i * 300);
            }
        } else {
            if (rsvpSuccessTitle) rsvpSuccessTitle.innerText = "Regrets Recorded 🌿";
            if (rsvpSuccessDesc) rsvpSuccessDesc.innerText = `Thank you for letting us know, ${name}. We appreciate your blessings and prayers from afar.`;
        }
        
        if (rsvpSuccessModal) {
            rsvpSuccessModal.style.display = "flex";
            document.body.style.overflow = "hidden"; // lock scroll
        }
    };
    
    window.closeRSVPSuccess = function() {
        if (rsvpSuccessModal) rsvpSuccessModal.style.display = "none";
        document.body.style.overflow = "auto"; // unlock scroll
        if (rsvpForm) rsvpForm.reset();
    };

    // ==========================================
    // 11. LOCAL STORAGE GUEST CANVAS BOARD
    // ==========================================
    function loadWishes() {
        if (!wishesBoard) return;
        let wishes = [];
        try {
            const rawWishes = localStorage.getItem("watercolor_wishes");
            if (rawWishes) {
                wishes = JSON.parse(rawWishes);
            }
        } catch (e) {
            console.error("Failed to load wishes database from storage.", e);
        }
        
        // Seed default wishes if database empty
        if (wishes.length === 0) {
            wishes = [...defaultWishes];
            localStorage.setItem("watercolor_wishes", JSON.stringify(wishes));
        }
        
        renderWishes(wishes);
    }
    
    function renderWishes(wishes) {
        if (!wishesBoard) return;
        wishesBoard.innerHTML = "";
        
        // Reverse wishes to display the most recent blessing first
        const sortedWishes = [...wishes].reverse();
        
        sortedWishes.forEach(wish => {
            const card = document.createElement("div");
            card.className = "wish-sticky-note";
            card.innerHTML = `
                <div class="wish-note-washi"></div>
                <p class="wish-note-text">"${wish.text}"</p>
                <div class="wish-note-sender">- ${wish.sender}</div>
            `;
            wishesBoard.appendChild(card);
        });
    }
    
    window.handleWishSubmit = function(event) {
        event.preventDefault();
        
        if (!wishSender || !wishText) return;

        const sender = wishSender.value.trim();
        const text = wishText.value.trim();
        
        if (sender === "" || text === "") {
            return;
        }
        
        let wishes = [];
        try {
            const rawWishes = localStorage.getItem("watercolor_wishes");
            if (rawWishes) {
                wishes = JSON.parse(rawWishes);
            }
        } catch (e) {
            console.error("Failed to append wish to local storage database.", e);
        }
        
        // Append new blessing
        wishes.push({ sender, text });
        localStorage.setItem("watercolor_wishes", JSON.stringify(wishes));
        
        // Re-render wishes
        renderWishes(wishes);
        
        // Clear input form fields
        wishText.value = "";
        wishSender.value = "";
        
        // Trigger a gold paint splash near the wall area to confirm posting
        spawnPaintSplat(30 + Math.random() * 40, 40 + Math.random() * 30, "#D4AF37");
    };
    
    if (wishesBoard) {
        loadWishes();
    }

    // ==========================================
    // 12. WEDDING TIMER COUNTDOWN Muhurtham
    // ==========================================
    let timerInterval;
    
    function initializeCountdown() {
        clearInterval(timerInterval);
        
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");
        
        function updateTimer() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance < 0) {
                clearInterval(timerInterval);
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minutesEl.innerText = "00";
                secondsEl.innerText = "00";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }
        
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    // Force initial stack offsets setting
    updatePolaroidStack();
});
