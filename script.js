document.addEventListener("DOMContentLoaded", (event) => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Navbar sticky effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('glass', 'shadow-lg');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('glass', 'shadow-lg');
      navbar.classList.add('bg-transparent');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let isMenuOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove('hidden');
      gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
    } else {
      gsap.to(mobileMenu, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
        mobileMenu.classList.add('hidden');
      }});
    }
  });

  // GSAP Animations
  
  // Hero section animation
  const tlHero = gsap.timeline();
  tlHero.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.2
  });

  // Fade Up on Scroll for elements with .gsap-fade-up
  const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
  fadeUpElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Trigger animation when top of element hits 85% of viewport height
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });

  // Staggered Fade Up for lists/grids
  const staggerContainers = document.querySelectorAll('.gsap-stagger-container');
  staggerContainers.forEach((container) => {
    const items = container.querySelectorAll('.gsap-stagger-item');
    gsap.from(items, {
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });
  });

  // Counter Animation for Awards
  const counters = document.querySelectorAll('.counter-value');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    
    ScrollTrigger.create({
      trigger: counter,
      start: "top 85%",
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 }, // round to whole numbers
          onUpdate: function() {
            // Keep the + sign if it exists
            if (counter.hasAttribute('data-suffix')) {
                counter.innerHTML = Math.round(counter.innerHTML) + counter.getAttribute('data-suffix');
            }
          }
        });
      },
      once: true
    });
  });

});
