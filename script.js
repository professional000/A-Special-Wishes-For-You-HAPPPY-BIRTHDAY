
/* =================================
   SETTINGS
================================= */

const SECRET_PASSWORD = "04/12/2026";

const BIRTHDAY = new Date("2026-12-04T00:00:00+05:30");

// true = Testing mode
// false = Real birthday countdown
const TEST_MODE = true;

const FORMSPREE_URL = "https://formspree.io/f/xzepljrz";


/* =================================
   NAVIGATION
================================= */

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


/* =================================
   MUSIC
================================= */

let musicStarted = false;

function startMusic() {
  const music = document.getElementById("bgMusic");

  if (!music || musicStarted) return;

  music.volume = 0.4;

  music.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {});
}


/* =================================
   COUNTDOWN
================================= */

function updateCountdown() {
  const button = document.getElementById("countContinue");
  const countText = document.getElementById("countText");

  if (TEST_MODE) {
    ["days","hours","minutes","seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });

    countText.textContent =
      "Test Mode Activated! Your surprise is ready! ✨";

    button.disabled = false;
    return;
  }

  const difference = BIRTHDAY.getTime() - Date.now();

  if (difference <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });

    countText.textContent = "Happy Birthday Bavani! 🎂❤️";
    button.disabled = false;
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference / 3600000) % 24);
  const minutes = Math.floor((difference / 60000) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent =
    String(days).padStart(2,"0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2,"0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2,"0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2,"0");

  countText.textContent = "Waiting for your special day... 💖";
  button.disabled = true;
}

updateCountdown();
setInterval(updateCountdown,1000);


/* =================================
   PASSWORD
================================= */

function checkPassword() {
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("passError");

  if (password.toUpperCase() === SECRET_PASSWORD) {
    error.textContent = "";

    showModal(
      "🔓",
      "Welcome Bavani!",
      "Your magical birthday surprises are waiting!"
    );

    setTimeout(() => {
      closeModal();
      next(4);
    },1400);

  } else {
    error.textContent = "Wrong password! Try again ❤️";
  }
}


/* =================================
   A-Z BALLOONS
================================= */

const alphabetMessages = {
  A:"Always keep smiling. Your smile makes everything beautiful! ❤️",
  B:"Beautiful memories begin with beautiful people like you.",
  C:"Cherish every little moment in your life.",
  D:"Dream big and never stop believing in yourself.",
  E:"Every day is special when you choose happiness.",
  F:"Forever stay happy and keep shining.",
  G:"God bless you with endless happiness.",
  H:"Happiness looks beautiful on you.",
  I:"I hope all your dreams come true.",
  J:"Just keep being the wonderful person you are.",
  K:"Keep smiling, because your smile is precious.",
  L:"Life gives beautiful moments. Enjoy every one of them.",
  M:"May your life be filled with love and laughter.",
  N:"Never lose the beautiful smile on your face.",
  O:"Only happiness and beautiful memories for you.",
  P:"Please stay the same wonderful person always.",
  Q:"Queen of your own beautiful world. Keep shining!",
  R:"Remember that you deserve all the happiness.",
  S:"Smile more, worry less and enjoy life.",
  T:"Today is your day. Make it unforgettable!",
  U:"Unique people deserve unique happiness.",
  V:"Very special wishes for a very special person.",
  W:"Wishing you a wonderful year ahead.",
  X:"Extra happiness and love to you today!",
  Y:"You deserve every beautiful thing in this world.",
  Z:"Zero worries, endless smiles and unlimited happiness!"
};

const balloonColors = [
  "#ec4899",
  "#8b5cf6",
  "#06b6d4",
  "#f59e0b",
  "#6366f1",
  "#14b8a6",
  "#d946ef",
  "#3b82f6"
];

const openedLetters = new Set();

function createBalloons() {
  const grid = document.getElementById("balloonGrid");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i],letters[j]] = [letters[j],letters[i]];
  }

  letters.forEach((letter,index) => {
    const balloon = document.createElement("button");

    balloon.className = "balloon";
    balloon.textContent = letter;
    balloon.style.background =
      `linear-gradient(145deg, white, ${balloonColors[index % balloonColors.length]})`;

    balloon.style.color = "#fff";
    balloon.style.textShadow = "0 0 8px #fff";

    balloon.addEventListener("click",() => {
      openBalloon(letter,balloon);
    });

    grid.appendChild(balloon);
  });
}

