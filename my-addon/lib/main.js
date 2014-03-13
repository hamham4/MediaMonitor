//Practice with time

//needed to modify tabs in firefox extension
var tabs = require("sdk/tabs");
var tmr = require("sdk/timers");
var windows = require("sdk/windows").browserWindows;

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



//will probably not need - remove later
function onNewTab(tab) {
//sets which function is called after x ms
	tab.attach({
            contentScript: "if (document.body) document.body.style.border = '5px solid green';"
    });
	

	/*tmr.setTimeout(function() {
		onTimeOut(tab);
	},
        10000); */

	tab.attach({
            contentScript: "if (document.body) document.body.style.border = '5px solid red';"
    });
}

//will probably not need - remove later
function onTimeOut(tab){
	tab.attach({
	            contentScript: 'document.body.innerHTML = ' +
	                 ' "<h1>Browsing time has expired</h1>";'
	     });
}

