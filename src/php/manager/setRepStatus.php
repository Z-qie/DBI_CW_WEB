
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['rep_username'];
    $status = $_POST['status'];

    // set rep status
    $query1 = "UPDATE Rep SET working_status = '$status' WHERE username = '$rep_username'";
    $stmt1 = pdoExec($conn, $query1);
    
    $conn = null;
?>

