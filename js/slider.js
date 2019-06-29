(function($){
    $.fn.slider = function(options){
        
        var settings = $.extend({
            "numberVisible" : 3,
            "sliderItemMargin" : 35,
            "duration" : 1000,
            "sliderItemName": ".slider-item",
            "prev": null,
            "next": null,
        }, options);
        
        return this.each(function(){
            var $this = $(this);
            var $prev, $next;
            var $sliderWrapper = $this.find('.slider-wrapper');
            var $sliderContent = $this.find('.slider-content');
            var $sliderItems = $sliderWrapper.find('.slider-items');
            var $sliderItem = $sliderItems.find('.slider-item');
            var numberVisible = settings.numberVisible;
            var sliderWidth = $sliderWrapper.width();
            var sliderItemWidth = (sliderWidth - 2*numberVisible*settings.sliderItemMargin)/numberVisible;
            var sliderItemHeight = 0;
            var inProgress = false; 
            
            /// Set buttons for handle prev and next
            var setButtons = function(){
                if(settings.prev == null){
                    $sliderWrapper.prepend("<div class='prev'>prev</div>");
                    $prev =  $this.find(".prev");
                } else {
                    $prev = $this.find(settings.prev);
                }

                if(settings.next == null){
                    $sliderWrapper.append("<div class='next'>next</div>");
                    $next = $this.find(".next");
                } else {
                    $next = $this.find(settings.next);
                }
            }
            setButtons();

            /// Configuration prev and next button
            var next = function(){
                var $firstElement = $this.find(settings.sliderItemName).first();
                $this.find(settings.sliderItemName).first().remove();
                $sliderItems.append($firstElement);
            };

            var prev = function(){
                var $lastElement = $this.find(settings.sliderItemName).last();
                $this.find(settings.sliderItemName).last().remove();
                $sliderItems.prepend($lastElement);
            };
            
            /// If is mobile website
            var setForMobile = function(){
                if($(document).outerWidth() < 992) {
                    numberVisible = 1;
                } else {
                    numberVisible = settings.numberVisible;
                }
            }
            
            var setProperHeightForSliderItem = function(){
                sliderWidth = $sliderWrapper.width(); 
                sliderItemWidth = (sliderWidth - 2*numberVisible*settings.sliderItemMargin)/numberVisible;
                $sliderItem.css({
                    "width" : sliderItemWidth + "px", 
                    "margin" : "0 " + settings.sliderItemMargin + "px" 
                });
                sliderItemWidth = $sliderItem.outerWidth() + 2*settings.sliderItemMargin;
            }
            
            var setHighestHeight = function(){
                sliderItemHeight = 0;
                $sliderItem.each(function(){
                    sliderItemHeight = ($(this).outerHeight() > sliderItemHeight) ? $(this).outerHeight() : sliderItemHeight;
                });
                return sliderItemHeight;
            }
            
            var setSliderItems = function(){
                /// Configuration .slider-items
                $sliderItems.css({
                    "width" : ($sliderItem.length + 0.5) * sliderItemWidth + "px",
                    "height" : sliderItemHeight,
                    "left" :  -sliderItemWidth + "px"
                });
            }
            
            var setSliderContent = function(){
                /// Set proper height for .slider and .slider-conent
                sliderItemHeight = setHighestHeight() + 30;
                $this.css({"height" : sliderItemHeight });
                $sliderContent.css({"height" : sliderItemHeight });
            }
            
            var refreshIfImgLoaded = function(){
                /// If images arent loaded set proper height again
                $this.find('img').on('load', function(){
                    setHighestHeight();
                    $this.css({"height" : sliderItemHeight + 30 + "px"});
                    $sliderContent.css({"height" : sliderItemHeight + 30 + "px"});
                });
            } 
            
            /// Handle buttons
            var bindHandleForButtons = function(){
                $prev.off();
                $prev.click(function(){
                    if(!inProgress){
                        inProgress = true;
                        prev();
                        $sliderItems.css({"position" : "relative", "left" : -sliderItemWidth + "px"});
                        $sliderItems.animate({"left" : 0}, function(){
                           inProgress = false;
                        });
                    }
                });

                $next.off();
                $next.click(function(){
                    if(!inProgress){
                        inProgress = true;
                        next();
                        $sliderItems.css({"position" : "relative", "left" : 0 });
                        $sliderItems.animate({"left" : -sliderItemWidth + "px" }, function(){
                             inProgress = false;
                        });
                    }
                });
            }
            
            var run = function(){
                setForMobile(); 
                setProperHeightForSliderItem();
                setHighestHeight();
                setSliderItems();
                setSliderContent();
                refreshIfImgLoaded();
                bindHandleForButtons();
            };
            
            run();
            $(window).resize(function(){
                run(); 
            });
        });
    }
}(jQuery));