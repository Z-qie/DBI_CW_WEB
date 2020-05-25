
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['rep_username'];

    // get rep info
    $query1 = "SELECT * FROM Rep WHERE username = '$rep_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $rep_ID = $row1['rep_ID'];
    $working_status = $row1['working_status'];


    //get all customer number that rep have served
    $query2 = "SELECT COUNT(DISTINCT customer_ID) as total_customer FROM Orders WHERE status = 'completed' AND rep_ID = $rep_ID";
    $stmt2 = pdoQuery($conn, $query2);
    $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);
    $total_customer = $row2['total_customer'];

    //get all normal order number that rep have
    $query3 = "SELECT COUNT(order_ID) as total_normal FROM Orders WHERE post_status = 'normal' AND rep_ID = $rep_ID";
    $stmt3 = pdoQuery($conn, $query3);
    $row3 = $stmt3 -> fetch(PDO::FETCH_ASSOC);
    $total_normal = $row3['total_normal'];

    //get all abnormal order number that rep have
    $query4 = "SELECT COUNT(order_ID) as total_abnormal FROM Orders WHERE (post_status = 'abnormal' OR post_status = 'abnormal to be reviewed') AND rep_ID = $rep_ID";
    $stmt4 = pdoQuery($conn, $query4);
    $row4 = $stmt4 -> fetch(PDO::FETCH_ASSOC);
    $total_abnormal = $row4['total_abnormal'];

    // get all completed orders (normal or abnormal) of selected rep
    $total_order = $total_normal + $total_abnormal;



    //get all revenue and quantity of order number that rep have
    $query5 = "SELECT * FROM Orders WHERE status = 'completed' AND rep_ID = $rep_ID";
    $stmt5 = pdoQuery($conn, $query5);
    $row5 = $stmt5 -> fetch(PDO::FETCH_ASSOC);
    $total_revenue_1 = 0;
    $total_revenue_2 = 0;
    $total_revenue_3 = 0;
    $total_quantity_1 = 0;
    $total_quantity_2 = 0;
    $total_quantity_3 = 0;
   
    while ($row5 = $stmt5 -> fetch(PDO::FETCH_ASSOC)) {
        $total_quantity_1 += $row5['type1_quantity'];
        $total_quantity_2 += $row5['type2_quantity'];
        $total_quantity_3 += $row5['type3_quantity'];
        $total_revenue_1 += $row5['type1_quantity'] * $row5['type1_unit_price'];
        $total_revenue_2 += $row5['type2_quantity'] * $row5['type2_unit_price']; 
        $total_revenue_3 += $row5['type3_quantity'] * $row5['type3_unit_price'];
    }

    echo "$rep_ID $working_status $total_customer $total_order $total_normal $total_abnormal $total_quantity_1 $total_quantity_2 $total_quantity_3 $total_revenue_1 $total_revenue_2 $total_revenue_3";
    
    $conn = null;
?>
