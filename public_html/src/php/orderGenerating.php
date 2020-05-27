
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';
    $customer_username = $_POST['customer_username'];
    $rep_username = $_POST['rep_username'];
    $type1_quantity = $_POST['type1_quantity'];
    $type2_quantity = $_POST['type2_quantity'];
    $type3_quantity = $_POST['type3_quantity'];
    $type1_unit_price = $_POST['type1_unit_price'];
    $type2_unit_price = $_POST['type2_unit_price'];
    $type3_unit_price = $_POST['type3_unit_price'];

    // get customer ID
    $query1 = "SELECT customer_ID FROM Customer WHERE username = '$customer_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $customer_ID = $row1['customer_ID'];

    //get rep ID
    $query2 = "SELECT rep_ID FROM Rep WHERE username = '$rep_username'";
    $stmt2= pdoQuery($conn, $query2);
    $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);
    $rep_ID = $row2['rep_ID'];

    // get order creating time 
    $order_date = date("Y-m-d H:i:s");

    //create order
    $query3 = "        
        INSERT INTO Orders
        (customer_ID, rep_ID, start_date, status, post_status, type1_quantity, type2_quantity, type3_quantity, type1_unit_price, type2_unit_price, type3_unit_price) 
        VALUES 
        ($customer_ID, $rep_ID, '$order_date', 'processing', 'not sold', $type1_quantity,  $type2_quantity,  $type3_quantity, $type1_unit_price, $type2_unit_price, $type3_unit_price)";
    $stmt3 = pdoExec($conn, $query3);

    echo $order_date;
    $conn = null;
?>

