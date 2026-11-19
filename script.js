
/* ==================================================
   BAVANI'S MAGICAL BIRTHDAY SURPRISE ❤️
   COMPLETE JAVASCRIPT
================================================== */


/* ==================================================
   01. SETTINGS
================================================== */

const SECRET_PASSWORD = "BAVANI";

// Birthday: 04 December 2026
// Unlock time: 12:00 AM Indian Standard Time
const BIRTHDAY = new Date("2026-12-04T00:00:00+05:30");

// TEST MODE
// true  = Test website immediately
// false = Wait until birthday midnight

const TEST_MODE = true;

const FORMSPREE_URL = "https://formspree.io/f/xzepljrz";


/* ==================================================
   02. NAVIGATION
================================================== */

function next(number) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById("s" + number);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (number === 4) {
        createBalloons();
    }

    if (number === 6) {
        requestAnimationFrame(setupScratch);
    }

    if (number === 8) {
        createSparkles();
    }
}


/* ==================================================
   03. BACKGROUND MUSIC
================================================== */

const music = new Audio("romantic.mp3");

music.loop = true;
music.volume = 0.35;

let musicStarted = false;

function startMusic() {

    if (musicStarted) return;

    music.play()
        .then(() => {
            musicStarted = true;
        })
        .catch(() => {
            console.log("Music waiting for user interaction.");
        });
}

document.addEventListener("click", startMusic);


/* ==================================================
   04. REAL-TIME COUNTDOWN + TEST MODE
================================================== */

function updateCountdown() {

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const countText = document.getElementById("countText");
    const continueButton = document.getElementById("countContinue");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    // TEST MODE
    if (TEST_MODE) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        if (countText) {
            countText.textContent =
                "🧪 TEST MODE: Your surprise is ready! ❤️";
        }

        if (continueButton) {
            continueButton.disabled = false;
            continueButton.textContent = "TEST OPEN SURPRISE ✨";
        }

        return;
    }

    // REAL COUNTDOWN
    const now = new Date();
    const difference = BIRTHDAY.getTime() - now.getTime();

    // Birthday reached
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        if (countText) {
            countText.textContent =
                "🎂 Happy Birthday Bavani! Your surprise is ready! ❤️";
        }

        if (continueButton) {
            continueButton.disabled = false;
            continueButton.textContent = "OPEN YOUR SURPRISE ❤️";
        }

        return;
    }

    // Birthday not reached
    if (continueButton) {
        continueButton.disabled = true;
        continueButton.textContent = "WAIT FOR MIDNIGHT ⏳";
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

    if (countText) {
        countText.textContent =
            "Counting every moment until your special day... ❤️";
    }
}

// Start countdown
updateCountdown();

// Refresh every second
setInterval(updateCountdown, 1000);


/* ==================================================
   05. PASSWORD PROTECTION
================================================== */

function checkPassword() {

    const passwordInput = document.getElementById("password");
    const error = document.getElementById("passError");

    if (!passwordInput) return;

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword.toUpperCase() === SECRET_PASSWORD) {

        if (error) {
            error.textContent = "";
        }

        next(4);

    } else {

        if (error) {
            error.textContent = "Wrong password! Try again ❤️";
        }

        passwordInput.value = "";
        passwordInput.focus();
    }
}


/* ==================================================
   06. A TO Z – 26 SPECIAL MESSAGES
================================================== */

const alphabetMessages = {

    A: "A beautiful soul deserves endless happiness. ❤️",

    B: "Be happy, keep smiling and always shine. ✨",

    C: "Create beautiful memories wherever you go. 🌸",

    D: "Dream big. You deserve every beautiful thing. 💖",

    E: "Every moment of your life should be magical. 🌟",

    F: "Find happiness in every little thing. 🦋",

    G: "Good things are always waiting for you. 🎀",

    H: "Happiness looks beautiful on you. 😊",

    I: "Imagine a life filled with endless smiles. 💕",

    J: "Just keep being the wonderful person you are. 🌷",

    K: "Keep shining like the brightest star. ⭐",

    L: "Let your dreams become your reality. 💫",

    M: "May your heart always be filled with love. ❤️",

    N: "Never stop smiling, Bavani. 🥰",

    O: "Only beautiful moments should fill your life. 🌹",

    P: "Peace, love and happiness always follow you. 🕊️",

    Q: "Quiet moments can hold the sweetest memories. 💗",

    R: "Remember, you are truly special. 🎁",

    S: "Smile more, worry less and enjoy life. 🌻",

    T: "Today is all about celebrating you. 🎂",

    U: "Unforgettable memories make life beautiful. 💝",

    V: "Very special people deserve magical moments. ✨",

    W: "Wishing you a lifetime of happiness. 💐",

    X: "Xtra happiness and love for you today. 💓",

    Y: "You deserve the whole world of happiness. 🌍",

    Z: "Zero limits to your dreams and happiness. 🌈"

};


/* ==================================================
   07. BALLOON COLORS
================================================== */

