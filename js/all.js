// 註冊 GSAP 插件
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ---------------------------
   debounce 工具
--------------------------- */
function debounce(fn, delay) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ---------------------------
   開場動畫 - 頁面載入時執行
--------------------------- */
window.addEventListener("load", () => {
  const loadTimeline = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 },
  });

  // ScrollTrigger 控制文字區塊
  gsap.utils.toArray(".text-item").forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top center",
      end: "bottom center",
      onEnter: () => item.classList.add("active"),
      onLeave: () => item.classList.remove("active"),
      onEnterBack: () => item.classList.add("active"),
      onLeaveBack: () => item.classList.remove("active"),
    });
  });

  // 初始隱藏
  gsap.set(".landingAnimation", { autoAlpha: 0 });
  gsap.set("header", { y: -100, autoAlpha: 0 });
  gsap.set("header nav li", {
    scaleY: 0,
    autoAlpha: 0,
    transformOrigin: "top",
  });
  gsap.set(".landingAnimation h1", { y: 80, autoAlpha: 0 });
  gsap.set(".landingAnimation h2", { y: 60, autoAlpha: 0 });
  gsap.set(".t1, .t2, .t3", { autoAlpha: 0, scale: 0.5 });
  gsap.set(".gradient-ball", { autoAlpha: 0, scale: 0 });

  // 進場動畫
  loadTimeline
    .to("header", { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" })
    .to(
      "header nav li",
      {
        scaleY: 1,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .to(
      ".landingAnimation",
      { autoAlpha: 1, duration: 2, ease: "sine.inOut" },
      "-=0.6"
    )
    .to(
      ".landingAnimation h1",
      { y: 0, autoAlpha: 1, duration: 1, ease: "back.out(1.2)" },
      "-=1.5"
    )
    .to(
      ".landingAnimation h2",
      { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    )
    .to(
      ".t1",
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.4"
    )
    .to(
      ".t2",
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.4"
    )
    .to(
      ".t3",
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.4"
    )
    .to(
      ".gradient-ball",
      { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(2)" },
      "-=0.5"
    );
});

/* ---------------------------
   內容區塊進場、視差、輪播
--------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  const textItems = document.querySelectorAll(".text-item");
  gsap.set(textItems, { autoAlpha: 0, x: -50 });

  textItems.forEach((item) => {
    gsap.to(item, {
      autoAlpha: 1,
      x: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: item,
        start: "top 70%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Swiper 輪播
  const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,
    centeredSlides: false,
    autoplay: { delay: 3000, disableOnInteraction: false },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 16 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 32 },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: { enabled: true },
    mousewheel: { forceToAxis: true },
    grabCursor: true,
    speed: 600,
    effect: "slide",
  });
});
