import lazysizes from 'lazysizes'

let H;
let screenFormat;
let wrapEl;
let headEl;
let introPanelEl;
let widthsArr = [];
let scrollerEl;
let introCaptionEl;
let introPlayed = false;

console.log(lazysizes)

function init() {
    document.documentElement.offsetWidth > 979 ? screenFormat = "desktop" : screenFormat = "mobile";
    H = 0;
    headEl = document.getElementById("bannerandheader");
    wrapEl = document.querySelector(".gv-wrap-all");
    scrollerEl = document.getElementById("slideScroller")
    introCaptionEl = document.getElementById("introCappy");
    introPanelEl = document.querySelector(".gv-intro-panel");
    checkScreenSize();
}


function checkScreenSize() {
    screenFormat == "desktop" ? initDesktop() : initMobile();
}

function initMobile() {
    introPanelEl.classList.add("fade-half")
    console.log("mobile");
    introCaptionEl.style.bottom = "0px";

    addListenersMobile();
}


function initDesktop() {

    let numSlides = document.getElementsByClassName('gv-slide-item').length;

    [].slice.apply(document.getElementsByClassName('gv-slide-item')).forEach(slideEl => {

        [].slice.apply(slideEl.getElementsByTagName("img")).forEach(imgEl => {
            imgEl.onload = function() {
                //console.log ("The image has loaded!", imgEl.offsetWidth);   
                H += slideEl.offsetWidth;
                widthsArr.push(slideEl.offsetWidth)

                if (widthsArr.length == numSlides) {

                    // console.log(H - document.documentElement.offsetWidth)

                    console.log("scrollEl - h", scrollerEl.getBoundingClientRect())

                    wrapEl.setAttribute("style", "height:" + (H - document.documentElement.offsetWidth) + "px");

                    introPanelEl.classList.add("fade-half")

                }

            };

        });

    });

    addListenersDesktop();

}

var noTweak = true;

function addListenersDesktop() {

    document.addEventListener("scroll", function() {

        document.getElementById('slideWrapper').classList.add('fixed');

        if (noTweak) {
            let newH = wrapEl.getBoundingClientRect().height + (scrollerEl.getBoundingClientRect().height); //- headEl.offsetHeight
            wrapEl.setAttribute("style", "height:" + newH + "px");
            noTweak = false;
        }

        if (notShownY(headEl)) {
            scrollerEl.style.transform = "translateX(" + (wrapEl.getBoundingClientRect().top) + "px)";
            introPanelEl.classList.add("remove");
        } else {
            scrollerEl.style.transform = "translateX(0)";
            introPanelEl.classList.remove("remove");
            introPanelEl.classList.add("fade-half");
        }

    })

}

function addListenersMobile(){
	introPanelEl.addEventListener("click", function() {
		introPanelEl.classList.add("remove");

	})

}


function notShownY(el) {
    return (el.offsetHeight * -1) > el.getBoundingClientRect().top;
}

init();





// function scrollSlider(s) {
//     let newX = (0 - s[1]);
//     scrollerEl.style.transform = "translateX(" + (newX - document.documentElement.offsetWidth) + "px)";

//     //}

//     var a = wrapEl.scrollTop;
//     var b = wrapEl.offsetHeight - wrapEl.scrollTop;
//     // var c = a/b; //% of scroll --- https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
//     //console.log(a,b);

//     if ((headEl.getBoundingClientRect().top * -1) > 2000) {
//         introPlayed = false;
//     }
// }

// function scrollIntro(s) {
//     let newY = s[1];
//     let newPos = introCaptionEl.getBoundingClientRect().bottom;
//     newPos += newY;
//     if ((headEl.getBoundingClientRect().top * -1) > 2000) {
//         introPlayed = true;
//     } else {
//         introCaptionEl.style.transform = "translateY(300px)";

//         console.log(newPos)
//     }
// }

///////////////timer example


// wrapAll.addEventListener("scroll", doThisStuffOnScroll);

// var didScroll = false;

// document.onscroll = doThisStuffOnScroll;

// function doThisStuffOnScroll() {
//     didScroll = true;
// }

// setInterval(function() {
//     if(didScroll) {
//         didScroll = false;
//         console.log(wrapAll.scrollHeight - wrapAll.clientHeight);
//     }
// }, 100);