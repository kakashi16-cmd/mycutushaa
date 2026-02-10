const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const timerDisplay = document.getElementById('timer');
const title = document.querySelector('.title');

let noClickCount = 0;
let yesBtnSize = 1.2; // Base font size in rem

const noTexts = [
    "Are you sure?",
    "Really?",
    "shaa please baby !",
    "Last chance!",
    "my cutu shaa please ",
    "You might regret this!",
    "Give it another thought!",
    "I'll be very sad...",
    "Why are you doing this?",
    "Ok, now you are just being mean!",
    "Please?",
    "Pretty please?",
    "I am begging you",
    "Don't do this to me :("
];

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let valentinesDay = new Date(currentYear, 1, 14); // Month is 0-indexed, so 1 is Feb

    if (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14)) {
        valentinesDay.setFullYear(currentYear + 1);
    }

    const diff = valentinesDay - now;

    if (diff <= 0) {
        timerDisplay.textContent = "Happy Valentine's Day!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// No Button Interaction
function moveNoBtn() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function handleNoInteraction() {
    // 1. Move the button
    // moveNoBtn(); // Optional: We can make it move AND change text, or just change text/grow YES. 
    // The prompt asked for "moving button logic" in the first step, then "custom text" and "yes gets bigger".
    // Let's do all of them for maximum chaos/fun.

    // Actually, simply moving it might make it impossible to click to see the text changes if it moves on hover. 
    // Let's make it move on CLICK if on mobile, or Hover on desktop? 
    // The user requirement "try to click on no" implies clicking. 

    // Change text
    if (noClickCount < noTexts.length) {
        noBtn.textContent = noTexts[noClickCount];
    } else {
        noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];
        moveNoBtn(); // Start moving it frantically after running out of texts
    }

    noClickCount++;

    // Grow Yes Button
    yesBtnSize += 0.5; // Increase rem
    yesBtn.style.fontSize = `${yesBtnSize}rem`;
    // Optional: make it take up more space visually
    yesBtn.style.padding = `${yesBtnSize}rem ${yesBtnSize * 2}rem`;
}

noBtn.addEventListener('click', handleNoInteraction);
// noBtn.addEventListener('mouseover', moveNoBtn); // Maybe too aggressive if we want them to read the text

// Yes Button Interaction
yesBtn.addEventListener('click', () => {
    celebration.classList.remove('hidden');
    celebration.classList.add('visible');

    // Fire confetti
    const duration = 15 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        // and a few from the right edge
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});

// Music Toggle
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
});
