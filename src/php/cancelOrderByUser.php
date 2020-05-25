
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';
    $order_ID = $_POST['order_ID'];
   
    // get customer ID
    $query = "UPDATE Orders SET status = 'cancelled by user', post_status = 'not sold' WHERE order_ID = $order_ID";
    $stmt = pdoExec($conn, $query);

    $conn = null;
?>
