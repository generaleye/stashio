function saveCurrentTabUrl() {
    var theValue = Date.now();
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tab_array) {
        var tab = tab_array[0];
        var obj= {};

        obj[theValue] = tab.url;

        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set(obj, function() {
            console.log(obj);
        });

    });
}

function saveAllTabUrls() {

    var tabsString = "";
    chrome.tabs.query({},function(tabs){
        tabs.forEach(function(tab){

            tabsString = tabsString + tab.url + ",";
            console.log(tabsString);

        });

        var obj= {};
        var theValue = Date.now();
        tabsString = tabsString.replace(/,\s*$/, "");
        obj[theValue] = tabsString;

        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set(obj, function() {
            console.log("SAVED " + obj[theValue]);
        });
    });

}

function urlTest() {
    var theValue = $.now();

    // Check that there's some code there.
    if (!theValue) {
        message('Error: No value specified');
        return;
    }

    var obj= {};

    obj[theValue] = 'my test var';

    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set(obj, function() {
        console.log(theValue);
        // Notify that we saved.
        // message('Settings saved');
    });
}

function getFromStorage() {
    chrome.storage.sync.get(null, function(items) {
        console.log(items);

        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError.message);
        } else {
            console.log(Object.getOwnPropertyNames(items));
            // console.log(JSON.stringify(items));
        }
    });
}

function clearStorage() {
    chrome.storage.sync.clear(function() {
        console.log("CLEARED");
    });
}

function getSize() {
    chrome.storage.sync.getBytesInUse(null, function(size) {
        console.log("SIZE: "+ size);
        alert("SIZE: "+ size);
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

$('#time').click(function(e){
    e.preventDefault();
    urlTest();
});

$('#getStorage').click(function(e){
    e.preventDefault();
    getFromStorage();
});

$('#clear').click(function(e){
    e.preventDefault();
    clearStorage();
});

$('#size').click(function(e){
    e.preventDefault();
    getSize();
});