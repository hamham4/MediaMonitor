//Practice with time

//needed to modify tabs in firefox extension
require("sdk/tabs").on("ready", onNewTab);
var tmr = require("sdk/timers");

	tmr.setTimeout(function() {
		onTimeOut(tab);
	},
        10000);


function onNewTab(tab) {
//sets which function is called after x ms
	tab.attach({
            contentScript: "if (document.body) document.body.style.border = '5px solid green';"
    });
	


	tab.attach({
            contentScript: "if (document.body) document.body.style.border = '5px solid red';"
    });
}

function onTimeOut(tab){
	tab.attach({
	            contentScript: 'document.body.innerHTML = ' +
	                 ' "<h1>Browsing time has expired</h1>";'
	     });
}

