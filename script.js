/* ==============================
   SETTINGS
============================== */

// Secret password
const SECRET_PASSWORD = "04/12/2026";

// Birthday: 04 December 2026, 12:00 AM IST
const BIRTHDAY = new Date("2026-12-04T00:00:00+05:30");

// true = Testing mode (skip countdown)
// false = Real countdown
const TEST_MODE = true;

// Formspree endpoint
const FORMSPREE_URL = "https://formspree.io/f/xzepljrz";


/* ==============================
   NAVIGATION
============================== */

function next(number) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById("s" + number);

  if (!target) return;

  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  startMusic();

  if (number === 6) {
    requestAnimationFrame(() => {
      requestAnimationFrame(setupScratch);
    });
  }
}


/* ==============================
   BACKGROUND MUSIC
============================== */

let musicStarted = false;

function startMusic() {
  const music = document.getElementById("bgMusic");

  if (!music || musicStarted) return;

  music.volume = 0.35;

  music.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      // Browser may block autoplay.
      // Music will retry on the next user interaction.
    });
}


/* ==============================
   COUNTDOWN
============================== */

function updateCountdown() {
  const continueButton = document.getElementById("countContinue");
  const countText = document.getElementById("countText");

  if (TEST_MODE) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    countText.textContent = "Test Mode Activated! Your surprise is ready ❤️";
    continueButton.disabled = false;
    return;
  }

  const now = new Date();
  const difference = BIRTHDAY.getTime() - now.getTime();

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    countText.textContent = "Happy Birthday Bavani! 🎂❤️";
    continueButton.disabled = false;
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

  countText.textContent = "Waiting for your special day... ❤️";
  continueButton.disabled = true;
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ==============================
   PASSWORD
============================== */

function checkPassword() {
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("passError");

  if (password.toUpperCase() === SECRET_PASSWORD) {
    error.textContent = "";

    showModal(
      "🔓",
      "Unlocked!",
      "Your little surprises are waiting for you! ❤️"
    );

    setTimeout(() => {
      closeModal();
      next(4);
    }, 1500);

  } else {
    error.textContent = "Oops! Wrong password. Try again ❤️";
  }
}


/* ==============================
   A-Z BALLOON MESSAGES
============================== */

const alphabetMessages = {
  A: "Always keep smiling. Your smile makes everything beautiful! ❤️",
  B: "Beautiful memories begin with beautiful people like you.",
  C: "Cherish every little moment in your life.",
  D: "Dream big and never stop believing in yourself.",
  E: "Every day is special when you choose happiness.",
  F: "Forever stay happy and keep shining.",
  G: "God bless you with endless happiness.",
  H: "Happiness looks beautiful on you.",
  I: "I hope all your dreams come true.",
  J: "Just keep being the wonderful person you are.",
  K: "Keep smiling, because your smile is precious.",
  L: "Life gives beautiful moments. Enjoy every one of them.",
  M: "May your life be filled with love and laughter.",
  N: "Never lose the beautiful smile on your face.",
  O: "Only happiness and beautiful memories for you.",
  P: "Please stay the same wonderful person always.",
  Q: "Queen of your own beautiful world. Keep shining!",
  R: "Remember that you deserve all the happiness.",
  S: "Smile more, worry less and enjoy life.",
  T: "Today is your day. Make it unforgettable!",
  U: "Unique people deserve unique happiness.",
  V: "Very special wishes for a very special person.",
  W: "Wishing you a wonderful year ahead.",
  X: "Xtra happiness and love to you today!",
  Y: "You deserve every beautiful thing in this world.",
  Z: "Zero worries, endless smiles and unlimited happiness!"
};

const balloonColors = [
  "#ff4f81",
  "#a855f7",
  "#ff9f43",
  "#22b8cf",
  "#e64980",
  "#845ef7",
  "#f06595",
  "#20c997"
];

const openedLetters = new Set();

