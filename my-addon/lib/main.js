var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var widget = widgets.Widget({
	id: "jquery-link",
	label: "jQuery website",
	contentURL: "http://www.jquery.com/favicon.ico",
	onClick: function() {
		tabs.open("http://www.jquery.com/");
	}
});