
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['username'];
    $email = $_POST['email'];

    // set rep region
    $query1 = "UPDATE Rep SET email = '$email' WHERE username = '$rep_username'";
    $stmt1 = pdoExec($conn, $query1);
    
    $conn = null;
?>
