'use strict';

// TODO: REFACTOR

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(modal => modal.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// HEADER
const navLinksEl = document.querySelector('.nav__links');
const navLinkEl = document.querySelectorAll('.nav__link');

function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').children;
    const logo = link.closest('.nav').querySelector('img');

    navLinkEl.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

// add opacity
navLinksEl.addEventListener('mouseover', handleHover.bind(0.5));

// remove opacity
navLinksEl.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
const navEl = document.querySelector('.nav');
const navHeight = navEl.getBoundingClientRect().height;

function addStickyNav(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navEl.classList.add('sticky');
  } else {
    navEl.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(addStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(document.querySelector('.header'));

// Sections
const allSections = document.querySelectorAll('section');

function revealSection(entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
}

// observe
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.17,
});

// hide all the sections
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (clicked) {
    tabs.forEach(btn => btn.classList.remove('operations__tab--active'));
    tabsContent.forEach(content =>
      content.classList.remove('operations__content--active')
    );
    clicked.classList.add('operations__tab--active');

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

slides.forEach(
  (slide, index) => (slide.style.transform = `translateX(${index * 100}%)`)
);
// 0 100% 200%

let currIndex = 0;
let maxSlides = slides.length;

const goToSlide = slide => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

function nextSlide() {
  if (currIndex >= maxSlides - 1) {
    currIndex = 0;
  } else {
    currIndex++;
  }
  goToSlide(currIndex);
  activateDots(currIndex);
  // -100% 0% 100%
}

function prevSlide() {
  if (currIndex === 0) {
    currIndex = maxSlides - 1;
  } else {
    currIndex++;
  }
  goToSlide(currIndex);
  activateDots(currIndex);
  // -100% 0% 100%
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

// dots
const dots = document.querySelector('.dots');

function createDots() {
  slides.forEach((s, index) =>
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    )
  );
}
createDots();

function activateDots(dot) {
  const dots = document.querySelectorAll('.dots__dot');

  dots.forEach(d => d.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${dot}"]`)
    .classList.add('dots__dot--active');
}

dotContainer.addEventListener('click', e => {
  // console.log(e.target);
  if (e.target.matches('.dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDots(slide);
  }
});


// Images
const lazyImages = document.querySelectorAll('img[data-src]');

function showImages(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    })
  }
}

const imgObserver = new IntersectionObserver(showImages, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

lazyImages.forEach(img => imgObserver.observe(img));