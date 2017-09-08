
/// <reference path="../typings/index.d.ts" />

//$(function () {
  
    var CONST = Object.freeze({
        CAROUSEL_INTERVAL: 3000,
        CAROUSEL_MOVE_TIME: 700,
        CAROUSEL_IMAGE_WIDTH: 480,
        CAROUSEL_FORWARD : 1, 
    });

    //initialize carousel 
    var $carouselList = $('#carousel ul');
    addIndicators();  
    //add to each list item attrbute 'item' whit index of position in list (first is 0)
    $carouselList.children('li').each(function(index,elements) {
        $(this).attr('item', index);
    });

    //get first and last image 
    var $firstItem = $carouselList.find('li:first'),
        $lastItem = $carouselList.find('li:last');

    //set last image before first and set left margin to value of image width
    $firstItem.before($lastItem);
    $carouselList.css({marginLeft: -CONST.CAROUSEL_IMAGE_WIDTH});

    //default rotation forward
    var carouselDirection=CONST.CAROUSEL_FORWARD;
    
    
    
    //moue over indicator changes rotation direction to backward
    // $('#indicators').on('mouseover', function() { carouselDirection = !CONST.CAROUSEL_FORWARD;});
    // //Mouse out bakc to default rotation
    $('#carousel').on('mouseout', function() { clearInterval(window.sliderInterval); 
        carouselDirection = CONST.CAROUSEL_FORWARD;
        sliderInterval = setInterval(rotateCarousel, CONST.CAROUSEL_INTERVAL);    
    });
    $('#carousel').on('mouseover', function() { clearInterval(window.sliderInterval) ;});

    $('#left').on('click', function() {  
        //carouselDirection = CONST.CAROUSEL_FORWARD; 
        rotateCarousel(CONST.CAROUSEL_FORWARD);
    });

    $('#right').on('click', function() {  
        //carouselDirection = !CONST.CAROUSEL_FORWARD; 
        rotateCarousel(!CONST.CAROUSEL_FORWARD);
    });
    
    var sliderInterval = setInterval(rotateCarousel, CONST.CAROUSEL_INTERVAL);
   
    // function rotateCarousel() { 
    //     $carouselList.animate({'marginLeft': -2*CONST.CAROUSEL_IMAGE_WIDTH}, CONST.CAROUSEL_MOVE_TIME, moveFirstSlide);
        
    // }


    

    function rotateCarousel(dir) { 
        var direction;
        if (dir !== undefined ) {
            direction = dir;
        } else {
            direction = carouselDirection;
        }            

        if (direction ) { 
            $carouselList.animate({'marginLeft': -2*CONST.CAROUSEL_IMAGE_WIDTH}, CONST.CAROUSEL_MOVE_TIME, moveFirstSlide);
        } else {
            $carouselList.animate({'marginLeft': 0 }, CONST.CAROUSEL_MOVE_TIME, moveLastSlide);
        }

    }

  
    function moveFirstSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),

            //get current image index wich is second in table of list item (because last id is before first - it's prepare to backward rotaion )
            $currentIndex = $carouselList.find('li:nth-child(2)').attr('item'); 

        //set first item after last    
        $lastItem.after($firstItem);

        removeIndicatorClassActive($currentIndex);
        //get id of current displayed item
        $currentIndex = $carouselList.find('li:nth-child(2)').attr('item');

        setIndicatorClassActive($currentIndex);
        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
    }

    function moveLastSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),
            $currentIndex = $carouselList.find('li:nth-child(2)').attr('item');

        $firstItem.before($lastItem);
        removeIndicatorClassActive($currentIndex);
     
        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
        $currentIndex = $carouselList.find('li:nth-child(2)').attr('item');
     
        setIndicatorClassActive($currentIndex);
    }

    //add idicators to carousel to each item of list
    function addIndicators() {
        var $carouselDiv = $('#carousel'),
            $carouselListItems = $('#carousel > ul > li');
        $carouselDiv.append('<div id="indicators"><ol></ol></div>');
        var $indicatorsList = $('#indicators ol');

        for( var i = 0; i < $carouselListItems.length; i++ ) {
            $indicatorsList.append('<li data-list-item="' + i +'"></li>' ).addClass('indicator');
            
            //set ative to indicator of first item of list  
            setIndicatorClassActive(0);  
        }

    }

    function setIndicatorClassActive(index) {
        $('li[data-list-item ="' + index + '"]').addClass('active');
    }

    function removeIndicatorClassActive(index) {
        $('li[data-list-item ="' + index + '"]').removeClass('active');
    }

//}); 