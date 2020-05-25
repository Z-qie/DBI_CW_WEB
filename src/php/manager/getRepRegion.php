
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['rep_username'];

    // get rep info
    $query1 = "SELECT country FROM Rep WHERE username = '$rep_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $country = $row1['country'];
    

    echo 
        "<span>Current working region: </span>" . $country;
    $conn = null;
?>

