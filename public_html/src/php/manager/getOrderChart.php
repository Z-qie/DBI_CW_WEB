
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $order_ID = $_POST['order_ID'];
   
    //get all revenue and quantity of order
    $query = "SELECT * FROM Orders WHERE order_ID = $order_ID";
    $stmt = pdoQuery($conn, $query);
    $total_revenue_1 = 0;
    $total_revenue_2 = 0;
    $total_revenue_3 = 0;
    $total_quantity_1 = 0;
    $total_quantity_2 = 0;
    $total_quantity_3 = 0;


    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $total_quantity_1 += $row['type1_quantity'];
        $total_quantity_2 += $row['type2_quantity'];
        $total_quantity_3 += $row['type3_quantity'];
        $total_revenue_1 += $row['type1_quantity'] * $row['type1_unit_price'];
        $total_revenue_2 += $row['type2_quantity'] * $row['type2_unit_price']; 
        $total_revenue_3 += $row['type3_quantity'] * $row['type3_unit_price'];
    }

    echo "$total_revenue_1 $total_revenue_2 $total_revenue_3 $total_quantity_1 $total_quantity_2 $total_quantity_3";
      
    $conn = null;
?>
