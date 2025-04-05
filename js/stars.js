document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'stars-canvas';
    document.querySelector('.landing-page').prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Star properties
    const stars = [];
    const numStars = 980;
    const starSize = 3.5;
    const starSpeed = 0.05;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * starSize,
            brightness: Math.random(),
            speed: Math.random() * starSpeed
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.fill();

            // Update star position
            star.brightness = Math.abs(Math.sin(Date.now() * star.speed));
            
            if (star.y < 0) {
                star.y = height;
            }
        });

        requestAnimationFrame(drawStars);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    drawStars();
});
