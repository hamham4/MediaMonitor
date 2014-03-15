require("sdk/tabs").on("ready", blockOrAllowURL);
var tmr = require("sdk/timers");
var windows = require("sdk/windows").browserWindows;

//pretend that we are readng this from the XML file
//the time read from the file should be in mins
var allottedTime =  1;  //in minutes


var elapsedTime = 0;   //in minutes

//Every  60 seconds, the timeCheck function is called
var myTimer = tmr.setInterval(timeCheck, 60000);

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

//Parse XML file
var whiteList =["weather.com","google.com","wired.com"];

function blockOrAllowURL(tab) {

	if (checkWhiteList(tab.url)) {
		 tab.attach({
    		contentScript: "if (document.body) document.body.style.border = '5px solid green';"
  		});
	}
	else {
		tab.attach({
    		contentScript: 'document.body.innerHTML = ' +
                 ' "<h1>Page not on aproved list</h1>";'
  		});
	}
}


function checkWhiteList(userURL) {
	var approvedFlag = false;
    var regexWhiteList = new RegExp(whiteList.join("|"), "i");
    
    approvedFlag = (userURL.match(regexWhiteList) != null);
    
    return approvedFlag;

}