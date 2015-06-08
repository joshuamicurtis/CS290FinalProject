<?php
session_start();
include 'includes/db-connect.php';
include 'includes/functions.php';
 
//login details removed

$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);

	if($mysqli->connect_error) {
      echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ")" . $mysqli->connect_error;
    }
	?>

  <!DOCTYPE html>
  <html>
    <head>
    	<meta charset=\"UTF-8\">
        <title>Secure Login: Protected Page</title>
        <link rel="stylesheet" type="text/css" href="protected.css" />
		<script type="text/JavaScript" src="js/forms.js"></script>
		<script type="text/JavaScript" src="js/protected.js"></script>
    </head>
    <body>
 <?php
  if (login_check($mysqli) == true){
    echo "<p>Welcome ";
	echo htmlentities($_SESSION['username']); 
	echo "!</p>
            <p>
                On this page you can add reviews of housing listings you have seen. 
				You can also view your previous reviews.
            </p>";
			
			?>
			<div id="addReview\" >
				<h2>Add a New Review</h2>
				<form id="review_form" action="includes/addReview.php" method="post" name="review_form">
				<p>Date You Viewed Housing Listing</p>
				<input type="date" id="date" name="date" value="" required>
				<p>Price Quoted</p>
				<input type="number" id="price" name="price" value="" required>
				<p>Address</p>
				<input type="text" id="address" name="address" value="" required>
				<p></p>
				<input type="radio" name="availability" value="available" checked>Available
				<p></p>
				<input type="radio" name="availability" value="unavailable">Unavailable
				<p></p>
				<input type="radio" name="availability" value="waitlisted">Waitlisted
				<p></p>
				<input id="addButton" type="button" name="LogInButton" value="Add Review" onclick="addRequest()">
				</form>
				<div id="addResponse"></div>
			</div>
			<div id="priorReviews">
			</div>
			<p>Click <a href="includes/logout.php">here</a> to logout. </p>
            <?php
			
  } 
  else {
    echo "<p>
                <span class=\"error\">You are not authorized to access this page.</span> Please <a href=\"index.php\">login</a>.
          </p>";
  } 

  echo "</body>
    </html>";
?>