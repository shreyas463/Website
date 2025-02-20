// Cursor trail effect
document.addEventListener('DOMContentLoaded', () => {
    const cursorTrail = document.querySelector('.cursor-trail');
    const dots = [];
    const maxDots = 20;

    for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        cursorTrail.appendChild(dot);
        dots.push({ element: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateTrail() {
        let x = mouseX;
        let y = mouseY;

        dots.forEach((dot, index) => {
            const nextDot = dots[index + 1] || dots[0];
            dot.x = x;
            dot.y = y;
            dot.element.style.left = `${x}px`;
            dot.element.style.top = `${y}px`;
            x += (nextDot.x - x) * 0.5;
            y += (nextDot.y - y) * 0.5;
        });

        requestAnimationFrame(updateTrail);
    }

    updateTrail();

    // Skill progress animation
    const skillItems = document.querySelectorAll('.skill-item');
    const achievementBanner = document.getElementById('achievementBanner');
    let unlockedSkills = 0;

    skillItems.forEach(item => {
        const progressBar = item.querySelector('.progress-bar');
        const progress = item.dataset.progress;
        let currentProgress = 0;
        let isUnlocked = false;

        item.addEventListener('click', () => {
            if (!isUnlocked) {
                isUnlocked = true;
                unlockedSkills++;
                
                gsap.to(progressBar, {
                    width: `${progress}%`,
                    duration: 1,
                    ease: "power2.out"
                });

                // Show achievement banner
                achievementBanner.classList.add('show');
                achievementBanner.querySelector('.achievement-text').textContent = 
                    `Achievement Unlocked: ${item.textContent.trim()} Master!`;

                setTimeout(() => {
                    achievementBanner.classList.remove('show');
                }, 3000);

                // Add particle effect
                createParticles(item);
            }
        });
    });

    // Particle effect
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            document.body.appendChild(particle);

            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const angle = (i / particleCount) * 360;
            const velocity = 2;

            gsap.set(particle, { x, y });
            gsap.to(particle, {
                x: x + Math.cos(angle * Math.PI / 180) * 100,
                y: y + Math.sin(angle * Math.PI / 180) * 100,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    }
});
