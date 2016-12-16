$.fn.reverseChildren = function() {
    return this.each(function(){
        var $this = $(this);
        $this.children().each(function(){
            $this.prepend(this);
        });
    });
};


function getFromStorage() {
    var result = {};
    var list = $('#list');
    chrome.storage.sync.get(null, function(items) {
        // console.log(items);

        list.append( '<li><input type="checkbox" checked /><label >All Items ('+ Object.keys(items).length +')</label> <ul id="innerList"> </ul> </li>');

        var innerList = $('#innerList');
        for (key in items) {
            var value = items[key];
            // console.log('Key is "%s" Value is "%s".', key, value);
            var array = value.split(',');

            if (array.length > 1) {
                var d = Date.now();
                console.log(d);
                innerList.append( '<li><input type="checkbox"/><label >' +new Date(key/1000)+ ' ( '+array.length+' )</label><ul id="innerMostList"></ul> </li>' );

                var innerMostList = $('#innerMostList');

                for (link in array) {
                    innerMostList.append( '<li><a href="'+array[link]+'">' +array[link]+ '</a></li>' );
                }
                // <li><a href="./">Item 1</a></li>
                // <li><a href="./">Item 2</a></li>

            } else {
                innerList.append( '<li>' +new Date(key/1000)+ ' - <a href="'+value+'">' +value+ '</a></li>' );
                console.log(key +" = " + (new Date(key/1000).toLocaleString('en-US')));
            }

        }

        $('#innerList').reverseChildren();
        // return items;
    });
}

$( document ).ready(function() {


    var items = getFromStorage();
    // console.log(items);
    for (key in items) {
        var value = items[key];
        // console.log('Key is "%s" Value is "%s".', key, value)
        // if (items.hasOwnProperty(property)) {
        //     console.log(property);
        // }
    }
});