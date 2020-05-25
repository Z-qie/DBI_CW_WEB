
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $region = $_POST['region'];

    // get active rep num
    $query1 = "SELECT COUNT(rep_ID) as total_active_rep FROM Rep WHERE country = '$region' AND working_status = 'active'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $total_active_rep = $row1['total_active_rep'];
    // get left rep num
    $query1 = "SELECT COUNT(rep_ID) as total_left_rep FROM Rep WHERE country = '$region' AND working_status = 'left'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $total_left_rep = $row1['total_left_rep'];
    // get total rep num
    $total_rep = $total_active_rep + $total_left_rep;

    //get all customer number in selected region
    $query2 = "SELECT COUNT(customer_ID) as total_customer FROM Customer WHERE country = '$region'";
    $stmt2 = pdoQuery($conn, $query2);
    $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);
    $total_customer = $row2['total_customer'];

    //get all normal order number in selected region
    $query3 = "SELECT COUNT(order_ID) as total_normal FROM Orders, Rep WHERE post_status = 'normal' AND country = '$region'";
    $stmt3 = pdoQuery($conn, $query3);
    $row3 = $stmt3 -> fetch(PDO::FETCH_ASSOC);
    $total_normal = $row3['total_normal'];

    //get all abnormal order number in selected region
    $query4 = "SELECT COUNT(order_ID) as total_abnormal FROM Orders, Rep WHERE (post_status = 'abnormal' OR post_status = 'abnormal to be reviewed') AND country = '$region'";
    $stmt4 = pdoQuery($conn, $query4);
    $row4 = $stmt4 -> fetch(PDO::FETCH_ASSOC);
    $total_abnormal = $row4['total_abnormal'];

    // get all completed orders (normal or abnormal) in selected region
    $total_order = $total_normal + $total_abnormal;



    //get all revenue and quantity of order number in selected region
    $query5 = "SELECT * FROM Orders, Rep WHERE status = 'completed' AND country = '$region'";
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

    echo "$total_active_rep $total_left_rep $total_rep $total_customer $total_normal $total_abnormal $total_order $total_quantity_1 $total_quantity_2 $total_quantity_3 $total_revenue_1 $total_revenue_2 $total_revenue_3";
    $conn = null;
?>
