/* =========================================================
   YUS SHADIE — PREMIUM PORTFOLIO
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu && nav) {

  menu.addEventListener("click", () => {

    const open = nav.classList.toggle("open");

    menu.classList.toggle("active", open);

    menu.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

  });


  /* Tutup menu setelah memilih menu */

  document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menu.classList.remove("active");

      menu.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


/* =========================================================
   CURSOR GLOW
   ========================================================= */

const glow = document.querySelector(".cursor-glow");

if (glow) {

  window.addEventListener(
    "pointermove",
    event => {

      glow.style.left =
        event.clientX + "px";

      glow.style.top =
        event.clientY + "px";

    },
    {
      passive: true
    }
  );

}


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.animate(

          [
            {
              opacity: 0,
              transform:
                "translateY(20px)"
            },

            {
              opacity: 1,
              transform:
                "translateY(0)"
            }
          ],

          {
            duration: 600,

            easing:
              "cubic-bezier(.2,.8,.2,1)",

            fill: "forwards"
          }

        );

        observer.unobserve(
          entry.target
        );

      }

    });

  },
  {
    threshold: 0.08
  }
);


/* =========================================================
   ELEMENT YANG DIANIMASIKAN
   ========================================================= */

document
  .querySelectorAll(
    ".card, .service, .video-card, .socials a, .identity"
  )
  .forEach(element => {

    observer.observe(element);

  });
