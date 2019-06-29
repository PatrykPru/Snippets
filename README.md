# Snippets
Here is my snippets. You can use it too. 

Slider.js is a simple jQuery plugin. To use it you must add css/style.css and js/slider.js, and copy and past the code below. Example of using you can find in the index.html.
```js
$(document).ready(function(){
    /// PSlider
    $('.slider-1').slider({
        "numberVisible" : 5,
        "duration" : 1000,
        "sliderItemMargin" : 20,
        "prev" : ".slider-left-btn",
        "next" : ".slider-right-btn"
    });
});
```