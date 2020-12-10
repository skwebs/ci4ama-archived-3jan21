"use strict";
function is_touch_enabled() { 
   return ( 'ontouchstart' in window ) ||  
   ( navigator.maxTouchPoints > 0 ) || 
   ( navigator.msMaxTouchPoints > 0 ); 
} 
   
$(document).ready(()=>{
    var time = 5;
    var $bar,
    isPause,
    tick,
    percentTime;
    //pauseBtn = $(".slider-progress .fa-pause"),
    //playBtn = $(".slider-progress .fa-play");

    var sliderOne = $('.slider__1');
    sliderOne.on('beforeChange', function(){
	    startProgressbar();
    });
    
    sliderOne.slick({
        draggable: true,
        speed:500,
        adaptiveHeight: false,
        dots: true,
        mobileFirst: true,
        pauseOnDotsHover: true,
        cssEase:'cubic-bezier(0.1, 0.9, 1.0, 0.01)',
        arrows:false
    });
    $bar = $('.slider__1-progressbar');
    if(is_touch_enabled()){
	    sliderOne.on("touchstart",()=>{
		    pause();
	    })
	    sliderOne.on("touchend",()=>{
		    play();
	    })
    }else{ 
        sliderOne.on({
	        mouseenter: function() {
		       // isPause = true;
		       pause();
            },
            mouseleave: function() {
	            //isPause = false;
	            play();
            }
        })
    }
    //pauseBtn.click(()=>{ pause();}); playBtn.click(()=>{ play();})
    function play(){
	    isPause=false;
	    //pauseBtn.show();playBtn.hide();
    }
    function pause(){
	    isPause=true;
	    //pauseBtn.hide();playBtn.show();
    }
    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    }
    function interval() {
        if(isPause === false) {
            percentTime += 1 / time; //(time+0.1);
            $bar.css({
	            width: percentTime+"%"
            });
            if(percentTime >= 100)
            {
	            sliderOne.slick('slickNext');
	            startProgressbar();
            }
            play();
        }else{
            pause();
        }
    }
    
    function resetProgressbar() {
        $bar.css({
            width: 0+'%' 
        });
        clearTimeout(tick);
    }
    startProgressbar();
    // ============== //slider__1 ================ //
});