function createBalloons() {
  const grid = document.getElementById("balloonGrid");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Random order
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  letters.forEach((letter, index) => {
    const balloon = document.createElement("button");

    balloon.className = "balloon";
    balloon.textContent = letter;
    balloon.style.background =
      balloonColors[index % balloonColors.length];

    balloon.addEventListener("click", () => {
      openBalloon(letter, balloon);
    });

    grid.appendChild(balloon);
  });

  updateBalloonCount();
}

function openBalloon(letter, balloon) {
  if (openedLetters.has(letter)) return;

  openedLetters.add(letter);
  balloon.classList.add("opened");

  updateBalloonCount();
  sparkleBurst();

  showModal(
    "🎈",
    "Letter " + letter,
    alphabetMessages[letter]
  );
}

function updateBalloonCount() {
  const count = openedLetters.size;

  document.getElementById("balloonCount").textContent =
    "Opened: " + count + " / 26";

  document.getElementById("balloonContinue").disabled =
    count !== 26;

  if (count === 26) {
    setTimeout(() => {
      showModal(
        "🎉",
        "Amazing!",
        "You opened all 26 balloons! One more surprise is waiting."
      );
    }, 400);
  }
}


/* ==============================
   GIFT BOX
============================== */

let boxOpened = false;

function openBox() {
  if (boxOpened) return;

  boxOpened = true;

  const box = document.querySelector(".big-box");
  const text = document.getElementById("boxText");

  box.classList.add("opened");
  box.querySelector("span").textContent = "💝";

  text.textContent =
    "The most beautiful gift is a collection of lovely memories! ❤️";

  sparkleBurst();

  setTimeout(() => {
    next(6);
  }, 1800);
}


/* ==============================
   SCRATCH PHOTO
============================== */

let scratchCanvas;
let scratchContext;
let isScratching = false;
let scratchReady = false;
let scratchMoves = 0;
let scratchUnlocked = false;

function setupScratch() {
  if (scratchReady) return;

  scratchCanvas = document.getElementById("scratchCanvas");

  const wrap = document.getElementById("scratchWrap");

  if (!scratchCanvas || !wrap) return;

  const width = wrap.clientWidth;
  const height = wrap.clientHeight;

  if (!width || !height) return;

  const dpr = Math.max(1, window.devicePixelRatio || 1);

  scratchCanvas.width = Math.round(width * dpr);
  scratchCanvas.height = Math.round(height * dpr);

  scratchCanvas.style.width = width + "px";
  scratchCanvas.style.height = height + "px";

  scratchContext = scratchCanvas.getContext("2d", {
    willReadFrequently: true
  });

  scratchContext.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Scratch cover
  const gradient = scratchContext.createLinearGradient(
    0, 0, width, height
  );

  gradient.addColorStop(0, "#ff7eb3");
  gradient.addColorStop(0.5, "#ff4f9a");
  gradient.addColorStop(1, "#a83279");

  scratchContext.fillStyle = gradient;
  scratchContext.fillRect(0, 0, width, height);

  // Cover text
  scratchContext.fillStyle = "#ffffff";
  scratchContext.textAlign = "center";
  scratchContext.textBaseline = "middle";
  scratchContext.font = "bold 23px sans-serif";
  scratchContext.fillText(
    "Scratch Here ❤️",
    width / 2,
    height / 2
  );

  scratchContext.font = "15px sans-serif";
  scratchContext.fillText(
    "Reveal your memory",
    width / 2,
    height / 2 + 35
  );

  scratchReady = true;

  scratchCanvas.addEventListener("pointerdown", startScratch);
  scratchCanvas.addEventListener("pointermove", moveScratch);
  scratchCanvas.addEventListener("pointerup", stopScratch);
  scratchCanvas.addEventListener("pointercancel", stopScratch);
  scratchCanvas.addEventListener("pointerleave", stopScratch);
}

