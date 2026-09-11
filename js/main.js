const header = document.querySelector(".header");
const menuButton = document.querySelector("#menuButton");
const nav = document.querySelector("#mainNav");

if (header) {
  const updateHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader);
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      opened.toString()
    );

    document.body.classList.toggle(
      "menu-open",
      opened
    );
  });


  document
    .querySelectorAll(".nav__link")
    .forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");

        document.body.classList.remove(
          "menu-open"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
}

const year = document.querySelector("#currentYear");

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(
  ".section, .service-card, .process-step, .stat-card"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


if (!prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition =
      "opacity .8s ease, transform .8s cubic-bezier(.22, 1, .36, 1)";
  });


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero__visual");

const supportsMouse =
  window.matchMedia("(pointer: fine)").matches;


if (
  hero &&
  heroVisual &&
  supportsMouse &&
  !prefersReducedMotion
) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();

    const mouseX =
      (event.clientX - rect.left) / rect.width;

    const mouseY =
      (event.clientY - rect.top) / rect.height;

    const x = (mouseX - 0.5) * 18;
    const y = (mouseY - 0.5) * 18;

    heroVisual.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;
  });


  hero.addEventListener("mouseleave", () => {
    heroVisual.style.transform =
      "translate3d(0, 0, 0)";
  });
}

const cards = document.querySelectorAll(
  ".service-card"
);


if (
  supportsMouse &&
  !prefersReducedMotion
) {
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect =
        card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - 0.5) * 5;

      const rotateX =
        ((y / rect.height) - 0.5) * -5;

      card.style.transform = `
        perspective(1000px)
        translateY(-10px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });


    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}