
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $order_ID = $_POST['order_ID'];
    $rep_username = $_POST['username'];

    // get status
    $query1 = "SELECT * FROM Orders WHERE order_ID = '$order_ID'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    // get total quantity
    $total = $row1['type1_quantity'] + $row1['type2_quantity'] + $row1['type3_quantity'];

    // get quota
    $query2 = "SELECT quota FROM Rep WHERE username = '$rep_username'";
    $stmt2 = pdoQuery($conn, $query2);
    $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);
    
    
    if ($row1['status'] == 'completed') {
        echo "completed";
    } else if ($row1['status'] != 'processing') {
        echo "alreadyCancelled";
    } else if ($row2['quota'] >= $total) {
        echo "quotaEnough";
    } else {
        // cancel order
        $query3 = "UPDATE Orders SET status = 'cancelled by rep' WHERE order_ID = $order_ID";
        $stmt3 = pdoExec($conn, $query3);
        echo "cancelDone";
    }
    $conn = null;
?>