function getScratchPosition(event) {
  const rect = scratchCanvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startScratch(event) {
  if (scratchUnlocked) return;

  isScratching = true;

  scratchCanvas.setPointerCapture(event.pointerId);

  scratchAt(event);
}

function moveScratch(event) {
  if (!isScratching || scratchUnlocked) return;

  scratchAt(event);
}

function stopScratch() {
  isScratching = false;
}

function scratchAt(event) {
  const position = getScratchPosition(event);

  scratchContext.globalCompositeOperation = "destination-out";

  scratchContext.beginPath();
  scratchContext.arc(
    position.x,
    position.y,
    25,
    0,
    Math.PI * 2
  );

  scratchContext.fill();

  scratchMoves++;

  if (scratchMoves % 5 === 0) {
    checkScratchProgress();
  }
}

function checkScratchProgress() {
  if (scratchUnlocked) return;

  const canvasWidth = scratchCanvas.width;
  const canvasHeight = scratchCanvas.height;

  const imageData = scratchContext.getImageData(
    0,
    0,
    canvasWidth,
    canvasHeight
  );

  const pixels = imageData.data;

  let transparent = 0;
  let total = 0;

  // Sample every 16th pixel for better performance
  for (let i = 3; i < pixels.length; i += 64) {
    total++;

    if (pixels[i] < 100) {
      transparent++;
    }
  }

  const percentage = Math.round(
    (transparent / total) * 100
  );

  document.getElementById("scratchProgress").textContent =
    "Photo revealed: " + percentage + "%";

  if (percentage >= 55) {
    revealPhoto();
  }
}

function revealPhoto() {
  if (scratchUnlocked) return;

  scratchUnlocked = true;
  isScratching = false;

  const dpr = Math.max(1, window.devicePixelRatio || 1);

  scratchContext.setTransform(1, 0, 0, 1, 0, 0);
  scratchContext.clearRect(
    0,
    0,
    scratchCanvas.width,
    scratchCanvas.height
  );

  document.getElementById("scratchProgress").textContent =
    "Surprise revealed! ❤️";

  document.getElementById("scratchContinue").disabled = false;

  sparkleBurst();
}


/* ==============================
   POPUP MODAL
============================== */

function showModal(emoji, title, message) {
  document.getElementById("modalEmoji").textContent = emoji;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMessage").textContent = message;

  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}


/* ==============================
   SEND MESSAGE TO FORMSPREE
============================== */

async function saveResponse() {
  const message = document.getElementById("herMessage").value.trim();
  const button = document.getElementById("sendButton");
  const status = document.getElementById("responseStatus");

  if (!message) {
    status.textContent = "Please write a message first ❤️";
    return;
  }

  button.disabled = true;
  button.textContent = "Sending...";

  status.textContent = "";

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: "Bavani",
        message: message,
        subject: "Birthday Website Reply"
      })
    });

    if (!response.ok) {
      throw new Error("Message could not be sent.");
    }

    status.textContent = "Your message was sent successfully! ❤️";
    document.getElementById("herMessage").value = "";

    button.textContent = "Sent Successfully ❤️";

  } catch (error) {
    status.textContent =
      "Sorry! Message failed to send. Please try again.";

    button.disabled = false;
    button.textContent = "Send Message ❤️";
  }
}


/* ==============================
   SPARKLE EFFECT
============================== */

function sparkleBurst() {
  const emojis = ["✨", "💖", "💕", "🌸", "❤️"];

  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");

    sparkle.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.fontSize = "22px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "200";
    sparkle.style.transition = "all 1s ease";

    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform =
        "translateY(-70px) scale(1.5)";
      sparkle.style.opacity = "0";
    });

    setTimeout(() => sparkle.remove(), 1100);
  }
}


/* ==============================
   FLOATING HEARTS
============================== */

function createFloatingHeart() {
  const container = document.getElementById("hearts");

  const heart = document.createElement("div");

  heart.className = "heart";
  heart.textContent = ["❤️", "💕", "💖", "💗"][
    Math.floor(Math.random() * 4)
  ];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration =
    (5 + Math.random() * 5) + "s";

  container.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}


/* ==============================
   INITIALIZE
============================== */

document.addEventListener("DOMContentLoaded", () => {
  createBalloons();

  setInterval(createFloatingHeart, 800);

  // Enter key for password
  document.getElementById("password").addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        checkPassword();
      }
    }
  );

  // Start music on first interaction
  document.addEventListener("click", startMusic, {
    once: true
  });
});
                          
