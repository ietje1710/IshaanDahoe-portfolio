 const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.classList.toggle('is-active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('is-active');
            document.body.classList.remove('menu-open');
        });
    });

    const revealElements = document.querySelectorAll(
        '.links, .skills-intro, .project-intro, .project-card, .container-small, .contact-section'
    );
    const staggerElements = document.querySelectorAll(
        '.cards, .skills-netwerken, .timeline, .contact-grid'
    );

    revealElements.forEach((el) => el.classList.add('reveal'));
    staggerElements.forEach((el) => el.classList.add('reveal-stagger'));

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
        );

        [...revealElements, ...staggerElements].forEach((el) => revealObserver.observe(el));
    } else {
        [...revealElements, ...staggerElements].forEach((el) => el.classList.add('is-visible'));
    }