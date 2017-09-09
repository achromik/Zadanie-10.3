
/// <reference path="../typings/index.d.ts" />

$(function () {
  
    var CONST = Object.freeze({
        CAROUSEL_INTERVAL: 3000,
        CAROUSEL_MOVE_TIME: 700,
        CAROUSEL_IMAGE_WIDTH: 480,
        CAROUSEL_FORWARD : 1, 
    });

    //initialize carousel 
    var $carouselList = $('#js-carousel ul');
    
    
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
    

     //start slider
     var sliderInterval = setInterval(rotateCarousel, CONST.CAROUSEL_INTERVAL); 
    
    

    $('#js-direction').on('click', 'button', function(e) {
        switch (e.target.id) {
            case 'js-backward': 
                carouselDirection = !CONST.CAROUSEL_FORWARD;
                break;
            case 'js-forward':
                /* falls through */
            default:
                carouselDirection=CONST.CAROUSEL_FORWARD;
        }    
    });  
    
    //start rotation when mouse out
    $('#js-carousel').on('mouseout', function() { clearInterval(sliderInterval); 
        carouselDirection = CONST.CAROUSEL_FORWARD;
        sliderInterval = setInterval(rotateCarousel, CONST.CAROUSEL_INTERVAL);    
    });

    //stop rotation when mouse on slider
    $('#js-carousel').on('mouseover', function() { clearInterval(sliderInterval) ;});

    //previous slide 
    $('#js-left').on('click', function() {  
        //carouselDirection = CONST.CAROUSEL_FORWARD; 
        rotateCarousel(!CONST.CAROUSEL_FORWARD);
    });

    //next slide
    $('#js-right').on('click', function() {  
        //carouselDirection = !CONST.CAROUSEL_FORWARD; 
        rotateCarousel(CONST.CAROUSEL_FORWARD);
    });

    /****************************
     * move slider to selected indicators
     ****************************/
    $('#js-indicators').on('click', 'li', function() {
        var $selectedItemIndex = $(this).data('list-item'),
            diffBetweenItems=0,
            carouselLength = $carouselList.find('li').length,
            i=0;
        $currentItem = $carouselList.find('li:nth-child(2)');
        diffBetweenItems = $selectedItemIndex - $currentItem.attr('item');

        //choose the short wat to selected item
        if (diffBetweenItems > 0) {
            if (diffBetweenItems <= carouselLength/2 ) { 
                for ( i = 0; i < diffBetweenItems; i++) {    
                    $carouselList.animate({'marginLeft': -2*CONST.CAROUSEL_IMAGE_WIDTH}, 350, moveForwardSlide); 
                }
                
            } else { 
                for ( i = 0; i < carouselLength - diffBetweenItems; i++) {    
                    $carouselList.animate({'marginLeft': 0 }, 350, moveBackwardSlide);
                } 
            }
        } else {
            if (Math.abs(diffBetweenItems) <= carouselLength/2 ) { 
                for ( i = 0; i < Math.abs(diffBetweenItems); i++) {   
                    $carouselList.animate({'marginLeft': 0 }, 350, moveBackwardSlide); 
                    
                }
                
            } else { 
                for ( i = 0; i < carouselLength - Math.abs(diffBetweenItems); i++) {    
                    $carouselList.animate({'marginLeft': -2*CONST.CAROUSEL_IMAGE_WIDTH}, 350, moveForwardSlide);  
                } 
            }
        }
    });
    

   
   
    

    function rotateCarousel(dir) { 
        var direction;
        if (dir !== undefined ) {
            direction = dir;
        } else {
            direction = carouselDirection;
        }            

        if (direction ) { 
            $carouselList.animate({'marginLeft': -2*CONST.CAROUSEL_IMAGE_WIDTH}, CONST.CAROUSEL_MOVE_TIME, moveForwardSlide);
        } else {
            $carouselList.animate({'marginLeft': 0 }, CONST.CAROUSEL_MOVE_TIME, moveBackwardSlide);
        }

    }

  
    function moveForwardSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),

            //get current image index wich is second in table of list item (because last id is before first - it's prepare to backward rotaion )
            $currentItem = $carouselList.find('li:nth-child(2)').attr('item'); 

        //set first item after last    
        $lastItem.after($firstItem);

        removeIndicatorClassActive($currentItem);
        //get id of current displayed item
        $currentItem = $carouselList.find('li:nth-child(2)').attr('item');

        setIndicatorClassActive($currentItem);
        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
    }

    function moveBackwardSlide() {
        var $firstItem = $carouselList.find('li:first'),
            $lastItem = $carouselList.find('li:last'),
            $currentItem = $carouselList.find('li:nth-child(2)').attr('item');

        $firstItem.before($lastItem);
        removeIndicatorClassActive($currentItem);
     
        $carouselList.css({marginLeft:-CONST.CAROUSEL_IMAGE_WIDTH});
        $currentItem = $carouselList.find('li:nth-child(2)').attr('item');
     
        setIndicatorClassActive($currentItem);
    }

    //add idicators to carousel to each item of list
    function addIndicators() {
        var $carouselDiv = $('#js-carousel'),
            $carouselListItems = $('#js-carousel > ul > li');
        $carouselDiv.append('<div id="js-indicators"><ol></ol></div>');
        var $indicatorsList = $('#js-indicators ol');

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

}); 