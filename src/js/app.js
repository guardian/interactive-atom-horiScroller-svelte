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

function init(){
	document.documentElement.offsetWidth > 979 ? screenFormat = "desktop" : screenFormat = "mobile";	
	H = 0;
	headEl = document.getElementById("bannerandheader");
	wrapEl = document.querySelector(".gv-wrap-all");
	scrollerEl = document.getElementById("slideScroller")
    introEl = document.getElementById("introCappy");
	
	checkScreenSize();
}


function checkScreenSize(){
	screenFormat == "desktop" ? initDesktop() : initMobile();
}



function initMobile(){
	// wrapAll.setAttribute("style","height:"+H+"px");
	// console.log()
	// addListenersDesktop();
	console.log("mobile")
}


function initDesktop(){
	
	let numSlides = document.getElementsByClassName('gv-slide-item').length;

	[].slice.apply(document.getElementsByClassName('gv-slide-item')).forEach(slideEl => {

			[].slice.apply(slideEl.getElementsByTagName("img")).forEach(imgEl => {
					imgEl.onload = function () {
				        //console.log ("The image has loaded!", imgEl.offsetWidth);   
				        H += slideEl.offsetWidth; 
				       	widthsArr.push (slideEl.offsetWidth)

				       	if(widthsArr.length == numSlides){
				       		
				       		// console.log(H - document.documentElement.offsetWidth)

				       		console.log("scrollEl - h", scrollerEl.getBoundingClientRect() )

				       		wrapEl.setAttribute("style","height:"+ (H - document.documentElement.offsetWidth ) +"px");
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

function addListenersDesktop(){

	
//https://stackoverflow.com/questions/16376794/on-div-scroll-activate-another-divs-scroll


  document.addEventListener("scroll", function(){

  		//wrapEl.setAttribute("style","height:"+(H - document.documentElement.offsetWidth )+"px");

// + ( scrollerEl.getBoundingClientRect().bottom - headEl.offsetHeight )
  		// console.log("wrapEl - h", wrapEl.getBoundingClientRect(), wrapEl.offsetHeight)
  		 
  		// console.log("docEl - h", document.documentElement.getBoundingClientRect())

  		document.getElementById('slideWrapper').classList.add('fixed');
  		scrollerEl.style.transform = "translateX("+(document.documentElement.getBoundingClientRect().top)+"px)";

  		scrollerEl.scrollLeft = document.documentElement.scrollTop;

  		if (noTweak){
  			let newH = wrapEl.getBoundingClientRect().height + (scrollerEl.getBoundingClientRect().height - headEl.offsetHeight);
			wrapEl.setAttribute("style","height:"+ newH +"px");

			noTweak=false;
  		}


  })



  //   document.addEventListener("scroll", function(){
  // 		console.log("pos",  wrapEl.getBoundingClientRect(), wrapEl.offsetTop) 

  // 		document.getElementById('slideWrapper').classList.add('fixed');

  // 		//scrollerEl.style.transform = "translateX("+(0- 174 - wrapEl.getBoundingClientRect().top )+"px)";

  // 		// CLOSE scrollerEl.style.transform = "translateX("+(0 - wrapEl.getBoundingClientRect().bottom)+"px)";

  // 		scrollerEl.scrollLeft = document.documentElement.scrollTop;


  // })



	// document.addEventListener("scroll", function(event) {
	             
	            
	//             	document.getElementById('slideWrapper').classList.add('fixed');

	//             	var sx, sy;
	// 		             if(window.pageYOffset!= undefined){
	// 		                sx = pageXOffset;
	// 		                sy = pageYOffset;
	// 		             }
	// 		             else{
	// 			            var d = document, r = d.documentElement, b = d.body;
	// 			              sx= r.scrollLeft || b.scrollLeft || 0;
	// 			              sy= r.scrollTop || b.scrollTop || 0;
	// 		             }

	// 	             //console.log(wrapEl.getBoundingClientRect(), document.documentElement.offsetWidth, document.documentElement.offsetHeight)
	// 	             scrollSlider ([sx, sy]);

	// 	        //introPlayed ? scrollSlider ([sx, sy]): scrollIntro([sx, sy]);

	// 			// if(visibleY(headEl)) {

	//    //          }else{
	//    //          	scrollerEl.style.transform = "translateX(0px)";
	//    //          	document.getElementById('slideWrapper').classList.remove('fixed');
	//    //          }
	//     });


}


function scrollSlider(s){

	//console.log(s[1])
	let newX = (0 - s[1]);

	// if(newX > (0 - document.documentElement.offsetWidth)){ - document.documentElement.offsetWidth
		scrollerEl.style.transform = "translateX("+(newX - document.documentElement.offsetWidth)+"px)";

	//}
	
	var a = wrapEl.scrollTop;
	var b = wrapEl.offsetHeight - wrapEl.scrollTop;
	// var c = a/b; //% of scroll --- https://stackoverflow.com/questions/2481350/how-to-get-scrollbar-position-with-javascript
	console.log(a,b);

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




///////////////timer


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