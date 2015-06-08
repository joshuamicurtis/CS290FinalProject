<?php
session_start();

//login details removed

$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);

if($mysqli->connect_error) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ")" . $mysqli->connect_error;
}

if (isset($_POST['date'], $_POST['price'],$_POST['address'], $_POST['availability'])) {
	$date = $_POST['date'];
	$price = $_POST['price'];
	$address = $_POST['address'];
	$availability = $_POST['availability'];
	$userID = $_SESSION['user_id'];
	$add = $mysqli->prepare("INSERT INTO reviews (userID, Date, Price, Address, Availability) VALUES (?,?,?,?,?)");
	$add->bind_param('sssss', $userID, $date, $price, $address, $availability);
    $add->execute();
    $add->close();
}