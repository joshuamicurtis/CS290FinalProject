<?php
session_start();

//login details removed

$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);

if($mysqli->connect_error) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ")" . $mysqli->connect_error;
}

$userID = $_SESSION['user_id'];
echo "<h2>Your Prior Reviews</h2>";
 $all = $mysqli->prepare("SELECT * FROM reviews  WHERE userID = ?");
    $all->bind_param('s', $userID);
    $all->execute();
    $result = $all->get_result();
	buildTable($result);
	
	
function buildTable($result) {
  global  $tableBody;
  echo '<table><thead><tr>
		<th>Date</th>
		<th>Price</th>
		<th>Address</th>
		<th>Availability</th>
		</tr></thead>';

  $tableBody = '';  
  while($row = $result->fetch_assoc())
  {
     echo '<tr><td>'.$row['Date'].'</td>';
    echo '<td>'.$row['Price'].'</td>';
	echo '<td>'.$row['Address'].'</td>';
    echo '<td>'.$row['Availability'].'</td></tr>';
  }
  echo '</table>';
}