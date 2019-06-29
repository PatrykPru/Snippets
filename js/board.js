(function($){
    var _i = 0;
    var _data = null;
    var $_containerColumns = null;
    $.fn.board = function(options){
        var settings = $.extend({
            url : "",
            container : null,
            input : null,
            select : null,
            dataHandler : null,
            limit : 9
        },options);
        
        var loadContent = function(search = "null", categories = "all"){
            $container = settings.container;
            $conatinerColumns = $container.children('div');
            $conatinerColumns.each(function(index, element){$(element).empty();});
            $_containerColumns = $conatinerColumns;
            $.get(settings.url, { "search" : search, "categories" : categories }, function(data){ 
                    if(data.length > settings.limit && typeof settings.btnMore === 'object') settings.btnMore.show();
                    _i = 0;
                    _data = data;
                    for(; _i< Math.min(_data.length,settings.limit); _i++){
                        var $block = settings.dataHandler(_data[_i], _i, _data);
                        $block.appendTo($conatinerColumns[(_i%$_containerColumns.length)]).fadeIn(1000);
                    }
            });     
        };
        
        var loadMoreHandle = function(){
            var newLimit = _i + settings.limit;
            for(; _i< Math.min(_data.length,newLimit); _i++){
                var $block = settings.dataHandler(_data[_i], _i, _data);
                $block.appendTo($conatinerColumns[(_i%$_containerColumns.length)]).fadeIn(1000);
            }
            if(_i >= _data.length) return true;
            return false;
        };
        
        settings.input.change(function(){
            var search = settings.input.val();
            var categories = settings.select.val();
            loadContent(search,categories);
        });
        
        settings.select.change(function(){
            var search = settings.input.val();
            var categories = settings.select.val();
            loadContent(search,categories);
        });
        
        loadContent();
        
        return {
            this : this,
            loadMore : loadMoreHandle
        };
    };
}(jQuery));