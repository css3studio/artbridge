/*
Theme Name: artbridge
Author: css3studio
Version:1.0
*/
var device_status = "";
var $ = jQuery;
$(window).resize(function() {
	var dw = viewport().width;
	if(dw <= 768 && device_status == "pc"){	//PC에서 모바일로 변경시
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else if(dw > 768 && device_status == "mobile"){	//모바일에서 PC로 변경시
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}
});

/* 메뉴고정
$(window).scroll(function(e){

	if ($(window).scrollTop() > 100) {
		$("body.pc").addClass("scrolling");
	} else {
		$("body.pc").removeClass("scrolling");
	}
});
*/
$(document).ready(function() {

	var dw = viewport().width;
	if(dw <= 768){	//모바일
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else{	//PC
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}

    //메인 SNS 탭메뉴
    $('.menu-tab01 > li > a').on("click",function(event){
        $(".menu-tab01 > li").removeClass("current");
        $(this).parent().addClass("current");
        var target = $(this).attr('href');
        $('.tab-data-area li').hide();
        $('.tab-data-area li' + target).show();
        event.preventDefault();
    });

    //space carousel
	$('.slider-carousel03 .slider').each(function(){
		var item_count = $('li',$(this)).length;
		$(this).slick({
			arrows: false,
			dots: item_count > 1 ? true : false,
			infinite: true
		});
	});
    //business carousel
	$('.slider-carousel01 .slider').each(function(){
		var item_count = $('li',$(this)).length;
		var center_item = Math.ceil(item_count / 2);
		$(this).slick({
			slidesToScroll: 2,
			arrows: false,
			dots: item_count > 3 ? true : false,
			infinite: false,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToScroll: 1,
						infinite: true,
						dots: item_count > 1 ? true : false,
					}
				}
			]
		});
	});
    //contents carousel
	$('.slider-carousel02 .slider').each(function(){
		var item_count = $('li',$(this)).length;
		var center_item = Math.ceil(item_count / 2);
		$(this).slick({
			slidesToScroll: 3,
			slidesToShow: 3,
			arrows: false,
			dots: item_count > 5 ? true : false,
			infinite: false,
			variableWidth: true,
			//centerMode: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						infinite: true,
						slidesToScroll: 1,
						dots: item_count > 1 ? true : false,
					}
				}
			]
		   });

	});

    //이미지 가로-세로 비율 - jquery
    $('img').each(function() {
        var img = new Image();
        img.src = $(this).attr('src');
        var this_img = $(this);
        img.onload = function() {
            var fillClass = (img.height > img.width)
                    ? 'fillheight' : 'fillwidth';
            this_img.addClass(fillClass);
        };
    });

});


//PC버젼 초기화
var is_mouse_on_sub = false;
function init_pc(){
	$("body.mobile header .menu-mobile li.menu a").off();
    $("body.mobile .menu-main > li.expanded > a").off();

	//서브메뉴 마우스 오버시 부모메뉴 active
    $('header ul.menu-main > li > ul').on("mouseenter",function() {
        $(this).parent().addClass('active');
    });
    $('header ul.menu-main > li > ul').on("mouseleave",function() {
        $(this).parent().removeClass('active');
    });

	//헤더 LNB 메뉴(PC)
	$("ul.menu-main > li > a").on("mouseenter",function(){
		//if($('.cf01').css('display') == "block")	return false;
		setTimeout(function(){
			if(is_mouse_on_sub){
				$('header').addClass('open-menu');
				$('.breadcrumb01').addClass('open-menu');
			}
	  	},300);
	});
	$("header .nav-area").on("mouseleave",function(){
		setTimeout(function(){
			if(!is_mouse_on_sub){
				$('header').removeClass('open-menu');
				$('.breadcrumb01').removeClass('open-menu');
			}
	  	},300);
	});
	$("header nav").on("mouseenter",function(){
	  	is_mouse_on_sub = true;
	});
	$("header nav").on("mouseleave",function(){
		is_mouse_on_sub = false;
	});


}
//모바일 버젼 초기화
function init_mobile(){
	$('header ul.menu-main > li > ul').off();
	$("ul.menu-main > li > a").off();
	$("header .nav-area").off();
	$("header nav").off();

	//헤더 LNB 메뉴(mobile)
	$("body.mobile header .menu-mobile li.menu a").on("click",function(event){
		if($("header").hasClass('open-mobile-menu')){
			$("header").removeClass('open-mobile-menu');
		}else{
			$("header").addClass('open-mobile-menu');
		}
		event.preventDefault();
	});
	$("body.mobile .menu-main > li.expanded > a").on("click",function(event){
		if($(this).parent().hasClass('current')){
			$(this).parent().removeClass('current');
		}else{
			$(this).parent().addClass('current');
		}
		event.preventDefault();
	});


}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

