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

  // 設定初始狀態
  gsap.set(".landingAnimation", { opacity: 0 });
  gsap.set("header", { y: -100, opacity: 0 });

  // 導航選單項目初始狀態 - 壓扁並隱藏
  gsap.set("header nav li", {
    scaleY: 0,
    opacity: 0,
    transformOrigin: "top", // 從頂部開始展開
  });

  gsap.set(".landingAnimation h1", { y: 80, opacity: 0 });
  gsap.set(".landingAnimation h2", { y: 60, opacity: 0 });
  gsap.set(".landingAnimation h3, .landingAnimation h4, .landingAnimation h5", {
    opacity: 0,
    scale: 0.5,
  });
  gsap.set(".gradient-ball", { opacity: 0, scale: 0 });

  loadTimeline
    // 1. Header 容器從上方滑入
    .to("header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })
    // 2. 導航選單項目像窗簾一樣依序展開
    .to(
      "header nav li",
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08, // 每個項目間隔 0.08 秒
        ease: "power2.out",
      },
      "-=0.4"
    ) // 與 header 重疊 0.4 秒
    // 3. 背景非常慢且平滑地淡入
    .to(
      ".landingAnimation",
      {
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.6"
    )
    // 6. HTML
    .to(
      ".landingAnimation h3",
      {
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
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
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(2)",
      },
      "-=0.5"
    );
});

// 等待頁面載入完成
window.addEventListener("DOMContentLoaded", () => {
  // 取得水管容器和球體元素
  const pipeBgi = document.querySelector(".pipe-bgi");
  const rollingBall = document.querySelector(".rolling-ball");
  const textItems = document.querySelectorAll(".text-item");

  // 計算球體滾動的最大距離(需要延伸到容器外)
  const maxScroll = pipeBgi.offsetHeight + 200; // 加 200px 讓球完全滾出畫面

  // 1. 設定球體初始狀態為隱藏
  gsap.set(rollingBall, {
    opacity: 0,
    scale: 0.5,
  });

  // 2. 建立球體淡入動畫
  gsap.to(rollingBall, {
    opacity: 1,
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
    y: maxScroll, // 往下移動直到滾出容器
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
  textItems.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
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

  // 可選：為球體加上額外的動態效果
  gsap.to(rollingBall, {
    scale: 1.1,
    yoyo: true,
    repeat: -1,
    duration: 1.5,
    ease: "sine.inOut",
  });

  //視差滾動區
  // 視差滾動效果：背景往上移動
  gsap.to(".parallax-bg", {
    y: "-35%", // 反向滾動效果
    ease: "none", // 線性移動
    scrollTrigger: {
      trigger: ".parallax",
      start: "top bottom", // 當區塊進入視窗底部時開始
      end: "bottom top", // 當區塊離開視窗頂部時結束
      scrub: 2, // 數字越大越平滑，建議 0.5-2 之間
      markers: false, // 開發時可設為 true 查看觸發點
    },
  });

  //Swiper輪播
  const swiper = new Swiper(".swiper", {
    // 基本設定
    slidesPerView: "auto", // 自動計算顯示數量
    spaceBetween: 24, // 卡片間距
    loop: true, // 無限循環
    centeredSlides: false, // 不置中
    autoplay: {
      delay: 3000, // 每 3 秒切換一次
      disableOnInteraction: false, // 使用者滑動後仍繼續自動播放
    },

    // 響應式斷點
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

    // 左右箭頭
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // 鍵盤控制
    keyboard: {
      enabled: true,
    },

    // 滑鼠滾輪
    mousewheel: {
      forceToAxis: true,
    },

    // 拖曳設定
    grabCursor: true,

    // 速度與效果
    speed: 600,
    effect: "slide",
  });
});
