/* =========================================================
   YUS SHADIE PREMIUM PORTFOLIO
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    /* Tutup menu setelah klik link */
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });

  }


  /* =======================================================
     SMOOTH SCROLL
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     VIDEO FILTER
     ======================================================= */

  const filterButtons = document.querySelectorAll(".filter");
  const videoCards = document.querySelectorAll(".video-card");

  if (filterButtons.length && videoCards.length) {

    filterButtons.forEach(button => {

      button.addEventListener("click", () => {

        /* Hapus status aktif */
        filterButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        /* Aktifkan tombol yang dipilih */
        button.classList.add("active");

        const filterValue = button.dataset.filter;

        videoCards.forEach(card => {

          const category = card.dataset.category;

          if (
            filterValue === "all" ||
            category === filterValue
          ) {

            card.style.display = "";

            requestAnimationFrame(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });

          } else {

            card.style.opacity = "0";
            card.style.transform = "translateY(12px)";

            setTimeout(() => {
              card.style.display = "none";
            }, 250);

          }

        });

      });

    });

  }


  /* =======================================================
     GOOGLE DRIVE VIDEO MODAL
     ======================================================= */

  const videoModal = document.querySelector(".video-modal");
  const drivePlayer = document.getElementById("drivePlayer");
  const modalTitle = document.getElementById("modalTitle");
  const closeModal = document.getElementById("closeModal");
  const playButtons = document.querySelectorAll(".play");

  /* URL dasar Google Drive */
  const driveBaseURL =
    "https://drive.google.com/file/d/";

  const driveEndURL =
    "/preview";


  /* -------------------------------------------------------
     OPEN VIDEO
     ------------------------------------------------------- */

  function openVideo(videoId, title) {

    if (!videoModal || !drivePlayer) return;

    if (!videoId) return;

    const videoURL =
      driveBaseURL +
      videoId +
      driveEndURL;

    /* Judul video */
    if (modalTitle) {
      modalTitle.textContent =
        title || "Yus Shadie — AI Video Portfolio";
    }

    /* Masukkan video Google Drive */
    drivePlayer.src = videoURL;

    /* Buka modal */
    videoModal.classList.add("active");

    /* Kunci scroll halaman */
    document.body.style.overflow = "hidden";

  }


  /* -------------------------------------------------------
     CLOSE VIDEO
     ------------------------------------------------------- */

  function closeVideo() {

    if (!videoModal) return;

    videoModal.classList.remove("active");

    /* Hentikan video dengan mengosongkan iframe */
    if (drivePlayer) {
      drivePlayer.src = "";
    }

    /* Kembalikan scroll halaman */
    document.body.style.overflow = "";

  }


  /* -------------------------------------------------------
     PLAY BUTTON CLICK
     ------------------------------------------------------- */

  playButtons.forEach(button => {

    button.addEventListener("click", () => {

      const videoId =
        button.dataset.id;

      const title =
        button.dataset.title;

      openVideo(videoId, title);

    });

  });


  /* -------------------------------------------------------
     CLOSE BUTTON
     ------------------------------------------------------- */

  if (closeModal) {

    closeModal.addEventListener("click", () => {
      closeVideo();
    });

  }


  /* -------------------------------------------------------
     CLOSE WHEN CLICKING BACKDROP
     ------------------------------------------------------- */

  if (videoModal) {

    videoModal.addEventListener("click", event => {

      if (event.target === videoModal) {
        closeVideo();
      }

    });

  }


  /* -------------------------------------------------------
     ESC KEY
     ------------------------------------------------------- */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (
        videoModal &&
        videoModal.classList.contains("active")
      ) {
        closeVideo();
      }

    }

  });


  /* =======================================================
     CARD HOVER TILT
     ======================================================= */

  const tiltCards = document.querySelectorAll(
    ".video-card, .info-card, .work-card, .reel-card"
  );

  tiltCards.forEach(card => {

    card.addEventListener("mousemove", event => {

      /* Jangan aktifkan efek di layar kecil */
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -2.5;

      const rotateY =
        ((x - centerX) / centerX) * 2.5;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  const header =
    document.querySelector(".site-header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(".nav a");

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              const currentId =
                entry.target.getAttribute("id");

              navLinks.forEach(link => {

                link.classList.remove("active");

                const href =
                  link.getAttribute("href");

                if (href === "#" + currentId) {
                  link.classList.add("active");
                }

              });

            }

          });

        },
        {
          rootMargin:
            "-30% 0px -60% 0px"
        }
      );

    sections.forEach(section => {
      navObserver.observe(section);
    });

  }


  /* =======================================================
     PARALLAX PROFILE ORBIT
     ======================================================= */

  const heroProfile =
    document.querySelector(".hero-profile");

  if (heroProfile) {

    window.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth < 900) return;

        const x =
          (event.clientX / window.innerWidth - 0.5);

        const y =
          (event.clientY / window.innerHeight - 0.5);

        const moveX = x * 12;
        const moveY = y * 12;

        heroProfile.style.transform =
          `translate3d(${moveX}px,${moveY}px,0)`;

      },
      { passive: true }
    );

  }


  /* =======================================================
     IMAGE FALLBACK
     ======================================================= */

  const profileImage =
    document.querySelector(".hero-profile img");

  if (profileImage) {

    profileImage.addEventListener("error", () => {

      console.warn(
        "Gambar profile.png tidak ditemukan."
      );

    });

  }


  /* =======================================================
     VIDEO CARD KEYBOARD ACCESS
     ======================================================= */

  playButtons.forEach(button => {

    button.setAttribute(
      "role",
      "button"
    );

    button.setAttribute(
      "tabindex",
      "0"
    );

    button.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          button.click();

        }

      }
    );

  });


  /* =======================================================
     PREVENT VIDEO MODAL BACKGROUND CLICK ISSUES
     ======================================================= */

  if (videoModal) {

    const modalBox =
      videoModal.querySelector(".modal-box");

    if (modalBox) {

      modalBox.addEventListener(
        "click",
        event => {
          event.stopPropagation();
        }
      );

    }

  }


  /* =======================================================
     PAGE LOADED
     ======================================================= */

  document.body.classList.add("page-loaded");

  console.log(
    "Yus Shadie Premium Portfolio — Loaded Successfully."
  );

});
