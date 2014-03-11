<?php 
	session_start();
	if ($_GET['logout'] == 1) {
		session_destroy();
	}
	if (isset($_POST['UserName'])  && isset($_POST['Password'])) {
		$xml = simplexml_load_file("configSpecs.xml");
		$sxe = new SimpleXMLElement($xml->asXML());
		foreach ($sxe->Users->children() as $User) {
			if (($User->UserName == $_POST['UserName']) && ($User->Password == $_POST['Password'])) {
				$_SESSION['uid'] = 1;
				$_SESSION['UserName'] = $_POST['UserName'];
				$_SESSION['PassWord'] = $_POST['Password'];
				header("Location: http://web.engr.oregonstate.edu/~mckinlek/MediaMonitor/configuration.php");
				exit;
			}
		}
		echo "Invalid username or password.</br>";
	   
	}
?>

<html> 
<body>

	<div>
		<title>Media Monitor - Login</title>
		<head><b><font size="5">This is your Media Monitor Login Page</font></b></head>
		<br>
		<form method="post" action="login.php"> 

			<fieldset>
				<legend>Login</legend>
				<p>User Name: <input type="text" name="UserName" /></p>
				<p>Password: <input type="password" name="Password" /></p>

				<input type="submit" name="loginGo" value="Login" />
			</fieldset>

		</form>

	</div>
</body>
</html>
