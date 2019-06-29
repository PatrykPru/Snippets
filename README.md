# Snippets
My snippets code.

Slider.js
```js
$(document).ready(function(){
    /// PSlider
    $('.slider-1').slider({
        "duration" : 600,
        "sliderItemMargin" : 20,
        "prev" : ".slider-left-btn",
        "next" : ".slider-right-btn"
    });
    $('.slider-2').slider({
        "numberVisible" : 5,
        "duration" : 600,
        "sliderItemMargin" : 20,
        "prev" : ".slider-left-btn",
        "next" : ".slider-right-btn"
    });
});
```