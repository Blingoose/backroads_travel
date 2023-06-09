// ********** nav toggle ************
// select button and links
const navBtn = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
// add event listener
navBtn.addEventListener("click", () => {
  links.classList.toggle("show-links");
});

// ********** gallery zoom img ************
const checkboxes = document.querySelectorAll(".search-checkbox");
const body = document.querySelector("body");
const xmarks = document.querySelectorAll(".xmark");

// slides
const slidesObj = {
  // slide position name are assuming the "from" starting position.
  slideWD: "slide-in-up-right",
  slideWA: "slide-in-up-left",
  slideSD: "slide-in-bottom-right",
  slideSA: "slide-in-bottom-left",
  slideD: "slide-in-right",
  slideA: "slide-in-left",
  slideW: "slide-in-top",
  slideS: "slide-in-bottom",
};

// generate a random slide
const randomSlideGenerator = () => {
  const slidesArr = Object.entries(slidesObj);
  const randomIndex = Math.floor(Math.random() * slidesArr.length);
  return slidesArr[randomIndex][1];
};

checkboxes.forEach((checkbox) => {
  checkbox.checked = false;
  checkbox.addEventListener("click", (e) => {
    const randomSlide = randomSlideGenerator();
    const imageContainer = checkbox.nextElementSibling;
    const xmark = imageContainer.querySelector(".xmark");
    const navbar = document.querySelector(".navbar");
    imageContainer.classList.toggle("zoomed-image");
    if (e.target.checked === true) {
      imageContainer.classList.add(randomSlide);
      navbar.classList.add("hide");
      xmark.addEventListener(
        // event listener is only fired once.
        "transitionend",
        () => {
          // add 'transition-delay: 0s' only after the xmark transition has ended.
          xmark.classList.add("no-delay");
        },
        { once: true }
      );

      body.classList.add("no-scroll");
    } else {
      const slideClasses = Object.values(slidesObj);
      imageContainer.classList.remove(...slideClasses);
      navbar.classList.remove("hide");
      xmark.classList.remove("no-delay");
      imageContainer.addEventListener(
        // event listener is only fired once.
        "transitionend",
        () => {
          // remove 'overflow: hidden' only after the image transition has ended.
          body.classList.remove("no-scroll");
        },
        { once: true }
      );
    }
  });
});

// ********** set date ************
// select span
const date = (document.getElementById("date").innerHTML =
  new Date().getFullYear());

// ********** smooth scroll ************
function smoothScroll(target) {
  const targetPosition = target.offsetTop - 62;
  window.scrollTo({ left: 0, top: targetPosition, behavior: "smooth" });
}

// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    links.classList.remove("show-links");

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    smoothScroll(element);
  });
});
