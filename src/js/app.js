let H;
let wrapAll;
let headEl;
let scrollerEl = document.getElementById("slideScroller");
let screenFormat;
let introEl = document.getElementById("introCappy");
let introPlayed = false;

function init(){
	document.documentElement.offsetWidth > 979 ? screenFormat = "desktop" : screenFormat = "mobile";	
	H = 0;
	headEl = document.getElementById("bannerandheader");
	wrapAll = document.querySelector(".gv-wrap-all");

	[].slice.apply(document.querySelectorAll('.gv-slide-item')).forEach(slideEl => {
 	   	H += slideEl.offsetWidth;
	});
	checkScreenSize();
}


function checkScreenSize(){
	screenFormat == "desktop" ? initDesktop() : initMobile();
}


function initDesktop(){
	wrapAll.setAttribute("style","height:"+H+"px");
	console.log()
	addListenersDesktop();
}


function addListenersDesktop(){
	document.addEventListener("scroll", function(event) {
	             
	            if(visibleY(headEl)) {
	            	document.getElementById('slideWrapper').classList.add('fixed');

	            	var sx, sy;
		             if(window.pageYOffset!= undefined){
		                sx = pageXOffset;
		                sy = pageYOffset;
		             }
		             else{
			            var d = document, r = d.documentElement, b = d.body;
			              sx= r.scrollLeft || b.scrollLeft || 0;
			              sy= r.scrollTop || b.scrollTop || 0;
		             }
		             introPlayed ? scrollSlider ([sx, sy]): scrollIntro([sx, sy]);

	            }else{
	            	scrollerEl.style.transform = "translateX(0px)";
	            	document.getElementById('slideWrapper').classList.remove('fixed');
	            }
	    });


}


function scrollSlider(s){
	let newX = (0 - s[1]);
	console.log(s);
	scrollerEl.style.transform = "translateX("+(newX + headEl.offsetHeight)+"px)";
	// var a = wrapAll.scrollTop;
	// var b = wrapAll.scrollHeight - wrapAll.clientHeight;
	//var c = a/b; //% of scroll --- https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript

	//console.log(a,b)

	if ((headEl.getBoundingClientRect().top  * -1 ) > 2000){
		introPlayed = false;
	}
}

function scrollIntro(s){
	let newY = s[1];
	let newPos = introEl.getBoundingClientRect().bottom;
	newPos += newY;
	if ((headEl.getBoundingClientRect().top  * -1 ) > 2000){
		introPlayed = true;
	}else{
		introEl.style.transform= "translateY(300px)";

		console.log(newPos)
	}

	
	

	

	
	
    
	
}

function visibleY(el){

	return (el.offsetHeight * -1) > el.getBoundingClientRect().top;

}


init();









///////////////timer if needed


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