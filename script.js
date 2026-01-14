  // Animate sections on scroll
  const sections = document.querySelectorAll('.abt, .proj, #Skills, #resume');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    section.classList.add('section'); // add initial hidden class
    observer.observe(section);
  });

