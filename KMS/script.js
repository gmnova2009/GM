// ================= Smooth scroll =================
const continueBtn = document.getElementById("continue-btn");
const firstTarget = document.getElementById("target");

if (continueBtn && firstTarget) {
  continueBtn.addEventListener("click", () => {
    firstTarget.scrollIntoView({ behavior: "smooth" });
  });
}

document.querySelectorAll(".next-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentSection = btn.closest("section");
    const nextSection = currentSection.nextElementSibling;
    if (nextSection && nextSection.tagName === "SECTION") {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ================= Scroll reveal =================
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  reveals.forEach((section) => {
    if (section.getBoundingClientRect().top < window.innerHeight - 120) {
      section.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ================= Forgive hearts =================
const forgiveBtn = document.querySelector(".forgive-btn");
const forgiveTitle = document.querySelector(".forgive h2");

if (forgiveBtn && forgiveTitle) {
  forgiveBtn.addEventListener("click", () => {
    forgiveTitle.textContent = "მადლობა, რომ წაიკითხე 🤍";

    for (let i = 0; i < 30; i++) { // მეტი გულისთვის
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.bottom = "0";
      heart.style.fontSize = Math.random() * 15 + 18 + "px";
      heart.style.animation = `floatUp ${2 + Math.random() * 1.5}s ease forwards`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3500);
    }
  });
}

// ================= Music control =================
const musicBtn = document.getElementById("music-btn");
const music = document.getElementById("bg-music");

let userInteracted = false;

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.volume = 0.25;
    music.play().catch(() => console.log("Autoplay blocked."));
    if (musicBtn) musicBtn.textContent = "⏸";
  } else {
    music.pause();
    if (musicBtn) musicBtn.textContent = "🎵";
  }
}

if (musicBtn && music) {
  musicBtn.addEventListener("click", () => {
    userInteracted = true;
    toggleMusic();
  });

  document.addEventListener(
    "click",
    () => {
      if (!userInteracted && music.paused) {
        toggleMusic();
        userInteracted = true;
      }
    },
    { once: true }
  );

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (!music.paused) {
        music.pause();
        music.dataset.wasPlaying = "true";
        if (musicBtn) musicBtn.textContent = "🎵";
      }
    } else {
      if (music.dataset.wasPlaying) {
        delete music.dataset.wasPlaying;
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement?.tagName;
    if (e.key?.toLowerCase() === "m") toggleMusic();
    else if (e.code === "Space" && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
      e.preventDefault();
      toggleMusic();
    }
  });
}

// ================= Swipe navigation for mobile =================
let touchStartY = 0;
let touchEndY = 0;
let isScrolling = false;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

window.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY;
  if (!isScrolling) handleGesture();
});

function handleGesture() {
  const delta = touchStartY - touchEndY;
  if (Math.abs(delta) > 40) {
    isScrolling = true;
    if (delta > 0) {
      const next = getNextSectionInView();
      if (next) next.scrollIntoView({ behavior: "smooth" });
    } else {
      const prev = getPrevSectionInView();
      if (prev) prev.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => (isScrolling = false), 800);
  }
}

function getNextSectionInView() {
  const sections = document.querySelectorAll("section");
  for (let s of sections) {
    const rect = s.getBoundingClientRect();
    if (rect.top > 10) return s;
  }
  return null;
}

function getPrevSectionInView() {
  const sections = Array.from(document.querySelectorAll("section"));
  for (let i = sections.length - 1; i >= 0; i--) {
    const rect = sections[i].getBoundingClientRect();
    if (rect.top < -10) return sections[i];
  }
  return null;
}