const balloonColors = [

    "#ff4d6d",
    "#ff85a1",
    "#c77dff",
    "#7b2cbf",
    "#4895ef",
    "#4cc9f0",
    "#06d6a0",
    "#ffd166",
    "#fb8500",
    "#f72585",
    "#b5179e",
    "#90be6d",
    "#ff6b6b"

];


/* ==================================================
   08. SHUFFLE ARRAY
================================================== */

function shuffle(array) {

    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}


/* ==================================================
   09. CREATE 26 BALLOONS – A TO Z
================================================== */

let openedBalloons = new Set();
let balloonsCreated = false;

function createBalloons() {

    const container = document.getElementById("balloonGrid");

    if (!container) return;

    if (balloonsCreated) return;

    balloonsCreated = true;

    openedBalloons.clear();

    container.innerHTML = "";

    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const shuffledAlphabets = shuffle(alphabets);

    shuffledAlphabets.forEach((letter, index) => {

        const balloon = document.createElement("button");

        balloon.className = "balloon";
        balloon.type = "button";

        balloon.textContent = letter;

        balloon.dataset.letter = letter;

        balloon.style.background =
            balloonColors[index % balloonColors.length];

        balloon.style.animationDelay =
            Math.random() * 2 + "s";

        balloon.addEventListener("click", () => {

            if (openedBalloons.has(letter)) return;

            openedBalloons.add(letter);

            balloon.classList.add("opened");

            balloon.disabled = true;

            showBalloonMessage(letter);

            updateBalloonCount();

        });

        container.appendChild(balloon);

    });

    updateBalloonCount();
}


/* ==================================================
   10. BALLOON COUNTER
================================================== */

function updateBalloonCount() {

    const counter = document.getElementById("balloonCount");

    const continueButton =
        document.getElementById("balloonContinue");

    if (counter) {

        counter.textContent =
            openedBalloons.size + " / 26 opened";

    }

    if (continueButton) {

        continueButton.disabled =
            openedBalloons.size !== 26;

    }
}


/* ==================================================
   11. SHOW BALLOON MESSAGE
================================================== */

function showBalloonMessage(letter) {

    const modal = document.getElementById("modal");

    const title = document.getElementById("modalTitle");

    const message = document.getElementById("modalMessage");

    const emoji = document.getElementById("modalEmoji");

    if (!modal || !title || !message) return;

    title.textContent = "Letter " + letter + " ❤️";

    message.textContent = alphabetMessages[letter];

    if (emoji) {
        emoji.textContent = "🎈";
    }

    modal.classList.add("show");

    createSparkles();
}


/* ==================================================
   12. CLOSE MESSAGE POPUP
================================================== */

function closeModal() {

    const modal = document.getElementById("modal");

    if (modal) {
        modal.classList.remove("show");
    }
}


/* ==================================================
   13. SPECIAL GIFT BOX
================================================== */

let giftOpened = false;

function openBox() {

    if (giftOpened) return;

    giftOpened = true;

    const gift = document.querySelector(".big-box");

    const boxText = document.getElementById("boxText");

    if (gift) {
        gift.textContent = "💝";
        gift.style.animation = "none";
    }

    if (boxText) {
        boxText.textContent =
            "Your special memory is waiting... ❤️";
    }

    createSparkles();

    setTimeout(() => {
        next(6);
    }, 1200);
}


/* ==================================================
   14. SCRATCH PHOTO ELEMENTS
================================================== */

const hiddenPhoto = document.getElementById("hiddenPhoto");

const canvas = document.getElementById("scratchCanvas");

const ctx = canvas ? canvas.getContext("2d") : null;

let scratching = false;

let scratched = false;

let scratchReady = false;


/* ==================================================
   15. PHOTO LOADING
================================================== */

if (hiddenPhoto) {

    hiddenPhoto.onload = () => {

        if (
            document.getElementById("s6")
                ?.classList.contains("active")
        ) {
            resetScratch();
        }

    };

    hiddenPhoto.onerror = () => {

        console.error("Birthday photo not found!");

        const progress =
            document.getElementById("scratchProgress");

        if (progress) {

            progress.textContent =
                "Photo loading failed. Check bavani-photo.jpg";

        }

    };

}


/* ==================================================
   16. SETUP SCRATCH
================================================== */

function setupScratch() {

    if (!canvas || !ctx || !hiddenPhoto) return;

    if (
        hiddenPhoto.complete &&
        hiddenPhoto.naturalWidth > 0
    ) {
        resetScratch();
    }

}


/* ==================================================
   17. RESET SCRATCH CANVAS
================================================== */

