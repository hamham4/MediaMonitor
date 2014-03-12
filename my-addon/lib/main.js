//Practice with time

//needed to modify tabs in firefox extension
require("sdk/tabs").on("ready", onNewTab);

function onNewTab(tab) {
//sets which function is called after x ms

setTimeout(function() {
		onTimeOut(tab);
	},
	200);
}

function onTimeOut(tab){
	tab.attach({
	            contentScript: 'document.body.innerHTML = ' +
	                 ' "<h1>Browsing time has expired</h1>";'
	     });
}