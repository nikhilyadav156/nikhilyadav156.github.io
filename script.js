document.addEventListener('DOMContentLoaded', () => {

    /* ===========================
       SOUND SYSTEM
    =========================== */
    let soundEnabled = false;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function initAudio() {
        if (!audioCtx) audioCtx = new AudioCtx();
    }

    function playClick() {
        if (!soundEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.1);
        } catch(e) {}
    }

    function playHover() {
        if (!soundEnabled || !audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 0.06);
        } catch(e) {}
    }

    // Sound toggle
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            initAudio();
            soundEnabled = !soundEnabled;
            soundToggle.classList.toggle('active', soundEnabled);
            const icon = document.getElementById('sound-icon');
            if (icon) {
                icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            }
            if (soundEnabled) playClick();
        });
    }

    // Attach sound to all [data-sound] elements
    document.querySelectorAll('[data-sound]').forEach(el => {
        el.addEventListener('click', playClick);
        el.addEventListener('mouseenter', playHover);
    });

    /* ===========================
       SCROLL ANIMATIONS
    =========================== */
    const animEls = document.querySelectorAll('.card, .section-label, .hero-badge, .hero-title, .hero-subtitle, .hero-tags');
    animEls.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));

    /* ===========================
       ACTIVE NAV LINK ON SCROLL
    =========================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    /* ===========================
       SMOOTH SCROLL NAV
    =========================== */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            playClick();
        });
    });

    /* ===========================
       STAGGER ANIMATION DELAY
    =========================== */
    document.querySelectorAll('.skills-grid .card, .achievements-grid .card, .hero-tags .tag').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.08) + 's';
    });

});