function openBalloon(letter,balloon) {
  if (openedLetters.has(letter)) return;

  openedLetters.add(letter);
  balloon.classList.add("opened");

  updateBalloonCount();

  showStarExplosion(
    window.innerWidth / 2,
    window.innerHeight / 2,
    12
  );

  showModal("🎈","Letter "+letter,alphabetMessages[letter]);
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
        "🌈",
        "All 26 Balloons Opened!",
        "Amazing! Your next magical surprise is waiting."
      );
    },500);
  }
}


/* =================================
   GIFT BOX
================================= */

let boxOpened = false;

function openBox() {
  if (boxOpened) return;

  boxOpened = true;

  const box = document.getElementById("giftBox");

  box.classList.add("opened");

  document.getElementById("boxText").textContent =
    "Your magical memory is waiting! 💎";

  showStarExplosion(
    window.innerWidth / 2,
    window.innerHeight / 2,
    35
  );

  setTimeout(() => {
    next(6);
  },1800);
}


/* =================================
   SCRATCH PHOTO REVEAL
================================= */

let scratchCanvas = null;
let scratchContext = null;
let scratchReady = false;
let isScratching = false;
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

  const dpr = Math.max(1,window.devicePixelRatio || 1);

  scratchCanvas.width = Math.round(width * dpr);
  scratchCanvas.height = Math.round(height * dpr);

  scratchCanvas.style.width = width + "px";
  scratchCanvas.style.height = height + "px";

  scratchContext = scratchCanvas.getContext("2d",{
    willReadFrequently:true
  });

  scratchContext.setTransform(dpr,0,0,dpr,0,0);

  // Rainbow crystal scratch cover
  const gradient = scratchContext.createLinearGradient(
    0,0,width,height
  );

  gradient.addColorStop(0,"#06b6d4");
  gradient.addColorStop(.25,"#8b5cf6");
  gradient.addColorStop(.5,"#ec4899");
  gradient.addColorStop(.75,"#facc15");
  gradient.addColorStop(1,"#22d3ee");

  scratchContext.fillStyle = gradient;
  scratchContext.fillRect(0,0,width,height);

  // Glitter texture
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    scratchContext.beginPath();
    scratchContext.arc(x,y,Math.random()*1.8 + .4,0,Math.PI*2);
    scratchContext.fillStyle = "rgba(255,255,255,.8)";
    scratchContext.fill();
  }

  scratchContext.fillStyle = "white";
  scratchContext.textAlign = "center";
  scratchContext.textBaseline = "middle";
  scratchContext.shadowColor = "#fff";
  scratchContext.shadowBlur = 15;
  scratchContext.font = "bold 22px sans-serif";

  scratchContext.fillText(
    "SCRATCH TO REVEAL ✨",
    width/2,
    height/2
  );

  scratchContext.shadowBlur = 0;

  scratchReady = true;

  scratchCanvas.addEventListener("pointerdown",startScratch);
  scratchCanvas.addEventListener("pointermove",moveScratch);
  scratchCanvas.addEventListener("pointerup",stopScratch);
  scratchCanvas.addEventListener("pointercancel",stopScratch);
  scratchCanvas.addEventListener("pointerleave",stopScratch);
}

