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
      name: "AOS 3.0.0‑beta.6",
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
      usage: `// Example:
$(document).ready(function() {
  console.log("jQuery loaded!");
});`,
    },
    {
      name: "D3.js 7.9.0",
      scripts: [
        `<script src="https://ajax.googleapis.com/ajax/libs/d3js/7.9.0/d3.min.js"></script>`,
      ],
      usage: `// Example:
d3.select("body").append("p").text("Hello D3!");`,
    },
    {
      name: "Chart.js latest",
      scripts: [
        `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`,
      ],
      usage: `// Example:
const ctx = document.getElementById('myChart');
new Chart(ctx, { type: 'bar', data: { /*...*/ } });`,
    },
    {
      name: "Anime.js 3.2.1",
      scripts: [
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>`,
      ],
      usage: `// Example:
anime({ targets: 'div', translateX: 250 });`,
    },
    {
      name: "Hammer.js 2.0.8",
      scripts: [
        `<script src="https://ajax.googleapis.com/ajax/libs/hammerjs/2.0.8/hammer.min.js"></script>`,
      ],
      usage: `// Example:
const mc = new Hammer(document.body);
mc.on("tap", () => console.log("body tapped"));`,
    },
  ],
};
