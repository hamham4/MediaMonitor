/*var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
tabs.on('activate', function(tab){
  tab.attach({
    contentScriptFile: data.url("blocker_script.js")
  });
});*/

var whiteList =[];

const {XMLHttpRequest} = require("sdk/net/xhr");

function reqListener () {


  var categories =this.responseXML.documentElement.getElementsByTagName("Category");
  for (i=0;i<categories.length;i++)
  { 
    var domains = categories[i].getElementsByTagName("domain");
    for(j=0; j<domains.length;j++){
      console.log(domains[j].childNodes[0].nodeValue);
      whiteList.push(domains[j].childNodes[0].nodeValue);
      //console.log(x[i].getElementsByTagName("UserName")[0].childNodes[0].nodeValue);
    }
      
  }
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "http://web.engr.oregonstate.edu/~mckinlek/MediaMonitor/configSpecs.xml", true);
oReq.send();

require("sdk/tabs").on("ready", blockOrAllowURL);



function blockOrAllowURL(tab) {

    if (checkWhiteList(tab.url)) {
         tab.attach({
            contentScript: "document.body.style.border = '5px solid green';"
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
