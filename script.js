'use strict';

const preloader = document.querySelector ("[data-preload]"),
 navbar = document.querySelector("[data-navbar]"),
 navTogglers = document.querySelectorAll("[data-nav-toggler]"),
overlay = document.querySelector("[data-overlay]"),
 header = document.querySelector("[data-header]"),
heroSliderItems = document.querySelectorAll("[data-hero-sliders-item]"),
heroSliderPrevBtn = document.querySelectorAll("[data-prev-btn]"),
heroSliderNextBtn = document.querySelectorAll("[data-next-btn]"),
heroSlider = document.querySelector("[data-hero-slider]");


let lastScrollPos = 0;
let currentSliderPos = 0;
let lastActiveSliderItems = heroSliderItems[0];


window.addEventListener("load" , ()=> {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});


const addEventOnElements = function (elements, eventType, callback){
    for (let i=0; i< elements.length; i++ ){
        elements[i].addEventListener(eventType, callback);
    }
}


const toggleNavbar = function(){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}


addEventOnElements(navTogglers, "click", toggleNavbar);

const hideHeader = function(){
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom){
        header.classList.add("hide");
    }
    else{
        header.classList.remove("hide");
    }
    lastScrollPos = window.screenY;

};

window.addEventListener("scroll", function(){
    if (window.screenY >= 50){
        header.classList.add("active");
        hideHeader();
    }
    else{
        header.classList.remove("active");
    }
});


const updateSliderPos = function(){
    lastActiveSliderItems.classList.remove("active");
    heroSliderItems(currentSliderPos).classList.add("active");
    lastActiveSliderItems = heroSliderItems[currentSliderPos];
};


const slideNext = function(){
    if (currentSliderPos >= heroSliderItems.length-1){
        currentSliderPos=0;
    } else{
        currentSliderPos++;
    }

    updateSliderPos();
}


heroSliderNextBtn.addEventListener("click" , slideNext);

const slidePrev = function() {
    if (currentSliderPos <= 0){
        currentSliderPos = heroSliderItems.length-1;
    } else
    {
        currentSliderPos--;
    }
    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);


let autoSlideInterval; 


const autoSlide = function() {
    autoSlideInterval = setInterval(function(){
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function(){
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], 
   "mouseover" , autoSlide );

window.addEventListener("load", autoSlide);
