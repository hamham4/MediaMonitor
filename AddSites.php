<?php
	session_start();
	if (!$_SESSION['uid'] == 1) {
		header("Location: http://web.engr.oregonstate.edu/~mckinlek/MediaMonitor/login.php");
		exit;
} ?>

<html> 
<body>
	<div>
		<title>Add Sites to Category - Media Monitor</title>
		<head><b><font size="5">Adding Sites to a Category</font></b></head>
			<br><br>
			<a href="configuration.php">Back to Main Configuration page</a>
			<br>
			<form method="post" action="AddSites.php"> 
				<fieldset>
					<legend>Choose Category</legend>
						<p><select name="cats">
						<?php
							$xml = simplexml_load_file("configSpecs.xml");
							$sxe = new SimpleXMLElement($xml->asXML()); 
							$i = 0;
							foreach ($sxe->catalog->children() as $Cat) { 
								if($_POST['cats'] == $Cat->Name)
									echo "<option value=\"" . $Cat->Name . "\" selected=\"selected\">" . $Cat->Name . "</option>";
								else
									echo "<option value=\"" . $Cat->Name . "\">" . $Cat->Name . "</option>";
							}  
						?>
					</select></p>
					<input type="submit" name="add" value="SelectCategory" />
				</fieldset>
				
				<fieldset>
					<legend>Add Sites to Category</legend>
					<p>url: <input type="text" name="URL"  style="width:500px;"/></p>
					<input type="submit" name="add" value="Add Site" /> <br> <br>
					<?php
						if (!(empty($_POST['URL']))) 
						{
							foreach ($sxe->catalog->children() as $Cat) {
								if ($Cat->Name == $_POST['cats']) { 
									$Cat->addChild("domain", $_POST['URL']);
								}
							}  
						}
							//This next line will overwrite the original XML file with new data added 
							$sxe->asXML("configSpecs.xml");  
						$i = 0;
						foreach ($sxe->catalog->children() as $Cat) { 
							if ($Cat->Name == $_POST['cats'])
							{
								foreach ($Cat->domain as $site) {
									echo $site . '<br>';
								}
							}
						}
					?>
				</fieldset>
			</form>
		</div>
</body>
</html>
