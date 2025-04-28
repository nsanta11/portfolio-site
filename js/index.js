// Importing utility function for preloading images
import { preloadImages } from "./utils.js";

const modal = document.getElementById("videoModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close-btn");
const video = document.getElementById("modalVideo");
const portfolioClick = document.querySelector(".portfolio");
const words = ["", "Web Developer,"," Designer,", " World Traveler"];
const typewriter = document.getElementById("typewriter");


portfolioClick.addEventListener("click", () => {
  const element = document.getElementById("my-work");
  element.scrollIntoView({
    behavior: "smooth",
    block: "start" // Make sure it scrolls to the start of the element
  });
});

openBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    stopVideo();
});

function stopVideo() {
  video.pause();
  video.currentTime = 0;
}

// Variable to store the Lenis smooth scrolling object
let lenis;

// Selecting content elements that contain SVG
const contentWithSVG = Array.from(document.querySelectorAll(".content")).filter(
  (element) => {
    return element.querySelector(":scope svg") !== null;
  }
);

// Selecting all clipPath elements on the document
const clipElements = [...document.querySelectorAll("clipPath")];

// Initializes Lenis for smooth scrolling with specific properties
const initSmoothScrolling = () => {
  // Instantiate the Lenis object with specified properties
  lenis = new Lenis({
    lerp: 0.2, // Lower values create a smoother scroll effect
    smoothWheel: true, // Enables smooth scrolling for mouse wheel events
  });

  // Update ScrollTrigger each time the user scrolls
  lenis.on("scroll", () => ScrollTrigger.update());

  // Define a function to run at each animation frame
  const scrollFn = (time) => {
    lenis.raf(time); // Run Lenis' requestAnimationFrame method
    requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
  };
  // Start the animation frame loop
  requestAnimationFrame(scrollFn);
};


//intro animation
window.addEventListener('load', () => {
    gsap.to(".frame__title", {
        duration: 1,
        scale: 1,
        opacity: 1,
        ease: "power1.out",
        delay: 0.2 // Delay of 0.5 seconds before animation starts
    });
      // Animate button (starts after the title finishes)
    gsap.to(".portfolio", {
        duration: 0.5,
        scale: 1,
        opacity: 1,
        ease: "power1.out",
        delay: 3 // Delay = title's delay (0.5) + duration (1.1 buffer)
    });
    showNextWord(); // kick it off
});

gsap.registerPlugin(TextPlugin);

window.addEventListener("load", () => {
  function addWord(index) {
    if (index >= words.length) return;

    // Create a new span for the word
    const wordSpan = document.createElement("span");
    wordSpan.textContent = (index === 0 ? "" : " ") + words[index];
    wordSpan.style.opacity = 0; // start hidden

    // Add this for the last word
    if (index === words.length - 1) {
      wordSpan.classList.add("break-before");
    }

    typewriter.appendChild(wordSpan); // add to the line

    // Animate the first word separately (with fade-in)
    gsap.to(wordSpan, {
      opacity: 1,
      duration: 1.2,
      ease: "power1.out",
      delay: 1, // Delay = title's delay (0.5) + duration (1.1 buffer)
    });

    // Call next word after delay
    setTimeout(() => {
      addWord(index + 1);
    }, 500); // adjust delay as needed
  }

  addWord(0);
});

//Ensuring smooth scroll behavior for anchor tags
// Make sure GSAP is loaded on your page
gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll('.scroll-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetElement, // Target the element directly
          offsetY: 125, // Offset the scroll by 75px from the top of the page
        },
        ease: "power2.inOut"
      });
  });
});


//STAGGERED PROJECTS
gsap.utils.toArray(".card").forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 90%", // adjust as needed
      toggleActions: "play none none none", // play only once
    },
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    delay: index * 0.1, // optional stagger-like feel
  });
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#about-me",
    start: "top 80%",
    toggleActions: "play none none none",
    // toggleActions: "play reset play reset",
  },
});

tl.from("#about-me", {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
})

// .from(
//   ".profile-img",
//   {
//     x: -50,
//     autoAlpha: 0,
//     scale: 0.97,
//     duration: 1.2,
//     ease: "power3.out",
//   },
//   "-=0.6"
// );

// Define functions for custom effects
const applyCustomEffect_3 = (contentElement) => {
  // Select relevant elements for the effect
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const posterInner = contentElement.querySelectorAll(".poster__inner");

  // Animation logic for each clipPath element
  [...clipPath].forEach((clipPathEl, pos) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: poster[pos], // Triggers based on poster element
          start: "top bottom", // Start animation when poster is at top of viewport
          end: "bottom top", // End animation when poster is at bottom of viewport
          scrub: true, // Allows smooth scrubbing effect
        },
      })
      .fromTo(
        clipPathEl,
        {
          xPercent: pos === 0 ? 40 : -80, // Initial xPercent value based on position
        },
        {
          ease: "none",
          xPercent: pos === 0 ? -40 : 20, // Target xPercent value based on position
        },
        0
      )
      .fromTo(
        posterInner[pos],
        {
          xPercent: pos === 0 ? -5 : 5, // Initial xPercent value based on position
          yPercent: pos === 0 ? -5 : 5, // Initial yPercent value based on position
        },
        {
          xPercent: pos === 0 ? 5 : -5, // Target xPercent value based on position
          yPercent: pos === 0 ? 5 : -5, // Target yPercent value based on position
        },
        0
      );
  });
};

