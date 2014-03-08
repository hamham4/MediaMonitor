
require("sdk/tabs").on("ready", blockOrAllowURL);

var whiteList =["weather.com","google.com","wired.com"];

function blockOrAllowURL(tab) {

    if (checkWhiteList(tab.url)) {
    //if (tab.url.search(/weather.com/i) >= 0 ){
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

var whiteList =["weather.com","google.com","wired.com"];

function checkWhiteList(userURL) {
    var approvedFlag = false;
    var regexWhiteList = new RegExp(whiteList.join("|"), "i");
    
    approvedFlag = (userURL.match(regexWhiteList) != null);
    
    return approvedFlag;
}


<html>
<script type='text/javascript'></script>
<script>
var whiteList = [];
</script>
<?php
    $url = "http://web.engr.oregonstate.edu/~mckinlek/MediaMonitor/configSpecs.xml";
    $test = simplexml_load_file($url);
    foreach ($test as $object)
    {
        foreach ($object as $obj)
        {
            foreach ($obj->domain as $domain)
            {
                echo $domain;
                echo "    <script>
                            whiteList.push('".$domain."');
                        </script>";
            }
        }
    }    
?>

</html>
