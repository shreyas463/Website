document.addEventListener('DOMContentLoaded', () => {
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true,
        antialias: true
    });

    // Configure renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 50;
        posArray[i + 2] = (Math.random() - 0.5) * 50;
        
        // Color - gradient from blue to purple
        const ratio = Math.random();
        colors[i] = 0.39 + ratio * 0.2;     // R: 99 -> 147
        colors[i + 1] = 0.4 + ratio * 0.2;  // G: 102 -> 153
        colors[i + 2] = 0.94 + ratio * 0.06; // B: 241 -> 255
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation
    let frame = 0;
    function animate() {
        requestAnimationFrame(animate);
        frame += 0.01;

        // Smooth mouse following
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        particlesMesh.rotation.y = frame * 0.15;
        particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.z += (targetX - particlesMesh.rotation.z) * 0.05;

        // Add some wave motion
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(frame + positions[i] * 0.1) * 0.01;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();
});
