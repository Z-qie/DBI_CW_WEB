
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $order_ID = $_POST['order_ID'];

    // reset order from abnormal to be reviewed to abnormal after manager checking detail of this order.
    $query = "UPDATE Orders SET status = 'completed', post_status = 'abnormal' WHERE order_ID = $order_ID";
    $stmt = pdoExec($conn, $query);

    $conn = null;
?>
        