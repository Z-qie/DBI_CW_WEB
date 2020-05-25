
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';
    $rep_username = $_POST['username'];

    // get rep info who are currently selected 
    $query = "    
        SELECT first_name, last_name, telephone, email, quota, COUNT(order_ID) AS orders
        FROM Rep R LEFT OUTER JOIN Orders O ON R.rep_ID = O.rep_ID
        WHERE username = '$rep_username' 
        GROUP BY first_name, last_name, telephone, email, quota;";

    $stmt = pdoQuery($conn, $query);
    $row = $stmt -> fetch(PDO::FETCH_ASSOC);
   
    echo 
    "<div class='rep_name'>REP NAME - <span>" . $row['first_name'] . " " . $row['last_name'] . "</span></div>" . 
    "<div class='Tel'>TEL - <span>" . $row['telephone'] . "</span></div>" .
    "<div class='email'>EMAIL - <span>" . $row['email'] . "</span></div>" .
    "<div class='quota_remain'>QUOTA REMAIN - <span>" . $row['quota'] . "</span></div>" .
    "<div class='total_orders'>TOTAL ORDERS - <span>" . $row['orders'] . "</span></div>";
    $conn = null;
?>