function getScratchPosition(event) {
  const rect = scratchCanvas.getBoundingClientRect();

  return {
    x:event.clientX - rect.left,
    y:event.clientY - rect.top
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
  const pos = getScratchPosition(event);

  scratchContext.globalCompositeOperation = "destination-out";

  scratchContext.beginPath();
  scratchContext.arc(pos.x,pos.y,26,0,Math.PI*2);
  scratchContext.fill();

  scratchMoves++;

  if (scratchMoves % 5 === 0) {
    checkScratchProgress();
  }
}

function checkScratchProgress() {
  if (scratchUnlocked) return;

  const imageData = scratchContext.getImageData(
    0,0,scratchCanvas.width,scratchCanvas.height
  );

  const pixels = imageData.data;

  let transparent = 0;
  let total = 0;

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
    "Photo revealed: " + percentage + "% ✨";

  if (percentage >= 55) {
    revealPhoto();
  }
}


/* =================================
   PHOTO REVEAL STAR EFFECTS ⭐
================================= */

function revealPhoto() {
  if (scratchUnlocked) return;

  scratchUnlocked = true;
  isScratching = false;

  scratchContext.setTransform(1,0,0,1,0,0);

  scratchContext.clearRect(
    0,
    0,
    scratchCanvas.width,
    scratchCanvas.height
  );

  scratchCanvas.style.pointerEvents = "none";

  document.getElementById("photoOverlay").classList.add("hidden");

  document.getElementById("scratchProgress").textContent =
    "✨ Your beautiful memory is revealed! ⭐💎";

  document.getElementById("scratchContinue").disabled = false;

  // Big star explosion
  const rect = document.getElementById("scratchWrap").getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Star explosion at photo centre
  showStarExplosion(centerX,centerY,70);

  // Additional stars around the photo
  setTimeout(() => {
    showStarExplosion(rect.left + 30,rect.top + 30,20);
    showStarExplosion(rect.right - 30,rect.top + 30,20);
    showStarExplosion(rect.left + 30,rect.bottom - 30,20);
    showStarExplosion(rect.right - 30,rect.bottom - 30,20);
  },300);

  // More magical sparkle waves
  setTimeout(() => {
    showStarExplosion(centerX,centerY,35);
  },800);
}


/* =================================
   STAR EXPLOSION ENGINE
================================= */

function showStarExplosion(x,y,count = 30) {
  const symbols = ["⭐","✨","💎","🌟","✦"];

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");

    star.className = "star-effect";

    star.textContent =
      symbols[Math.floor(Math.random()*symbols.length)];

    star.style.left = x + "px";
    star.style.top = y + "px";

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 170;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    star.style.setProperty("--x",dx+"px");
    star.style.setProperty("--y",dy+"px");

    star.style.fontSize =
      (13 + Math.random()*20) + "px";

    star.style.animationDelay =
      (Math.random()*.35) + "s";

    document.body.appendChild(star);

    setTimeout(() => star.remove(),1800);
  }
}


/* =================================
   MODAL
================================= */

function showModal(emoji,title,message) {
  document.getElementById("modalEmoji").textContent = emoji;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalMessage").textContent = message;

  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}


/* =================================
   FORMSPREE MESSAGE
================================= */

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
    const response = await fetch(FORMSPREE_URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify({
        name:"Bavani",
        message:message,
        subject:"Bavani Birthday Website Reply"
      })
    });

    if (!response.ok) {
      throw new Error("Message failed");
    }

    status.textContent = "Your message was sent successfully! 💖";

    document.getElementById("herMessage").value = "";

    button.textContent = "Sent Successfully ❤️";

  } catch(error) {
    status.textContent =
      "Message could not be sent. Please try again.";

    button.disabled = false;
    button.textContent = "Send Message ❤️";
  }
}


/* =================================
   BACKGROUND PARTICLES
================================= */

function createParticles() {
  const container = document.getElementById("particles");

  for (let i = 0; i < 45; i++) {
    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random()*100+"%";
    particle.style.animationDuration =
      (5 + Math.random()*12)+"s";

    particle.style.animationDelay =
      (-Math.random()*15)+"s";

    const size = 2 + Math.random()*4;

    particle.style.width = size+"px";
    particle.style.height = size+"px";

    container.appendChild(particle);
  }
}


/* =================================
   INITIALIZATION
================================= */

document.addEventListener("DOMContentLoaded",() => {
  createBalloons();
  createParticles();

  document.addEventListener("click",startMusic,{
    once:true
  });

  document.getElementById("password").addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        checkPassword();
      }
    }
  );
});
