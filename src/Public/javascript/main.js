/**
    * headerFixed();
    * flatRetinaLogo();
    * onepage_nav();
    * responsiveMenu();
    * flatOwl();
    * googleMap();
    * contentBox();
    * accordionToggle();
    * spacer();
    * flatCounter();
    * VideoPopup();
    * wowanimation();
    * ajaxContactForm();
    * goTop();
    * removePreloader();
;*/

;(function($) {
    "use strict";

    var headerFixed = function() {
        var top_height = $('.top-bar').height(),
        hd_height = $('.header').height(); 
        $(window).on('load scroll resize', function() { 
            var header = $(".header");
            var offset = 0;
            if (typeof(header.data('offset')) != 'undefined') {
                offset = header.data('offset');
            }

            $('.header.header-sticky').css('top',0);
            if ( top_height > 0 ){
                if ( $(window).scrollTop() >= top_height + hd_height + 20 ) { 
                    header.addClass('header-sticky');
                } else {  
                    header.removeClass('header-sticky'); 
                }
            }
            else{
                if ( $(window).scrollTop() >= hd_height ) { 
                    header.addClass('header-sticky');
                } else {  
                    header.removeClass('header-sticky'); 
                }
            } 
        });    
    };

    var flatRetinaLogo = function() {
        var retina = window.devicePixelRatio > 1 ? true : false;
        var $logo = $('#logo img');
        var $logo_retina = $logo.data('retina');

        if ( retina && $logo_retina ) {
            $logo.attr({
                src: $logo.data('retina'),
                width: $logo.data('width'),
                height: $logo.data('height')
            });
        } 
    };

    var onepage_nav = function () {
        $('.page-template-front-page .mainnav > ul > li > a').on('click',function() {           
            var anchor = $(this).attr('href').split('#')[1];            
            var largeScreen = matchMedia('only screen and (min-width: 992px)').matches;
            var headerHeight = 0;
            headerHeight = $('.header').height();            
            if ( anchor ) {
                if ( $('#'+anchor).length > 0 ) {
                   if ( $('.header-sticky').length > 0 && largeScreen ) {
                        headerHeight = headerHeight;
                   } else {
                        headerHeight = 0;
                   }                   
                   var target = $('#'+anchor).offset().top - headerHeight;
                   $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                }
            }
            return false;
        })

        $('.mainnav ul > li > a').on( 'click', function() {
            $( this ).addClass('active').parent().siblings().children().removeClass('active');
        });
    } 

    var responsiveMenu = function() {
        var menuType = 'desktop';

        $(window).on('load resize', function() {
            var currMenuType = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                currMenuType = 'mobile';
            }

            if ( currMenuType !== menuType ) {
                menuType = currMenuType;

                if ( currMenuType === 'mobile' ) {
                    var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                    var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                    $('#header .container').after($mobileMenu);
                    hasChildMenu.children('ul').hide();
                    hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                    $('.btn-menu').removeClass('active');
                } else {
                    var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                    $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                }
            }
        });

        $('.btn-menu').on('click', function() {         
            $('#mainnav-mobi').slideToggle(300);
            $(this).toggleClass('active');
        });

        $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
            $(this).toggleClass('active').next('ul').slideToggle(300);
            e.stopImmediatePropagation()
        });
    };

    var flatOwl = function() {
        if ( $().owlCarousel ) {
            $('.flat-carousel-box').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                item4 = $this.data("column4"),
                loops = $this.data("loop"),
                zero = $this.data("zero"),
                
                gap = Number($this.data("gap")),
            
                dots = $this.data("dots"),
                nav = $this.data("nav");

                $this.find('.owl-carousel').owlCarousel({
                    margin: gap,
                    loop:loops,
                    dots:dots,
                    nav: nav,
                    navigation : true,
                    pagination: true,
                    autoplay: false,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item4
                        },
                        600:{
                            items:item3
                        },
                        768:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
                
                if(zero === 0) {
                    $(".banners-z .owl-dot").find('span').addClass("number_zero");
                }
                $this.find('.owl-dot').each(function(){
                    var number = $(this).index()+1;
                    if($(this).children('span').hasClass("number_zero")) {
                        if(number < 9){
                            number = '0' + number;
                        }
                        $(this).children('span').html(number);
                        $(this).append('<i class="line"></i>');
                    }
                    else{
                        $(this).children('span').html(number);
                    }

                    $(this).children('span').addClass("btn-dots btn-defect");
                    

                });
            });
        }
    };

    var googleMap = function () {
        // gmap default
        if ($().gmap3) {
            var data = JSON.parse('[{"address":"Brooklyn, TiĂ¡Â»Æ’u bang New York 11201 Hoa KĂ¡Â»Â³"}]');
            $(".flat-map")
            .gmap3({
                map: {
                    options: {
                        zoom: 10,
                        center: [40.7024767,-73.9877404,17.5],
                        mapTypeId: 'Xian',
                        scrollwheel: true
                    },
                },
            });
        }
        // json loop
        $.each(data, function (key, val) {
            $('.flat-map').gmap3({
                marker: {
                    values: [{
                        address: val.address,
                        options: {
                           
                        }
                        
                    }]
                },
                styledmaptype: {
                    id: "Xian",
                    options: {
                        name: "Xian"
                    },
                    styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": "-100"
                        }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                        {
                            "visibility": "off"
                        }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 65
                        },
                        {
                            "visibility": "on"
                        }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": "50"
                        },
                        {
                            "visibility": "simplified"
                        }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": "-100"
                        }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                        {
                            "visibility": "simplified"
                        }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                        {
                            "lightness": "30"
                        }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [
                        {
                            "lightness": "40"
                        }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                        {
                            "hue": "#ffff00"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -97
                        }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -100
                        }
                        ]
                    }
                    ]
                }
            });
        });
    };

    var contentBox = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';
            if ( matchMedia( 'only screen and (max-width: 1440px)' ).matches ){
                mode = 'sdesktop';  
            } 
            if ( matchMedia( 'only screen and (max-width: 1024px)' ).matches ){
                mode = 'ssdesktop';
            }
            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ){
                mode = 'mobile';
            } 
            if ( matchMedia( 'only screen and (max-width: 767px)' ).matches ){
                mode = 'smobile';
            }

            $('.themesflat-content-box').each(function(){
                var padding = $(this).data('padding');
                if ( padding ) {
                    if ( mode === 'desktop' ) {
                        $(this).attr('style', 'padding:' + $(this).data('padding'))
                    } else if ( mode === 'sdesktop' ) {
                        $(this).attr('style', 'padding:' + $(this).data('sdesktoppadding'))
                    } else if ( mode === 'ssdesktop' ) {
                        $(this).attr('style', 'padding:' + $(this).data('ssdesktoppadding'))
                    } else if ( mode === 'mobile' ) {
                        $(this).attr('style', 'padding:' + $(this).data('mobipadding'))
                    } else if ( mode === 'smobile' ) {
                        $(this).attr('style', 'padding:' + $(this).data('smobipadding'))
                    }
                }

                var margin = $(this).data('margin');
                if ( margin ) {
                    if ( mode === 'desktop' ) {
                        $(this).attr('style', 'margin:' + $(this).data('margin'))
                    } else if ( mode === 'mobile' ) {
                        $(this).attr('style', 'margin:' + $(this).data('mobimargin'))
                    } else if ( mode === 'smobile' ) {
                        $(this).attr('style', 'margin:' + $(this).data('smobimargin'))
                    }
                }
            })
        });
    };

    var accordionToggle = function() {
        $('.flat-question').each(function () {
            var speed = {duration: 400};
            $('.flat-question .toggle-content').hide();
            $('.flat-question .accordion-toggle .toggle-title.active').siblings('.toggle-content').show();
            $('.flat-question .accordion').find('.toggle-title').on('click', function() {
                $(this).toggleClass('active');
                $(this).closest('.accordion').find('.accordion-toggle').removeClass('active');
                $(this).closest('.accordion-toggle').toggleClass('active');
                $(this).next().slideToggle(speed);
                $(".flat-question .toggle-content").not($(this).next()).slideUp(speed);
                if ($(this).is('.active')) {
                    $(this).closest('.accordion').find('.toggle-title.active').toggleClass('active');
                    $(this).toggleClass('active');
                };
            });
        });
    };

    var spacer = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';
            
            if ( matchMedia( 'only screen and (max-width: 1199px)' ).matches )
                mode = 'sdesktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            if ( matchMedia( 'only screen and (max-width: 767px)' ).matches )
                mode = 'smobile';

            $('.flat-spacer').each(function(){
                if ( mode == 'desktop' ) {
                        $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                    }
                else
                    if ( mode == 'sdesktop' ) {
                        $(this).attr('style', 'height:' + $(this).data('sdesktop') + 'px')
                    } 
                else 
                    if ( mode == 'mobile' ) {
                        $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                } 
                else {
                    $(this).attr('style', 'height:' + $(this).data('smobi') + 'px')
                }
            })

        });
    };

    var flatCounter = function() {
        if ($(document.body).hasClass('counter-scroll')) {
            var a = 0;
                $(window).scroll(function() {
                var oTop = $('.counter').offset() - window.innerHeight;
                    if (a == 0 && $(window).scrollTop() > oTop) {
                        if ( $().countTo ) {
                            $('.counter').find('.numb-count').each(function() {
                                var to = $(this).data('to'),
                                    speed = $(this).data('speed');
                              
                                $(this).countTo({
                                    to: to,
                                    speed: speed
                                });
                            });
                        }
                    a = 1;
                }
            });
        }
    };

    var VideoPopup =  function() {
        $(".fancybox").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type")
            }); 
            return false   
        });
    };

    var wowanimation =  function() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }

    var ajaxContactForm = function() {  
        $('#contactform').each(function() {
            $(this).validate({
                submitHandler: function( form ) {
                    var $form = $(form),
                        str = $form.serialize(),
                        loading = $('<div />', { 'class': 'loading' });

                    $.ajax({
                        type: "POST",
                        url:  $form.attr('action'),
                        data: str,
                        beforeSend: function () {
                            $form.find('.form-submit').append(loading);
                        },
                        success: function( msg ) {
                            var result, cls;                            
                            if ( msg === 'Success' ) {                                
                                result = 'Message Sent Successfully To Email Administrator. ( You can change the email management a very easy way to get the message of customers in the user manual )';
                                cls = 'msg-success';
                            } else {
                                result = 'Error sending email.';
                                cls = 'msg-error';
                            }

                            $form.prepend(
                                $('<div />', {
                                    'class': 'flat-alert ' + cls,
                                    'text' : result
                                }).append(
                                    $('<a class="close" href="#"><i class="fa fa-close"></i></a>')
                                )
                            );

                            $form.find(':input').not('.submit').val('');
                        },
                        complete: function (xhr, status, error_thrown) {
                            $form.find('.loading').remove();
                        }
                    });
                }
            });
        });
    };

    var goTop =  function() {
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 800 ) {
                $('#scroll-top').addClass('show');
            } else {
                $('#scroll-top').removeClass('show');
            }
        });

        $('#scroll-top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
        });
    };

    var removePreloader = function() {        
        $(window).on("load", function () {
            $(".loader").fadeOut();
            $("#loading-overlay").delay(500).fadeOut('slow',function(){
                $(this).remove();
            }); 
        });
    };

// Dom Ready
    $(function() {
        headerFixed();
        flatRetinaLogo();
        onepage_nav();
        responsiveMenu();
        flatOwl();
        googleMap();
        contentBox();
        accordionToggle();
        spacer();
        flatCounter();
        VideoPopup();
        wowanimation();
        ajaxContactForm();
        goTop();
        removePreloader();
    });
})(jQuery);
