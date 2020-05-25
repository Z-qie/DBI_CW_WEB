
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['rep_username'];
    $country = $_POST['country'];

    // set rep region
    $query1 = "UPDATE Rep SET country = '$country' WHERE username = '$rep_username'";
    $stmt1 = pdoExec($conn, $query1);
    
    $conn = null;
?>

