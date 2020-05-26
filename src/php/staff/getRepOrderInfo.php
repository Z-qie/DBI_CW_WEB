<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['rep_username'];

    // get rep ID
    $query = "SELECT * FROM Rep WHERE username = '$rep_username'";
    $stmt = pdoQuery($conn, $query);
    $row = $stmt -> fetch(PDO::FETCH_ASSOC);
    $rep_ID = $row['rep_ID'];
        

    //get all revenue and quantity of order in processing
    $query = "SELECT * FROM Orders WHERE status = 'processing' AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $processing_total_revenue_1 = 0;
    $processing_total_revenue_2 = 0;
    $processing_total_revenue_3 = 0;
    $processing_total_quantity_1 = 0;
    $processing_total_quantity_2 = 0;
    $processing_total_quantity_3 = 0;
   
    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $processing_total_quantity_1 += $row['type1_quantity'];
        $processing_total_quantity_2 += $row['type2_quantity'];
        $processing_total_quantity_3 += $row['type3_quantity'];
        $processing_total_revenue_1 += $row['type1_quantity'] * $row['type1_unit_price'];
        $processing_total_revenue_2 += $row['type2_quantity'] * $row['type2_unit_price']; 
        $processing_total_revenue_3 += $row['type3_quantity'] * $row['type3_unit_price'];
    }

    //get all revenue and quantity of order cancelled
    $query = "SELECT * FROM Orders WHERE (status = 'cancelled by user' OR status = 'cancelled by rep') AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $cancelled_total_revenue_1 = 0;
    $cancelled_total_revenue_2 = 0;
    $cancelled_total_revenue_3 = 0;
    $cancelled_total_quantity_1 = 0;
    $cancelled_total_quantity_2 = 0;
    $cancelled_total_quantity_3 = 0;
   
    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $cancelled_total_quantity_1 += $row['type1_quantity'];
        $cancelled_total_quantity_2 += $row['type2_quantity'];
        $cancelled_total_quantity_3 += $row['type3_quantity'];
        $cancelled_total_revenue_1 += $row['type1_quantity'] * $row['type1_unit_price'];
        $cancelled_total_revenue_2 += $row['type2_quantity'] * $row['type2_unit_price']; 
        $cancelled_total_revenue_3 += $row['type3_quantity'] * $row['type3_unit_price'];
    }

    //get all revenue and quantity of normal order 
    $query = "SELECT * FROM Orders WHERE post_status = 'normal' AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $normal_total_revenue_1 = 0;
    $normal_total_revenue_2 = 0;
    $normal_total_revenue_3 = 0;
    $normal_total_quantity_1 = 0;
    $normal_total_quantity_2 = 0;
    $normal_total_quantity_3 = 0;
   
    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
       $normal_total_quantity_1 += $row['type1_quantity'];
       $normal_total_quantity_2 += $row['type2_quantity'];
       $normal_total_quantity_3 += $row['type3_quantity'];
       $normal_total_revenue_1 += $row['type1_quantity'] * $row['type1_unit_price'];
       $normal_total_revenue_2 += $row['type2_quantity'] * $row['type2_unit_price']; 
       $normal_total_revenue_3 += $row['type3_quantity'] * $row['type3_unit_price'];
    }

    //get all revenue and quantity of abnormal order 
    $query = "SELECT * FROM Orders WHERE (post_status = 'abnormal' OR post_status = 'abnormal to be reviewed') AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $abnormal_total_revenue_1 = 0;
    $abnormal_total_revenue_2 = 0;
    $abnormal_total_revenue_3 = 0;
    $abnormal_total_quantity_1 = 0;
    $abnormal_total_quantity_2 = 0;
    $abnormal_total_quantity_3 = 0;
   
    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
       $abnormal_total_quantity_1 += $row['type1_quantity'];
       $abnormal_total_quantity_2 += $row['type2_quantity'];
       $abnormal_total_quantity_3 += $row['type3_quantity'];
       $abnormal_total_revenue_1 += $row['type1_quantity'] * $row['type1_unit_price'];
       $abnormal_total_revenue_2 += $row['type2_quantity'] * $row['type2_unit_price']; 
       $abnormal_total_revenue_3 += $row['type3_quantity'] * $row['type3_unit_price'];
    }


    //get order count of order in processing
    $query = "SELECT COUNT(order_ID) AS processing_order FROM Orders WHERE status = 'processing' AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $row = $stmt -> fetch(PDO::FETCH_ASSOC);
    $processing_order = $row['processing_order'];
    //get order count of order cancelled
    $query = "SELECT COUNT(order_ID) AS cancelled_order FROM Orders WHERE (status = 'cancelled by user' OR status = 'cancelled by rep') AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $row = $stmt -> fetch(PDO::FETCH_ASSOC);
    $cancelled_order = $row['cancelled_order'];
    //get order count of normal order 
    $query = "SELECT COUNT(order_ID) AS normal_order FROM Orders WHERE post_status = 'normal' AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $row = $stmt -> fetch(PDO::FETCH_ASSOC);
    $normal_order = $row['normal_order'];
    //get order count of abnormal order
    $query = "SELECT COUNT(order_ID) AS abnormal_order FROM Orders WHERE (post_status = 'abnormal' OR post_status = 'abnormal to be reviewed') AND rep_ID = $rep_ID";
    $stmt = pdoQuery($conn, $query);
    $row = $stmt -> fetch(PDO::FETCH_ASSOC);
    $abnormal_order = $row['abnormal_order'];

    echo 
        "$processing_total_revenue_1 $processing_total_revenue_2 $processing_total_revenue_3 $processing_total_quantity_1 $processing_total_quantity_2 $processing_total_quantity_3 " .
        "$cancelled_total_revenue_1 $cancelled_total_revenue_2 $cancelled_total_revenue_3 $cancelled_total_quantity_1 $cancelled_total_quantity_2 $cancelled_total_quantity_3 " . 
        "$normal_total_revenue_1 $normal_total_revenue_2 $normal_total_revenue_3 $normal_total_quantity_1 $normal_total_quantity_2 $normal_total_quantity_3 " .
        "$abnormal_total_revenue_1 $abnormal_total_revenue_2 $abnormal_total_revenue_3 $abnormal_total_quantity_1 $abnormal_total_quantity_2 $abnormal_total_quantity_3 " .
        "$processing_order $cancelled_order $normal_order $abnormal_order";    
    $conn = null;
?>
