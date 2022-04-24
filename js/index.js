function initHomeSlider() {
  new Swiper(".content__slider", {
    direction: "horizontal",
    slidesPerView: 1,
    mousewheel: Boolean(window.innerWidth > 1024),
    forceToAxis: true,

    pagination: {
      el: ".content__slider-pagination",
      clickable: true,
    },
  });
}

function initInMotionSlider() {
  new Swiper(".inMotion__slider", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
    },
  });
  new Swiper(".inMotion__portfolio-slider", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,
      },
    },
  });
  document.querySelectorAll(".inMotion__portfolio-container").forEach(function (item) {
    item.addEventListener("click", function () {
      this.classList.toggle("inMotion__portfolio-container--active");
    });
  });
}
function initPlayerApi() {}
function initPlayer() {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  window.onYouTubePlayerAPIReady = function () {
    player = new YT.Player("video", {
      events: {
        onReady: onPlayerReady,
        onStateChange: onPause,
      },
    });
  };
  function onPause(event) {
    var playButtons = document.querySelectorAll("#play-button");
    playButtons.forEach(function (item) {
      if (item.classList.contains("project__content-video-control--active") && event.data === 2) {
        item.classList.remove("project__content-video-control--play");
        item.classList.add("project__content-video-control--paused");
      }
      if (item.classList.contains("project__content-video-control--active") && event.data === 1) {
        item.classList.add("project__content-video-control--play");
        item.classList.remove("project__content-video-control--paused");
      }
    });
  }
  function onPlayerReady() {
    var playButtons = document.querySelectorAll("#play-button");
    playButtons.forEach(function (item) {
      item.addEventListener("click", function () {
        const isActive = item.classList.contains("project__content-video-control--active");
        const isPaused = item.classList.contains("project__content-video-control--paused");
        const isPlaying = item.classList.contains("project__content-video-control--play");

        if (isActive && !isPlaying && !isPaused) {
          item.classList.add("project__content-video-control--play");
          return player.playVideo();
        }
        if (isPaused) {
          item.classList.remove("project__content-video-control--paused");
          item.classList.add("project__content-video-control--play");
          return player.playVideo();
        }
        if (isActive) {
          item.classList.remove("project__content-video-control--play");
          item.classList.add("project__content-video-control--paused");
          return player.pauseVideo();
        } else {
          playButtons.forEach(function (button) {
            button.classList.remove("project__content-video-control--active");
            button.classList.remove("project__content-video-control--paused");
            button.classList.remove("project__content-video-control--play");
          });
          item.classList.add("project__content-video-control--active");
          item.classList.add("project__content-video-control--play");
          player.loadVideoById(item.value);
        }
      });
    });
  }
}
function setListPaddings() {
  let lists = document.querySelectorAll(".project__content-list");
  lists.forEach(function (item) {
    for (let i = 0; i < item.children.length; i++) {
      item.children[i].style.paddingLeft = `${20 * (i + 1)}px`;
    }
  });
}

function init() {
  const select = document.querySelectorAll(".lang-switcher");
  select.forEach(function (item) {
    const optionsWrapper = item.querySelector(".lang-switcher-options");
    const value = item.querySelector(".lang-switcher-value");
    const options = item.querySelectorAll(".lang-switcher-options li");

    function chooseOption(e) {
      e.stopPropagation();
      value.innerHTML = this.innerHTML;
      toggleSelect(e);
    }

    function toggleSelect(e) {
      e.stopPropagation();
      optionsWrapper.classList.toggle("language__select-options--open");
    }

    item.addEventListener("click", toggleSelect);
    options.forEach(function (el) {
      el.addEventListener("click", chooseOption);
    });
  });

  function onSidebarToggle() {
    document.querySelector(".sidebar-toggler").classList.toggle("toggled");
    document.querySelector(".sidebar").classList.toggle("sidebar--visible");
  }
  document.querySelector(".sidebar-toggler.cross").addEventListener("click", onSidebarToggle);
  document.querySelector(".sidebar-toggler").addEventListener("click", onSidebarToggle);

  document.querySelector(".header__sidebar-search").addEventListener("click", function () {
    document.querySelector("#header__search").classList.toggle("header__search--visible");
  });

  document.querySelector(".header__search-background").addEventListener("click", function (e) {
    e.stopPropagation();
    document.querySelector("#header__search").classList.toggle("header__search--visible");
  });
}

