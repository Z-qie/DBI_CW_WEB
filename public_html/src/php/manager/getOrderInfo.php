
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $order_ID = $_POST['order_ID'];
   
    $query1 = "SELECT * FROM Orders WHERE order_ID = $order_ID";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);


    // get customer ID
    $customer_ID = $row1['customer_ID'];
    // get customer info
    $query2 = "SELECT * FROM Customer WHERE customer_ID = $customer_ID";
    $stmt2 = pdoQuery($conn, $query2);
    $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);

    // get order count sold for customer (both normal and abnormal are consider sold)
    $query3 = "SELECT COUNT(order_ID) as total_sold FROM Orders WHERE customer_ID = $customer_ID AND status = 'completed'";
    $stmt3 = pdoQuery($conn, $query3);
    $row3 = $stmt3 -> fetch(PDO::FETCH_ASSOC);

    // get order count cancelled by customer 
    $query4 = "SELECT COUNT(order_ID) as total_cancelled FROM Orders WHERE customer_ID = $customer_ID AND status = 'cancelled by user'";
    $stmt4 = pdoQuery($conn, $query4);
    $row4 = $stmt4 -> fetch(PDO::FETCH_ASSOC);


    // get rep ID
    $rep_ID = $row1['rep_ID'];
    // get customer info
    $query5 = "SELECT * FROM Rep WHERE rep_ID = '$rep_ID'";
    $stmt5 = pdoQuery($conn, $query5);
    $row5 = $stmt5 -> fetch(PDO::FETCH_ASSOC);


    echo 
        "<span>ORDER ID: </span>" . $order_ID  . "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>DATE: </span> " . date_format(date_create($row1['start_date']), 'h:i A \o\n l jS F Y') . "<br />" .
        "<span>STATUS: </span>" . $row1['status'] . "<br />" .
        "<span>POST-STATUS: </span>" . $row1['post_status'] . "<br />" .
        "<span>COUNTRY: </span>" . $row2['country'] . "<br /><br />" .

        "<span>CUSTOMER ID: </span>" . $customer_ID . "<br />" .
        "<span>CUSTOMER USERNAME: </span>" . $row2['username'] . "<br />" .
        "<span>CUSTOMER REAL NAME: </span>" . $row2['first_name'] . " " . $row2['last_name'] . "<br />" .
        "<span>CUSTOMER TEL: </span>" . $row2['telephone'] . "<br />" .
        "<span>CUSTOMER EMAIL: </span>" . $row2['email'] . "<br />" .
        "<span>TOTAL ORDERS COMPLETED FOR CUSTOMER: </span>" . $row3['total_sold'] . "<br />" .
        "<span>TOTAL ORDERS CANCELLED BY CUSTOMER: </span>" . $row4['total_cancelled'] . "<br /><br />" .

        "<span>SALE REP ID: </span>" . $rep_ID . "<br />" .
        "<span>REP USERNAME: </span>" . $row5['username'] . "<br />" .
        "<span>WORKING STATUS: </span>" . $row5['working_status'] . "<br />" .
        "<span>QUOTA REMAINING: </span>" . $row5['quota'] . "<br />" .
        "<span>SALE REP TEL: </span>" . $row5['telephone'] . "<br />" .
        "<span>SALE REP EMAIL: </span>" . $row5['email'] . "<br /><br />";
    $conn = null;
?>
