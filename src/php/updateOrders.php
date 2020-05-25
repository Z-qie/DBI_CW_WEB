
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';

    // update all order status and post status every time a customer/ rep/ manager logging in

    // select all orders not handled by rep yet
    $query1 = "SELECT * FROM Orders WHERE status = 'processing'";
    $stmt1 = pdoQuery($conn, $query1);
    $counter = 0;

    while ($row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC)) {
        $rep_ID[$counter] = $row1['rep_ID'];
        $order_ID[$counter] = $row1['order_ID'];
        $interval[$counter] = time() - strtotime($row1['start_date']);
        $total[$counter] = $row1['type1_quantity'] + $row1['type2_quantity'] + $row1['type3_quantity'];
        $counter++;
    }
    
    for ($i = 0; $i < $counter; $i++) { 
        // if the order has exceeded 24h but still processing
        if ($interval[$i] > 86400) { //86400 = 24h
            // further check if quota is not enough:
            // get total quantity
            $query2 = "SELECT quota FROM Rep WHERE rep_ID = $rep_ID[$i]";
            $stmt2 = pdoQuery($conn, $query2);
            $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);

            // if rep's current quota is not enough, 
            if ($row2['quota'] < $total[$i]) {
                // 1. set status ot 'completed' post status to 'abnormal to be reviewed'
                $query3 = "UPDATE Orders SET status = 'completed', post_status = 'abnormal to be reviewed' WHERE order_ID = $order_ID[$i]";
                $stmt3 = pdoExec($conn, $query3);

                // 2. subtract corresonding rep quota
                $remaining = $row2['quota'] - $total[$i];
                $query4 = "UPDATE Rep SET quota = $remaining WHERE rep_ID = $rep_ID[$i]";
                $stmt4 = pdoExec($conn, $query4);
            }           
        }
    }   
    $conn = null;
?>

