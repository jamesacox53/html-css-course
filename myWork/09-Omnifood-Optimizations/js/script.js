function setCurrentYear() {
  const currentYear = new Date().getFullYear();

  const yearEl = document.querySelector('.year');
  yearEl.textContent = currentYear;
}

function makeMobileNavigationWork() {
  const btnMobileNavEl = document.querySelector('.btn-mobile-nav');
  const headerEl = document.querySelector('.header');

  btnMobileNavEl.addEventListener('click', function () {
    headerEl.classList.toggle('nav-open');
  });
}

function makeSmoothScrollingWork() {
  const allLinks = document.querySelectorAll('a:link');

  allLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const href = link.getAttribute('href');

      if (href === "#") {
        _scrollToTop();

      } else if (href.startsWith("#")) {
        _scrollToSection(href);

      } else {
        return;
      }

      _closeMobileNavigation(link);
    });
  });
}

function _scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function _scrollToSection(sectionId) {
  const sectionEl = document.querySelector(sectionId);

  sectionEl.scrollIntoView({
    behavior: "smooth"
  });
}

function _closeMobileNavigation(link) {
  if (!link.classList.contains("main-nav-link"))
    return;

  const headerEl = document.querySelector('.header');
  headerEl.classList.toggle('nav-open');
}

function makeNavigationSticky() {
  const sectionHeroEl = document.querySelector(".section-hero");

  const options = {
    // null is in the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px'
  };

  const intersectionObserver = new IntersectionObserver(_makeNavSticky, options);
  intersectionObserver.observe(sectionHeroEl);
}

function _makeNavSticky(entries) {
  const entry = entries[0];

  if (entry.isIntersecting) {
    document.body.classList.remove('sticky');

  } else {
    document.body.classList.add('sticky');
  }
}

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
setCurrentYear();
makeMobileNavigationWork();
makeSmoothScrollingWork();
makeNavigationSticky();
// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
