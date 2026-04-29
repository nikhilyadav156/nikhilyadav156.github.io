document.addEventListener('DOMContentLoaded', () => {

    /* === PARTICLES.JS — LIGHT THEME === */
    if(window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 900 } },
                "color": { "value": "#c7d2fe" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true, "distance": 150,
                    "color": "#a5b4fc", "opacity": 0.2, "width": 1
                },
                "move": {
                    "enable": true, "speed": 1.5, "direction": "none",
                    "random": false, "straight": false, "out_mode": "out", "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    /* === CUSTOM CURSOR === */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    if (!isTouchDevice && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.animate({
                left: `${e.clientX}px`, top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        });

        document.querySelectorAll('a, .bento-item, .social-btn, .pill').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    } else {
        if(cursorDot) cursorDot.style.display = 'none';
        if(cursorOutline) cursorOutline.style.display = 'none';
    }

    /* === 3D TILT EFFECT === */
    document.querySelectorAll('[data-tilt]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (isTouchDevice) return;
            const rect = el.getBoundingClientRect();
            const rotateX = ((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * -3;
            const rotateY = ((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 3;
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
        });
        el.addEventListener('mouseleave', () => {
            if (isTouchDevice) return;
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
        });
    });

    /* === ANIMATED COUNTER === */
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / 200;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else { counter.innerText = target; }
            };
            updateCount();
        });
    };
    setTimeout(animateCounters, 1000);

    /* === CHART.JS RADAR — LIGHT THEME === */
    const ctx = document.getElementById('skillsRadarChart');
    if(ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Machine Learning', 'Data Analysis', 'Python', 'SQL & Databases', 'MLOps / Docker', 'Frontend Dev'],
                datasets: [{
                    label: 'Skill Level',
                    data: [88, 90, 95, 85, 80, 75],
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    borderColor: 'rgba(99, 102, 241, 0.8)',
                    pointBackgroundColor: 'rgba(139, 92, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(139, 92, 246, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0, 0, 0, 0.08)' },
                        grid: { color: 'rgba(0, 0, 0, 0.06)' },
                        pointLabels: {
                            color: '#64748b',
                            font: { family: "'Fira Code', monospace", size: 11 }
                        },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
});
