import lazysizes from 'lazysizes'

let H;
let screenFormat;
let wrapEl;
let headEl;
let widthsArr = [];
let scrollerEl;
let introEl;
let introPlayed = false;

console.log(lazysizes)

function init() {
    document.documentElement.offsetWidth > 979 ? screenFormat = "desktop" : screenFormat = "mobile";
    H = 0;
    headEl = document.getElementById("bannerandheader");
    wrapEl = document.querySelector(".gv-wrap-all");
    scrollerEl = document.getElementById("slideScroller")
    introEl = document.getElementById("introCappy");

    checkScreenSize();
}


function checkScreenSize() {
    screenFormat == "desktop" ? initDesktop() : initMobile();
}


function initMobile() {
    // wrapAll.setAttribute("style","height:"+H+"px");
    // console.log()
    // addListenersDesktop();
    let mobH = document.documentElement.offsetHeight - 300;
    document.querySelector(".gv-fade-out").classList.add("remove")
        // document.querySelector("#slideWrapper").style.height = mobH +"px"
    console.log("mobile");
    introEl.style.bottom = "0px";
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

                    document.querySelector(".gv-fade-out").classList.add("remove")

                }

            };

        });


    });

    addListenersDesktop();

}

function getScroll() {
    var target = $("#target");
    $("#source").scroll(function() {
        target.prop("scrollTop", this.scrollTop)
            .prop("scrollLeft", this.scrollLeft);
    });
}

var noTweak = true;

function addListenersDesktop() {

    document.addEventListener("scroll", function() {

        document.getElementById('slideWrapper').classList.add('fixed');


        //scrollerEl.scrollLeft = document.documentElement.scrollTop;

        if (noTweak) {
            let newH = wrapEl.getBoundingClientRect().height + (scrollerEl.getBoundingClientRect().height); //- headEl.offsetHeight
            wrapEl.setAttribute("style", "height:" + newH + "px");
            noTweak = false;
        }

        //console.log(headEl.offsetHeight +"> = < ???" + wrapEl.getBoundingClientRect().top)

        if (notShownY(headEl)) {
            scrollerEl.style.transform = "translateX(" + (wrapEl.getBoundingClientRect().top) + "px)";
        } else {
            scrollerEl.style.transform = "translateX(0)";
        }

    })

}


function scrollSlider(s) {

    //console.log(s[1])
    let newX = (0 - s[1]);

    // if(newX > (0 - document.documentElement.offsetWidth)){ - document.documentElement.offsetWidth
    scrollerEl.style.transform = "translateX(" + (newX - document.documentElement.offsetWidth) + "px)";

    //}

    var a = wrapEl.scrollTop;
    var b = wrapEl.offsetHeight - wrapEl.scrollTop;
    // var c = a/b; //% of scroll --- https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
    //console.log(a,b);

    if ((headEl.getBoundingClientRect().top * -1) > 2000) {
        introPlayed = false;
    }
}

function scrollIntro(s) {
    let newY = s[1];
    let newPos = introEl.getBoundingClientRect().bottom;
    newPos += newY;
    if ((headEl.getBoundingClientRect().top * -1) > 2000) {
        introPlayed = true;
    } else {
        introEl.style.transform = "translateY(300px)";

        console.log(newPos)
    }
}

function notShownY(el) {
    return (el.offsetHeight * -1) > el.getBoundingClientRect().top;
}


init();


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