console.clear();

const section1 = document.getElementById("section1");

const frameCount = 120;
const currentFrame = index => (
  `images4/${(index + 1).toString().padStart(4, '0')}.webp`
);

const images = [];
const animation = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

const tl = gsap.timeline({ repeat: -1, yoyo: true, onUpdate: render });
tl.to(animation, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  duration: 5, // Adjust the duration as needed
});

images[0].onload = render;

function render() {
  section1.style.backgroundImage = `url(${images[animation.frame].src})`;
}

// Intersection Observer for section 2 text animation
document.addEventListener('DOMContentLoaded', () => {
    const section2 = document.getElementById('section2');
    const centeredText = section2.querySelector('.centered-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                centeredText.classList.add('visible');
            } else {
                centeredText.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Adjust this threshold as needed
    });

    observer.observe(section2);
    
    // Intersection Observer for mission section text animation
    const sectionMission = document.getElementById('section-mission');
    const missionContent = sectionMission.querySelector('.mission-content');

    const missionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                missionContent.classList.add('visible');
            } else {
                missionContent.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1 // Adjust this threshold as needed
    });

    missionObserver.observe(sectionMission);
    
    // Register the TextPlugin with GSAP
    gsap.registerPlugin(TextPlugin);

    // Intersection Observer for meet sekai section text animation
    const sectionMeetSekai = document.getElementById('section-meet-sekai');
    const typedText = sectionMeetSekai.querySelector('.typed-text');

    const sekaiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(typedText, {
                    duration: 2,
                    text: "Meet Sekai.",
                    ease: "none",
                    onComplete: () => {
                        typedText.classList.add('finished');
                    }
                });
            }
        });
    }, {
        threshold: 0.1 // Adjust this threshold as needed
    });

    sekaiObserver.observe(sectionMeetSekai);
});