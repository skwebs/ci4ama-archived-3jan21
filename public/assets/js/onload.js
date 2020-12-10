"use strict";
window.addEventListener('DOMContentLoaded', (event) => {
    //console.log('DOM fully loaded and parsed');
	document.querySelector("body").style.visibility = "visible";
	window.addEventListener('load', (event) => {
	  // all script write below
	  
	  //console.log('page is fully loaded');
	  
	  //show preloader until page loading
	  $('.preloader').fadeOut(600, function(){ 
	  	$(this).remove();
	  });
	  
	  
	  
	});
});

$(document).ready(()=>{
	function p(e){return e.toString().padStart(2,'0');}
	setInterval(() => {
	var d = new Date(),
	h = d.getHours(),
	m = h >= 12 ? "PM" : "AM";
	(h = (h %= 12) || 12),
	(document.querySelector(".header__time").innerHTML =
//	["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()] +
//	", " +
	p(d.getDate()) +
	"-" +
	["Jan","Feb","Mar","Apr","May",
	"Jun","Jul","Aug","Sep","Oct",
	"Nov","Dec"][d.getMonth()] +
	"-" +
	d.getFullYear() +
	" [" + p(h) + ":" +
	p(d.getMinutes()) +
	":" +
	p(d.getSeconds()) +
	" " + m + " IST]");
	}, 1e3);
	//setInterval(()=>document.querySelector(".header__time").innerHTML = new Date().toLocaleString('en-IN', { dateStyle : 'medium',timeStyle : 'medium',hour12: true }),1e3);
	
	
	//show preloader until page loading
//	$('.preloader').fadeOut(600, function(){ 
	//	$('.preloader').remove();
	//});
	//$(".page__wrapper").removeClass("vis-hid");
	
	/*/when document is smaller than viewport
	//then set footer in bottom
	var win = $(window).outerHeight()
	var allDocHeight = $("header").outerHeight()+$("nav").outerHeight()+$("footer").outerHeight();
	if(allDocHeight < win){
		$("main").css("min-height",win-allDocHeight)
	}else{
		$("main").css("min-height","")
	}
	*/
});