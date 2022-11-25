import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'
import { jarallax, jarallaxVideo } from 'https://cdn.jsdelivr.net/npm/jarallax@2/+esm';
jarallaxVideo();

jarallax(document.querySelectorAll('.jarallax'), {
    speed: 0.6
});

if (document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
        speed: 800,
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 10,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        on: {
            touchStart: (swiper) => {
                swiper.autoplay.pause();
                swiper.el.classList.add('swiper-stop-animation');
            },
            touchEnd: (swiper) => {
                swiper.autoplay.run();
                swiper.el.classList.remove('swiper-stop-animation');
            }
        }
    });

    // start autoplay form viewport
    const startSlider = () => {
        if ((swiper.el.getBoundingClientRect().y - swiper.el.offsetHeight) < 100) {
            swiper.autoplay.start();
            swiper.el.classList.remove('swiper-stop-animation');
        }
    }

    swiper.autoplay.stop();
    swiper.el.classList.add('swiper-stop-animation');
    startSlider();

    window.addEventListener('scroll', () => {
        startSlider();
    });
}
