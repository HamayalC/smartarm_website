console.clear();

const sectionTitle = document.getElementById("section-title");

const frameCount = 72; //120
const currentFrame = (index) =>
  `reveal4/${(index + 1).toString().padStart(4, "0")}.webp`; //images4

const images = [];
const animation = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

//const tl = gsap.timeline({ repeat: -1, yoyo: true, onUpdate: render });
const tl = gsap.timeline({ repeat: 0, yoyo: false, onUpdate: render });
tl.to(animation, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  duration: 3, // Adjust the duration as needed
});

images[0].onload = render;

function render() {
  sectionTitle.style.backgroundImage = `url(${images[animation.frame].src})`;
}

let techImageloaded = false;
const techImages = [];
function preloadTechImages() {
  let loadedCount = 0;
  for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    const formattedIndex = String(i).padStart(4, "0");
    img.src = `${imagePath}${formattedIndex}.webp`;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        techImageloaded = true; // All images are loaded
        console.log("Images preloaded!");
      }
    };
    techImages.push(img); // Store the images
  }
}

window.addEventListener("load", preloadTechImages);

// --------------  section-technology -----------------
const imageElement = document.getElementById("animated-image");
const headlineElement = document.getElementById("technology-headline");
const subheadlineElement = document.getElementById("technology-subheadline");

let currentImageIndex = 1;
const totalImages = 48;
const imagePath = "images_v3/";
let isInAnimation = false;

function disableScroll() {
  document.body.style.overflowY = "scroll"; // Keep the scrollbar visible
  window.addEventListener("wheel", preventScroll, { passive: false }); // For mouse scrolling
}

// Enable scroll after animation
function enableScroll() {
  window.removeEventListener("wheel", preventScroll); // Re-enable mouse scroll
}

function preventScroll(event) {
  event.preventDefault(); // Prevent scrolling for wheel and touchmove
}

function startAnimation(direction) {
  if (isInAnimation) return;

  // document.body.style.scrollSnapType = "none";
  // document.body.style.overflowY = "hidden";

  disableScroll();

  isInAnimation = true;
  const animationDuration = 2000; // 2 seconds
  const frameDuration = animationDuration / totalImages;
  const render = () => {
    if (direction === "down" && currentImageIndex <= totalImages) {
      const formattedIndex = String(currentImageIndex).padStart(4, "0");
      imageElement.src = techImages[currentImageIndex - 1].src;
      if (currentImageIndex === totalImages) {
        isInAnimation = false;
        // document.body.style.scrollSnapType = "y mandatory";
        // document.body.style.overflowY = "scroll";
        enableScroll();
        return;
      }
      currentImageIndex++;
      // console.log("currentImageIndex", currentImageIndex);
      setTimeout(render, frameDuration);
    }
    if (direction === "up" && currentImageIndex >= 1) {
      const formattedIndex = String(currentImageIndex).padStart(4, "0");
      imageElement.src = techImages[currentImageIndex - 1].src;
      if (currentImageIndex === 1) {
        isInAnimation = false;
        // document.body.style.scrollSnapType = "y mandatory";
        // document.body.style.overflowY = "scroll";
        enableScroll();
        return;
      }
      currentImageIndex--;
      // console.log("currentImageIndex", currentImageIndex);

      setTimeout(render, frameDuration);
    }
    if (currentImageIndex === 1) {
      headlineElement.textContent = "Take a closer look.";
      headlineElement.className = "technology";
      subheadlineElement.textContent =
        "The world's first and only bionic arm featuring a camera.";
    } else {
      headlineElement.textContent = "";
      subheadlineElement.textContent = "";
    }
  };
  render();
}

if (currentImageIndex === 1) {
  headlineElement.textContent = "Take a closer look.";
  headlineElement.className = "technology";
  subheadlineElement.textContent =
    "The world's first and only bionic arm featuring a camera.";
} else {
  headlineElement.textContent = "";
  subheadlineElement.textContent = "";
}

function handleScroll(event) {
  console.log("event.deltaY", event.deltaY);
  if (isInAnimation) {
    return;
  }
  if (event.deltaY < 0 && currentImageIndex === totalImages) {
    startAnimation("up");
  } else if (event.deltaY >= 0 && currentImageIndex === 1) {
    startAnimation("down");
  }
}
const sectionExamples = document.querySelector("#section-examples");
const observerExamples = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionTechnology.removeEventListener("wheel", handleScroll);
      }
    });
  },
  { threshold: 0.5 }
);
observerExamples.observe(sectionExamples);

const sectionTechnology = document.querySelector("#section-technology");
sectionTechnology.addEventListener("wheel", handleScroll);
const observertec = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionTechnology.addEventListener("wheel", handleScroll);
      }
    });
  },
  { threshold: 0.5 }
);
observertec.observe(sectionTechnology);

const sectiondex = document.querySelector("#section-dexterityos");
const observerdex = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionTechnology.removeEventListener("wheel", handleScroll);
      }
    });
  },
  { threshold: 0.5 }
);
observerdex.observe(sectiondex);

// let lastYPosition = 0;

// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const section = document.querySelector("#section-technology");
//         section.addEventListener("wheel", handleScroll);
//       }
//     });
//   },
//   { threshold: 0.5 }
// );

// const section = document.querySelector("#section-technology");
// observer.observe(section);

// let lastYPosition = 0;

// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting && currentImageIndex === totalImages) {
//         document.body.style.scrollSnapType = "none";
//         document.body.style.overflowY = "hidden";
//       }
//     });
//   },
//   { threshold: 1 }
// );

// const section = document.querySelector("#section-technology");
// observer.observe(section);
