document.addEventListener("DOMContentLoaded", function() {
    const imageElement = document.getElementById("animatedImage");
    const headlineElement = document.getElementById("headline");
    const subheadlineElement = document.getElementById("subheadline");
    const totalImages = 48;
    const imagePath = "images_v3/";

    let currentImageIndex = 1;
    let images = [];

    // Preload images
    for (let i = 1; i <= totalImages; i++) {
        const img = new Image();
        img.src = `${imagePath}${String(i).padStart(4, '0')}.webp`;
        images.push(img);
    }

    function updateHeadlines(progress) {
        if (progress === 0) {
            gsap.to(headlineElement, {duration: 0.5, opacity: 1, text: ""});
            headlineElement.className = "technology";
            gsap.to(subheadlineElement, {duration: 0.5, opacity: 1, text: ""});
        } else if (progress === 1) {
            gsap.to(headlineElement, {duration: 0.5, opacity: 1, text: ""});
            headlineElement.className = "how-it-works";
            gsap.to(subheadlineElement, {duration: 0.5, opacity: 0, text: ""});
        } else {
            gsap.to(headlineElement, {duration: 0.5, opacity: 0, text: ""});
            gsap.to(subheadlineElement, {duration: 0.5, opacity: 0, text: ""});
        }
    }

    gsap.registerPlugin(ScrollTrigger);

    let animationTriggered = false;
    let currentAnimation = null;

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "+=100%",
        onUpdate: (self) => {
            if (!animationTriggered && self.progress > 0) {
                animationTriggered = true;
                playAnimation(1);
            } else if (animationTriggered && self.direction !== self.getVelocity()) {
                // Direction changed, reverse or play forward
                playAnimation(self.direction);
            }
        }
    });

    function playAnimation(direction) {
        // Kill any existing animation
        if (currentAnimation) currentAnimation.kill();

        const startIndex = direction === 1 ? 0 : totalImages - 1;
        const endIndex = direction === 1 ? totalImages - 1 : 0;

        currentAnimation = gsap.to({}, {
            duration: 2,
            onUpdate: function() {
                const progress = this.progress();
                const imageIndex = Math.round(gsap.utils.interpolate(startIndex, endIndex, progress));
                imageElement.src = images[imageIndex].src;
                updateHeadlines(direction === 1 ? progress : 1 - progress);
            },
            onComplete: function() {
                updateHeadlines(direction === 1 ? 1 : 0);
            }
        });
    }

    // Initial setup
    updateHeadlines(0);
});
