//Practice with time

//needed to modify tabs in firefox extension
require("sdk/tabs").on("ready", onNewTab);

var TAB; 
function onNewTab(tab) {
	TAB = tab;

	//sets which function is called after x ms
	setTimeout(onTimeOut, 20);
}

function onTimeOut(){
	TAB.attach({
            contentScript: 'document.body.innerHTML = ' +
                 ' "<h1>Browsing time has expired</h1>";'
     });
}