function resetScratch() {

    if (!canvas || !ctx || !hiddenPhoto) return;

    const wrap = document.getElementById("scratchWrap");

    if (!wrap || !hiddenPhoto.naturalWidth) return;

    const width = wrap.clientWidth;

    const height = wrap.clientHeight;

    if (!width || !height) return;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(width * dpr);

    canvas.height = Math.round(height * dpr);

    canvas.style.width = width + "px";

    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.globalCompositeOperation = "source-over";

    // Scratch cover gradient
    const gradient = ctx.createLinearGradient(
        0, 0, width, height
    );

    gradient.addColorStop(0, "#ff4d6d");

    gradient.addColorStop(0.5, "#c77dff");

    gradient.addColorStop(1, "#4895ef");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, width, height);

    // Scratch instructions
    ctx.fillStyle = "#ffffff";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.font = "bold 22px Arial";

    ctx.fillText(
        "✨ SCRATCH TO REVEAL ✨",
        width / 2,
        height / 2
    );

    ctx.font = "15px Arial";

    ctx.fillText(
        "A little surprise is waiting for you ❤️",
        width / 2,
        height / 2 + 35
    );

    // Enable scratch erasing
    ctx.globalCompositeOperation = "destination-out";

    scratched = false;

    scratching = false;

    scratchReady = true;

    const progress =
        document.getElementById("scratchProgress");

    const button =
        document.getElementById("scratchContinue");

    if (progress) {
        progress.textContent = "0% revealed";
    }

    if (button) {
        button.disabled = true;
    }

}


/* ==================================================
   18. POINTER POSITION
================================================== */

function getPosition(event) {

    const rect = canvas.getBoundingClientRect();

    return {

        x: event.clientX - rect.left,

        y: event.clientY - rect.top

    };

}


/* ==================================================
   19. SCRATCH FUNCTION
================================================== */

function scratch(event) {

    if (!scratching || scratched || !scratchReady) return;

    if (!ctx || !canvas) return;

    const position = getPosition(event);

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(
        position.x,
        position.y,
        24,
        0,
        Math.PI * 2
    );

    ctx.fill();

    sparkleBurst(position.x, position.y);

    checkScratchProgress();

}


/* ==================================================
   20. CHECK SCRATCH PERCENTAGE
================================================== */

function checkScratchProgress() {

    if (!ctx || !canvas || scratched) return;

    const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const data = imageData.data;

    let transparent = 0;

    let total = 0;

    // Sample pixels to calculate progress
    for (let i = 3; i < data.length; i += 160) {

        total++;

        if (data[i] < 80) {
            transparent++;
        }

    }

    const percent = Math.floor(
        (transparent / total) * 100
    );

    const progress =
        document.getElementById("scratchProgress");

    if (progress) {

        progress.textContent =
            percent + "% revealed";

    }

    // 80% completed
    if (percent >= 80) {

        scratched = true;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const button =
            document.getElementById("scratchContinue");

        if (button) {
            button.disabled = false;
        }

        if (progress) {

            progress.textContent =
                "🎉 Surprise revealed! ❤️";

        }

        createSparkles();

    }

}


/* ==================================================
   21. SCRATCH EVENTS
================================================== */

if (canvas) {

    canvas.addEventListener("pointerdown", event => {

        if (scratched || !scratchReady) return;

        scratching = true;

        canvas.setPointerCapture(event.pointerId);

        scratch(event);

    });

    canvas.addEventListener("pointermove", scratch);

    canvas.addEventListener("pointerup", () => {

        scratching = false;

    });

    canvas.addEventListener("pointercancel", () => {

        scratching = false;

    });

}


/* ==================================================
   22. SCRATCH SPARKLE EFFECT
================================================== */

function sparkleBurst(x, y) {

    const wrap = document.getElementById("scratchWrap");

    if (!wrap) return;

    for (let i = 0; i < 3; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "scratchSparkle";

        sparkle.textContent = "✨";

        sparkle.style.position = "absolute";

        sparkle.style.left = x + "px";

        sparkle.style.top = y + "px";

        sparkle.style.pointerEvents = "none";

        sparkle.style.zIndex = "5";

        wrap.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);

    }

}


/* ==================================================
   23. GENERAL SPARKLE EFFECT
================================================== */

function createSparkles() {

    for (let i = 0; i < 20; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.textContent =
            ["✨", "⭐", "💖", "🌟"][
                Math.floor(Math.random() * 4)
            ];

        sparkle.style.position = "fixed";

        sparkle.style.left =
            Math.random() * 100 + "vw";

        sparkle.style.top =
            Math.random() * 100 + "vh";

        sparkle.style.pointerEvents = "none";

        sparkle.style.zIndex = "9999";

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1800);

    }

}


/* ==================================================
   24. SEND MESSAGE TO FORMSPREE
================================================== */

async function saveResponse() {

    const messageInput =
        document.getElementById("herMessage");

    const status =
        document.getElementById("responseStatus");

    const sendButton =
        document.getElementById("sendButton");

    if (!messageInput || !messageInput.value.trim()) {

        if (status) {

            status.textContent =
                "Write a little message first ❤️";

        }

        return;

    }

    const data = {

        name: "Bavani",

        message: messageInput.value.trim(),

        subject: "A special message from Bavani ❤️"

    };

    if (status) {

        status.textContent =
            "Sending your message... 💌";

    }

    if (sendButton) {
        sendButton.disabled = true;
    }

    try {

        const response = await fetch(FORMSPREE_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

        
