
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['username'];
    $telephone = $_POST['telephone'];

    // set rep region
    $query1 = "UPDATE Rep SET telephone = '$telephone' WHERE username = '$rep_username'";
    $stmt1 = pdoExec($conn, $query1);
    
    $conn = null;
?>
