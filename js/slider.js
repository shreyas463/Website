document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing sliders');
    initializeSliders();
});

function initializeSliders() {
    const sliders = document.querySelectorAll('.image-slider');
    console.log(`Found ${sliders.length} sliders`);
    
    sliders.forEach((slider, sliderIndex) => {
        const images = slider.querySelectorAll('.slider-image');
        const dots = slider.querySelectorAll('.slider-dot');
        const prevBtn = slider.querySelector('.slider-arrow.prev');
        const nextBtn = slider.querySelector('.slider-arrow.next');
        let currentIndex = 0;
        
        console.log(`Slider ${sliderIndex}: ${images.length} images, ${dots.length} dots`);
        
        // Make sure first image is visible
        if (images.length > 0) {
            images[0].classList.add('active');
        }
        
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
        
        // Set up event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Set up event listeners for arrows
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateSlider();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateSlider();
            });
        }
        
        // Auto-advance the slider every 5 seconds
        let intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        }, 5000);
        
        // Pause auto-advance when hovering over the slider
        slider.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        
        // Resume auto-advance when mouse leaves the slider
        slider.addEventListener('mouseleave', () => {
            intervalId = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateSlider();
            }, 5000);
        });
        
        // Function to update the slider state
        function updateSlider() {
            // Update images
            images.forEach((img, index) => {
                if (index === currentIndex) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    });
}
