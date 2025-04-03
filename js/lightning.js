document.addEventListener('DOMContentLoaded', () => {
    // Create a dedicated canvas for lightning effects
    const canvas = document.createElement('canvas');
    canvas.id = 'lightning-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    document.querySelector('.landing-page').prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Lightning properties
    const lightnings = [];
    const maxLightnings = 80; // Maximum number of lightnings visible at once
    const lightningFrequency = 1000; // New lightning every 1 second on average
    const burstFrequency = 1000; // Random burst effect every 1 second
    let lastLightningTime = 3000;
    let lastBurstTime = 3000;

    // Make canvas interactive
    canvas.style.pointerEvents = 'auto';
    canvas.addEventListener('click', (e) => {
        createLightning(e.clientX, e.clientY, true); // Create lightning at click position with burst effect
    });

    function createLightningBolt(startX, startY, angle, length, branchProbability, width, color, generation = 0) {
        if (generation > 5) return []; // Limit recursion depth

        const endX = startX + Math.cos(angle) * length;
        const endY = startY + Math.sin(angle) * length;
        
        const segments = [];
        segments.push({
            startX, startY, endX, endY, width, color
        });

        // Create branches with decreasing probability
        if (generation < 3 && Math.random() < branchProbability) {
            const branchAngle = angle + (Math.random() * 1 - 0.5);
            const branchLength = length * 0.6;
            const branchSegments = createLightningBolt(
                endX, endY, branchAngle, branchLength, 
                branchProbability * 0.5, width * 0.7, color, generation + 1
            );
            segments.push(...branchSegments);
        }

        return segments;
    }

    function createLightning(x = null, y = null, burst = false) {
        // Random start position if not specified
        const startX = x || Math.random() * width;
        const startY = y || 0;
        
        // Random angle, slightly downward
        const angle = (Math.PI / 2) + (Math.random() * 0.8 - 0.4);
        const length = height * (0.2 + Math.random() * 0.4); // Increased length
        const branchProbability = 0.4; // Increased branch probability
        // Choose from a palette of colors that complement white stars
        const colorPalette = [
            `rgba(255, 215, 0, ${0.8 + Math.random() * 0.2})`, // Gold
            `rgba(255, 140, 0, ${0.8 + Math.random() * 0.2})`, // Dark Orange
            `rgba(255, 105, 180, ${0.7 + Math.random() * 0.3})`, // Hot Pink
            `rgba(138, 43, 226, ${0.7 + Math.random() * 0.3})` // Blue Violet
        ];
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        const segments = createLightningBolt(startX, startY, angle, length, branchProbability, 6, color); // Increased width from 4 to 6
        
        const lightning = {
            segments,
            alpha: 1.0,
            fadeSpeed: 0.04,
            burst: burst
        };
        
        lightnings.push(lightning);
        
        // If it's a burst effect (from click), add multiple bolts
        if (burst) {
            for (let i = 0; i < 12; i++) { // Increased number of burst bolts from 8 to 12
                const burstAngle = Math.PI * 2 * (i / 12);
                const burstSegments = createLightningBolt(
                    startX, startY, burstAngle, length * 0.7, // Increased burst length from 0.5 to 0.7
                    branchProbability, 5, color // Increased width from 3 to 5
                );
                
                lightnings.push({
                    segments: burstSegments,
                    alpha: 1.0,
                    fadeSpeed: 0.06,
                    burst: true
                });
            }
        }
    }

    function drawLightnings() {
        // Clear canvas with transparent fill to create trail effect
        ctx.clearRect(0, 0, width, height);
        
        // Check if we should create a new random lightning
        const currentTime = Date.now();
        if (currentTime - lastLightningTime > lightningFrequency && lightnings.length < maxLightnings && Math.random() < 0.4) {
            createLightning();
            lastLightningTime = currentTime;
        }
        
        // Create random burst effects without requiring clicks
        if (currentTime - lastBurstTime > burstFrequency && Math.random() < 0.3) {
            // Create burst at random position
            const randomX = Math.random() * width;
            const randomY = Math.random() * (height * 0.6); // Keep in top 60% of screen
            createLightning(randomX, randomY, true);
            lastBurstTime = currentTime;
        }
        
        // Draw and update all lightning bolts
        for (let i = lightnings.length - 1; i >= 0; i--) {
            const lightning = lightnings[i];
            
            // Draw all segments of this lightning
            lightning.segments.forEach(segment => {
                ctx.beginPath();
                ctx.moveTo(segment.startX, segment.startY);
                ctx.lineTo(segment.endX, segment.endY);
                
                // Create an even stronger glow effect
                ctx.shadowBlur = 30;
                ctx.shadowColor = segment.color;
                
                // Set line properties
                ctx.strokeStyle = segment.color.replace(')', `, ${lightning.alpha})`);
                ctx.lineWidth = segment.width * 1.2; // Additional width multiplier
                ctx.stroke();
                
                // Reset shadow for performance
                ctx.shadowBlur = 0;
            });
            
            // Fade out the lightning
            lightning.alpha -= lightning.fadeSpeed;
            
            // Remove completely faded lightnings
            if (lightning.alpha <= 0) {
                lightnings.splice(i, 1);
            }
        }
        
        requestAnimationFrame(drawLightnings);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Start the animation
    drawLightnings();
});