const tl = gsap.timeline();

//common animations

function fadeOut(container) {
  return tl.from(container.querySelector(".main__background"), {
    opacity: 0,
    duration: 0.8,
  });
}

function fadeIn(container) {
  return tl.from(container.querySelector(".main__background"), {
    opacity: 1,
    duration: 0.8,
  });
}

//home animation

function homePageAnimationIn(container) {
  return tl
    .to(container.querySelector(".header__sidebar-background"), {
      height: "0%",
      duration: 0.3,
    })
    .to(container.querySelector(".sidebar"), {
      width: 0,
      padding: "0",
      duration: 0.3,
    })
    .to(
      container.querySelector(".main__background"),
      {
        opacity: 1,
        duration: 0.8,
      },
      "<"
    );
}

function homePageAnimationOut(container) {
  return tl
    .from(container.querySelector(".main__background"), {
      opacity: 1,
      duration: 0.8,
    })
    .from(
      container.querySelector(".sidebar"),
      {
        width: 0,
        padding: "0",
        duration: 0.3,
      },
      "<"
    )
    .from(container.querySelector(".header__sidebar-background"), {
      height: "0%",
      duration: 0.3,
    });
}

//service animation

function serviceAnimationIn(container) {
  return tl
    .from(container.querySelector(".main__background"), {
      opacity: 1,
      duration: 0.8,
    })
    .from(
      container.querySelector(".project__sidebar-inner"),
      {
        x: -1000,
        duration: 0.3,
      },
      "<"
    );
}

function serviceAnimationOut(container) {
  return tl
    .to(container.querySelector(".main__background"), {
      opacity: 1,
      duration: 0.8,
    })
    .to(
      container.querySelector(".project__sidebar-inner"),
      {
        x: -1000,
        duration: 0.4,
      },
      "<"
    );
}

//init animations

barba.init({
  debug: true,
  preventRunning: true,
  transitions: [
    {
      name: "home",
      namespace: "home",
      async leave(data) {
        if (["home"].includes(data.current.namespace)) {
          await homePageAnimationIn(data.current.container);
        } else {
          await fadeIn(data.current.container);
        }
        data.current.container.remove();
      },
      async enter(data) {
        if (["service", "in-motion", "monster"].includes(data.next.namespace)) {
          await serviceAnimationIn(data.next.container);
        } else {
          await fadeOut(data.next.container);
        }
      },
    },
    {
      name: "service",
      async leave(data) {
        if (["service", "in-motion", "monster"].includes(data.current.namespace)) {
          await serviceAnimationOut(data.current.container);
        } else {
          await fadeIn(data.current.container);
        }
        data.current.container.remove();
      },
      async enter(data) {
        if (["home"].includes(data.next.namespace)) {
          await homePageAnimationOut(data.next.container);
        } else {
          await fadeOut(data.next.container);
        }
      },
    },
  ],
  views: [
    {
      namespace: "home",
      beforeEnter() {
        initHomeSlider();
      },
    },
    {
      namespace: "in-motion",
      async beforeEnter(data) {
        initInMotionSlider();
        setListPaddings();
        await initPlayerApi();
        initPlayer(data);
      },
    },
    {
      namespace: "monster",
      async beforeEnter(data) {
        setListPaddings();
        await initPlayerApi();
        initPlayer(data);
      },
    },
    {
      namespace: "service",
      beforeEnter() {
        setListPaddings();
      },
    },
  ],
});

barba.hooks.afterEnter(() => {
  init();
});
