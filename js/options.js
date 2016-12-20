$.fn.reverseChildren = function() {
    return this.each(function(){
        var $this = $(this);
        $this.children().each(function(){
            $this.prepend(this);
        });
    });
};

function shortenText(text) {
    if (text.length > 100) {
        text = text.substr(0, 100)+".....";
    }
    return text;
}

function getFromStorage() {
    var result = {};
    var list = $('#list');
    chrome.storage.sync.get(null, function(items) {

        list.append( '<li><input type="checkbox" checked /><label >All Items ('+ Object.keys(items).length +')</label> <ul id="innerList"> </ul> </li>');

        var innerList = $('#innerList');
        for (key in items) {
            var value = items[key];
            var array = value.split(',');

            if (array.length > 1) {
                var d = Date.now();
                innerList.append( '<li><input type="checkbox"/><label >' +new Date(parseInt(key)).toLocaleString("en-GB")+ ' ( '+array.length+' )</label><ul id="'+key+'"></ul>   <button id="'+key+'" class="deleteFolderBtn">Delete Folder</button></li>' );

                var innerMostList = $('#'+key);

                for (link in array) {
                    innerMostList.append( '<li><a href="'+array[link]+'">' +shortenText(array[link])+ '</a>   <button id="'+array[link]+'" class="deleteInnerBtn">Delete</button></li>' );
                }
            } else {
                innerList.append( '<li>' +new Date(parseInt(key)).toLocaleString("en-GB")+ ' - <a href="'+value+'">' +shortenText(value)+ '</a>   <button id="'+key+'" class="deleteBtn">Delete</button></li>' );
            }

        }

        innerList.reverseChildren();
    });
}

$( document ).ready(function() {
    chrome.storage.sync.getBytesInUse(null, function(spaceUsed) {
        $('#meterPercent').val(spaceUsed);
        $('#percentUsed').html(((spaceUsed/102400)*100).toFixed(1)+"%")
    });

    var items = getFromStorage();
    for (key in items) {
        var value = items[key];
        // console.log('Key is "%s" Value is "%s".', key, value);
    }


    $(document).on("click", ".deleteBtn", function() {
        chrome.storage.sync.remove(this.id, function() {
        });
        var par = $(this).parent();
        par.remove();
    });

    $(document).on("click", ".deleteInnerBtn", function() {
        var link = this.id;
        var thisPar = $(this).parent();
        var par = $(this).parent().parent();
        var linkId = par[0].id;

        chrome.storage.sync.get(linkId, function(result) {

            var res = result[linkId];
            var resInd = result[linkId].indexOf(link);
            var len = link.length;
            if (res[resInd+len] == ',') {
                len+=1;
            }

            var newString =  res.slice(0, resInd) + res.slice(resInd + len);

            var obj= {};
            obj[linkId] = newString;

            // Save it using the Chrome extension storage API.
            chrome.storage.sync.set(obj, function() {
                thisPar.remove();
            });

        });
    });

    $(document).on("click", ".deleteFolderBtn", function() {
        chrome.storage.sync.remove(this.id, function() {
        });
        var par = $(this).parent();
        par.remove();
    });

});