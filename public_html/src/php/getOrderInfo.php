
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';
    $customer_username = $_POST['username'];
   
    // get customer ID
    $query1 = "SELECT customer_ID FROM Customer WHERE username = '$customer_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $customer_ID = $row1['customer_ID'];

  

    // get all orders 
    $query2 = "
        SELECT order_ID, rep_ID, status, start_date, type1_quantity, type2_quantity, type3_quantity, type1_unit_price, type2_unit_price, type3_unit_price
        FROM Orders
        WHERE customer_ID = $customer_ID ORDER BY order_ID DESC";
    $stmt2 = pdoQuery($conn, $query2);
    $count = 0;
    // get order info in loop
    while ($row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC)) {

        // get rep info
        $rep_ID = $row2['rep_ID'];
        $query = "SELECT username, telephone, email FROM Rep WHERE rep_ID = $rep_ID";
        $stmt = pdoQuery($conn, $query);
        $row = $stmt -> fetch(PDO::FETCH_ASSOC);
        $rep_name = $row['username'];
        $rep_tel = $row['telephone'];
        $rep_email = $row['email'];
        

        // calculate total
        $total = $row2['type1_quantity'] *  $row2['type1_unit_price'] + $row2['type2_quantity'] *  $row2['type2_unit_price'] + $row2['type3_quantity'] *  $row2['type3_unit_price'];
        echo 
            "<div class='order_section' style='top: " . (12 + $count * 45) . "%;'>" .
                "<div class='order_alert'></div>" . 
                "<div class='cancel_alert'>ATTENTION!<br /> Are you sure you want to cancel this order?<br /><br /><br /><br /> <span class='no'>&#x2717; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='yes'>&check;</span></div>" . 
                "<div class='order_ID'><span>OERDER ID - </span>" . $row2['order_ID'] . "</div><br />" .
                "<div class='order_date'><span>ORDER DATE - </span><div style='display: inline-block'>" . $row2['start_date'] ."</div></div><br />" .
                "<div class='order_rep'><span>REP NAME - </span>" . $rep_name . "</div><br />" .
                "<div class='order_rep_tel'><span>TEL - </span>" .  $rep_tel . "</div><br />" .
                "<div class='order_rep_email'><span>EMAIL - </span>" .  $rep_email . "</div><br />" .
                "<div class='quantity_title'><span>QUANTITY</span></div>" .
                "<div class='order_quantity'>" .
                    "<span><br />&nbsp;&nbsp;&nbsp;N95 RESPIRATOR: </span>" . $row2['type1_quantity'] .
                    "<span><br />&nbsp;&nbsp;&nbsp;SURGICAL MASK: </span>" . $row2['type2_quantity'] .
                    "<span><br />&nbsp;&nbsp;&nbsp;SURGICAL-N95-RESPIRATOR: </span>" . $row2['type3_quantity'] .
                "</div><br />" .
                "<div class='order_total'><span>TOTAL - $ </span>" . number_format((float) $total, 2, '.', '') . "</div><br />" .
                "<div class='order_status'><span>STATUS - </span>" . $row2['status'] . "</div><br />" .
                "<div class='order_cancel'>CANCEL</div>" . 
            "</div>";
        $count++;
    }
    
    // resume original element
    echo 
    "<div class='order_bar'>        
        <span>ORDER LIST</span>
    </div>
    <div class='order_hover'></div>
    <div class='hide_order'>&#x29CB;</div>";

    $conn = null;
?>

