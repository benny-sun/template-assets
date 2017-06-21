$(document).ready(function () {
    /***************** Navbar-Collapse ******************/

    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    /***************** Page Scroll ******************/

    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - document.getElementsByClassName('navbar')[0].offsetHeight
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    /***************** Scroll Spy ******************/

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: document.getElementsByClassName('navbar')[0].offsetHeight
    });

    /***************** Owl Carousel ******************/

    $("#owl-hero").owlCarousel({

        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "fadeUp",
        autoPlay: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

    });


    /***************** Full Width Slide ******************/

    var slideHeight = $(window).height();

    $('#owl-hero .item').css('height', slideHeight);

    $(window).resize(function () {
        $('#owl-hero .item').css('height', slideHeight);
    });
    /***************** Owl Carousel Testimonials ******************/

    $("#owl-testi").owlCarousel({

        slideSpeed: 1600,
        paginationSpeed: 1000,
        singleItem: true,
        autoPlay: true,
        pagination: false,
        navigation: true,
        stopOnHover: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]

    });
    /***************** Countdown ******************/

    $('#fun-facts').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $(this).find('.timer').each(function () {
                var $this = $(this);
                $({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
            $(this).unbind('inview');
        }
    });
    /***************** Google Map ******************/

    function initialize() {
        var concepoint = {lat: 24.978745, lng: 121.254415};

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: concepoint,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var contentString = '<h4>康碁有限公司</h4>' +
           '地址：桃園市中壢區忠孝路259號2樓';

        var infowindow = new google.maps.InfoWindow({
           content: contentString
        });

        var marker = new google.maps.Marker({
           position: concepoint,
           map: map,
           title: 'Hello World!'
        });

        infowindow.open(map, marker);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    /***************** Wow.js ******************/
    
    new WOW().init();
    
    /***************** Preloader ******************/
    
    var preloader = $('.preloader');
    $(window).load(function () {
        preloader.remove();
    });

});