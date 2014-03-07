require("sdk/tabs").on("ready", blockOrAllowURL);

//Parse XML file

var whiteList =["weather.com","google.com","wired.com"];

function blockOrAllowURL(tab) {

	if (checkWhiteList(tab.url)) {
		 tab.attach({
    		contentScript: "if (document.body) document.body.style.border = '5px solid green';"
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