
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['rep_username'];

    // get rep info
    $query1 = "SELECT working_status FROM Rep WHERE username = '$rep_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $working_status = $row1['working_status'];
    

    echo 
        "<span>Current working status: </span>" . $working_status;
    $conn = null;
?>

