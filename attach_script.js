// addon needs to have a main() function that loads all the
// time limits and current time usages from external file.
// if the file is a week old or older, then reset all time usage.
// also, this could be used to pull the XML file off our server and
// should allow us to avoid any same-origin issues

// create the tabs variable and attach our script to all tabs
var tabs = require("sdk/tabs");
tabs.on('activate', function(tab){
	tab.attach({
		contentScriptFile: self.data.url("timer_script.js")
	});
	console.log("script attached");
});
	
