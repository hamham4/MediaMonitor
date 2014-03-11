<?php
	session_start();
	if (!$_SESSION['uid'] == 1) {
		header("Location: http://web.engr.oregonstate.edu/~mckinlek/MediaMonitor/login.php");
		exit;
	} else {
	
} ?>


<html> 
<body>

<div>
<title>Media Monitor - Configure</title>
<head><b><font size="5">This is your Media Monitor Configuration Page</font></b></head>

<body>
<br>
<a href="AddCategory.php">Add New Control Category</a>
<br>
<a href="AddSites.php">Add Sites to a Control Category</a>
<br>
<a href="login.php?logout=1">Log out</a>
</body>

</body>
</html>
