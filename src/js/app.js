let H;
let wrapAll;
let headEl;
let scrollerEl = document.getElementById("slideScroller");


function initView(){
	H = 0;
	wrapAll = document.querySelector(".gv-wrap-all");
	

	[].slice.apply(document.querySelectorAll('.gv-slide-item')).forEach(slideEl => {
 	   	H += slideEl.offsetWidth;
	});

	wrapAll.setAttribute("style","height:"+H+"px");
	addListeners();
}

function addListeners(){
	headEl = document.getElementById("bannerandheader");

	document.addEventListener("scroll", function(event) {
	             

	            if(visibleY(headEl)) {
	            	document.getElementById('slideWrapper').classList.add('fixed');

	            	var sx, sy;
		             if(window.pageYOffset!= undefined){
		                sx = pageXOffset;
		                sy = pageYOffset;
		                 //console.log(sx +" else " + sy);
		              	scrollSlider ([pageXOffset, pageYOffset]);
		             }
		             else{
			            var d = document, r = d.documentElement, b = d.body;
			              sx= r.scrollLeft || b.scrollLeft || 0;
			              sy= r.scrollTop || b.scrollTop || 0;
		              	  scrollSlider ([pageXOffset, pageYOffset]);
			              //console.log(sx +" else " + sy);
			              // return [sx, sy];
		             }

	            }else{
	            	scrollerEl.style.transform = "translateX(0px)";
	            	document.getElementById('slideWrapper').classList.remove('fixed');
	            }
	    });


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


}

function scrollSlider(s){
	let newX = (0 - s[1]);
	console.log(s);
	scrollerEl.style.transform = "translateX("+(newX + headEl.offsetHeight)+"px)";

	// var a = wrapAll.scrollTop;
	// var b = wrapAll.scrollHeight - wrapAll.clientHeight;
	//var c = a/b; //% of scroll --- https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript

	//console.log(a,b)

}


var visibleY = function(el){

	return (el.offsetHeight * -1) > el.getBoundingClientRect().top;

	

}


initView();