
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['rep_username'];

    // get rep info
    $query1 = "SELECT * FROM Rep WHERE username = '$rep_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $rep_ID = $row1['rep_ID'];
    

    //get all customer number that rep have served
    $query2 = "SELECT COUNT(DISTINCT customer_ID) as total_customer FROM Orders WHERE status = 'completed' AND rep_ID = $rep_ID";
    $stmt2 = pdoQuery($conn, $query2);
    $row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC);
    $total_customer = $row2['total_customer'];

       
    echo 
        "<span>rep id: </span>" . $rep_ID . "<br />" .
        "<span>USERNAME: </span>" . $rep_username . "<br />" .
        "<span>REAL NAME: </span>" . $row1['first_name'] . " " . $row1['last_name'] . "<br />" .
        "<span>TEL: </span>" . $row1['telephone'] . "<br />" .
        "<span>EMAIL: </span>" . $row1['email'] . "<br />" .
        "<span>QUOTA REMAINING: </span>" . $row1['quota'] . "<br />" .
        "<span>TOTAL CUSTOMER SERVED (COMPLETED ORDERS): </span>" . $total_customer . "<br />";
    $conn = null;
?>

