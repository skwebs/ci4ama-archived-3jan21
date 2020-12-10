"use strict";
$(document).ready(()=>{
	//clone and copy navbar in sidebar
	//$(".slide__menu-wrapper").sticky({topSpacing:65,zIndex:2})
	//slide__menu
	$(".slide__menu").slick({
		slidesToShow:2,
		autoplay:true,
		centerMode:true,
		focusOnSelect:true,
		prevArrow:'<button type="button" class="slick-prev"><i class="fa fa-chevron-left" ></i></button>',
		nextArrow:'<button type="button" class="slick-next"><i class="fa fa-chevron-right" ></i></button>',
		responsive: [
			{
				breakpoint: 568,
				settings: {
					slidesToShow: 2,
					slideToScroll:2,
					autoplay:true,
					centerPadding:"10px"
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slideToScroll:2,
					autoplay:true,
					centerPadding:"20px"
				}
			}
		]
	});
})