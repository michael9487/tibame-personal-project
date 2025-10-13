// 註冊 GSAP ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// ======================
// 開場動畫 - 頁面載入時執行
// ======================
window.addEventListener("load", () => {
  const loadTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1,
    },
  });

  // 使用 autoAlpha 設定初始狀態(同時控制 opacity 和 visibility)
  gsap.set(".landingAnimation", { autoAlpha: 0 });
  gsap.set("header", { y: -100, autoAlpha: 0 });

  // 導航選單項目初始狀態 - 壓扁並隱藏
  gsap.set("header nav li", {
    scaleY: 0,
    autoAlpha: 0,
    transformOrigin: "top",
  });

  gsap.set(".landingAnimation h1", { y: 80, autoAlpha: 0 });
  gsap.set(".landingAnimation h2", { y: 60, autoAlpha: 0 });
  gsap.set(".landingAnimation h3, .landingAnimation h4, .landingAnimation h5", {
    autoAlpha: 0,
    scale: 0.5,
  });
  gsap.set(".gradient-ball", { autoAlpha: 0, scale: 0 });

  loadTimeline
    // 1. Header 容器從上方滑入
    .to("header", {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.out",
    })
    // 2. 導航選單項目像窗簾一樣依序展開
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
    // 3. 背景非常慢且平滑地淡入
    .to(
      ".landingAnimation",
      {
        autoAlpha: 1,
        duration: 2,
        ease: "sine.inOut",
      },
      "-=0.6"
    )
    // 4. 主標題從下方浮出
    .to(
      ".landingAnimation h1",
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "back.out(1.2)",
      },
      "-=1.5"
    )
    // 5. 副標題
    .to(
      ".landingAnimation h2",
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.6"
    )
    // 6. HTML
    .to(
      ".landingAnimation h3",
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
      },
      "-=0.4"
    )
    // 7. CSS
    .to(
      ".landingAnimation h4",
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
      },
      "-=0.4"
    )
    // 8. JavaScript
    .to(
      ".landingAnimation h5",
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
      },
      "-=0.4"
    )
    // 9. 球體
    .to(
      ".gradient-ball",
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(2)",
      },
      "-=0.5"
    );
});

// 等待頁面載入完成
window.addEventListener("DOMContentLoaded", () => {
  const pipeBgi = document.querySelector(".pipe-bgi");
  const rollingBall = document.querySelector(".rolling-ball");
  const textItems = document.querySelectorAll(".text-item");

  const maxScroll = pipeBgi.offsetHeight + 200;

  // 1. 設定球體初始狀態為隱藏(使用 autoAlpha)
  gsap.set(rollingBall, {
    autoAlpha: 0,
    scale: 0.5,
  });

  // 設定文字區塊初始狀態
  gsap.set(textItems, {
    autoAlpha: 0,
    x: -50,
  });

  // 2. 建立球體淡入動畫
  gsap.to(rollingBall, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: ".pipe-section",
      start: "top 50%",
      end: "top 100%",
      toggleActions: "play none none reverse",
      markers: false,
    },
  });

  // 3. 建立球體往下滾動的動畫
  gsap.to(rollingBall, {
    y: maxScroll,
    rotation: 1440,
    ease: "none",
    scrollTrigger: {
      trigger: ".pipe-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      markers: false,
    },
  });

  // 為每個文字區塊建立淡入動畫
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
        markers: false,
      },
    });
  });

  // 球體呼吸效果
  gsap.to(rollingBall, {
    scale: 1.1,
    yoyo: true,
    repeat: -1,
    duration: 1.5,
    ease: "sine.inOut",
  });

  // 視差滾動區
  gsap.to(".parallax-bg", {
    y: "-35%",
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
      markers: false,
    },
  });

  // Swiper 輪播
  const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      forceToAxis: true,
    },
    grabCursor: true,
    speed: 600,
    effect: "slide",
  });
});
