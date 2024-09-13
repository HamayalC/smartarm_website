document.addEventListener("DOMContentLoaded", function() {
    const imageElement = document.getElementById("animatedImage");
    const headlineElement = document.getElementById("headline");
    const subheadlineElement = document.getElementById("subheadline");
    let currentImageIndex = 1;
    const totalImages = 48;
    const imagePath = "images_v3/";
    let isAnimating = false;
    let lastScrollTop = 0;
    let ticking = false;
    let lastDirection = 'down';

    function updateImage(direction) {
        if (direction === 'down' && currentImageIndex < totalImages) {
            currentImageIndex++;
        } else if (direction === 'up' && currentImageIndex > 1) {
            currentImageIndex--;
        }
        const formattedIndex = String(currentImageIndex).padStart(4, '0');
        const newSrc = `${imagePath}${formattedIndex}.webp`;
        
        // Check if the image loads successfully before updating
        const tempImg = new Image();
        tempImg.src = newSrc;
        tempImg.onload = () => {
            imageElement.src = newSrc;
        };
        tempImg.onerror = () => {
            console.error(`Failed to load image: ${newSrc}`);
        };
    }
    

 

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const direction = scrollTop > lastScrollTop ? 'down' : 'up';
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

                if (!isAnimating && scrollTop < window.innerHeight) {
                    if ((direction === 'down' && currentImageIndex < totalImages) ||
                        (direction === 'up' && currentImageIndex > 1)) {
                        isAnimating = true;
                        animateImages(direction);
                    }
                }

                ticking = false;
            });
        }
        ticking = true;
    });

    function animateImages(direction) {
        const interval = setInterval(function() {
            updateImage(direction);
            if ((direction === 'down' && currentImageIndex >= totalImages) ||
                (direction === 'up' && currentImageIndex <= 1)) {
                clearInterval(interval);
                isAnimating = false;
            }
        }, 41.67); // Change image every 41.67ms for 24FPS
    }
});
