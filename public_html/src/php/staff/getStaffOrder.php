
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['username'];
   
    // get rep ID
    $query1 = "SELECT rep_ID FROM Rep WHERE username = '$rep_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $rep_ID = $row1['rep_ID'];


    // get all orders 
    $query2 = "
        SELECT order_ID, status, start_date, post_status
        FROM Orders
        WHERE rep_ID = $rep_ID
        ORDER BY order_ID DESC";
    $stmt2 = pdoQuery($conn, $query2);
    $count = 0;


    // resume original element
    echo "<div class='order_bar'>ORDERS</div>";
    // get order info in loop
    while ($row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC)) {
        // set list
        echo 
            "<div class='order_list' style='top: " . (12 + $count * 28) . "%;'>" .
                "<div class='time'>" . date_format(date_create($row2['start_date']), 'h:i A') . "</div>" .
                "<div class='date'>" . date_format(date_create($row2['start_date']), 'Y-m-d') . "</div>" .
                "<div class='title'>ID: " . $row2['order_ID'] . " &nbsp;STATUS: " . $row2['status'] . "</div>" .
                "<div class='description'>POST-STATUS: " . $row2['post_status'] . "</div>" .
                "<div class='detail'>Detail</div>" .
                "<div class='complete'>Complete</div>" .
                "<div class='space'> / </div>" .
                "<div class='delete'>Delete</div>" .
                "<div class='delete_alert'>ATTENTION!<br /> Are you sure you want to delete this order?<br /><span class='no'>&#x2717; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='yes'>&check;</span></div>" .
                "<div class='delete_refuse'>Sorry!<br /> This order has exceeded 24 hours, you can no more delete it.<br /><br /><span class='hide_refuse'>&#x29CB;</span></div>" .
                "<div class='complete_confirm'>Congrats!<br /> This order has been completed.<br /><br /><span class='hide_confirm'>&#x29CB;</span> </div>" .
                "<div class='complete_refuse'>Sorry!<br /> This order has already been completed.<br /><br /><span class='hide_refuse'>&#x29CB;</span> </div>" .
            "</div>";
        $count++;
    }

     // resume original element
     echo 
     "<div class='hide_order'>&#x29CB;</div>";

     $conn = null;
?>

