//Tutorial: Open a web page
var tabs = require("sdk/tabs");
tabs.open({
	url: "http://www.google.com",
	onReady: runScript
});

function runScript(tab) {
	tab.attach({
		contentScript:"document.body.style.border = '5px solid red';"
	});
}