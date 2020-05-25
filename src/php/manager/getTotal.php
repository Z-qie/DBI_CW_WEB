
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';


    // get totals of completed (sold in normal and abnormal) orders
    $query1 = "SELECT * FROM Orders WHERE status = 'completed'";
    $stmt1 = pdoQuery($conn, $query1);
    $total_revenue_1 = 0;
    $total_revenue_2 = 0;
    $total_revenue_3 = 0;
    $total_quantity_1 = 0;
    $total_quantity_2 = 0;
    $total_quantity_3 = 0;
   
    while ($row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC)) {
        $total_quantity_1 += $row1['type1_quantity'];
        $total_quantity_2 += $row1['type2_quantity'];
        $total_quantity_3 += $row1['type3_quantity'];
        $total_revenue_1 += $row1['type1_quantity'] * $row1['type1_unit_price'];
        $total_revenue_2 += $row1['type2_quantity'] * $row1['type2_unit_price']; 
        $total_revenue_3 += $row1['type3_quantity'] * $row1['type3_unit_price'] ;
    }

    echo "$total_quantity_1 $total_quantity_2 $total_quantity_3 $total_revenue_1 $total_revenue_2 $total_revenue_3";
    
    $conn = null;
?>
