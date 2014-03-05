//Toolbar Button Tutorial
var widgets = require("sdk/widget");
var tabs = require("sdk/tabs");
var self = require("sdk/self");

var widget = widgets.Widget({
  id: "mozilla-link",
  label: "Mozilla website",
  contentURL: "http://www.mozilla.org/favicon.ico",
  contentScriptFile: self.data.url("click-listener.js")
});
widget.port.on("left-click", function(){
  console.log("left-click");
});
widget.port.on("right-click", function(){
  console.log("right-click");
});