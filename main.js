//Rob Allen
//implementation of a white list extension
//issue:  only matches exact url, not other pages in domain

// Import the page-mod API
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var myString = "*.org";


//http://webcheatsheet.com/javascript/arrays.php
var first_array = new Array();
first_array[0] = "https://www.google.com/";
first_array[1] = "http://www.ietf.org/";
  
//issue:  only matches exact url, not other pages in domain

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
//http://stackoverflow.com/questions/21258449/how-to-get-url-of-a-tab-before-the-page-gets-loaded-in-mozilla-addon-sdk
pageMod.PageMod({
    contentScriptWhen: 'start',
    include: ['*'],
    onAttach: function onAttach(worker) {
        var contains = 0;
        var i = 0;
        var tabUrl = worker.tab.url;
        console.log(tabUrl);
        for (element in first_array)
        {
            if(first_array[i].contains(tabUrl))
            {
                contains = 1;
                break;
            }
            i++;
        }
        i = 0;
        if (contains == 1){
            console.log("now e-mailing your parents. prepare for grounding");
            worker.tab.url = 'http://arabcrunch.com/wp-content/uploads/2013/05/block-website.jpeg'
        }
    }

});

