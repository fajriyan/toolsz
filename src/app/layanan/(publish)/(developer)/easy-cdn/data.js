export const cdnGroups = {
  Slider: [
    {
      name: "Swiper 11 (stable)",
      scripts: [
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11.2.10/swiper-bundle.min.css" />`,
        `<script src="https://cdn.jsdelivr.net/npm/swiper@11.2.10/swiper-bundle.min.js"></script>`,
      ],
      usage: `<div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
        </div>
      </div>
      <script>
        const swiper = new Swiper('.swiper', {
          loop: true,
          pagination: { el: '.swiper-pagination' },
        });
      </script>`,
    },
    {
      name: "Swiper 11 (cdnjs)",
      scripts: [
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css" />`,
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js"></script>`,
      ],
      usage: `<div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
        </div>
      </div>
      <script>
        const swiper = new Swiper('.swiper', {
          loop: true,
          pagination: { el: '.swiper-pagination' },
        });
      </script>`,
    },
  ],

  Animation: [
    {
      name: "AOS 2.3.4 (stable)",
      scripts: [
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />`,
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>`,
      ],
      usage: `<div data-aos="fade-up">Animasi muncul dari bawah</div>
<script>
  AOS.init();
</script>`,
    },
    {
      name: "AOS 3.0.0-beta.6",
      scripts: [
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@3.0.0-beta.6/dist/aos.css" />`,
        `<script src="https://cdn.jsdelivr.net/npm/aos@3.0.0-beta.6/dist/aos.js"></script>`,
      ],
      usage: `<div data-aos="fade-up">Animasi muncul dari bawah</div>
<script>
  AOS.init();
</script>`,
    },
  ],

  Utility: [
    {
      name: "jQuery 3.7.1",
      scripts: [
        `<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>`,
      ],
      usage: `$(document).ready(function() {
  console.log("jQuery loaded!");
});`,
    },

    {
      name: "Fancybox 5 (stable)",
      scripts: [
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.css" />`,
        `<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox/fancybox.umd.js"></script>`,
      ],
      usage: `<a href="image.jpg" data-fancybox="gallery">
  <img src="thumb.jpg" />
</a>
<script>
  Fancybox.bind("[data-fancybox='gallery']");
</script>`,
    },

    {
      name: "Axios 1.x",
      scripts: [
        `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`,
      ],
      usage: `axios.get('/api/data').then(res => console.log(res.data));`,
    },

    {
      name: "Lodash 4.x",
      scripts: [
        `<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>`,
      ],
      usage: `console.log(_.chunk([1,2,3,4], 2));`,
    },

    {
      name: "Moment.js 2.x",
      scripts: [
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>`,
      ],
      usage: `console.log(moment().format("YYYY-MM-DD"));`,
    },

    {
      name: "GSAP 3.x",
      scripts: [
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>`,
      ],
      usage: `gsap.to(".box", { x: 200, duration: 1 });`,
    },

    {
      name: "Bootstrap 5.3",
      scripts: [
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />`,
        `<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>`,
      ],
      usage: `<button class="btn btn-primary">Bootstrap</button>`,
    },

    {
      name: "TailwindCSS CDN",
      scripts: [`<script src="https://cdn.tailwindcss.com"></script>`],
      usage: `<div class="text-red-500">Hello Tailwind</div>`,
    },

    {
      name: "Alpine.js 3.x",
      scripts: [
        `<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>`,
      ],
      usage: `<div x-data="{ count: 0 }">
  <button @click="count++">+</button>
  <span x-text="count"></span>
</div>`,
    },

    {
      name: "Popper.js 2.x",
      scripts: [
        `<script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js"></script>`,
      ],
      usage: `// Digunakan untuk tooltip/popper positioning`,
    },

    {
      name: "Anime.js 3.2.1",
      scripts: [
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>`,
      ],
      usage: `anime({ targets: 'div', translateX: 250 });`,
    },

    {
      name: "Hammer.js 2.0.8",
      scripts: [
        `<script src="https://ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js"></script>`,
      ],
      usage: `const mc = new Hammer(document.body);
mc.on("tap", () => console.log("body tapped"));`,
    },
  ],
};
