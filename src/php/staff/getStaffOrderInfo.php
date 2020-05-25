
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $order_ID = $_POST['order_ID'];
   
    // `order_ID`, `customer_ID`, `rep_ID`, `start_date`, `status`, `post_status`, `type1_quantity`, `type2_quantity`, `type3_quantity`, `type1_unit_price`, `type2_unit_price`, `type3_unit_price`) 
    $query1 = "SELECT * FROM Orders WHERE order_ID = '$order_ID'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    // get total amount
    $total = $row1['type1_quantity'] *  $row1['type1_unit_price'] + $row1['type2_quantity'] *  $row1['type2_unit_price'] + $row1['type3_quantity'] *  $row1['type3_unit_price'];
    
    // get customer ID
    $customer_ID = $row1['customer_ID'];
    // get customer info
    $query2 = "SELECT * FROM Customer WHERE customer_ID = '$customer_ID'";
    $stmt2 = pdoQuery($conn, $query2);
    $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);

    echo 
        "<span>ORDER ID: </span>" . $order_ID . "<br /><br />" .
            "<span>DATE: </span>" . date_format(date_create($row1['start_date']), 'h:i A \o\n l jS F Y') . "<br /><br />" .
            "<span>STATUS: </span>" . $row1['status'] . "<br /><br />" .
            "<span>POST STATUS: </span>" . $row1['post_status'] . "<br /><br />" .
            "<span>quantity  <br />" .
                "<span>N95 RESPIRATOR: " . $row1['type1_quantity'] . "</span><br />" .
                "<span>SURGICAL MASK: " . $row1['type2_quantity'] . "</span><br />" .
                "<span>SURGICAL-N95-RESPIRATOR: " . $row1['type3_quantity'] . "</span><br /><br />" .
            "</span>" .
            "<span>UNIT PRICE  <br />" .
                "<span>N95 RESPIRATOR: $" . $row1['type1_unit_price'] . "</span><br />" .
                "<span>SURGICAL MASK: $" . $row1['type2_unit_price'] . "</span><br />" .
                "<span>SURGICAL-N95-RESPIRATOR: $" . $row1['type3_unit_price'] . "</span><br /><br />" .
            "</span>" .
            "<span>TOTAL AMOUNT: </span>$" . $total . "<br /><br />" .
            "<span>Customer info<br />" .
                "<span>Username: " . $row2['username'] . "</span><br />" .
                "<span>RealName: " . $row2['first_name'] . " " . $row2['last_name'] . "</span><br />" .
                "<span>Tel: " . $row2['telephone'] . "</span><br />" .
                "<span>Email: " . $row2['email'] . "</span><br />" .
                "<span>passport ID: " . $row2['passport_ID'] . "</span><br />" .
        "</span>";
 
    $conn = null;
?>
