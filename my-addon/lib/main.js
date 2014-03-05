//Display a popup panel
var data = require("sdk/self").data;
//constrct a panel, loading its content from the text.entry-html
//file in the "data" directory and loading the get-text.js script into its

var text_entry = require("sdk/panel").Panel({
	width: 212,
	height: 200,
	contentURL: data.url("text-entry.html"),
	contentScriptFile: data.url("get-text.js")
});

//create a widget, and attach the panel to it, so the panel its
//shown when the user clicks the widget.

require("sdk/widget").Widget({
	label: "Text entry",
	id: "text-entry",
	contentURL: "http://www.mozilla.org/favicon.ico",
	panel: text_entry
});

//when the panel is displayed, it generates an event called 'show'
//we will listen for that event and then send our own show event to the panel's 
//scirpt so that the script can prepare the panel for displayed
text_entry.on("show", function() {
	text_entry.port.emit("show");
});

//listen for mesages called 'text-entered' coming from the content script
//the message payload is the ext the user text-entered
//In this implementation, we'll just log the text to the console

text_entry.port.on("text-entered", function(text) {
	console.log(text);
	text_entry.hide();
});