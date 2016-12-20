function saveCurrentTabUrl() {
    var theValue = new Date().getTime();
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tab_array) {
        var tab = tab_array[0];

        var obj= {};
        obj[theValue] = tab.url;

        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set(obj, function() {
            var message = $('#message');
            message.html("URL Saved Successfully");
            setTimeout(function(){window.close();}, 2000);
        });

    });
}

function saveAllTabUrls() {

    var tabsString = "";
    chrome.tabs.query({},function(tabs){
        var tabCount = 0;
        tabs.forEach(function(tab){

            tabsString = tabsString + tab.url + ",";
            tabCount += 1;
        });

        var obj= {};
        var theValue = new Date().getTime();
        tabsString = tabsString.replace(/,\s*$/, "");
        obj[theValue] = tabsString;

        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set(obj, function() {
            var message = $('#message');
            message.html(tabCount+" URLs Saved Successfully");
            setTimeout(function(){window.close();}, 2000);
        });
    });

}

$('#save').click(function(e){
    e.preventDefault();
    saveCurrentTabUrl();
});

$('#saveall').click(function(e){
    e.preventDefault();
    saveAllTabUrls();
});