// ==========================================================================
// CELESTIAL NIGHT SKY & STARS SCRIPT WIDGETS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // 1. URL QUERY PARAMETER PARSING (PERSONALIZED GUEST GREETING)
    // ----------------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get("guest") || urlParams.get("g");
    
    const guestNameDisplay = document.getElementById("guest-name-display");
    const guestWelcomeText = document.getElementById("guest-welcome-text");
    const heroWelcomePhrase = document.getElementById("hero-welcome-phrase");
    const rsvpNameField = document.getElementById("rsvp-name");
    const wishesSenderField = document.getElementById("wish-sender");
    const lanternSenderField = document.getElementById("lantern-sender");

    if (guestName) {
        // Sanitize name to prevent XSS
        guestName = sanitizeInput(guestName);
        
        // Update Cover Overlay Greeting
        if (guestNameDisplay) guestNameDisplay.textContent = guestName;
        if (guestWelcomeText) {
            guestWelcomeText.innerHTML = `Dear <strong>${guestName}</strong>, destiny has written your name among our stars. Join us as we celebrate our love under the moonlit sky.`;
        }
        
        // Update Hero Welcome Title
        if (heroWelcomePhrase) {
            heroWelcomePhrase.innerHTML = `Welcome <strong>${guestName}</strong>,<br>Join Us Under The Stars`;
        }
        
        // Pre-fill RSVP and wishes name fields
        if (rsvpNameField) rsvpNameField.value = guestName;
        if (wishesSenderField) wishesSenderField.value = guestName;
        if (lanternSenderField) lanternSenderField.value = guestName;
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

    // ----------------------------------------------------------------------
    // 2. STARS BG TWINKLING & DYNAMIC COVER GENERATOR
    // ----------------------------------------------------------------------
    const coverStarfield = document.getElementById("cover-starfield");
    if (coverStarfield) {
        // Populate random stars inside the cover background
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

    // ----------------------------------------------------------------------
    // 3. COSMIC OPEN ENVELOPE WIPE
    // ----------------------------------------------------------------------
    const btnOpenCosmic = document.getElementById("btn-open-cosmic");
    const loadingOverlay = document.getElementById("loading-overlay");
    const mainHeader = document.getElementById("main-header");
    const mainContent = document.getElementById("main-content");
    const floatingWidgets = document.getElementById("floating-widgets");
    const bgMusic = document.getElementById("bg-music");
    const musicToggleBtn = document.getElementById("music-toggle-btn");

    if (btnOpenCosmic) {
        btnOpenCosmic.addEventListener("click", () => {
            // Play Background Music
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

            // Animate overlay removal
            if (loadingOverlay) {
                loadingOverlay.classList.add("fade-out");
            }

            // Expose main website sections
            if (mainHeader) mainHeader.classList.remove("content-hidden");
            if (floatingWidgets) floatingWidgets.classList.remove("content-hidden");
            if (mainContent) {
                mainContent.classList.remove("content-hidden");
                // Allow a small delay to register display block for transition
                setTimeout(() => {
                    mainContent.classList.add("fade-in");
                    // Trigger introductory shooting stars
                    triggerInitialMeteorShower();
                    // Project Guest Name briefly in constellations
                    if (guestName) {
                        projectGuestNameConstellation(guestName);
                    }
                }, 50);
            }
        });
    }

    // Project Name in the Stars (Temporary Toast Overlay)
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

    // ----------------------------------------------------------------------
    // 4. MUSIC PLAYER AUDIO CONTROLLER
    // ----------------------------------------------------------------------
    if (musicToggleBtn && bgMusic) {
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

    // ----------------------------------------------------------------------
    // 5. SCROLL PROGRESS INDICATOR & HEADER STYLE ON SCROLL
    // ----------------------------------------------------------------------
    const progressBar = document.getElementById("scroll-progress-bar");
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        // Make sticky header slightly solid on scroll
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

    // ----------------------------------------------------------------------
    // 6. CONSTELLATION STORY TIMELINE INTERSECT OBSERVER
    // ----------------------------------------------------------------------
    const timelineNodes = document.querySelectorAll(".timeline-constellation-node");
    
    if (timelineNodes.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -20% 0px",
            threshold: 0.15
        };

        const timelineObserver = new IntersectionObserver((entries, observer) => {
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

    // ----------------------------------------------------------------------
    // 7. COUNTDOWN CELESTIAL TIMER
    // ----------------------------------------------------------------------
    // Target date: Dec 12, 2026 16:30:00 (Nikkah Time)
    const targetWeddingDate = new Date("Dec 12, 2026 16:30:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetWeddingDate - now;

        if (difference < 0) {
            // Wedding has passed
            const countdownTimer = document.getElementById("countdown-timer");
            if (countdownTimer) {
                countdownTimer.innerHTML = "<h3 style='color: var(--color-text-gold); font-family: var(--font-serif); font-size: 1.4rem;'>The Stars Have Aligned - Zayn & Aara are Married!</h3>";
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ----------------------------------------------------------------------
    // 8. POLAROID CARD SWIPE & STACK GALLERY
    // ----------------------------------------------------------------------
    const polaroidGallery = document.getElementById("polaroid-gallery");
    const prevBtn = document.getElementById("gallery-prev");
    const nextBtn = document.getElementById("gallery-next");
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

    let cards = [];
    if (polaroidGallery) {
        cards = Array.from(polaroidGallery.querySelectorAll(".star-card-gallery"));
    }

    function rotateGallery(direction) {
        if (cards.length === 0) return;

        // Get index layout
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
            // Swipe back logic
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

    if (nextBtn) nextBtn.addEventListener("click", () => rotateGallery("next"));
    if (prevBtn) prevBtn.addEventListener("click", () => rotateGallery("prev"));

    // Swipe gestures on mobile devices
    let startX = 0;
    if (polaroidGallery) {
        polaroidGallery.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        polaroidGallery.addEventListener("touchend", (e) => {
            let endX = e.changedTouches[0].clientX;
            let deltaX = endX - startX;

            if (Math.abs(deltaX) > 60) {
                if (deltaX < 0) {
                    rotateGallery("next"); // Swipe left shifts next
                } else {
                    rotateGallery("prev"); // Swipe right shifts prev
                }
            }
        }, { passive: true });
    }

    // Lightbox modal trigger
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Prevent triggering lightbox if swiping/dragging is active
            if (card.classList.contains("active-stack")) {
                const img = card.querySelector("img");
                const caption = card.querySelector(".gallery-caption-title");
                if (lightboxModal && img && lightboxImg) {
                    lightboxImg.src = img.src;
                    if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
                    lightboxModal.style.display = "flex";
                }
            }
        });
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

    // ----------------------------------------------------------------------
    // 9. INTERACTIVE BLESSING MOON & WISHES METEORS
    // ----------------------------------------------------------------------
    const blessingMoonWidget = document.getElementById("blessing-moon-widget");
    const blessingsMoonBubble = document.getElementById("blessings-moon-bubble");
    const moonBlessingHeading = document.getElementById("moon-blessing-heading");
    const moonBlessingQuote = document.getElementById("moon-blessing-quote");

    const moonBlessingsList = [
        { title: "Infinite Love", quote: "May your lives be bound in stardust and celestial joy, sharing standard orbits forever." },
        { title: "Harmony & Peace", quote: "As the crescent moon glows, may your marriage grow into a full moon of brightness." },
        { title: "Cosmic Bond", quote: "True love matches souls. May yours reflect the serenity and grandeur of the night sky." },
        { title: "Unending Wonders", quote: "Wishing you a lifetime of stargazing, hand-holding, and deep galactic laughter." },
        { title: "Divine Guidance", quote: "May the light of a thousand stars always illuminate your paths during darker phases." }
    ];

    if (blessingMoonWidget) {
        blessingMoonWidget.addEventListener("click", () => {
            blessingMoonWidget.classList.add("glow-intense");
            
            // Choose a random blessing
            const randomBlessing = moonBlessingsList[Math.floor(Math.random() * moonBlessingsList.length)];
            if (moonBlessingHeading && moonBlessingQuote) {
                moonBlessingHeading.textContent = randomBlessing.title;
                moonBlessingQuote.textContent = `"${randomBlessing.quote}"`;
            }

            // Expose blessing panel
            if (blessingsMoonBubble) {
                blessingsMoonBubble.style.display = "block";
            }

            // Trigger shooting stars!
            triggerInitialMeteorShower();

            // Display Toast
            showWishToast("The Moon has blessed Zayn & Aara!");

            // Remove glow effect after short timeout
            setTimeout(() => {
                blessingMoonWidget.classList.remove("glow-intense");
            }, 1500);
        });
    }

    // Make a Wish upon a Star anywhere on Starry Sky Backdrop
    const starsBg = document.getElementById("stars-bg");
    if (starsBg) {
        starsBg.addEventListener("click", (e) => {
            // Spawn shooting star at coordinates
            spawnShootingStar(e.clientX, e.clientY);
            
            // Random romantic message
            const romanticWishes = [
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

    function spawnShootingStar(x, y) {
        const overlay = document.getElementById("shooting-star-canvas-overlay");
        if (!overlay) return;

        const star = document.createElement("div");
        star.className = "triggered-shooting-star";
        
        // Flight direction: left to right, angled downwards
        const angle = 25 + Math.random() * 20; // degrees
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.setProperty("--angle", `${angle}deg`);
        
        overlay.appendChild(star);

        // Cleanup
        setTimeout(() => {
            star.remove();
        }, 1100);
    }

    // ----------------------------------------------------------------------
    // 10. CONSTELLATION CREATOR INTERACTIVE DRAWING GAME
    // ----------------------------------------------------------------------
    const canvas = document.getElementById("constellation-canvas");
    const gameQuoteBubble = document.getElementById("constellation-quote-bubble");
    
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let isDrawing = false;
        let points = [
            { x: 60, y: 140, radius: 8, connected: false },  // Node 0
            { x: 160, y: 60, radius: 8, connected: false },   // Node 1
            { x: 260, y: 140, radius: 8, connected: false },  // Node 2
            { x: 210, y: 240, radius: 8, connected: false },  // Node 3
            { x: 110, y: 240, radius: 8, connected: false }   // Node 4
        ];
        
        let lastNodeIdx = -1;
        let currentMousePos = { x: 0, y: 0 };
        let gameCompleted = false;

        function getCanvasMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            // Supports touch
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            return {
                x: ((clientX - rect.left) / rect.width) * canvas.width,
                y: ((clientY - rect.top) / rect.height) * canvas.height
            };
        }

        function drawGame() {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background grid lines (Star map coordinates details)
            ctx.strokeStyle = "rgba(245, 158, 11, 0.05)";
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }

            // Draw locked connected lines
            ctx.strokeStyle = "var(--color-gold)";
            ctx.lineWidth = 2.5;
            ctx.shadowColor = "var(--color-gold)";
            ctx.shadowBlur = 8;
            
            ctx.beginPath();
            let hasLine = false;
            for (let i = 0; i < points.length; i++) {
                if (points[i].connected && i > 0) {
                    if (!hasLine) {
                        ctx.moveTo(points[i-1].x, points[i-1].y);
                        hasLine = true;
                    }
                    ctx.lineTo(points[i].x, points[i].y);
                }
            }
            // If completed, loop the final segment to origin
            if (gameCompleted) {
                ctx.lineTo(points[0].x, points[0].y);
            }
            ctx.stroke();
            ctx.shadowBlur = 0; // reset shadow

            // Draw current active dragging line
            if (isDrawing && lastNodeIdx >= 0 && lastNodeIdx < points.length - 1 && !gameCompleted) {
                ctx.strokeStyle = "rgba(226, 232, 240, 0.6)";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(points[lastNodeIdx].x, points[lastNodeIdx].y);
                ctx.lineTo(currentMousePos.x, currentMousePos.y);
                ctx.stroke();
                ctx.setLineDash([]); // Reset dash
            }

            // Draw star nodes
            points.forEach((pt, idx) => {
                // If it is the next node to target, make it pulse/glow
                let isTarget = (idx === lastNodeIdx + 1 && !gameCompleted) || (lastNodeIdx === -1 && idx === 0);
                
                if (isTarget) {
                    ctx.shadowColor = "var(--color-gold-light)";
                    ctx.shadowBlur = 12;
                    ctx.fillStyle = "#FFF";
                } else if (pt.connected || gameCompleted) {
                    ctx.shadowColor = "var(--color-gold)";
                    ctx.shadowBlur = 6;
                    ctx.fillStyle = "var(--color-gold)";
                } else {
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
                }

                // Draw solid center
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, isTarget ? 6 : 4, 0, Math.PI * 2);
                ctx.fill();

                // Draw decorative ring around stars
                if (isTarget) {
                    ctx.strokeStyle = "var(--color-gold)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, 11 + Math.sin(Date.now() / 150) * 2, 0, Math.PI * 2);
                    ctx.stroke();
                }

                // Draw order numbers
                if (!gameCompleted) {
                    ctx.fillStyle = "var(--color-text-muted)";
                    ctx.font = "8px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(idx + 1, pt.x, pt.y - 12);
                }

                ctx.shadowBlur = 0; // reset
            });
        }

        // Animation frame loop for canvas pulses
        function animateCanvas() {
            drawGame();
            if (!gameCompleted) {
                requestAnimationFrame(animateCanvas);
            }
        }
        animateCanvas();

        function checkNodeCollision(pos, index) {
            const pt = points[index];
            const dist = Math.hypot(pos.x - pt.x, pos.y - pt.y);
            return dist < 25; // 25px tolerance touch boundary
        }

        function handleStart(e) {
            if (gameCompleted) return;
            const mousePos = getCanvasMousePos(e);
            
            // Check if user tapped Node 0 (if starting) or last locked node
            if (lastNodeIdx === -1) {
                if (checkNodeCollision(mousePos, 0)) {
                    isDrawing = true;
                    lastNodeIdx = 0;
                    points[0].connected = true;
                    currentMousePos = mousePos;
                }
            } else if (checkNodeCollision(mousePos, lastNodeIdx)) {
                isDrawing = true;
                currentMousePos = mousePos;
            }
        }

        function handleMove(e) {
            if (!isDrawing || gameCompleted) return;
            // Prevent default scrolling on mobile drag
            if (e.cancelable) e.preventDefault();
            
            const mousePos = getCanvasMousePos(e);
            currentMousePos = mousePos;

            // Check if dragging near the next target node
            const targetIdx = lastNodeIdx + 1;
            if (targetIdx < points.length) {
                if (checkNodeCollision(mousePos, targetIdx)) {
                    points[targetIdx].connected = true;
                    lastNodeIdx = targetIdx;
                    
                    // Trigger haptic rumble or shooting star on connection
                    spawnShootingStar(points[targetIdx].x + canvas.getBoundingClientRect().left, points[targetIdx].y + canvas.getBoundingClientRect().top);
                    
                    if (targetIdx === points.length - 1) {
                        // All connected! Game completed!
                        gameCompleted = true;
                        isDrawing = false;
                        handleCompletion();
                    }
                }
            }
        }

        function handleEnd() {
            isDrawing = false;
        }

        function handleCompletion() {
            // Reveal quote bubble
            if (gameQuoteBubble) {
                gameQuoteBubble.style.display = "block";
            }
            
            // Redraw final loop
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGame();

            // Trigger beautiful star rain!
            triggerInitialMeteorShower();
            showWishToast("Constellation Complete: Love Unlocked!");
        }

        // Register Mouse events
        canvas.addEventListener("mousedown", handleStart);
        canvas.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleEnd);

        // Register Touch events
        canvas.addEventListener("touchstart", handleStart, { passive: false });
        canvas.addEventListener("touchmove", handleMove, { passive: false });
        canvas.addEventListener("touchend", handleEnd, { passive: true });
    }

    // ----------------------------------------------------------------------
    // 11. RSVP FORM CONTROLLER
    // ----------------------------------------------------------------------
    const rsvpForm = document.getElementById("rsvp-form");
    const rsvpSuccessOverlay = document.getElementById("rsvp-success-overlay");
    const rsvpSuccessClose = document.getElementById("rsvp-success-close");

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Frontend inputs validation
            const nameInput = document.getElementById("rsvp-name");
            const phoneInput = document.getElementById("rsvp-phone");
            const guestsSelect = document.getElementById("rsvp-guests");
            const statusInput = document.querySelector('input[name="rsvp-status"]:checked');

            if (!nameInput.value.trim()) {
                alert("Please enter your name.");
                return;
            }
            if (!phoneInput.value.trim() || phoneInput.value.length < 6) {
                alert("Please enter a valid phone number.");
                return;
            }
            if (!guestsSelect.value) {
                alert("Please select the number of attendees.");
                return;
            }

            // Save details locally
            const rsvpData = {
                name: nameInput.value,
                phone: phoneInput.value,
                guests: guestsSelect.value,
                status: statusInput.value,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem("celestial_rsvp", JSON.stringify(rsvpData));

            // Display success popup modal
            if (rsvpSuccessOverlay) {
                const title = document.getElementById("rsvp-success-title");
                const msg = document.getElementById("rsvp-success-message");
                
                if (rsvpData.status === "declined") {
                    if (title) title.textContent = "Thank You!";
                    if (msg) msg.textContent = "We regret that you cannot make it, but thank you for sending your blessings and updates.";
                } else {
                    if (title) title.textContent = "RSVP Confirmed!";
                    if (msg) msg.textContent = `Thank you, ${rsvpData.name}. Your presence of ${rsvpData.guests} has been plotted under our wedding stars.`;
                }

                rsvpSuccessOverlay.style.display = "flex";
            }
        });
    }

    if (rsvpSuccessClose) {
        rsvpSuccessClose.addEventListener("click", () => {
            if (rsvpSuccessOverlay) rsvpSuccessOverlay.style.display = "none";
        });
    }

    // ----------------------------------------------------------------------
    // 12. WISHES BOARD SYNC & STAR GENERATOR
    // ----------------------------------------------------------------------
    const wishesForm = document.getElementById("wishes-form");
    const wishesDisplayBoard = document.getElementById("wishes-display-board");

    // Standard preloaded default wishes
    const defaultWishes = [
        { name: "Shamil", text: "May your love shine brighter than a thousand galaxies! Excited to attend." },
        { name: "Bilal Malik", text: "Wishing Zayn & Aara a lifetime of happiness under standard celestial alignments." },
        { name: "Yasmin Ibrahim", text: "Looking forward to seeing my beautiful daughter walk into her new universe." },
        { name: "Zoya", text: "So romantic! Connecting stars matches your love story perfectly." }
    ];

    function getLocalWishes() {
        const stored = localStorage.getItem("celestial_wishes");
        if (stored) {
            return JSON.parse(stored);
        }
        return defaultWishes;
    }

    function saveLocalWishes(wishes) {
        localStorage.setItem("celestial_wishes", JSON.stringify(wishes));
    }

    function renderWishStars() {
        if (!wishesDisplayBoard) return;
        
        // Clear old stars (except sky label)
        const oldStars = wishesDisplayBoard.querySelectorAll(".wish-star-node");
        oldStars.forEach(s => s.remove());

        const wishes = getLocalWishes();

        wishes.forEach((wish, index) => {
            const starNode = document.createElement("div");
            starNode.className = "wish-star-node";
            
            // Random coordinates inside wishes canvas board (leaving borders safe)
            const x = 5 + Math.random() * 88; // %
            const y = 20 + Math.random() * 65; // %
            starNode.style.left = `${x}%`;
            starNode.style.top = `${y}%`;
            
            // Random animation delay
            starNode.style.setProperty("--star-delay", `${Math.random() * 2.5}s`);
            
            starNode.innerHTML = `
                <i class="fa-solid fa-star"></i>
                <div class="wish-star-tooltip">
                    <p>"${sanitizeInput(wish.text)}"</p>
                    <div class="wish-tooltip-sender">- ${sanitizeInput(wish.name)}</div>
                </div>
            `;
            
            wishesDisplayBoard.appendChild(starNode);
        });
    }

    if (wishesForm) {
        wishesForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const textInput = document.getElementById("wish-message");
            const senderInput = document.getElementById("wish-sender");

            if (!textInput.value.trim() || !senderInput.value.trim()) {
                alert("Please fill in both name and blessing message.");
                return;
            }

            const newWish = {
                name: senderInput.value.trim(),
                text: textInput.value.trim()
            };

            const wishes = getLocalWishes();
            wishes.push(newWish);
            saveLocalWishes(wishes);

            // Re-render wishes board
            renderWishStars();

            // Clear inputs
            textInput.value = "";
            
            // Spawn wish success effects
            showWishToast("Your blessing star has been pinned to the sky!");
            triggerInitialMeteorShower();
        });
    }

    // Run initial wishes board render
    renderWishStars();

    // ----------------------------------------------------------------------
    // 13. VIRTUAL MEMORY LANTERN RELEASE
    // ----------------------------------------------------------------------
    const lanternForm = document.getElementById("lantern-form");

    if (lanternForm) {
        lanternForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const messageInput = document.getElementById("lantern-message");
            const senderInput = document.getElementById("lantern-sender");

            if (!messageInput.value.trim() || !senderInput.value.trim()) {
                alert("Please enter your blessing message.");
                return;
            }

            const sender = senderInput.value.trim();
            const text = messageInput.value.trim();

            // Create memory lantern element
            const lantern = document.createElement("div");
            lantern.className = "floating-memory-lantern";
            
            // Random horizontal launch coordinate & wind drift
            const startX = 15 + Math.random() * 70; // % from left edge
            const endX = startX + (-15 + Math.random() * 30); // Drift offset
            
            lantern.style.setProperty("--start-x", `${startX}vw`);
            lantern.style.setProperty("--end-x", `${endX}vw`);
            
            // Unique visual content
            lantern.innerHTML = `
                <div class="lantern-body-glow"></div>
            `;
            
            document.body.appendChild(lantern);

            // Notify user
            showWishToast(`Lantern released by ${sender}!`);

            // Clear message input
            messageInput.value = "";

            // Cleanup after animation finishes (18s)
            setTimeout(() => {
                lantern.remove();
            }, 18000);
        });
    }

    // ----------------------------------------------------------------------
    // 14. SHOOTING STAR HUNT (RANDOM CLICKABLE STARS & ROMANTIC STORIES)
    // ----------------------------------------------------------------------
    const romanticStories = [
        "Zayn designed a custom starry constellation map showing how the night sky looked when they first met.",
        "Aara loves how Zayn always listens patiently to her endless explanations about black holes and nebulas.",
        "Their favorite stargazing spot is a quiet mountain ridge where the city lights fade completely.",
        "Zayn claims that Aara's bright eyes possess more luminosity than a young supernova.",
        "Aara believes they are bound by the gravity of love, destined to orbit each other for infinity."
    ];

    let huntInterval = null;

    // We start the hunt after the cover loading screen is opened
    if (btnOpenCosmic) {
        btnOpenCosmic.addEventListener("click", () => {
            // Wait 6 seconds before launching the first random star hunt, then repeat every 18 seconds
            setTimeout(() => {
                spawnHuntingStarLoop();
                huntInterval = setInterval(spawnHuntingStarLoop, 18000);
            }, 6000);
        });
    }

    function spawnHuntingStarLoop() {
        const overlay = document.getElementById("shooting-star-canvas-overlay");
        if (!overlay) return;

        const star = document.createElement("div");
        star.className = "hunting-shooting-star";

        // Random starting coordinates
        const startX = -100; // start off-screen left
        const startY = Math.random() * window.innerHeight * 0.5; // upper half of screen
        const angle = 20 + Math.random() * 20; // 20 to 40 degrees diagonal path
        const duration = 2 + Math.random() * 1.5; // 2 to 3.5 seconds

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

        // Click or tap to catch the shooting star
        const handleCatch = (e) => {
            e.stopPropagation();
            e.preventDefault();

            // Get exact coordinates for explosion particle effect
            const rect = star.getBoundingClientRect();
            const clientX = rect.left + rect.width / 2;
            const clientY = rect.top + rect.height / 2;

            // Trigger sparkles
            createSparkleBurst(clientX, clientY);

            // Remove star immediately
            star.remove();

            // Unlock and display random romantic story
            const randomStory = romanticStories[Math.floor(Math.random() * romanticStories.length)];
            showWishToast(`✨ Zayn & Aara's Star Story: "${randomStory}"`);
        };

        // Support mouse and touch events
        star.addEventListener("mousedown", handleCatch);
        star.addEventListener("touchstart", handleCatch, { passive: false });

        // Auto-remove star after flight duration is complete
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, duration * 1000);
    }

    function createSparkleBurst(x, y) {
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "star-burst-particle";
            
            // Random direction offsets
            const angle = Math.random() * Math.PI * 2;
            const speed = 20 + Math.random() * 60; // distance moved
            const mx = Math.cos(angle) * speed;
            const my = Math.sin(angle) * speed;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.setProperty("--mx", `${mx}px`);
            particle.style.setProperty("--my", `${my}px`);

            document.body.appendChild(particle);

            // Cleanup particle
            setTimeout(() => {
                particle.remove();
            }, 700);
        }
    }
});
