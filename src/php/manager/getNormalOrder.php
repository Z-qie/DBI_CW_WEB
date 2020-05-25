
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';

    // get all orders in processing
    $query = "SELECT * FROM Orders WHERE post_status = 'normal' ORDER BY order_ID DESC";
    $stmt = pdoQuery($conn, $query);
    $count = 0;

    // get order info in loop
    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $total_amount = $row['type1_quantity'] * $row['type1_unit_price'] + $row['type2_quantity'] * $row['type2_unit_price'] + $row['type3_quantity'] * $row['type3_unit_price'];
        $total_quantity = $row['type1_quantity'] + $row['type2_quantity'] + $row['type3_quantity'];
        $rep_ID = $row['rep_ID'];
        $customer_ID = $row['customer_ID'];
        //get rep name
        $query1 = "SELECT username FROM Rep WHERE rep_ID = $rep_ID";
        $stmt1 = pdoQuery($conn, $query1);
        $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
        //get customer name
        $query2 = "SELECT username FROM Customer WHERE customer_ID = $customer_ID";
        $stmt2 = pdoQuery($conn, $query2);
        $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);

        // set list
        echo 
            "<div class='order_list' style='top: " . (15 + $count * 30) . "%;'>" .
                "<div class='time'>" . date_format(date_create($row['start_date']), 'h:i A') . "</div>" .
                "<div class='date'>" . date_format(date_create($row['start_date']), 'Y-m-d') . "</div>" .
                "<div class='description'>ID: " . $row['order_ID'] . " &nbsp; Total Amount: " . $total_amount . "&nbsp; Quantity: " . $total_quantity . "</div>" .
                "<div class='rep_name'>Sale Rep: " .$row1['username'] . " &nbsp; Customer: " . $row2['username'] . "</div>" .
                "<div class='check_detail'>Detail<br />&#x29D6;</div>" .
            "</div>";
        $count++;
    }
     // resume original element
     echo 
     "</div> <div class='title_fixed'>normal order (sold): &nbsp; " . $count . " in total</div>";
     $conn = null;
?>
        