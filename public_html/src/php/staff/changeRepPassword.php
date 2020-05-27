
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['username'];
    $password = $_POST['password'];

    // set rep region
    $query1 = "UPDATE Rep SET password = '$password' WHERE username = '$rep_username'";
    $stmt1 = pdoExec($conn, $query1);
    
    $conn = null;
?>

