function SEARCH_ENGINE(name, url, searchField, search) {
    this.name = name;
    this.url = url,
    this.searchField = searchField;
    this.search = search;
};

let SEARCH_ENGINES = [
        new SEARCH_ENGINE("bing",
                            "bing.com/search",
                            "?q=", 
                            "https://www.google.com/search?q="),
        new SEARCH_ENGINE("google",
                            "google.com/search" ,
                            "?q=", 
                            "https://www.bing.com/?q=")
];

const searchOn = document.getElementById("searchOn");
if (searchOn) {
    searchOn.onclick = function() {
        chrome.tabs.getSelected(null, function(tab) {

            var qPos;
            var qTerm;
            var qTermPos;
            var engineNotSupported;

            engineNotSupported = true;

            SEARCH_ENGINES.every( (se)=> {
                qPos = tab.url.indexOf(se.url);

                alert(se.name);
                
                if(qPos != -1) {
                    qTermPos = tab.url.indexOf("&", tab.url.indexOf(se.searchField));
                   
                    if(qTermPos == -1)
                        qTermPos = tab.url.length;

                    qSearch = tab.url.substring(tab.url.indexOf(se.searchField)+se.searchField.length, qTermPos);

                    chrome.tabs.create(
                        {"url": se.search + qSearch,"selected":true}, null
                    );

                    engineNotSupported = false;

                    return false;
                }

                return true;
            }
            );

            if(engineNotSupported) {
                alert("Are you sure you are on BING or Google?");
            }
    });
  };
}