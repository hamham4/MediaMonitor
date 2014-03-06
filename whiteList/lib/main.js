require("sdk/tabs").on("ready", runScript);

function runScript(tab) {
	if (tab.url.search(/google.com/i) >= 0 ){
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