const applyCustomEffect_2 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const posterInner = contentElement.querySelectorAll(".poster__inner");

  [...clipPath].forEach((clipPathEl, pos) => {
    const texts = clipPathEl.querySelectorAll("text");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: poster[pos],
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .fromTo(
        clipPathEl,
        {
          xPercent: pos === 0 ? 0 : -100,
        },
        {
          ease: "none",
          xPercent: pos === 0 ? -100 : 0,
        },
        0
      )
      .fromTo(
        poster[pos],
        {
          filter: "brightness(200%)",
          skewX: pos === 0 ? -5 : 5,
        },
        {
          ease: "sine",
          filter: "brightness(15%)",
          skewX: pos === 0 ? 5 : -5,
        },
        0
      )
      .fromTo(
        posterInner[pos],
        {
          scale: 2.7,
        },
        {
          scale: 1,
        },
        0
      )
      .fromTo(
        texts,
        {
          transformOrigin: pos ? "50% 100%" : "50% 0%",
          scaleX: 0.8,
          scaleY: 0,
        },
        {
          duration: 0.2,
          stagger: pos ? -0.01 : 0.01,
          scaleX: 1,
          scaleY: 1,
        },
        0
      );
  });
};

const applyCustomEffect_1 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const posterInner = contentElement.querySelectorAll(".poster__inner");
  const texts = clipPath[0].querySelectorAll("text");

  const imageUrls = [
    "img/cartoon_comp.png",
    "img/cartoon_comp.png",
    "img/cartoon_comp.png",
  ];
  let currentIndex = 0;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: poster[0],
        start: "top bottom",
        end: "bottom top+=70%",
        once: true,
        scrub: 2,
        onUpdate: (scrollTrigger) => {
          const progress = scrollTrigger.progress;
          const sectionLength = 1 / imageUrls.length;
          const index = Math.floor(progress / sectionLength);
        //   const imageUrl = imageUrls[Math.min(index, imageUrls.length - 1)];

          if (index !== currentIndex) {
            currentIndex = index;
            gsap.killTweensOf(posterInner);
          }
        },
      },
    })
    .fromTo(
      clipPath,
      {
        xPercent: 80,
      },
      {
        ease: "none",
        xPercent: -120,
      },
      0
    )
    .fromTo(
      texts,
      {
        transformOrigin: "100% 75%",
        xPercent: 100,
        rotation: 10,
      },
      {
        duration: 0.2,
        stagger: 0.05,
        xPercent: 0,
        rotation: 0,
      },
      0
    );
};

const applyCustomEffect_4 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const posterInner = contentElement.querySelectorAll(".poster__inner");
  const texts = clipPath[0].querySelectorAll("text");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: poster[0],
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(
      clipPath,
      {
        xPercent: 160,
      },
      {
        ease: "none",
        xPercent: -160,
      },
      0
    )
    .fromTo(
      posterInner[0],
      {
        xPercent: -10,
        filter: "hue-rotate(190deg) contrast(600%)",
      },
      {
        xPercent: 10,
        filter: "hue-rotate(0deg) contrast(100%)",
      },
      0
    )
    .fromTo(
      texts,
      {
        transformOrigin: "50% 100%",
        scaleY: 0,
      },
      {
        duration: 0.3,
        ease: "expo.inOut",
        stagger: 0.05,
        scaleY: 1,
      },
      0
    )
    .fromTo(
      texts,
      {
        skewX: -25,
      },
      {
        duration: 0.3,
        ease: "sine.in",
        stagger: 0.05,
        skewX: 25,
        opacity: 0,
      },
      0
    );
};

const applyCustomEffect_5 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const posterInner = contentElement.querySelectorAll(".poster__inner");
  const texts = clipPath[0].querySelectorAll("text");

  gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: poster[0],
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(
      clipPath,
      {
        xPercent: 160,
      },
      {
        xPercent: -160,
      },
      0
    )
    .fromTo(
      poster,
      {
        transformOrigin: "-50% 50%",
        rotation: -5,
      },
      {
        rotation: 10,
      },
      0
    )
    .fromTo(
      posterInner,
      {
        scale: 3,
      },
      {
        scale: 1,
      },
      0
    )
    .fromTo(
      texts,
      {
        transformOrigin: "0% 50%",
        rotation: -45,
        yPercent: -10,
        scale: 0.1,
      },
      {
        duration: 0.3,
        ease: "power1",
        stagger: 0.05,
        rotation: 0,
        scale: 1,
        yPercent: 0,
        xPercent: 0,
      },
      0
    );
};

