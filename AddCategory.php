<?php
	session_start();
	if (!$_SESSION['uid'] == 1) {
		header("Location: http://web.engr.oregonstate.edu/~mckinlek/MediaMonitor/login.php");
		exit;
} ?>

<?php
	ini_set('display_errors', 'On');
	$xml = simplexml_load_file("configSpecs.xml"); //This line will load the XML file. 

	$sxe = new SimpleXMLElement($xml->asXML()); //In this line it create a SimpleXMLElement object with the source of the XML file. 
	if (!(empty($_POST['CatName']) or empty($_POST['PerVisit']) or empty($_POST['PreVisit']) or empty($_POST['VisitPerDay']) or empty($_POST['VisitPerWeek']))) {
		//The following lines will add a new child and others child inside the previous child created. 
		$category = $sxe->catalog->addChild("Category"); 
		$category->addChild("Name", $_POST['CatName']); 
		$category->addChild("PerVisit", $_POST['PerVisit']);
		$category->addChild("PreVisit", $_POST['PreVisit']); 
		$category->addChild("VisitPerDay", $_POST['VisitPerDay']);
		$category->addChild("VisitPerWeek", $_POST['VisitPerWeek']);
		//This next line will overwrite the original XML file with new data added 
		$sxe->asXML("configSpecs.xml");  
		echo "Category Added Successfully" . "<br><br>";
		echo "<script>location.href='success.html';</script>"; 
	}
?>
<html> 
<body>

	<div>
		<title>Add Category - Media Monitor</title>
		<head><b><font size="5">Adding a New Category</font></b></head>
		
		<body>
			<br>
			<br>
			<a href="configuration.php">Back to Main Configuration page</a>
			<br>
			<form method="post" action="AddCategory.php"> 

			<fieldset>
				<legend>Category Details</legend>
				<p>Name: <input type="text" name="CatName" /></p>
				<input type="checkbox" name="Enabled" value="Enabled">Category Enabled<br>
				<p>Single-Visit Screen Time: <input type="number" name="PerVisit" /></p>
				<p>Post-Visit Down Time: <input type="number" name="PreVisit" /></p>
				<p>Maximum Visits Per Day: <input type="number" name="VisitPerDay" /></p>
				<p>Maximum Visits Per Week: <input type="number" name="VisitPerWeek" /></p>
				
				<input type="submit" name="add" value="Add Category" />
			</fieldset>

		</form>
		</body>
		
</body>
</html>
