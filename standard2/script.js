/**
 * standard2 - Traditional Kerala Wedding Template Client Logic
 * Fully client-side, zero frameworks. Handles interactive lamp lighting,
 * flower showers, memory tree, couple quiz, local wishes, and music controls.
 */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. CONFIGURATION & CORE STATE
    // ==========================================

    // Target Muhurtham date: September 10, 2026 at 10:30 AM IST
    const weddingDate = new Date("September 10, 2026 10:30:00").getTime();

    // Gallery Items data (renders decorative SVGs inside lightbox as visual assets)
    const galleryItems = [
        { title: "The Promise", desc: "Engagement rings surrounded by golden Kasavu styling.", color: "#E5C396" },
        { title: "The Mundu Ceremony", desc: "Traditional Kerala Kasavu handlooms woven for the auspicious day.", color: "#F2EDE4" },
        { title: "Sneha Walk", desc: "Walking together along the historic Fort Kochi sea walkway.", color: "#E5C396" }
    ];
    let currentGalleryIndex = 0;

    // Memory Tree Facts Database
    const memoryTreeFacts = {
        1: {
            title: "First Glimpse 🌸",
            desc: "Zayn and Aara first crossed paths at the traditional handloom Kasavu weavers collective in Chendamangalam while selecting handloom fabrics."
        },
        2: {
            title: "Culinary Romance 🍛",
            desc: "They realized their deep connection during an elaborate Onam Sadhya where they competed to finish the Palada Payasam first. (Aara won!)"
        },
        3: {
            title: "The Shared Rhythm 💃",
            desc: "Aara tried teaching Zayn Mohiniyattam mudras (hand gestures). Zayn completely failed, producing hours of laughter and a lifelong bond."
        },
        4: {
            title: "The Sunset Proposal 🌅",
            desc: "Zayn popped the question at Fort Kochi Beach as the Chinese Fishing Nets framed a perfect golden sunset over the Arabian Sea."
        },
        5: {
            title: "The Engagement Ring Mishap 💍",
            desc: "During their traditional ring exchange in Thrissur, Zayn got nervous and tried to slide the ring onto Aara's right hand instead of the left!"
        }
    };

    // Quiz State Variables
    let quizScore = 0;
    let quizAnswers = { 1: null, 2: null, 3: null };

    // ==========================================
    // 2. DOM ELEMENTS SELECTORS
    // ==========================================
    const loaderScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const btnOpenInvite = document.getElementById("btn-open-invite");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    const guestNameDisplay = document.getElementById("guest-name-display");

    const rsvpForm = document.getElementById("rsvp-form");
    const rsvpSuccessModal = document.getElementById("rsvp-success");

    const wishesForm = document.getElementById("wishes-form");
    const wishesBoard = document.getElementById("wishes-board");
    const wishText = document.getElementById("wish-text");
    const wishSender = document.getElementById("wish-sender");

    const scrollBar = document.getElementById("scroll-bar");

    // ==========================================
    // 3. PARSE PERSONALIZED GUEST GREETING
    // ==========================================
    function parseGuestName() {
        const urlParams = new URLSearchParams(window.location.search);
        let guestName = urlParams.get("guest");
        if (guestName) {
            // Sanitize name input
            guestName = guestName.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
            guestNameDisplay.innerText = guestName;
        } else {
            guestNameDisplay.innerText = "Beloved Guest";
        }
    }
    parseGuestName();

    // ==========================================
    // 4. OPEN INVITATION COVER ANIMATION
    // ==========================================
    btnOpenInvite.addEventListener("click", () => {
        // Play traditional music
        playAudio();

        // Hide cover with fade-out
        loaderScreen.classList.add("fade-out");

        // Show main website wrapper
        mainContent.classList.remove("content-hidden");
        void mainContent.offsetWidth; // Force Reflow
        mainContent.classList.add("fade-in");

        // Unlock scroll
        document.body.style.overflow = "auto";

        // Initialize active scroll reveal & countdown
        initializeCountdown();
        revealOnScroll();
    });

    // Prevent scrolling initially when cover is active
    document.body.style.overflow = "hidden";

    // ==========================================
    // 5. BACKGROUND MUSIC CONTROL
    // ==========================================
    let isPlaying = false;

    function playAudio() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add("playing");
            musicToggle.classList.remove("muted");
            musicToggle.setAttribute("aria-label", "Mute Background Music");
        }).catch(err => {
            console.log("Autoplay blocked. Waiting for user interaction.", err);
            isPlaying = false;
            musicToggle.classList.remove("playing");
            musicToggle.classList.add("muted");
        });
    }

    function pauseAudio() {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.classList.add("muted");
        musicToggle.setAttribute("aria-label", "Play Background Music");
    }

    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // ==========================================
    // 6. SCROLL PROGRESS INDICATOR & REVEALS
    // ==========================================
    window.addEventListener("scroll", () => {
        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + "%";

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

    // ==========================================
    // 7. VIRTUAL NILAVILAKKU CEREMONY
    // ==========================================
    const wickSpots = document.querySelectorAll(".wick-spot");
    const lampBlessingCard = document.getElementById("lamp-blessing-card");
    let totalLitWicks = 0;

    wickSpots.forEach(wick => {
        wick.addEventListener("click", () => {
            if (!wick.classList.contains("lit")) {
                wick.classList.add("lit");
                totalLitWicks++;

                // Show floating confirmation toast
                showFlowerToast("Auspicious flame lit! 🕯️");

                // When all 5 wicks are lit, trigger blessing card & special automatic flower rain
                if (totalLitWicks === 5) {
                    setTimeout(() => {
                        lampBlessingCard.style.display = "block";
                        triggerFlowerShower(40); // Large rain celebration
                        showFlowerToast("Ponmangalashamsakal! Lamp fully lit! 🌟");
                    }, 600);
                }
            }
        });
    });

    // ==========================================
    // 8. FLOWER SHOWER BLESSING ENGINE
    // ==========================================
    const urliBasket = document.getElementById("urli-basket");
    const flowerShowerOverlay = document.getElementById("flower-shower-overlay");
    const flowerToast = document.getElementById("flower-toast");
    let toastTimeout;

    const blessingSayings = [
        "May their life be as fragrant as jasmine! 🌸",
        "Wishing Zayn & Aara a golden future! 🌟",
        "Ponmangalashamsakal! May love flourish forever! ❤️",
        "Blessings of happiness, peace, and abundance! 🌿",
        "May joy shower upon their union! 🌺"
    ];

    urliBasket.addEventListener("click", () => {
        // Trigger flower drop
        triggerFlowerShower(25);

        // Show random blessing phrase toast
        const randomSaying = blessingSayings[Math.floor(Math.random() * blessingSayings.length)];
        showFlowerToast(randomSaying);
    });

    function showFlowerToast(message) {
        clearTimeout(toastTimeout);
        flowerToast.innerText = message;
        flowerToast.classList.add("show");

        toastTimeout = setTimeout(() => {
            flowerToast.classList.remove("show");
        }, 3500);
    }

    function triggerFlowerShower(count) {
        const petalTypes = ["jasmine", "marigold", "rose"];

        for (let i = 0; i < count; i++) {
            const petal = document.createElement("div");
            const type = petalTypes[Math.floor(Math.random() * petalTypes.length)];

            petal.className = `falling-petal ${type}`;

            // Randomized physics properties
            const startX = Math.random() * 100; // viewport percentage width
            const scale = 0.5 + Math.random() * 0.8;
            const duration = 2.5 + Math.random() * 3; // fall duration in seconds
            const delay = Math.random() * 0.8; // entry delay

            petal.style.left = `${startX}vw`;
            petal.style.transform = `scale(${scale})`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;

            flowerShowerOverlay.appendChild(petal);

            // Clean up petal after animation concludes
            setTimeout(() => {
                petal.remove();
            }, (duration + delay) * 1000);
        }
    }

    // ==========================================
    // 9. WEDDING MEMORY TREE REVEALS
    // ==========================================
    const treeLeaves = document.querySelectorAll(".tree-leaf-node");
    const memoryRevealBox = document.getElementById("memory-reveal-box");
    const memoryRevealTitle = document.getElementById("memory-reveal-title");
    const memoryRevealDesc = document.getElementById("memory-reveal-desc");

    treeLeaves.forEach(leaf => {
        leaf.addEventListener("click", () => {
            const leafId = leaf.id.replace("leaf-", "");
            const fact = memoryTreeFacts[leafId];

            if (fact) {
                // Highlight leaf visually
                treeLeaves.forEach(l => l.querySelector("circle").style.fill = "#FFF");
                leaf.querySelector("circle").style.fill = "#FAF5B7";

                // Show fact box with text
                memoryRevealTitle.innerText = fact.title;
                memoryRevealDesc.innerText = fact.desc;
                memoryRevealBox.style.display = "block";

                // Trigger a tiny flower splash around leaf spot
                showFlowerToast("Fact Unlocked! 🍃");
            }
        });
    });

    // ==========================================
    // 10. COUPLE QUIZ GAME ENGINE
    // ==========================================
    window.checkAnswer = function (questionNum, optionIdx, isCorrect) {
        const currentCard = document.getElementById(`q-${questionNum}`);
        const optionButtons = currentCard.querySelectorAll(".quiz-opt-btn");

        // Save answer status
        quizAnswers[questionNum] = isCorrect;

        // Highlight choices
        optionButtons.forEach((btn, idx) => {
            btn.setAttribute("disabled", "true");
            if (idx === optionIdx) {
                btn.classList.add(isCorrect ? "correct" : "wrong");
            }
        });

        if (isCorrect) {
            quizScore++;
        }

        // Transition to next question or result card
        setTimeout(() => {
            currentCard.style.display = "none";

            if (questionNum < 3) {
                const nextCard = document.getElementById(`q-${questionNum + 1}`);
                nextCard.style.display = "block";
            } else {
                showQuizResult();
            }
        }, 1200);
    };

    function showQuizResult() {
        const resultCard = document.getElementById("quiz-result");
        const scoreBadge = document.getElementById("score-badge");
        const feedbackTitle = document.getElementById("quiz-feedback-title");
        const feedbackDesc = document.getElementById("quiz-feedback-desc");

        scoreBadge.innerText = `${quizScore}/3`;
        resultCard.style.display = "block";

        if (quizScore === 3) {
            feedbackTitle.innerText = "Zayn & Aara's Best Friend! 🏆";
            feedbackDesc.innerText = "Absolute perfection! You know the couple inside out. Ponmangalashamsakal!";
            triggerFlowerShower(30); // celebrate
        } else if (quizScore === 2) {
            feedbackTitle.innerText = "Almost Perfect! 🌟";
            feedbackDesc.innerText = "Fantastic score! You know the couple really well. Thank you for playing!";
        } else {
            feedbackTitle.innerText = "Good Try! 🌿";
            feedbackDesc.innerText = "You scored " + quizScore + "/3. Restart the quiz to discover their stories again!";
        }
    }

    window.restartQuiz = function () {
        // Reset state
        quizScore = 0;
        quizAnswers = { 1: null, 2: null, 3: null };

        // Reset buttons classes
        const quizButtons = document.querySelectorAll(".quiz-opt-btn");
        quizButtons.forEach(btn => {
            btn.removeAttribute("disabled");
            btn.className = "quiz-opt-btn";
        });

        // Hide result, show Q1
        document.getElementById("quiz-result").style.display = "none";
        document.getElementById("q-1").style.display = "block";
        document.getElementById("q-2").style.display = "none";
        document.getElementById("q-3").style.display = "none";
    };

    // ==========================================
    // 11. LIVE COUNTDOWN Muhurtham
    // ==========================================
    let countdownInterval;

    function initializeCountdown() {
        clearInterval(countdownInterval);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        function updateTimer() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
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
        countdownInterval = setInterval(updateTimer, 1000);
    }

    // ==========================================
    // 12. PHOTO GALLERY LIGHTBOX SYSTEM
    // ==========================================
    const lightboxModal = document.getElementById("gallery-lightbox");
    const lightboxMediaContainer = document.getElementById("lightbox-media-container");
    const lightboxCaptionText = document.getElementById("lightbox-caption-text");

    window.openLightbox = function (index) {
        currentGalleryIndex = index;
        lightboxModal.style.display = "flex";
        document.body.style.overflow = "hidden"; // Lock scroll
        updateLightboxContent();
    };

    window.closeLightbox = function () {
        lightboxModal.style.display = "none";
        document.body.style.overflow = "auto"; // Unlock scroll
    };

    window.navigateLightbox = function (direction) {
        currentGalleryIndex += direction;
        if (currentGalleryIndex >= galleryItems.length) {
            currentGalleryIndex = 0;
        } else if (currentGalleryIndex < 0) {
            currentGalleryIndex = galleryItems.length - 1;
        }
        updateLightboxContent();
    };

    function updateLightboxContent() {
        const item = galleryItems[currentGalleryIndex];

        lightboxMediaContainer.innerHTML = `
            <img src="images/gallery${currentGalleryIndex + 1}.png" class="lightbox-img" alt="${item.title}">
        `;

        lightboxCaptionText.innerText = item.desc;
    }

    // ==========================================
    // 13. RSVP SUBMISSION & VALIDATION
    // ==========================================
    window.handleRSVPSubmit = function (event) {
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

        // Display confirmation modal
        const modalTitle = document.getElementById("rsvp-success-title");
        const modalDesc = document.getElementById("rsvp-success-desc");

        if (status === "yes") {
            if (modalTitle) modalTitle.innerText = "Swagatham! 🌸";
            if (modalDesc) modalDesc.innerText = `Thank you, ${name}! Your presence (with ${attendees} attendee/s) is confirmed. Ponmangalashamsakal!`;
            triggerFlowerShower(25);
        } else {
            if (modalTitle) modalTitle.innerText = "Regrets Accepted 🌿";
            if (modalDesc) modalDesc.innerText = `Thank you for letting us know, ${name}. You will be missed in our prayers.`;
        }

        if (rsvpSuccessModal) {
            rsvpSuccessModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    };

    window.closeRSVPSuccess = function () {
        if (rsvpSuccessModal) rsvpSuccessModal.style.display = "none";
        document.body.style.overflow = "auto";
        if (rsvpForm) rsvpForm.reset();
    };

    // ==========================================
    // 14. LOCAL STORAGE WISHES WALL
    // ==========================================
    function loadWishes() {
        if (!wishesBoard) return;
        let wishes = [];
        try {
            const rawWishes = localStorage.getItem("kerala_wishes");
            if (rawWishes) {
                wishes = JSON.parse(rawWishes);
            }
        } catch (e) {
            console.error("Wishes could not be parsed from local storage.", e);
        }

        // Default seed blessings if database is empty
        if (wishes.length === 0) {
            wishes = [
                { sender: "Harikrishnan", text: "Wishing Zayn & Aara a wonderful married life filled with love, laughter, and standard blessings! Ponmangalashamsakal!" },
                { sender: "Sithara", text: "May your journey be beautiful and filled with standard Kasavu gold joy. Highly excited for the traditional Sadhya feast!" }
            ];
            localStorage.setItem("kerala_wishes", JSON.stringify(wishes));
        }

        renderWishes(wishes);
    }

    function renderWishes(wishes) {
        if (!wishesBoard) return;
        wishesBoard.innerHTML = "";

        // Reverse array to display most recent wishes first
        const sortedWishes = [...wishes].reverse();

        sortedWishes.forEach(wish => {
            const wishCard = document.createElement("div");
            wishCard.className = "wish-floating-card reveal active";
            wishCard.innerHTML = `
                <p class="wish-card-text">"${wish.text}"</p>
                <div class="wish-card-sender">- ${wish.sender}</div>
            `;
            wishesBoard.appendChild(wishCard);
        });
    }

    window.handleWishSubmit = function (event) {
        event.preventDefault();

        if (!wishSender || !wishText) return;

        const sender = wishSender.value.trim();
        const text = wishText.value.trim();

        if (sender === "" || text === "") {
            return;
        }

        let wishes = [];
        try {
            const rawWishes = localStorage.getItem("kerala_wishes");
            if (rawWishes) {
                wishes = JSON.parse(rawWishes);
            }
        } catch (e) {
            console.error("Could not fetch current blessings database.", e);
        }

        // Append new blessing
        wishes.push({ sender, text });
        localStorage.setItem("kerala_wishes", JSON.stringify(wishes));

        // Re-render and clear inputs
        renderWishes(wishes);
        wishText.value = "";
        wishSender.value = "";

        // Trigger flower drop to celebrate blessing submission
        triggerFlowerShower(15);
        showFlowerToast("Blessing Posted! Thank you! ❤️");
    };

    if (wishesBoard) {
        loadWishes();
    }

    // ==========================================
    // 15. VENUE COORDINATION REDIRECTS
    // ==========================================
    window.openMap = function (url) {
        window.open(url, "_blank", "noopener,noreferrer");
    };
});
