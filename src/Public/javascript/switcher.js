window.console = window.console || function() {
   var e = {};
   e.log = e.warn = e.debug = e.info = e.error = e.time = e.dir = e.profile = e.clear = e.exception = e.trace = e.assert = function() {};
   return e
}();

$(document).ready(function() {
    var e =  '<div class="switcher-container">'+
               '<h2>STYLE SWITCHER<a href="#" class="sw-click"><i class="fa fa-cog"></i></a></h2>'+
               '<div class="selector-box">'+
                    '<div class="clearfix"></div>'+
                    '<div class="sw-odd">'+
                    '<div class="sw-image">'+
                        '<button name="button" type="submit" class="flat-button sw-buy">Buy Now</button>'+
                    '</div>'+
                    '<h3>MAIN COLOR</h3>'+
                    '<div class="ws-colors">'+
                        '<a href="#color1" class="styleswitch main-color" id="color1">'+
                            '&nbsp;<span class="cl1"></span>'+
                        '</a>'+
                        '<a href="#color2" class="styleswitch main-color" id="color2">'+
                            '&nbsp;<span class="cl2"></span>'+
                        '</a>'+
                        '<a href="#color3" class="styleswitch main-color" id="color3">'+
                            '&nbsp;<span class="cl3"></span>'+
                        '</a>'+                      
                    '</div>'+
                    '<h3>SECONDARY COLOR</h3>'+
                    '<div class="ws-colors-sub">'+
                        '<a href="#colorsub1" class="styleswitch secondary-color" id="colorsub1">'+
                            '&nbsp;<span class="cl1"></span>'+
                        '</a>'+
                        '<a href="#colorsub2" class="styleswitch secondary-color" id="colorsub2">'+
                            '&nbsp;<span class="cl2"></span>'+
                        '</a>'+
                        '<a href="#colorsub3" class="styleswitch secondary-color" id="colorsub3">'+
                            '&nbsp;<span class="cl3"></span>'+
                        '</a>'+                   
                    '</div>'+'</div>'+
                    '<div class="sw-even"><h3>Layout:</h3>'+
                        '<a href="#" class="sw-light">BOX</a>' +
                        '<a href="#" class="sw-dark">WIDE</a>' +
                    '</div>'+'<div class="clearfix"></div>'+
               '</div>'+
            '</div>';
    $('body').append(e);
    switchAnimate.loadEvent();
    switchColor.loadEvent();
    });

    var switchColor = {
    colorObj: {
        colorCookie: "colorCookie",
        switchClass: ".styleswitch",
        currentClass: "current",
        headLink: "head link[id=colors]",
        colorItem: ".ws-colors a.main-color",
        reset: "#reset",
        defaultColor: "color1"
    },
    colorObjSecond: {
        colorCookie: "colorCookie_S",
        switchClass: ".styleswitch",
        currentClass: "current_s",
        headLink: "head link[id=colors_s]",
        colorItem: ".ws-colors-sub a.secondary-color",
        reset: "#reset",
        defaultColor: "colorsub1"
    },
    loadEvent: function() {
        // main color
        var e = switchColor.colorObj;        
        if ($.cookie(e.colorCookie)) {
            switchColor.setColor($.cookie(e.colorCookie))
        } else {
            switchColor.setColor(e.defaultColor);
        }
        $(e.colorItem).on("click", function() {           
            var e = $(this).attr("id");
            switchColor.setColor(e)
        });        
        $(e.reset).on("click",function () {
            switchColor.setColor(e.defaultColor)
        });

        // secondary color
        var es = switchColor.colorObjSecond;
        if ($.cookie(es.colorCookie)) {
            switchColor.setColor_S($.cookie(es.colorCookie))
        } else {
            switchColor.setColor_S(es.defaultColor);
        }
        $(es.colorItem).on("click", function() {           
            var es = $(this).attr("id");
            switchColor.setColor_S(es)
        });        
        $(es.reset).on("click",function () {
            switchColor.setColor_S(es.defaultColor)
        });
    },
    setColor: function(e) {
        var t = switchColor.colorObj;        
        $.cookie(t.colorCookie, e);        
        $(t.headLink).attr("href", "stylesheet/colors/" + e + ".css"); 
        $(t.switchClass).removeClass(t.currentClass);       
        $("#" + e).addClass(t.currentClass);

        //set main color for text in content
        if($('.infomation.text-center h3').length === 1) {
            var hiText = $('.infomation.text-center h3').closest('.section').css("background-color").toString();
            if(hiText === "rgb(91, 91, 91)")
            $('.infomation.text-center h3').css('color', "#fff");
        }
    },
    setColor_S: function(es) {        
        var t_s = switchColor.colorObjSecond;
        $.cookie(t_s.colorCookie, es);
        $(t_s.headLink).attr("href", "stylesheet/colors/" + es + ".css");
        $(t_s.switchClass).removeClass(t_s.currentClass);
        $("#" + es).addClass(t_s.currentClass);
        
        //set secondary color for text in content
        if($('.infomation.text-center h3').length === 1) {
            var hiText = $('.infomation.text-center h3').closest('.section').css("background-color").toString();
            if(hiText === "rgb(91, 91, 91)")
            $('.infomation.text-center h3').css('color', "#fff");
        }
    }

};
    
    var switchAnimate = {
        loadEvent: function() {
          $(".switcher-container h2 a.sw-click").on('click',function(e) {
            $(this).addClass('active');
             var t = $(".switcher-container");

             if (t.css("left") === "-220px") {
                $(".switcher-container").animate({ left: "0"}, 300, 'easeInOutExpo')
             } else {
                $(this).removeClass('active');
                $(".switcher-container").animate({ left: "-220px" }, 300, 'easeInOutExpo')
             }

             e.preventDefault();
         })
       }
    };
    
