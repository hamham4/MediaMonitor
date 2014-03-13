require("sdk/tabs").on("ready", blockOrAllowURL);
var tmr = require("sdk/timers");
var windows = require("sdk/windows").browserWindows;
var data = require("sdk/self").data;
var timeRemainingPanel = require("sdk/panel").Panel({
  width: 200,
  height: 50,
  contentURL: data.url("panelText.html"),
});

require("sdk/widget").Widget({
  label: "timeRemaining",
  id: "timeRemaining",
  contentURL: "http://www.mozilla.org/favicon.ico",
  panel: timeRemainingPanel
});

timeRemainingPanel.on("show", function() {
  timeRemainingPanel.port.emit("show");
});

//pretend that we are readng and updating this from file
var elapsedTime = 0;

var myTimer = tmr.setInterval(timeCheck, 10000);

function timeCheck(){
  if (elapsedTime == 3) {

    tmr.clearInterval(myTimer);
    windows.activeWindow.close(function() {
      console.log("The active window was closed");
    });
  }
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