const applyCustomEffect_6 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const texts = clipPath[0].querySelectorAll("text");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: poster[0],
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(
      clipPath,
      {
        xPercent: 20,
      },
      {
        ease: "none",
        xPercent: -70,
      },
      0
    )
    .fromTo(
      texts,
      {
        transformOrigin: "150% 50%",
        scaleX: 0.25,
        opacity: 0,
        xPercent: 100,
      },
      {
        duration: 0.15,
        ease: "power1",
        stagger: 0.05,
        scaleX: 1,
        xPercent: 0,
        opacity: 1,
      },
      0
    )
    .fromTo(
      poster,
      {
        filter: "saturate(15)",
      },
      {
        filter: "saturate(0)",
      },
      0
    );
};

const applyCustomEffect_7 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const texts = clipPath[0].querySelectorAll("text");

  gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: poster[0],
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(
      contentElement,
      {
        filter: "drop-shadow(-100px -20px 5px #6b0c0c)",
      },
      {
        filter: "drop-shadow(100px 20px 20px #2a1554)",
      },
      0
    )
    .fromTo(
      clipPath,
      {
        xPercent: 140,
      },
      {
        xPercent: -140,
      },
      0
    )
    .fromTo(
      texts,
      {
        transformOrigin: "0% 50%",
        rotation: -45,
        scale: 0,
        opacity: 0,
      },
      {
        duration: 0.25,
        ease: "expo.inOut",
        stagger: 0.03,
        rotation: 0,
        scale: 1,
        xPercent: 0,
        opacity: 1,
      },
      0
    );
};

const applyCustomEffect_8 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const posterInner = contentElement.querySelectorAll(".poster__inner");

  [...clipPath].forEach((clipPathEl, pos) => {
    const texts = clipPathEl.querySelectorAll("text");

    gsap
      .timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: poster[0],
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
      .fromTo(
        clipPathEl,
        {
          yPercent: pos ? 30 : 0,
        },
        {
          ease: "none",
          yPercent: pos ? -30 : 0,
        },
        0
      )
      .fromTo(
        texts,
        {
          transformOrigin: "50% 0%",
          scale: 2,
          opacity: 0,
          x: pos ? 100 : -100,
          y: pos ? gsap.utils.random(150, 300) : gsap.utils.random(150, 300),
          skewX: pos ? 20 : -20,
        },
        {
          duration: 0.4,
          ease: "power3",
          stagger: 0.06,
          scale: 1.3,
          opacity: 1,
          x: 0,
          y: 0,
          skewX: 0,
        },
        0
      );
  });
};

const applyCustomEffect_9 = (contentElement) => {
  const clipPath = contentElement.querySelectorAll("svg clipPath");
  const poster = contentElement.querySelectorAll(".poster");
  const posterInner = contentElement.querySelectorAll(".poster__inner");
  const texts = clipPath[0].querySelectorAll("text");

  gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: poster[0],
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
    .fromTo(
      clipPath,
      {
        xPercent: 50,
      },
      {
        xPercent: -50,
      },
      0
    )
    .fromTo(
      poster,
      {
        filter: "brightness(140%) hue-rotate(300deg)",
        rotation: -7,
      },
      {
        filter: "brightness(10%) hue-rotate(0deg)",
        rotation: 7,
      },
      0
    )
    .fromTo(
      posterInner,
      {
        scale: 1,
      },
      {
        scale: 1.2,
      },
      0
    )
    .fromTo(
      texts,
      {
        transformOrigin: "0% 0%",
        scaleX: 1,
      },
      {
        ease: "none",
        scale: () => gsap.utils.random(0, 0.5),
        yPercent: () => gsap.utils.random(-40, 40),
        rotation: () => gsap.utils.random(-15, 15),
      },
      0
    );
};

// Update the scroll function to call the respective applyCustomEffect_N functions
const scroll = () => {
  contentWithSVG.forEach((contentElement, position) => {
    switch (position) {
      case 0:
        applyCustomEffect_1(contentElement);
        break;
      case 1:
        applyCustomEffect_2(contentElement);
        break;
      case 2:
        applyCustomEffect_3(contentElement);
        break;
      case 3:
        applyCustomEffect_4(contentElement);
        break;
      case 4:
        applyCustomEffect_5(contentElement);
        break;
      case 5:
        applyCustomEffect_6(contentElement);
        break;
      case 6:
        applyCustomEffect_7(contentElement);
        break;
      case 7:
        applyCustomEffect_8(contentElement);
        break;
      case 8:
        applyCustomEffect_9(contentElement);
        break;
      default:
        // Handle other positions if needed
        break;
    }
  });
};

// Initialization function
const init = () => {
  initSmoothScrolling(); // Initialize Lenis for smooth scrolling
  scroll(); // Apply scroll-triggered animations to items
};

// Preloading all images specified by the selector
Promise.all([
  preloadImages(".poster__inner"),
]).then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body
  document.body.classList.remove("loading");
  init();
});
