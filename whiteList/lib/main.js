var whiteList =[];
var windows = require("sdk/windows").browserWindows;
var tmr = require("sdk/timers");
const {XMLHttpRequest} = require("sdk/net/xhr");
require("sdk/tabs").on("ready", blockOrAllowURL);

function timeCheck(){
  if (elapsedTime == allottedTime) {
    tmr.clearInterval(myTimer);

    //close all firefox windows if the time has expired
    windows.activeWindow.close(function() {
      console.log("The active window was closed");
    });
  }
  //Increment the number of minutes that have passed
  elapsedTime = elapsedTime + 1;
}

var allottedTime =  30;  //in minutes
var elapsedTime = 0;   //in minutes
var myTimer = tmr.setInterval(timeCheck, 60000);

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "http://web.engr.oregonstate.edu/~mckinlek/MediaMonitor/configSpecs.xml", true);
oReq.send();

function reqListener () {
  var categories =this.responseXML.documentElement.getElementsByTagName("Category");
  for (i=0;i<categories.length;i++)
  { 
    var domains = categories[i].getElementsByTagName("domain");
    for(j=0; j<domains.length;j++){
      //console.log(domains[j].childNodes[0].nodeValue);
      whiteList.push(domains[j].childNodes[0].nodeValue);
      //console.log(x[i].getElementsByTagName("UserName")[0].childNodes[0].nodeValue);
    }
      
  }
}
function blockOrAllowURL(tab) {

    if (checkWhiteList(tab.url)) {
         tab.attach({
            contentScript: "document.body.style.border = '5px solid green';"
          });

    }
    else {
        tab.attach({
            contentScript: 'document.body.innerHTML = ' +
                 ' "<h1>Page not on approved list</h1>";'
          });
    }
}

function checkWhiteList(userURL) {
    var approvedFlag = false;
    var regexWhiteList = new RegExp(whiteList.join("|"), "i");
    
    approvedFlag = (userURL.match(regexWhiteList) != null);
    
    return approvedFlag;
}
 